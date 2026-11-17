/* ==========================================================================
   The parametric vase, rebuilt live from Mudit's Grasshopper definition
   (assets/rhino/a8-grasshopper-definition.jpg):

     Merge D1–D4 → four circles → Loft              the vase surface
     SDivide                                         a grid of points + normals
     attractor = (15·cos 2π3t, 15·sin 2π3t, 36·(1 − cos 2πt)/2)
     max(0, 1 − dist / radius) → Graph Mapper (S)   the falloff, 0–1
       → gradient                                    tile colour
       → Rad → RotAx                                 tile turns on its own axis
       → Amp → Move                                  tile lifts off the surface

   The four radii, the attractor path, `radius` and `t` are his values; the
   grid density, tile size and turn / lift amounts are matched by eye to his
   render. Hovering the vase pulls the attractor to the cursor.
   ========================================================================== */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const H = 36;                       // height: the attractor's own peak is 36
const COLS = 36, ROWS = 30;         // SDivide, counted from his render
/* his gradient: the GH spectrum, dark violet at rest through to red */
const RAMP = [[0, '#3a2363'], [.22, '#3d3fc8'], [.42, '#4f9dff'], [.58, '#3fdcb4'],
              [.72, '#c9e24a'], [.86, '#ffa533'], [1, '#ff4a1f']].map(([k, c]) => [k, new THREE.Color(c)]);
const ramp = (g, out) => {
  for (let i = 1; i < RAMP.length; i++) if (g <= RAMP[i][0]) {
    const [k0, c0] = RAMP[i - 1], [k1, c1] = RAMP[i];
    return out.copy(c0).lerp(c1, (g - k0) / (k1 - k0));
  }
  return out.copy(RAMP[RAMP.length - 1][1]);
};
/* Graph Mapper, an S-curve */
const sCurve = f => { const a = f * f * f; return a / (a + (1 - f) * (1 - f) * (1 - f) || 1); };

const SLIDERS = [
  { k: 't',      min: 0, max: 1,  step: .001, v: 1,  dp: 3, hint: 'Moves the attractor along its spiral' },
  { k: 'radius', min: 4, max: 30, step: .1,   v: 15, dp: 3, hint: 'How far the attractor reaches' },
  { k: 'D1', min: 4, max: 14, step: .1, v: 8,  dp: 3, hint: 'Base circle' },
  { k: 'D2', min: 4, max: 14, step: .1, v: 11, dp: 3, hint: 'Belly circle' },
  { k: 'D3', min: 4, max: 14, step: .1, v: 7,  dp: 3, hint: 'Neck circle' },
  { k: 'D4', min: 4, max: 14, step: .1, v: 9,  dp: 3, hint: 'Lip circle' }
];

export function mountVase(root) {
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const P = Object.fromEntries(SLIDERS.map(s => [s.k, s.v]));

  /* ------------------------------------------------------------ markup -- */
  root.innerHTML = `
    <div class="gh-view" data-cursor="drag">
      <span class="gh-vp">Perspective</span>
      <button class="gh-play" type="button" aria-pressed="${!REDUCED}">${REDUCED ? 'Play' : 'Pause'}</button>
      <p class="gh-tip">Hover the vase to pull the attractor · drag to turn it</p>
    </div>
    <div class="gh-canvas">
      <p class="gh-canvas-h">The definition’s sliders</p>
      ${SLIDERS.map(s => `
      <label class="gh-slider" title="${s.hint}">
        <span class="gh-k">${s.k}</span>
        <input type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.v}" data-k="${s.k}" aria-label="${s.k}: ${s.hint}">
        <output data-o="${s.k}">${s.v.toFixed(s.dp)}</output>
      </label>${s.k === 'radius' ? '<p class="gh-group">Merge — the four lofted circles</p>' : ''}`).join('')}
      <div class="gh-key">
        <p class="gh-group">Gradient — what the colour means</p>
        <i class="gh-ramp"></i>
        <span><em>far: tile sits flat</em><em>close: turned and lifted</em></span>
      </div>
      <button class="gh-reset" type="button">Reset to his values</button>
    </div>`;
  const view = root.querySelector('.gh-view');
  const playBtn = root.querySelector('.gh-play');

  /* ------------------------------------------------------------- scene -- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const cvs = renderer.domElement;
  view.prepend(cvs);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#a4a8ad');          // Rhino's viewport grey
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  scene.environment = envTex;
  scene.add(new THREE.HemisphereLight('#ffffff', '#5a5d62', .6));
  const key = new THREE.DirectionalLight('#ffffff', 1.6); key.position.set(-30, 50, 40); scene.add(key);

  const camera = new THREE.PerspectiveCamera(30, 1, 1, 500);
  const grid = new THREE.GridHelper(80, 16, '#8b8f94', '#979ba0'); scene.add(grid);

  const vase = new THREE.Group(); scene.add(vase);
  vase.position.y = 0;

  /* the black lofted surface under the tiles */
  /* kept matte: a glossy skin showed the key light as a bright streak through the gaps between tiles */
  const skinMat = new THREE.MeshStandardMaterial({ color: '#060606', roughness: .85, metalness: 0, envMapIntensity: .2, side: THREE.DoubleSide });
  let skin = new THREE.Mesh(new THREE.BufferGeometry(), skinMat); vase.add(skin);

  /* the tiles: one instanced box */
  const tileMat = new THREE.MeshStandardMaterial({ roughness: .5, metalness: 0, envMapIntensity: .3 });
  const tiles = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), tileMat, COLS * ROWS);
  tiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  tiles.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(COLS * ROWS * 3), 3);
  vase.add(tiles);

  /* the attractor and its spiral */
  const dot = new THREE.Mesh(new THREE.SphereGeometry(.8, 24, 16), new THREE.MeshBasicMaterial({ color: '#ff5a1f' }));
  vase.add(dot);
  const pathPts = Array.from({ length: 241 }, (_, i) => attractorAt(i / 240));
  const path = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathPts),
    new THREE.LineDashedMaterial({ color: '#ff5a1f', dashSize: .8, gapSize: .7, transparent: true, opacity: .55 }));
  path.computeLineDistances(); vase.add(path);

  function attractorAt(t) {
    /* his Pt: x = 15cos(2π·3t), y = 15sin(2π·3t), z = 36(1 − cos 2πt)/2 — Z up in Rhino, Y up here */
    return new THREE.Vector3(15 * Math.cos(2 * Math.PI * 3 * t), H * (1 - Math.cos(2 * Math.PI * t)) / 2, -15 * Math.sin(2 * Math.PI * 3 * t));
  }

  /* --------------------------------------------------------- the grid -- */
  /* profile: a smooth curve through the four circles, as Loft makes it */
  let rows = [];                     // per row: { r, y, dr, dy, len }
  function buildSurface() {
    const curve = new THREE.CatmullRomCurve3([P.D1, P.D2, P.D3, P.D4].map((r, i) => new THREE.Vector3(r, H * i / 3, 0)), false, 'centripetal');
    const prof = curve.getSpacedPoints(120);
    skin.geometry.dispose();
    skin.geometry = new THREE.LatheGeometry(prof.map(p => new THREE.Vector2(p.x * .985, p.y)), 96);
    rows = Array.from({ length: ROWS }, (_, j) => {
      const s = (j + .5) / ROWS;
      const p = curve.getPointAt(s), d = curve.getTangentAt(s);
      return { r: p.x, y: p.y, dr: d.x, dy: d.y, len: curve.getLength() / ROWS };
    });
  }

  const m4 = new THREE.Matrix4(), rot = new THREE.Matrix4(), sc = new THREE.Matrix4();
  const T = new THREE.Vector3(), V = new THREE.Vector3(), N = new THREE.Vector3(), Q = new THREE.Vector3();
  const col = new THREE.Color();
  const att = new THREE.Vector3();
  function layTiles() {
    let n = 0;
    for (let j = 0; j < ROWS; j++) {
      const { r, y, dr, dy, len } = rows[j];
      const w = 2 * Math.PI * r / COLS * .8, h = len * .78, d = .9;
      for (let i = 0; i < COLS; i++, n++) {
        const a = i / COLS * Math.PI * 2;
        const c = Math.cos(a), s = Math.sin(a);
        T.set(-s, 0, -c);                                        // around
        V.set(dr * c, dy, -dr * s).normalize();                  // up the surface
        N.crossVectors(V, T).normalize();                        // out
        if (N.x * c - N.z * s < 0) N.negate();
        Q.set(r * c, y, -r * s);
        /* the falloff, through the S-curve */
        const f = Math.max(0, 1 - Q.distanceTo(att) / P.radius);
        const g = sCurve(Math.min(1, f / .62));             // his mapper is steep: most of the turn happens close in
        /* Rad → RotAx: the tile turns about its own vertical; Amp → Move: it lifts */
        m4.makeBasis(T, V, N).multiply(rot.makeRotationY(g * Math.PI * .5)).multiply(sc.makeScale(w, h, d));
        m4.setPosition(Q.addScaledVector(N, d * .5 + g * 2.6));
        tiles.setMatrixAt(n, m4);
        tiles.setColorAt(n, ramp(g * .62, col));         // the spiral peaks around green, as in his render; the cursor on the surface goes further
      }
    }
    tiles.instanceMatrix.needsUpdate = true;
    tiles.instanceColor.needsUpdate = true;
    dot.position.copy(att);
  }

  /* ------------------------------------------------------------ inputs -- */
  const inputs = [...root.querySelectorAll('input[data-k]')];
  const outs = Object.fromEntries([...root.querySelectorAll('output[data-o]')].map(o => [o.dataset.o, o]));
  const setVal = (k, v) => {
    P[k] = v;
    const s = SLIDERS.find(x => x.k === k);
    outs[k].textContent = v.toFixed(s.dp);
    const el = inputs.find(x => x.dataset.k === k);
    if (+el.value !== v) el.value = v;
    el.style.setProperty('--p', ((v - s.min) / (s.max - s.min) * 100).toFixed(2) + '%');
  };
  SLIDERS.forEach(s => setVal(s.k, s.v));
  let playing = !REDUCED, dirty = true, surfDirty = true;
  inputs.forEach(el => el.addEventListener('input', () => {
    const k = el.dataset.k;
    setVal(k, +el.value);
    if (k === 't') setPlaying(false);
    if (k.startsWith('D')) surfDirty = true;
    dirty = true; kick();
  }));
  function setPlaying(v) {
    playing = v; playBtn.setAttribute('aria-pressed', String(v)); playBtn.textContent = v ? 'Pause' : 'Play';
    if (v) kick();
  }
  playBtn.addEventListener('click', () => setPlaying(!playing));
  root.querySelector('.gh-reset').addEventListener('click', () => {
    SLIDERS.forEach(s => setVal(s.k, s.v)); surfDirty = dirty = true; yaw = YAW0; kick();
  });

  /* hover pulls the attractor to the cursor (mouse only); drag turns the vase */
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const YAW0 = -1.85;                    // his t = 1 patch turned toward the camera, as in his render
  let hoverPt = null, yaw = YAW0, drag = null;
  cvs.addEventListener('pointermove', e => {
    if (drag) { yaw = drag.yaw + (e.clientX - drag.x) * .008; dirty = true; kick(); return; }
    if (e.pointerType !== 'mouse') return;
    const b = cvs.getBoundingClientRect();
    ndc.set((e.clientX - b.left) / b.width * 2 - 1, -(e.clientY - b.top) / b.height * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(skin, false)[0];
    if (hit) {
      hoverPt = vase.worldToLocal(hit.point.clone());
      hoverPt.addScaledVector(hoverPt.clone().setY(0).normalize(), 1.5);
      cvs.style.cursor = 'crosshair';
    } else { hoverPt = null; cvs.style.cursor = 'grab'; }
    kick();
  });
  cvs.addEventListener('pointerleave', () => { hoverPt = null; kick(); });
  cvs.addEventListener('pointerdown', e => {
    drag = { x: e.clientX, yaw }; cvs.setPointerCapture(e.pointerId); cvs.style.cursor = 'grabbing';
  });
  const endDrag = () => { drag = null; cvs.style.cursor = ''; };
  cvs.addEventListener('pointerup', endDrag);
  cvs.addEventListener('pointercancel', endDrag);

  /* ------------------------------------------------------------- frame -- */
  function size() {
    const w = view.clientWidth, h = view.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    /* fit the vase's height, a little more on a narrow frame */
    const fitH = 58, dist = fitH / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / Math.min(1, camera.aspect / .8);
    camera.position.set(0, H * .5 + dist * .26, dist);
    camera.lookAt(0, H * .47, 0);
    camera.updateProjectionMatrix();
    dirty = true; kick();
  }
  const ro = new ResizeObserver(size); ro.observe(view);
  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); });
  io.observe(view);

  let raf = 0, last = performance.now();
  function kick() { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(loop); } }
  function loop(now) {
    raf = 0;
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (playing && !hoverPt) { setVal('t', (P.t + dt / 14) % 1); dirty = true; }
    /* the attractor eases toward the cursor, or back to its spiral */
    const goal = hoverPt || attractorAt(P.t);
    const k = hoverPt ? 1 - Math.pow(.0005, dt) : (playing ? 1 : 1 - Math.pow(.002, dt));
    const moving = att.distanceToSquared(goal) > 1e-4;
    if (moving) { att.lerp(goal, REDUCED ? 1 : k); dirty = true; }
    if (surfDirty) { buildSurface(); surfDirty = false; dirty = true; }
    vase.rotation.y = yaw;
    if (dirty) { layTiles(); renderer.render(scene, camera); dirty = false; }
    if (visible && (playing || moving || drag)) raf = requestAnimationFrame(loop);
  }
  att.copy(attractorAt(P.t));
  size(); kick();

  return {
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      scene.traverse(o => { o.geometry?.dispose(); [].concat(o.material || []).forEach(m => m.dispose()); });
      envTex.dispose(); pmrem.dispose(); renderer.dispose(); renderer.forceContextLoss?.();
      root.innerHTML = '';
    }
  };
}
