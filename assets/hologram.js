/* ==========================================================================
   HOLOGRAM — a product floating above a projector, rendered with three.js.

   mountHologram(el, { image })   a product cut-out (PNG with transparency)
                                  shown as a layered, volumetric hologram
   mountHologram(el, { model })   a real 3D file (.stl or .glb) shown as a
                                  in its own colours, with a hologram edge glow

   Both share the rig: projector base, light cone, rising dust, bloom.
   Options: shiftX (number, or a function returning one) moves the rig right
   by that share of the width, leaving room for words on the left;
   lockTouch:false keeps vertical swipes for page scrolling; scale enlarges
   an assembled model (it still shrinks to fit when exploded).
   Drag to turn a model any way you like; pinch, ctrl+wheel or zoomBy()
   zoom in, and once the model has been clicked a plain wheel does too
   (until a click outside it, Esc, or scrolling down at normal size). Double-click resets both. An image only sways. It pauses when
   off screen.
   ========================================================================== */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const BASE_Y = 0.12;          // top of the projector
const FLOAT  = 0.34;          // gap between projector and the hologram

export function mountHologram(el, opts = {}) {
  const tint   = new THREE.Color(opts.tint   || '#7fe8ff');
  const accent = new THREE.Color(opts.accent || '#ff5a1f');
  const bg     = new THREE.Color(opts.background || '#0e0e0f');
  /* The background goes through tone mapping like everything else, which
     darkens it. Undo that ahead of time (ACES curve, per channel) so the
     stage meets the page around it with no visible edge. */
  const backdrop = exposure => {
    const c = bg.clone();
    for (const k of ['r', 'g', 'b']) {
      const L = c[k], a = 1 - .983729 * L, b = .0245786 - .432951 * L, d = -.000090537 - .238081 * L;
      c[k] = (-b + Math.sqrt(b * b - 4 * a * d)) / (2 * a) * .6 / exposure;
    }
    return c;
  };

  /* ---------------------------------------------------------------- setup */
  /* the canvas covers the whole screen, so keep the GPU memory small: the
     effect passes do the antialiasing, and the pixel ratio stops at 1.5.
     Too large a buffer starves the browser, which then paints black tiles */
  const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(bg, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  el.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';

  const scene = new THREE.Scene();
  scene.background = backdrop(1);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const camHome = new THREE.Vector3(0, 1.55, 6.4);
  camera.position.copy(camHome);
  /* the camera's place before zooming; zoom then moves it toward what it looks at */
  const camBase = camHome.clone();
  const ZMIN = .8, ZMAX = 3.2;
  let zoom = 1, zoomGoal = 1;
  const zoomTo = z => { zoomGoal = Math.max(ZMIN, Math.min(ZMAX, z)); };

  const amb = new THREE.AmbientLight(0xffffff, .35); scene.add(amb);
  const key = new THREE.PointLight(tint, 6, 8, 2); key.position.set(0, 1.4, .6); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, .6); rim.position.set(-3, 4, -2); scene.add(rim);
  /* studio light so a model's real colours read; only on in model mode */
  const studio = new THREE.Group(); studio.visible = false; scene.add(studio);
  studio.add(new THREE.HemisphereLight(0xffffff, 0x2a2a2e, .55));
  const keyW = new THREE.DirectionalLight(0xffffff, 1.3); keyW.position.set(2.5, 4, 3.5); studio.add(keyW);
  const fillW = new THREE.DirectionalLight(0xffffff, .35); fillW.position.set(-3, 1.5, 2); studio.add(fillW);

  /* the scene renders into a lightly multisampled target so edges don't
     shimmer as it turns */
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 2 }));
  composer.addPass(new RenderPass(scene, camera));
  /* one bad pixel (NaN, from a degenerate CAD triangle) gets smeared by the
     glow into big black blocks; zero it out before the glow sees it */
  composer.addPass(new ShaderPass({
    uniforms: { tDiffuse: { value: null } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv;
      void main(){ vec4 c = texture2D(tDiffuse, vUv);
        bvec4 bad = bvec4(c.r != c.r || c.r > 6e4, c.g != c.g || c.g > 6e4, c.b != c.b || c.b > 6e4, c.a != c.a);
        gl_FragColor = any(bad) ? vec4(0.) : max(c, vec4(0.)); }`
  }));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), .55, .45, .32);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const uni = { uTime: { value: 0 }, uTint: { value: tint }, uAccent: { value: accent }, uFlicker: { value: 1 } };

  /* -------------------------------------------------------------- projector */
  const rig = new THREE.Group(); scene.add(rig);

  const puck = new THREE.Mesh(
    new THREE.CylinderGeometry(1.42, 1.55, .14, 96),
    new THREE.MeshStandardMaterial({ color: 0x141416, metalness: .85, roughness: .38 }));
  puck.position.y = BASE_Y - .07; rig.add(puck);

  /* emitter face: a soft centre glow and a dashed ring that turns */
  const emitter = new THREE.Mesh(new THREE.CircleGeometry(1.32, 96), new THREE.ShaderMaterial({
    uniforms: uni, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `
      uniform float uTime; uniform vec3 uTint; varying vec2 vUv;
      void main(){
        vec2 p = vUv*2.-1.; float r = length(p); float a = atan(p.y,p.x);
        float core  = smoothstep(.75, 0., r) * .3;
        float ring  = smoothstep(.035, 0., abs(r-.84)) * (.55 + .45*step(.5, fract(a*7.64 + uTime*.35)));
        float ring2 = smoothstep(.02, 0., abs(r-.62)) * .5 * (.5 + .5*sin(a*24. - uTime*2.));
        gl_FragColor = vec4(uTint*(core+ring+ring2*.5), 1.);
      }`
  }));
  emitter.rotation.x = -Math.PI / 2; emitter.position.y = BASE_Y + .002; rig.add(emitter);

  const accentRing = new THREE.Mesh(new THREE.RingGeometry(1.43, 1.47, 128),
    new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: .6, side: THREE.DoubleSide }));
  accentRing.rotation.x = -Math.PI / 2; accentRing.position.y = BASE_Y + .003; rig.add(accentRing);

  /* ------------------------------------------------------------ light cone */
  const CONE_H = 2.9;
  const cone = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.05, CONE_H, 96, 1, true), new THREE.ShaderMaterial({
    uniforms: uni, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main(){ vUv = uv; vec4 mv = modelViewMatrix*vec4(position,1.);
        vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `
      uniform float uTime; uniform vec3 uTint; uniform float uFlicker; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main(){
        float fall  = pow(1.-vUv.y, 1.6);                          /* bright at the base */
        float side  = pow(clamp(1.-abs(dot(vN, vV)), 0., 1.), 1.2);               /* brighter toward the silhouette */
        float streak = .55 + .45*sin(vUv.x*180. + sin(vUv.x*31.)*3.) * sin(vUv.y*6. - uTime*1.6);
        float a = fall * (.012 + side*.05) * streak * uFlicker;
        gl_FragColor = vec4(uTint*a, 1.);
      }`
  }));
  cone.position.y = BASE_Y + CONE_H / 2; rig.add(cone);

  /* ------------------------------------------------------- dust in the beam */
  const DUST = 80, dustPos = new Float32Array(DUST * 3), dustSeed = new Float32Array(DUST);
  for (let i = 0; i < DUST; i++) { dustSeed[i] = Math.random(); }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute('seed', new THREE.BufferAttribute(dustSeed, 1));
  const dust = new THREE.Points(dustGeo, new THREE.ShaderMaterial({
    uniforms: uni, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    vertexShader: `
      uniform float uTime; attribute float seed; varying float vA;
      void main(){
        float t = fract(seed*13.7 + uTime*(.05 + seed*.06));
        float h = t*${CONE_H.toFixed(2)};
        float r = (1.0 + h/${CONE_H.toFixed(2)}*.8) * sqrt(fract(seed*91.3));
        float a = seed*6.2831*7. + uTime*.15;
        vec3 p = vec3(cos(a)*r, ${BASE_Y.toFixed(2)} + h, sin(a)*r);
        vA = sin(t*3.1416) * (.35 + .65*fract(seed*7.1));
        vec4 mv = modelViewMatrix*vec4(p,1.); gl_PointSize = (2. + 3.*fract(seed*3.3)) * (6./-mv.z); gl_Position = projectionMatrix*mv;
      }`,
    fragmentShader: `
      uniform vec3 uTint; varying float vA;
      void main(){ float d = length(gl_PointCoord-.5); float a = smoothstep(.5,0.,d)*vA*.5; gl_FragColor = vec4(uTint*a,1.); }`
  }));
  rig.add(dust);

  /* model orientation: sideways drags turn it round, up/down drags tip it
     over. A drag moves the goal; the model eases after it, so it never jerks. */
  const spin = new THREE.Quaternion(), goal = new THREE.Quaternion(), vel = new THREE.Vector2(), dq = new THREE.Quaternion();
  const tmp = new THREE.Vector3(), AX_Y = new THREE.Vector3(0, 1, 0), AX_X = new THREE.Vector3(1, 0, 0), IDENT = new THREE.Quaternion();
  const turn = (ax, ay) => {
    goal.premultiply(dq.setFromAxisAngle(AX_Y, ax)).premultiply(dq.setFromAxisAngle(AX_X, ay)).normalize();
  };
  const SENS = .0042, MAXV = .045;           /* radians per pixel; fastest coast per frame */

  /* --------------------------------------------------------- the hologram */
  const holo = new THREE.Group(); rig.add(holo);
  let mode = 'image', holoHeight = 1.8;
  /* colour needs softer bloom than the all-light image hologram */
  const setMode = m => {
    mode = m;
    studio.visible = m === 'model';
    key.intensity = m === 'model' ? .8 : 6;
    amb.intensity = m === 'model' ? .12 : .35;
    renderer.toneMappingExposure = m === 'model' ? .9 : 1;
    scene.background = backdrop(renderer.toneMappingExposure);
    bloom.strength = m === 'model' ? .2 : .55; bloom.threshold = m === 'model' ? .85 : .32;
    /* vertical drags turn a model, unless the page asked to keep them for scrolling */
    renderer.domElement.style.touchAction = m === 'model' && opts.lockTouch !== false ? 'none' : 'pan-y';
    spin.identity(); goal.identity(); vel.set(0, 0);
  };
  /* exploded view: each part has a direction it travels in; e eases toward target */
  let parts = [], explode = { e: 0, target: 0 }, fit = null, shells = 0;
  /* switching: the old content sinks into the projector (appear → 0), then
     the new one rises out of it (appear → 1) */
  let loadId = 0, appear = 0, appearTo = 1, pending = null;
  const swapIn = (build, res) => {
    pending?.res();                            /* whatever was waiting is superseded */
    pending = { build, res }; appearTo = 0;
  };

  const clearHolo = () => {
    parts = []; explode.e = explode.target = 0; fit = null;
    holo.children.slice().forEach(c => {
      holo.remove(c);
      c.traverse?.(o => { o.geometry?.dispose(); [].concat(o.material || []).forEach(m => { m.map?.dispose(); m.dispose(); }); });
    });
  };

  /* image → a stack of slices. The middle slice is strongest and keeps a
     little of the real colour; outer slices fade, giving it volume. */
  const sliceMaterial = (tex, fade, real) => new THREE.ShaderMaterial({
    uniforms: { ...uni, uMap: { value: tex }, uFade: { value: fade }, uReal: { value: real },
                uTexel: { value: new THREE.Vector2(1 / tex.image.width, 1 / tex.image.height) } },
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `
      uniform sampler2D uMap; uniform vec2 uTexel; uniform float uTime, uFade, uReal, uFlicker; uniform vec3 uTint;
      varying vec2 vUv;
      float hash(float n){ return fract(sin(n)*43758.5453); }
      void main(){
        /* now and then a few rows tear sideways */
        float glitch = step(.965, hash(floor(uTime*7.)));
        float shift  = glitch * (hash(floor(vUv.y*48.) + floor(uTime*23.)) - .5) * .045;
        vec2 uv = vUv + vec2(shift, 0.);
        vec4 c = texture2D(uMap, uv);
        if (c.a < .01) discard;
        /* outline: where the cut-out ends, glow */
        float n = (texture2D(uMap, uv + vec2(uTexel.x*3.,0.)).a + texture2D(uMap, uv - vec2(uTexel.x*3.,0.)).a +
                   texture2D(uMap, uv + vec2(0.,uTexel.y*3.)).a + texture2D(uMap, uv - vec2(0.,uTexel.y*3.)).a) * .25;
        float edge = clamp((c.a - n) * 5., 0., 1.);
        float lum  = dot(c.rgb, vec3(.299,.587,.114));
        vec3 holo  = mix(uTint*.35, mix(uTint, vec3(1.), .45), smoothstep(.1, .95, lum));
        vec3 col   = mix(holo, c.rgb, uReal);
        float scan  = .7 + .3*sin(vUv.y*520. - uTime*7.);
        float sweep = 1. - smoothstep(0., .03, abs(vUv.y - fract(uTime*.22)));
        float body  = .14 + .62*pow(max(lum, 0.), 1.15);          /* dark parts read as see-through */
        float a = c.a * (body*scan + .75*edge + .35*sweep) * uFade * uFlicker;
        gl_FragColor = vec4((col + uTint*edge + vec3(.9,1.,1.)*sweep*.35) * a, 1.);
      }`
  });

  function showImage(url) {
    const id = ++loadId;
    return new Promise((res, rej) => new THREE.TextureLoader().load(url, tex => {
      if (id !== loadId) { tex.dispose(); return res(); }      /* something newer was asked for */
      swapIn(() => buildImage(tex), res);
    }, undefined, rej));
  }
  function buildImage(tex) {
    clearHolo(); setMode('image');
    tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    const ar = tex.image.width / tex.image.height;
    let h = 1.9, w = h * ar;
    if (w > 3.1) { w = 3.1; h = w / ar; }
    holoHeight = h;
    const geo = new THREE.PlaneGeometry(w, h);
    const N = 16, DEPTH = Math.min(.42, w * .14);
    for (let i = 0; i < N; i++) {
      const k = i / (N - 1) - .5;                       /* -.5 … .5 */
      const centre = 1 - Math.abs(k) * 2;               /* 1 in the middle */
      const middle = i === (N >> 1);
      const m = new THREE.Mesh(geo, sliceMaterial(tex,
        middle ? .95 : .035 + .07 * Math.pow(centre, 1.5),     /* ghosts add up to about one layer */
        middle ? .42 : 0));
      m.position.set(0, BASE_Y + FLOAT + h / 2, k * DEPTH);
      m.renderOrder = 10 + i;
      holo.add(m);
    }
  }

  /* real 3D model → its own colours underneath, and on top a hologram skin:
     glow at the silhouette, faint scan lines, a sweep rising through it */
  const surfaceMaterial = (src, i) => {
    const c = src?.color ? src.color.clone() : new THREE.Color(0xb9b4aa);
    /* pure black parts would vanish on the dark stage; lift them a little */
    if (c.r + c.g + c.b < .12) c.setRGB(.06, .06, .065);
    return new THREE.MeshStandardMaterial({ color: c, roughness: .42, metalness: .08, side: THREE.DoubleSide,
      /* CAD files often have faces lying exactly on top of each other; a
         slightly different depth nudge per part settles which one shows,
         instead of the two fighting (flickering) as the model turns */
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 + (i % 24) * 2 });
  };
  const modelMaterial = () => new THREE.ShaderMaterial({
    uniforms: { ...uni, uBase: { value: BASE_Y + FLOAT }, uHeight: { value: holoHeight } },
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: `
      varying vec3 vN; varying vec3 vV; varying float vY;
      void main(){ vec4 w = modelMatrix*vec4(position,1.); vY = w.y; vec4 mv = viewMatrix*w;
        vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `
      uniform float uTime, uBase, uHeight, uFlicker; uniform vec3 uTint; varying vec3 vN; varying vec3 vV; varying float vY;
      void main(){
        float fres  = pow(clamp(1. - abs(dot(normalize(vN + 1e-6), normalize(vV))), 0., 1.), 2.2);
        float scan  = .9 + .1*sin(vY*95. - uTime*6.);
        float sweep = 1. - smoothstep(0., .05, abs(vY - (uBase + fract(uTime*.22)*uHeight)));
        float a = (fres*.26 + sweep*.08) * scan * uFlicker;
        gl_FragColor = vec4((uTint*(.2 + fres*.9) + vec3(.9,1.,1.)*sweep*.35) * a, 1.);
      }`
  });

  /* Work out where each part goes when the model comes apart.
     Flat products (a stove) separate in layers, like they are assembled;
     everything else spreads out from its centre. */
  function planExplode(object, box) {
    const size = box.getSize(new THREE.Vector3()), C = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z), R = size.length() / 2;
    const meshes = []; object.traverse(o => { if (o.isMesh) meshes.push(o); });
    /* zero-area triangles in CAD exports carry NaN or zero normals */
    meshes.forEach(o => {
      const n = o.geometry?.attributes?.normal; if (!n) return;
      for (let k = 0; k < n.count; k++) {
        const x = n.getX(k), y = n.getY(k), z = n.getZ(k);
        if (!Number.isFinite(x + y + z) || x * x + y * y + z * z < 1e-12) n.setXYZ(k, 0, 1, 0);
      }
      n.needsUpdate = true;
    });
    const flat = size.y < .35 * Math.max(size.x, size.z);
    const info = meshes.map(m => {
      m.geometry.computeBoundingBox();
      const c = m.geometry.boundingBox.getCenter(new THREE.Vector3()).applyMatrix4(m.matrixWorld);
      return { m, c, home: m.position.clone() };
    });
    if (flat) {
      const bin = size.y / 10 || 1;
      const levels = [...new Set(info.map(p => Math.round(p.c.y / bin)))].sort((a, b) => a - b);
      const gap = levels.length > 1 ? maxDim * .5 / (levels.length - 1) : 0;
      info.forEach(p => {
        const L = levels.indexOf(Math.round(p.c.y / bin));
        const side = new THREE.Vector3(p.c.x - C.x, 0, p.c.z - C.z).multiplyScalar(.12);
        p.dir = new THREE.Vector3(0, L * gap, 0).add(side);
      });
    } else {
      info.forEach((p, i) => {
        const d = p.c.clone().sub(C);
        const len = d.length();
        if (len < R * 1e-3) d.set(Math.cos(i * 2.4), .4, Math.sin(i * 2.4));
        p.dir = d.normalize().multiplyScalar(R * .55 * (.35 + Math.min(len / R, 1)));
      });
    }
    return info;
  }

  function fitAndShow(object) {
    clearHolo(); setMode('model');
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3()), centre = box.getCenter(new THREE.Vector3());
    parts = planExplode(object, box);
    /* fit the model so it still fits the beam when fully apart */
    const outer = box.clone();
    parts.forEach(p => { const b = new THREE.Box3().setFromObject(p.m); outer.union(b.translate(p.dir)); });
    const osz = outer.getSize(new THREE.Vector3());
    const sA = Math.min(1.9 / size.y, 2.6 / Math.max(size.x, size.z), 2.4 / size.length());   /* assembled, any way up */
    const sE = Math.min(1.9 / Math.max(size.y, osz.y * .8), 2.6 / Math.max(osz.x, osz.z));  /* fully apart */
    const pivot = new THREE.Group();
    object.position.sub(centre); pivot.add(object);
    /* corners of the model around its centre, assembled and fully apart,
       so a tipped-over model can be lifted clear of the projector */
    const corners = b => [0, 1, 2, 3, 4, 5, 6, 7].map(i => new THREE.Vector3(
      i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z).sub(centre));
    const big = sA * (opts.scale || 1);
    fit = { pivot, sA: big, sE: Math.min(big, sE), h: size.y, cA: corners(box), cE: corners(outer) };
    pivot.scale.setScalar(big);
    holoHeight = size.y * big;
    pivot.position.y = BASE_Y + FLOAT + holoHeight / 2;
    const skin = modelMaterial();
    const meshes = []; object.traverse(o => { if (o.isMesh) meshes.push(o); });
    /* a part that encloses others (a housing, a reference shell) turns to
       tinted glass, so what is inside stays visible */
    const boxes = meshes.map(m => new THREE.Box3().setFromObject(m));
    const shell = boxes.map((b, i) => {
      const inside = boxes.filter((o, j) => j !== i && b.containsBox(o)).length;
      return inside >= Math.max(2, (meshes.length - 1) * .25);
    });
    shells = shell.filter(Boolean).length;
    meshes.forEach((o, i) => {
      const src = Array.isArray(o.material) ? o.material[0] : o.material;
      o.material = surfaceMaterial(src, i); src?.dispose?.();
      if (shell[i]) {
        Object.assign(o.material, { transparent: true, opacity: .16, depthWrite: false, side: THREE.FrontSide });
        o.renderOrder = 8;                                   /* drawn after what it holds */
      } else {
        const glow = new THREE.Mesh(o.geometry, skin); glow.renderOrder = 5; o.add(glow);
      }
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry, 28),
        new THREE.LineBasicMaterial({ color: tint, transparent: true, opacity: .1, blending: THREE.AdditiveBlending, depthWrite: false }));
      o.add(edges);
    });
    holo.add(pivot);
  }

  function showModel(url, type) {
    const ext = (type || url.split('?')[0].split('.').pop() || '').toLowerCase();
    const id = ++loadId;
    return new Promise((res, rej) => {
      if (ext === 'stl') new STLLoader().load(url, geo => {
        if (id !== loadId) return res();
        geo.computeVertexNormals();
        /* CAD files are usually Z-up; turn them so the model stands upright */
        const mesh = new THREE.Mesh(geo); mesh.rotation.x = opts.zUp === false ? 0 : -Math.PI / 2;
        const wrap = new THREE.Group(); wrap.add(mesh); wrap.updateMatrixWorld(true);
        swapIn(() => fitAndShow(wrap), res);
      }, undefined, rej);
      else new GLTFLoader().load(url, g => { if (id !== loadId) return res(); swapIn(() => fitAndShow(g.scene), res); }, undefined, rej);
    });
  }

  /* ----------------------------------------------------------- interaction */
  let rotOffset = 0, rotVel = 0, dragging = false, lastX = 0, lastY = 0, resetting = false, idleAt = 0;
  const tmp2 = new THREE.Vector2();
  const pointer = new THREE.Vector2();
  const cvs = renderer.domElement;
  /* two fingers on the canvas pinch-zoom instead of turning */
  const touches = new Map();
  let pinchFrom = 0, pinchZoom = 1;
  const spread = () => { const [a, b] = [...touches.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  /* a plain wheel scrolls the page until the model is clicked; then it
     zooms, until a click elsewhere or Esc hands it back to the page */
  let engaged = false, hintT = 0;
  const hint = document.createElement('div');
  hint.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:9px 16px;border-radius:999px;' +
    'background:rgba(20,20,22,.78);color:#eee;font-size:13px;line-height:1.2;pointer-events:none;opacity:0;transition:opacity .35s;white-space:nowrap;' +
    'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)';
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  el.appendChild(hint);
  const say = text => {
    hint.textContent = text; hint.style.opacity = '1';
    clearTimeout(hintT); hintT = setTimeout(() => { hint.style.opacity = '0'; }, 1600);
  };
  let toldClick = false;
  const engage = on => {
    if (engaged === on) return;
    engaged = on;
    if (on) say('Scroll to zoom');
  };
  const outside = e => { if (!(el.parentElement || el).contains(e.target)) engage(false); };   /* the model or its buttons */
  const onKey = e => { if (e.key === 'Escape') engage(false); };
  addEventListener('pointerdown', outside, true); addEventListener('keydown', onKey);
  cvs.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') engage(true);
    touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (touches.size === 2) { dragging = false; pinchFrom = spread(); pinchZoom = zoomGoal; return; }
    dragging = true; resetting = false; lastX = e.clientX; lastY = e.clientY; vel.set(0, 0); idleAt = Infinity;
    cvs.style.cursor = 'grabbing';
  });
  cvs.addEventListener('dblclick', () => { resetting = true; vel.set(0, 0); zoomTo(1); });
  /* trackpad pinch arrives as ctrl+wheel; a plain wheel still scrolls the page */
  cvs.addEventListener('wheel', e => {
    /* scrolling down at normal size hands the wheel back to the page */
    if (engaged && !e.ctrlKey && e.deltaY > 0 && zoomGoal <= 1.001) engage(false);
    if (!e.ctrlKey && !e.metaKey && !(engaged && mode === 'model')) {
      if (!toldClick && mode === 'model') { toldClick = true; say('Click the model to zoom with scroll'); }
      return;
    }
    e.preventDefault();
    zoomTo(zoomGoal * Math.exp(-e.deltaY * .01));
  }, { passive: false });
  addEventListener('pointermove', e => {
    const r = cvs.getBoundingClientRect();
    pointer.set((e.clientX - r.left) / r.width * 2 - 1, (e.clientY - r.top) / r.height * 2 - 1);
    if (touches.has(e.pointerId)) {
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touches.size === 2) { if (pinchFrom > 0) zoomTo(pinchZoom * spread() / pinchFrom); return; }
    }
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    rotOffset += dx * .008; rotVel = dx * .008;
    if (mode === 'model') {
      turn(dx * SENS, dy * SENS * .8);
      vel.lerp(tmp2.set(dx * SENS, dy * SENS * .8), .35);      /* the throw, averaged over a few moves */
    }
  });
  const up = e => {
    touches.delete(e.pointerId);
    if (!dragging) return;
    dragging = false; cvs.style.cursor = 'grab'; idleAt = performance.now();
    vel.clampLength(0, MAXV);
  };
  addEventListener('pointerup', up); addEventListener('pointercancel', up);

  /* -------------------------------------------------------------- lifecycle */
  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight || w * .75;
    renderer.setSize(w, h, false); composer.setSize(w, h);
    bloom.resolution.set(w / 2, h / 2);
    camera.aspect = w / h;
    /* narrow frames pull the camera back so the whole rig fits */
    camBase.z = camHome.z * Math.max(1, 1.05 / camera.aspect);
    const shift = typeof opts.shiftX === 'function' ? opts.shiftX() : opts.shiftX || 0;
    if (shift) camera.setViewOffset(w, h, -w * shift, 0, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize); ro.observe(el); resize();

  let visible = true, paused = false, raf = 0, t0 = performance.now(), lookY = BASE_Y + FLOAT + .8;
  const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) loop(); }, { threshold: 0 });
  io.observe(el);

  function frame(now) {
    const t = (now - t0) / 1000;
    uni.uTime.value = REDUCED ? 2 : t;
    uni.uFlicker.value = REDUCED ? 1 : .96 + .04 * Math.sin(t * 2.3);   /* a slow breath, no flashes */

    if (!dragging) { rotOffset += rotVel; rotVel *= .94; }
    if (mode === 'image') {
      /* a flat image should never be seen edge-on, so it sways and springs back */
      rotOffset *= dragging ? 1 : .985;
      rotOffset = THREE.MathUtils.clamp(rotOffset, -1.1, 1.1);
      holo.rotation.y = (REDUCED ? 0 : Math.sin(t * .45) * .42) + rotOffset;
    } else {
      holo.rotation.y = 0;
      if (resetting) { goal.slerp(IDENT, .1); if (goal.angleTo(IDENT) < .002) { goal.identity(); resetting = false; } }
      else if (!dragging) {
        /* a throw coasts and dies away; after a pause the slow turn fades back in */
        const idle = REDUCED ? 0 : Math.min(1, Math.max(0, (now - idleAt - 1500) / 2000));
        turn(vel.x + .0035 * idle, vel.y);
        vel.multiplyScalar(.94);
      }
      spin.slerp(goal, REDUCED ? 1 : .11);
      if (fit) fit.pivot.quaternion.copy(spin);
    }
    holo.position.y = REDUCED ? 0 : Math.sin(t * 1.2) * .035;
    /* new content builds upward out of the projector */
    appear += (appearTo - appear) * (REDUCED ? 1 : appearTo ? .075 : .2);
    if (pending && appear < .04) { const p = pending; pending = null; p.build(); appear = 0; appearTo = 1; p.res(); }
    const a = appear * appear * (3 - 2 * appear);
    holo.scale.y = .02 + .98 * a;
    uni.uFlicker.value *= .35 + .65 * a;

    /* exploded view eases in and out */
    if (parts.length) {
      explode.e += (explode.target - explode.e) * (REDUCED ? 1 : .07);
      const k = explode.e * explode.e * (3 - 2 * explode.e);
      parts.forEach(p => p.m.position.copy(p.home).addScaledVector(p.dir, k));
      if (fit) {
        const sc = fit.sA + (fit.sE - fit.sA) * k;
        fit.pivot.scale.setScalar(sc);
        holoHeight = fit.h * sc;
        /* lowest point of the turned model; keep it above the projector */
        let low = Infinity;
        for (let i = 0; i < 8; i++) {
          tmp.copy(fit.cA[i]).lerp(fit.cE[i], k).applyQuaternion(spin);
          low = Math.min(low, tmp.y * sc);
        }
        const lift = Math.max(BASE_Y + FLOAT + holoHeight / 2, BASE_Y + .1 - low);
        fit.pivot.position.y += (lift - fit.pivot.position.y) * (REDUCED ? 1 : .15);
      }
    }

    /* the camera leans a touch toward the pointer */
    camBase.x += (pointer.x * .16 - camBase.x) * .03;
    camBase.y += (camHome.y - pointer.y * .08 - camBase.y) * .03;
    /* follow the model up, but not so far that the projector drops out of frame;
       zoomed in, look straight at the model instead */
    const centre = fit && mode === 'model' ? fit.pivot.position.y - .05 : BASE_Y + FLOAT + holoHeight * .45;
    const framed = fit && mode === 'model' ? Math.min(centre, BASE_Y + FLOAT + .72) : centre;
    zoom += (zoomGoal - zoom) * (REDUCED ? 1 : .12);
    const want = framed + (centre - framed) * Math.min(1, Math.max(0, zoom - 1));
    lookY += (want - lookY) * .05;
    tmp.set(0, lookY, 0);
    camera.position.copy(camBase).sub(tmp).divideScalar(zoom).add(tmp);
    camera.lookAt(tmp);

    composer.render();
  }
  function loop() {
    cancelAnimationFrame(raf);
    const step = now => { if (!visible || paused || document.hidden) return; frame(now); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) loop(); });

  const ready = opts.model ? showModel(opts.model, opts.type) : opts.image ? showImage(opts.image) : Promise.resolve();
  loop();

  return {
    ready,
    showImage, showModel,
    /* 0 = assembled, 1 = fully apart */
    setExplode(v) { explode.target = Math.max(0, Math.min(1, v)); },
    /* 1 = the whole rig in view; larger is closer */
    zoomBy(f) { zoomTo(zoomGoal * f); },
    resetZoom() { zoomTo(1); },
    get zoom() { return zoomGoal; },
    get partCount() { return parts.length; },
    get shellCount() { return shells; },
    /* stop drawing while something covers it */
    setPaused(v) { paused = !!v; if (!paused) loop(); },
    /* re-measure, e.g. after the layout changed what shiftX should be */
    resize,
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); clearHolo();
      removeEventListener('pointerdown', outside, true); removeEventListener('keydown', onKey);
      clearTimeout(hintT); hint.remove();
      scene.traverse(o => { o.geometry?.dispose(); [].concat(o.material || []).forEach(m => m.dispose()); });
      composer.dispose?.(); renderer.dispose(); renderer.forceContextLoss?.(); cvs.remove();
    }
  };
}
