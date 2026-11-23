/* ==========================================================================
   VIEWER — a product model on a quiet studio floor, rendered with three.js.

   mountViewer(el, { model, scale })  shows a .glb (or .stl) in its own
   colours, softly lit, with a contact shadow under it. The background is
   transparent, so the page colour shows through.

   Drag turns it any way; pinch, ctrl+wheel or zoomBy() zoom, and once the
   model has been clicked a plain wheel zooms too (until a click outside it,
   Esc, or scrolling down at normal size). Double-click resets.
   The page can also drive it: setPose(yaw, tilt) sets the way it faces
   (a turn round the vertical, then tipped toward the viewer), setExplode
   (0…1) pulls the parts apart, straighten() undoes the visitor's own turning.
   It pauses off screen.
   ========================================================================== */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function mountViewer(el, opts = {}) {
  /* ---------------------------------------------------------------- setup */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const cvs = renderer.domElement;
  cvs.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  el.appendChild(cvs);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), .04).texture;
  scene.environmentIntensity = .9;
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, .5); rim.position.set(-4, 2, -3); scene.add(rim);

  const camera = new THREE.PerspectiveCamera(28, 1, .05, 100);
  const FOV_FIT = 4.6;                       /* distance that frames a unit-radius model, with air round it */
  const look = new THREE.Vector3();

  /* contact shadow: a soft dark ellipse on the floor, drawn once */
  const shadowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d'), r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    r.addColorStop(0, 'rgba(0,0,0,.5)'); r.addColorStop(.35, 'rgba(0,0,0,.28)'); r.addColorStop(.7, 'rgba(0,0,0,.08)'); r.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, toneMapped: false }));
  shadow.rotation.x = -Math.PI / 2; shadow.renderOrder = -1;
  scene.add(shadow);

  /* ---------------------------------------------------------- orientation */
  /* a drag moves the goal; the model eases after it, so it never jerks */
  const spin = new THREE.Quaternion(), goal = new THREE.Quaternion(), dq = new THREE.Quaternion();
  const yawQ = new THREE.Quaternion(), vel = new THREE.Vector2(), tmp = new THREE.Vector3();
  const AX_Y = new THREE.Vector3(0, 1, 0), AX_X = new THREE.Vector3(1, 0, 0), IDENT = new THREE.Quaternion();
  /* a turntable, like a product on a stand: the drag spins it round its upright and tips it
     toward or away from you, within a range, so it never ends up on its head */
  let yaw = 0, pitch = 0;
  const PMAX = 1.05;                                    /* about 60 degrees either way */
  const turn = (ax, ay) => { yaw += ax; pitch = Math.max(-PMAX, Math.min(PMAX, pitch + ay)); goal.setFromAxisAngle(AX_X, pitch).multiply(dq.setFromAxisAngle(AX_Y, yaw)); };
  const SENS = .0042, MAXV = .045;
  /* the way the page wants it to face; the model eases into it */
  const poseQ = new THREE.Quaternion(), poseNow = new THREE.Quaternion(), tiltQ = new THREE.Quaternion();

  /* ---------------------------------------------------------------- model */
  let fit = null, parts = [], loadId = 0, appear = 0, shellMats = [], guide = null, styleNow = '';
  const explode = { e: 0, target: 0 };

  const clear = () => {
    if (!fit) return;
    scene.remove(fit.pivot);
    fit.pivot.traverse(o => { o.geometry?.dispose(); [].concat(o.material || []).forEach(m => m.dispose()); });
    fit = null; parts = []; guide = null;
  };

  /* CAD colours, kept; a soft satin finish so the form reads */
  const surface = (src, i) => {
    const c = src?.color ? src.color.clone() : new THREE.Color(0xc9c5bc);
    /* Rhino's default black disappears on a dark page: lift it to a
       charcoal that still reads as black, with a little more sheen */
    const dark = c.r + c.g + c.b < .3;
    if (dark) c.lerp(new THREE.Color(0x2b2b2f), .85);
    if (dark) return new THREE.MeshStandardMaterial({ color: c, roughness: .32, metalness: .15, side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 + (i % 24) * 2 });
    return new THREE.MeshStandardMaterial({
      color: c, roughness: Math.min(.7, Math.max(.3, src?.roughness ?? .45)), metalness: Math.min(.4, src?.metalness ?? .05),
      side: THREE.DoubleSide,
      /* faces lying exactly on top of each other: a different depth nudge
         per part settles which one shows, instead of flickering */
      polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 + (i % 24) * 2 });
  };

  /* Each model can name how it comes apart, chosen from how it is built
     (set with ?x=style on the model's file in data.js):
       tower   stacked modules separate up the height; what sits inside a
               module slides out toward the viewer
       layers  a flat product lifts apart in layers, straight up
       tiers   a hanging or standing light: each level rises, rings open out
       column  every part in one vertical line, in assembly order
       slide   parts separate along the length, as they slide together
     With no style it picks: layers for flat products, tower otherwise.
     Small pieces always travel with the part they belong to, so the view
     stays clean. */
  function planExplode(meshes, box, style) {
    const size = box.getSize(new THREE.Vector3()), C = box.getCenter(new THREE.Vector3());
    const R = size.length() / 2, H = Math.max(size.y, 1e-6);
    const vol = b => { const s = b.getSize(new THREE.Vector3()); return Math.max(s.x, 1e-6) * Math.max(s.y, 1e-6) * Math.max(s.z, 1e-6); };
    const total = vol(box);
    const info = meshes.map(m => {
      const b = new THREE.Box3().setFromObject(m);
      return { m, b, c: b.getCenter(new THREE.Vector3()), s: b.getSize(new THREE.Vector3()), v: vol(b), home: m.position.clone(), off: new THREE.Vector3() };
    });
    const flat = size.y < .35 * Math.max(size.x, size.z);
    style = style || (flat ? 'layers' : 'tower');

    /* main parts vs small ones, and which main part each small one rides with */
    const byVol = [...info].sort((a, b) => b.v - a.v);
    const bigCut = Math.min(total * .01, byVol[Math.min(5, byVol.length - 1)].v);
    info.forEach(p => { p.big = p.v >= bigCut; });
    const big = info.filter(p => p.big), small = info.filter(p => !p.big);
    const hostOf = p => {
      let host = null, bestV = 0;
      big.forEach(q => {
        const i = q.b.clone().expandByScalar(R * .01).intersect(p.b);
        const v = i.isEmpty() ? 0 : vol(i);
        if (v > bestV) { bestV = v; host = q; }
      });
      return host || big.reduce((a, q) => (q.c.distanceTo(p.c) < a.c.distanceTo(p.c) ? q : a), big[0]);
    };
    const ride = () => small.forEach(p => { p.host = hostOf(p); p.off.copy(p.host.off); });

    /* stack groups one after another along an axis, each clear of the last, centred */
    const stack = (groups, axis, gap) => {
      let reach = -Infinity, sh = 0;
      groups.forEach(g => {
        sh = Math.max(sh, reach + gap - g.b.min[axis]);
        g.sh = sh; reach = Math.max(reach, g.b.max[axis] + sh);
      });
      const mid = groups.length ? (groups[0].sh + groups[groups.length - 1].sh) / 2 : 0;
      groups.forEach(g => { g.sh -= mid; });
    };
    const group = (list, axis, bin) => {
      const m = new Map();
      list.forEach(p => {
        const k = Math.round(p.c[axis] / bin);
        if (!m.has(k)) m.set(k, { k, b: new THREE.Box3(), list: [] });
        const g = m.get(k); g.b.union(p.b); g.list.push(p);
      });
      return [...m.values()].sort((a, b) => a.k - b.k);
    };

    if (style === 'layers') {
      const levels = group(info, 'y', H / 12);
      stack(levels, 'y', Math.max(H * .7, R * .2));
      levels.forEach(L => L.list.forEach(p => p.off.set(0, L.sh, 0)));
      big.forEach(p => { p.guide = true; });
    } else if (style === 'tiers') {
      const levels = group(big, 'y', H / 8);
      stack(levels, 'y', H * .14);
      levels.forEach(L => L.list.forEach(p => {
        const out = new THREE.Vector3(p.c.x - C.x, 0, p.c.z - C.z);
        p.off.set(0, L.sh, 0).addScaledVector(out, .45);       /* rings open outward */
      }));
      ride();
      levels.forEach(L => { L.list[0].guide = true; });
    } else if (style === 'column' || style === 'slide') {
      const axis = style === 'column' ? 'y' : (size.x >= size.z ? 'x' : 'z');
      const order = [...big].sort((a, b) => a.b.min[axis] - b.b.min[axis] || a.c[axis] - b.c[axis]);
      const groups = order.map(p => ({ b: p.b, list: [p] }));
      stack(groups, axis, size[axis] * .26);
      groups.forEach(g => { g.list[0].off[axis] = g.sh; g.list[0].guide = true; });
      ride();
    } else {                                                    /* tower */
      const holds = (a, b) => a.b.clone().expandByVector(a.s.clone().multiplyScalar(.03).addScalar(1e-6)).containsBox(b.b);
      big.forEach(p => {
        let best = null;
        big.forEach(q => { if (q !== p && q.v > p.v * 1.05 && holds(q, p) && (!best || q.v < best.v)) best = q; });
        p.parent = best;
      });
      const top = big.filter(p => !p.parent).sort((a, b) => a.c.y - b.c.y || a.b.min.y - b.b.min.y);
      const groups = top.map(p => ({ b: p.b, list: [p] }));
      stack(groups, 'y', H * .1);
      groups.forEach(g => { g.list[0].off.set(0, g.sh, 0); g.list[0].guide = true; });
      /* what sits inside a module slides out toward the viewer, deeper parts further */
      const depth = p => p.parent ? 1 + depth(p.parent) : 0;
      const nested = big.filter(p => p.parent).sort((a, b) => depth(a) - depth(b) || a.c.y - b.c.y);
      const lanes = new Map();
      nested.forEach(p => {
        const host = p.parent;
        const lane = lanes.get(host) || []; lanes.set(host, lane);
        let dz = host.b.max.z - p.b.min.z + H * .06;
        const at = () => p.b.clone().translate(host.off.clone().add(new THREE.Vector3(0, 0, dz)));
        for (let n = 0; n < 12 && lane.some(o => o.intersectsBox(at())); n++) dz += p.s.z + H * .04;
        p.off.copy(host.off).add(new THREE.Vector3(0, 0, dz));
        lane.push(at()); p.guide = true;
      });
      ride();
    }

    /* the travel above is in world space; a part moves in its parent's */
    info.forEach(p => {
      p.dir = p.off.clone(); p.dirW = p.off.clone();
      const inv = new THREE.Matrix4().copy(p.m.parent.matrixWorld).invert();
      p.dir.applyMatrix3(new THREE.Matrix3().setFromMatrix4(inv));
    });
    return info;
  }

  /* faint dashed lines from where each main part sits to where it goes,
     like the guide lines on an exploded drawing */
  function guideLines(object, list) {
    const pts = [];
    list.filter(p => p.guide && p.dirW.lengthSq() > 1e-9).forEach(p => {
      pts.push(p.c.clone(), p.c.clone().add(p.dirW));
    });
    if (!pts.length) return null;
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.LineSegments(g, new THREE.LineDashedMaterial({ color: 0x9a9890, dashSize: R0(list) * .03, gapSize: R0(list) * .025, transparent: true, opacity: 0, depthWrite: false }));
    line.computeLineDistances(); line.renderOrder = 3;
    object.add(line);
    return line;
  }
  const R0 = list => { const b = new THREE.Box3(); list.forEach(p => b.union(p.b)); return b.getSize(new THREE.Vector3()).length() / 2; };

  /* Curves in the CAD file (the rings drawn on a cooktop) arrive as thin
     lines; they become slim tubes in their own colour, fixed to the part
     they lie on, so they stay put on it when the model comes apart. */
  function drawCurves(object, meshes) {
    const lines = []; object.traverse(o => { if (o.isLine) lines.push(o); });
    if (!lines.length) return;
    const all = new THREE.Box3(); meshes.forEach(m => all.expandByObject(m));
    const r = all.getSize(new THREE.Vector3()).length() * .0016;
    const boxes = meshes.map(m => new THREE.Box3().setFromObject(m));
    lines.forEach(l => {
      const pos = l.geometry.attributes.position, pts = [];
      for (let k = 0; k < pos.count; k++) pts.push(new THREE.Vector3().fromBufferAttribute(pos, k).applyMatrix4(l.matrixWorld));
      const c = l.material?.color ? l.material.color.clone() : new THREE.Color(0xff3b30);
      l.removeFromParent(); l.geometry.dispose(); l.material.dispose?.();
      if (pts.length < 2) return;
      const closed = pts[0].distanceTo(pts[pts.length - 1]) < r * 2;
      if (closed) pts.pop();
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, closed), Math.min(600, pts.length * 3), r, 6, closed),
        new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: .35, roughness: .4 }));
      tube.position.y += r;                                    /* sits on the surface, not in it */
      /* the part it lies on: the smallest one whose box holds it */
      let host = null, best = Infinity;
      boxes.forEach((b, i) => {
        const e = b.clone().expandByScalar(r * 4);
        if (!e.containsBox(new THREE.Box3().setFromPoints(pts))) return;
        const v = b.getSize(new THREE.Vector3()); const vol = (v.x + 1e-6) * (v.y + 1e-6) * (v.z + 1e-6);
        if (vol < best) { best = vol; host = meshes[i]; }
      });
      (host || object).attach(tube);
    });
  }

  function show(object) {
    clear();
    object.updateMatrixWorld(true);
    const meshes = []; object.traverse(o => { if (o.isMesh) meshes.push(o); });
    /* zero-area triangles in CAD exports carry NaN or zero normals */
    meshes.forEach((o, i) => {
      const n = o.geometry?.attributes?.normal;
      if (n) {
        for (let k = 0; k < n.count; k++) {
          const x = n.getX(k), y = n.getY(k), z = n.getZ(k);
          if (!Number.isFinite(x + y + z) || x * x + y * y + z * z < 1e-12) n.setXYZ(k, 0, 1, 0);
        }
        n.needsUpdate = true;
      }
      const src = Array.isArray(o.material) ? o.material[0] : o.material;
      o.material = surface(src, i); src?.dispose?.();
    });
    drawCurves(object, meshes);
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3()), centre = box.getCenter(new THREE.Vector3());
    parts = planExplode(meshes, box, styleNow);
    guide = guideLines(object, parts);
    /* a part that encloses others (a housing) turns see-through as the model
       comes apart, so everything inside it shows */
    const boxes = meshes.map(m => new THREE.Box3().setFromObject(m));
    shellMats = [];
    const apart = parts.map(p => new THREE.Box3().setFromObject(p.m).translate(p.dirW));
    boxes.forEach((b, i) => {
      /* only while a main part still sits inside it once apart */
      const inside = apart.filter((o, j) => j !== i && parts[j].big && apart[i].containsBox(o)).length;
      if (parts[i].big && inside >= 1) {
        const m = meshes[i].material; m.transparent = true; shellMats.push(m); meshes[i].renderOrder = 2;
      }
    });
    /* how far it reaches when fully apart, so it can shrink to fit */
    const outer = box.clone();
    parts.forEach(p => outer.union(new THREE.Box3().setFromObject(p.m).translate(p.dirW)));
    const rA = size.length() / 2, rE = outer.getSize(new THREE.Vector3()).length() / 2;
    const pivot = new THREE.Group();
    object.position.sub(centre); pivot.add(object);
    const s = 1 / rA;                                     /* assembled: unit radius */
    fit = { pivot, sA: s * (opts.scale || 1), sE: s * Math.min(1, rA / rE * 1.15) * (opts.scale || 1), r: rA * s };
    pivot.scale.setScalar(fit.sA);
    scene.add(pivot);
    appear = 0;
  }

  function showModel(url, type) {
    const ext = (type || url.split('?')[0].split('.').pop() || '').toLowerCase();
    styleNow = (/[?&]x=([a-z]+)/.exec(url) || [])[1] || '';
    const id = ++loadId;
    return new Promise((res, rej) => {
      const done = obj => { if (id === loadId) show(obj); res(); };
      if (ext === 'stl') new STLLoader().load(url, geo => {
        geo.computeVertexNormals();
        const mesh = new THREE.Mesh(geo); mesh.rotation.x = -Math.PI / 2;      /* CAD is usually Z-up */
        const wrap = new THREE.Group(); wrap.add(mesh); done(wrap);
      }, undefined, rej);
      else new GLTFLoader().load(url, g => done(g.scene), undefined, rej);
    });
  }

  /* ----------------------------------------------------------- interaction */
  let dragging = false, lastX = 0, lastY = 0, resetting = false, idleAt = 0;
  const ZMIN = .7, ZMAX = 3.2;
  let zoom = 1, zoomGoal = 1;
  /* zooming keeps whatever is under the cursor (or between the fingers)
     where it is: `pan` slides the picture, in canvas pixels, to hold it */
  const pan = { x: 0, y: 0 }, panGoal = { x: 0, y: 0 };
  const zoomTo = (z, cx, cy) => {
    const from = zoomGoal;
    zoomGoal = Math.max(ZMIN, Math.min(ZMAX, z));
    if (zoomGoal <= 1.001) { panGoal.x = panGoal.y = 0; return; }
    if (cx === undefined) return;
    const r = zoomGoal / from, w = frameOff.w, h = frameOff.h;
    /* where the model's centre sits on screen now, and where it must go */
    const lx = w / 2 - frameOff.x - panGoal.x, ly = h / 2 - frameOff.y - panGoal.y;
    const nx = cx - (cx - lx) * r, ny = cy - (cy - ly) * r;
    const lim = .6 * zoomGoal;                             /* never lose the model off screen */
    panGoal.x = Math.max(-w * lim, Math.min(w * lim, w / 2 - frameOff.x - nx));
    panGoal.y = Math.max(-h * lim, Math.min(h * lim, h / 2 - frameOff.y - ny));
  };
  const local = (x, y) => { const b = cvs.getBoundingClientRect(); return [(x - b.left) * frameOff.w / b.width, (y - b.top) * frameOff.h / b.height]; };
  const touches = new Map();
  let pinchFrom = 0, pinchZoom = 1;
  const spread = () => { const [a, b] = [...touches.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };

  /* a plain wheel scrolls the page until the model is clicked */
  let engaged = false, hintT = 0, toldClick = false;
  const FINE_HINT = 'Swipe or drag to turn · pinch or scroll to zoom';
  const hint = document.createElement('div');
  hint.className = 'viewer-hint';
  el.appendChild(hint);
  const say = text => {
    hint.textContent = text; hint.classList.add('on');
    clearTimeout(hintT); hintT = setTimeout(() => hint.classList.remove('on'), 1600);
  };
  const engage = on => { if (engaged !== on) { engaged = on; if (on) say(FINE_HINT); } };
  const outside = e => { if (!(el.parentElement || el).contains(e.target)) engage(false); };
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
  /* A trackpad's two-finger swipe and a mouse wheel both arrive as wheel
     events. A trackpad sends small, smooth steps (often sideways too); a
     wheel sends whole notches. Once the model has been clicked, a swipe
     turns it any way and a pinch (ctrl+wheel) zooms; a wheel zooms. */
  let padSeen = false;
  const isPad = e => {
    if (e.deltaMode !== 0) return false;
    if (e.deltaX !== 0) return true;
    if (e.wheelDeltaY !== undefined && e.wheelDeltaY === -e.deltaY * 3) return true;   /* Chrome / Safari trackpads */
    return Math.abs(e.deltaY) < 40 && !Number.isInteger(e.deltaY * 1);
  };
  cvs.addEventListener('wheel', e => {
    const pinch = e.ctrlKey || e.metaKey, pad = !pinch && isPad(e);
    if (pad) padSeen = true;
    if (!pinch && !engaged) {
      if (!toldClick) { toldClick = true; say(padSeen || pad ? 'Click the model, then swipe to turn it' : 'Click the model to zoom with scroll'); }
      return;
    }
    e.preventDefault(); e.stopPropagation();                /* the page's smooth scroll stays out of it */
    if (pad) {
      resetting = false; idleAt = performance.now();
      turn(-e.deltaX * SENS * .9, -e.deltaY * SENS * .7);
      return;
    }
    /* a mouse wheel zooms; scrolling down at normal size hands it back to the page */
    if (!pinch && e.deltaY > 0 && zoomGoal <= 1.001) { engage(false); return; }
    zoomTo(zoomGoal * Math.exp(-e.deltaY * (pinch ? .02 : .01)), ...local(e.clientX, e.clientY));
  }, { passive: false });
  const move = e => {
    if (touches.has(e.pointerId)) {
      touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (touches.size === 2) {
        if (pinchFrom > 0) {
          const [a, b] = [...touches.values()];
          zoomTo(pinchZoom * spread() / pinchFrom, ...local((a.x + b.x) / 2, (a.y + b.y) / 2));
          pinchZoom = zoomGoal; pinchFrom = spread();
        }
        return;
      }
    }
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
    turn(dx * SENS, dy * SENS * .8);
    vel.lerp(new THREE.Vector2(dx * SENS, dy * SENS * .8), .35);
  };
  const up = e => {
    touches.delete(e.pointerId);
    if (!dragging) return;
    dragging = false; cvs.style.cursor = 'grab'; idleAt = performance.now();
    vel.clampLength(0, MAXV);
  };
  addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up);

  /* ---------------------------------------------------------- phone tilt */
  /* On a phone, tilting it walks you round the model, on top of any drag.
     The first touch asks for motion access (iOS needs a tap for that);
     wherever the phone is held then becomes "straight on", and that rest
     position drifts slowly so a new grip never leaves the model stuck askew. */
  const coarse = matchMedia('(hover: none) and (pointer: coarse)').matches;
  const tiltNow = new THREE.Quaternion(), tiltEuler = new THREE.Euler();
  let tiltOn = false, tiltAsked = false, rest = null, tx = 0, ty = 0;
  const TMAX = .6;                                     /* about 35 degrees either way */
  const onTilt = e => {
    if (e.beta == null || e.gamma == null) return;
    if (!rest) rest = { b: e.beta, g: e.gamma };
    rest.b += (e.beta - rest.b) * .004; rest.g += (e.gamma - rest.g) * .004;
    ty = Math.max(-TMAX, Math.min(TMAX, (e.gamma - rest.g) * Math.PI / 180 * 1.3));
    tx = Math.max(-TMAX, Math.min(TMAX, (e.beta - rest.b) * Math.PI / 180 * .9));
  };
  const startTilt = () => {
    if (tiltAsked || !coarse || REDUCED || typeof DeviceOrientationEvent === 'undefined') return;
    tiltAsked = true;
    const go = () => { tiltOn = true; addEventListener('deviceorientation', onTilt); say('Tilt your phone to look around it'); };
    if (typeof DeviceOrientationEvent.requestPermission === 'function')
      DeviceOrientationEvent.requestPermission().then(r => { if (r === 'granted') go(); }).catch(() => {});
    else go();
  };
  cvs.addEventListener('touchend', startTilt, { passive: true });

  /* -------------------------------------------------------------- lifecycle */
  let dist = FOV_FIT, frameOff = { x: 0, y: 0, w: 1, h: 1 }, centred = null;
  /* opts.frame() → { x, y, w, h }, the share of the canvas the model is
     framed in (the canvas itself can be bigger, so a zoomed-in model runs
     on past that area instead of being cut at its edge) */
  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight || w * .75;
    const f = Object.assign({ x: 0, y: 0, w: 1, h: 1 }, typeof opts.frame === 'function' ? opts.frame() : opts.frame);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    frameOff = { x: -(f.x + f.w / 2 - .5) * w, y: -(f.y + f.h / 2 - .5) * h, w, h };
    /* narrow frames step back so the model still fits across */
    dist = FOV_FIT * Math.max(1, 1.1 / (f.w * w / (f.h * h))) / f.h;
    centred = null;
  };
  const ro = new ResizeObserver(resize); ro.observe(el); resize();

  let visible = true, paused = false, raf = 0;
  const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) loop(); }, { threshold: 0 });
  io.observe(el);

  function frame(now) {
    if (resetting) {
      const home = Math.round(yaw / (Math.PI * 2)) * Math.PI * 2;
      yaw += (home - yaw) * .1; pitch *= .9; turn(0, 0);
      if (Math.abs(home - yaw) < .002 && Math.abs(pitch) < .002) { yaw = 0; pitch = 0; turn(0, 0); resetting = false; }
    }
    else if (!dragging) {
      /* a throw coasts and dies away; after a pause a slow turn fades back in,
         unless the page is turning it */
      const idle = REDUCED || opts.autoTurn === false ? 0 : Math.min(1, Math.max(0, (now - idleAt - 1200) / 900));
      turn(vel.x + .0068 * idle, vel.y);
      vel.multiplyScalar(.95);
    }
    spin.slerp(goal, REDUCED ? 1 : .11);
    poseNow.slerp(poseQ, REDUCED ? 1 : .055);
    if (tiltOn) tiltNow.slerp(tiltQ.setFromEuler(tiltEuler.set(tx, ty, 0)), visible ? .12 : 1);
    zoom += (zoomGoal - zoom) * (REDUCED ? 1 : .12);
    pan.x += (panGoal.x - pan.x) * (REDUCED ? 1 : .12);
    pan.y += (panGoal.y - pan.y) * (REDUCED ? 1 : .12);

    if (fit) {
      appear += (1 - appear) * (REDUCED ? 1 : .06);
      explode.e += (explode.target - explode.e) * (REDUCED ? 1 : .08);
      const k = explode.e * explode.e * (3 - 2 * explode.e);
      parts.forEach(p => p.m.position.copy(p.home).addScaledVector(p.dir, k));
      shellMats.forEach(m => { m.opacity = 1 - .75 * k; m.depthWrite = k < .05; });
      if (guide) guide.material.opacity = .5 * k * k;
      const a = appear * appear * (3 - 2 * appear);
      const sc = (fit.sA + (fit.sE - fit.sA) * k) * (.92 + .08 * a);
      fit.pivot.scale.setScalar(sc);
      /* the visitor's turning is applied last, in screen terms, so a drag
         always turns the model the way the hand moves, whatever the pose */
      fit.pivot.quaternion.copy(tiltNow).multiply(spin).multiply(poseNow);
      fit.pivot.position.y = (1 - a) * -.12;
      fit.pivot.visible = appear > .01;

      /* the floor sits under the lowest point, the shadow fades as parts lift */
      fit.pivot.updateMatrixWorld(true);
      const b = new THREE.Box3().setFromObject(fit.pivot);
      const floor = b.min.y - .02;
      shadow.position.y = floor;
      const fw = Math.max(b.max.x - b.min.x, .3) * 1.25, fd = Math.max(b.max.z - b.min.z, .3) * 1.25;
      shadow.scale.set(fw, fd, 1);
      shadow.material.opacity = a * (1 - .5 * k);
      look.set(0, 0, 0);
    }

    /* the model sits in its frame, slid by the zoom's pan */
    const ox = frameOff.x + pan.x, oy = frameOff.y + pan.y;
    if (!centred || Math.abs(ox - centred.x) > .01 || Math.abs(oy - centred.y) > .01) {
      centred = { x: ox, y: oy };
      camera.setViewOffset(frameOff.w, frameOff.h, ox, oy, frameOff.w, frameOff.h);
    }
    /* the camera sits a little above, looking slightly down */
    const d = dist / zoom;
    camera.position.set(look.x, look.y + d * .26, look.z + d);
    camera.lookAt(look);
    renderer.render(scene, camera);
  }
  function loop() {
    cancelAnimationFrame(raf);
    const step = now => { if (!visible || paused || document.hidden) return; frame(now); raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) loop(); });

  const ready = opts.model ? showModel(opts.model, opts.type) : Promise.resolve();
  loop();

  return {
    ready, showModel, resize,
    /* 0 = assembled, 1 = fully apart */
    setExplode(v) { explode.target = Math.max(0, Math.min(1, v)); },
    get explode() { return explode.target; },
    /* a turn round the vertical the page adds on top of the user's own */
    setPose(yaw, tilt = 0) {
      poseQ.setFromAxisAngle(AX_X, tilt).multiply(yawQ.setFromAxisAngle(AX_Y, yaw));
    },
    /* a small dip and rise, to mark a change of step */
    pulse() { appear = Math.min(appear, .55); },
    /* undo the visitor's own turning, so the page's pose shows as meant */
    straighten() { if (!dragging) { resetting = true; vel.set(0, 0); } },
    zoomBy(f) { zoomTo(zoomGoal * f); },
    resetZoom() { zoomTo(1); },
    get zoom() { return zoomGoal; },
    get partCount() { return parts.length; },
    setPaused(v) { paused = !!v; if (!paused) loop(); },
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); clear();
      removeEventListener('pointerdown', outside, true); removeEventListener('keydown', onKey);
      removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
      removeEventListener('deviceorientation', onTilt);
      clearTimeout(hintT); hint.remove();
      shadow.geometry.dispose(); shadow.material.dispose(); shadowTex.dispose();
      scene.environment?.dispose(); pmrem.dispose(); renderer.dispose(); renderer.forceContextLoss?.(); cvs.remove();
    }
  };
}
