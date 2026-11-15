/* ==========================================================================
   MUDIT MANOCHA — site behaviour
   Renders everything from assets/data.js (SITE, PROJECTS). No build step.

   One rAF loop drives the motion: Lenis smooth scroll, the hero ring, the
   stacked project cards and the cursor. Every case study reads as a normal
   page; one with a real model also offers "View in 3D", a layer where the
   model turns and comes apart as you scroll (assets/viewer.js, three.js,
   loaded only when it is opened).
   ========================================================================== */

(() => {
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const slugify = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE    = matchMedia('(hover: hover) and (pointer: fine)').matches;
const PHONE   = matchMedia('(max-width: 760px)');          // the phone layout
const bySlug  = s => PROJECTS.find(p => p.slug === s);

document.title = `${SITE.name} — Industrial Designer`;

/* ======================================================== SMOOTH SCROLL == */
const lenis = (window.Lenis && !REDUCED)
  ? new Lenis({ lerp: .085, smoothWheel: true, wheelMultiplier: 1 })
  : null;

/* the case study scrolls in its own layer, with its own smooth scroll */
const csLenis = (window.Lenis && !REDUCED)
  ? new Lenis({ wrapper: document.getElementById('cs'), content: document.getElementById('cs'), lerp: .09, smoothWheel: true })
  : null;

let csH = 0;

function scrollToEl(el, opts = {}) {
  if (!el) return;
  if (el === document.body) el = 0;
  if (lenis) lenis.scrollTo(el, { offset: opts.offset ?? -60, immediate: !!opts.immediate, force: true });
  else if (el === 0) scrollTo({ top: 0, behavior: REDUCED ? 'instant' : 'smooth' });
  else el.scrollIntoView({ behavior: opts.immediate || REDUCED ? 'instant' : 'smooth' });
}

/* ================================================================= HERO == */
function buildHero() {
  $('#hero-kicker').textContent = `${SITE.role} — ${SITE.school}, ${SITE.location}`;   /* sits in the hero's bottom row */
  $('#hero-tag').textContent = SITE.tagline;
  $('#status').textContent = SITE.status;
}

/* ---- the ring ------------------------------------------------------------
   From the original site: cards orbit but keep facing the viewer; the far
   ones shrink, dim and blur a touch. It turns on its own, slows under the
   pointer, can be dragged, and a flick carries momentum. */
const RING = { cards: [], rot: 0, vel: 0, target: 0, dragging: false, lastX: 0, moved: 0, R: 400, t0: 0,
               goal: null, hold: null, turn: 0 };   // goal: an angle the arrow keys are steering to
const IDLE = REDUCED ? 0 : .06;                      // degrees per frame when left alone

function buildRing() {
  const hero = $('#top'), ring = $('#ring');
  const items = SITE.carousel.map(c => ({ ...c, p: bySlug(c.project) })).filter(c => c.p);
  ring.innerHTML = items.map((c, i) => `
    <a class="ring-card" href="#/${c.p.slug}" data-cursor="view" data-label="${esc(c.p.name)}" draggable="false">
      <img src="${c.img}" alt="${esc(c.p.name)}" loading="${i < 6 ? 'eager' : 'lazy'}" draggable="false">
    </a>`).join('');
  RING.cards = [...ring.children];
  RING.cards.forEach((c, i) => { c._base = 360 / RING.cards.length * i; });
  RING.vel = RING.target = IDLE;
  RING.t0 = performance.now();

  /* the radius lives in CSS (--cr) so it scales with the viewport; a probe
     turns the clamp() into pixels */
  const probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;visibility:hidden;height:0;width:var(--cr)';
  hero.appendChild(probe);
  const measure = () => { RING.R = probe.offsetWidth || 400; };
  measure(); addEventListener('resize', measure);

  hero.addEventListener('pointerenter', () => { if (!RING.dragging) RING.target = IDLE * .3; });
  hero.addEventListener('pointerleave', () => { if (!RING.dragging) RING.target = IDLE; });
  hero.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('.hero-foot')) return;
    RING.dragging = true; RING.moved = 0; RING.lastX = e.clientX; RING.goal = null;
    hero.classList.add('dragging');
  });
  addEventListener('pointermove', e => {
    if (!RING.dragging) return;
    const dx = e.clientX - RING.lastX; RING.lastX = e.clientX;
    RING.moved += Math.abs(dx);
    RING.rot += dx * .22; RING.vel = dx * .22;          // carry the throw
  });
  const up = () => {
    if (!RING.dragging) return;
    RING.dragging = false; hero.classList.remove('dragging');
    RING.vel = clamp(RING.vel, -6, 6);                  // cap a wild flick
    RING.target = hero.matches(':hover') ? IDLE * .3 : IDLE;
    setTimeout(() => { RING.moved = 0; }, 0);
  };
  addEventListener('pointerup', up); addEventListener('pointercancel', up);
  /* a drag never counts as a click on a card */
  ring.addEventListener('click', e => { if (RING.moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

  /* arrow keys: step one card at a time, easing to a stop with that card in
     front; Enter opens it. Only while the hero is on screen. */
  addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) return;
    if (cs.classList.contains('open') || $('#lb').classList.contains('open')) return;
    if (scrollY > innerHeight * .6 || e.target.closest('input, textarea, [contenteditable]')) return;
    if (e.key === 'Enter') {
      if (e.target.closest('a, button')) return;           // let a focused link do its own thing
      const lead = $('.ring-card.lead');
      if (lead) location.hash = lead.getAttribute('href');
      return;
    }
    e.preventDefault();
    const step = 360 / RING.cards.length;
    const from = RING.goal ?? RING.rot + RING.turn;         // keep stepping from the last goal
    RING.goal = (Math.round(from / step) + (e.key === 'ArrowRight' ? -1 : 1)) * step;
    RING.vel = 0; RING.target = 0;
    clearTimeout(RING.hold);                                // rest on the card, then drift again
    RING.hold = setTimeout(() => { RING.target = IDLE; }, 4000);
  });

  /* side-scrolling: a sideways trackpad swipe (or shift + wheel) turns the
     ring and leaves it coasting. Up/down is left alone so the page still
     scrolls normally. */
  hero.addEventListener('wheel', e => {
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerWidth : 1;
    const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const dx = (horiz ? e.deltaX : e.shiftKey ? e.deltaY : 0) * unit;
    if (!dx) return;
    e.preventDefault();                                  // no browser back-swipe
    RING.goal = null;
    const d = clamp(-dx * .09, -8, 8);
    RING.rot += d;
    RING.vel = clamp(d * .6, -6, 6);                     // coast after the swipe
  }, { passive: false });
}

function ringFrame(now) {
  if (PHONE.matches || scrollY > innerHeight * 1.1 || cs.classList.contains('open')) return;   // off screen or phone: rest
  if (!RING.dragging) {
    if (RING.goal !== null) {
      const want = RING.goal - RING.turn;
      RING.rot += (want - RING.rot) * (REDUCED ? 1 : .12);
      if (Math.abs(want - RING.rot) < .05) { RING.rot = want; RING.goal = null; }
    } else {
      RING.vel += (RING.target - RING.vel) * .06;
      RING.rot += RING.vel;
    }
  }
  /* opening: the ring grows out from the centre and fades up */
  const k = REDUCED ? 1 : clamp((now - RING.t0 - 150) / 1700, 0, 1);
  const open = 1 - Math.pow(1 - k, 3);
  const R = RING.R * (.45 + .55 * open);
  /* scrolling down the page slides the cards sideways as the hero leaves */
  const scrollTurn = RING.turn = REDUCED ? 0 : scrollY * .1;
  let lead = null, leadDepth = -2;
  RING.cards.forEach(c => {
    const a = (c._base + RING.rot + scrollTurn) * Math.PI / 180;
    const depth = Math.cos(a);                          // +1 nearest, -1 furthest
    const t = (depth + 1) / 2;
    if (depth > leadDepth) { leadDepth = depth; lead = c; }
    const x = Math.sin(a) * R, z = depth * R * .55, y = -depth * R * .07;
    c.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) scale(${(.72 + t * .34).toFixed(3)})`;
    c.style.opacity = ((.4 + t * .6) * open).toFixed(3);
    c.style.filter = `brightness(${(1 - (1 - t) * .3).toFixed(3)})${t < .45 ? ` blur(${((.45 - t) * 3).toFixed(2)}px)` : ''}`;
    c.style.zIndex = Math.round(depth * 100);
  });
  RING.cards.forEach(c => c.classList.toggle('lead', c === lead));

  /* the name lifts away as the page starts to scroll */
  const hp = clamp(scrollY / (innerHeight * .7), 0, 1);
  const hc = $('#hero-center');
  hc.style.opacity = (1 - hp).toFixed(3);
  hc.style.transform = `translateY(${(hp * -80).toFixed(1)}px)`;
}

/* ========================================================= WORK — STACK == */
function buildStack() {
  $('#work-count').textContent = `${pad(PROJECTS.length)} projects`;
  $('#stack').innerHTML = PROJECTS.map((p, i) => {
    const src = p.win || p.cover;
    const contain = p.winFit === 'contain';
    const bg = contain && p.winBg && p.winBg !== 'blur' ? ` style="background:${p.winBg}"` : '';
    const photo = contain
      ? `${p.winBg === 'blur' ? `<img class="blur" src="${src}" alt="">` : ''}<img class="main" src="${src}" alt="${esc(p.name)}" loading="lazy">`
      : `<img src="${src}" alt="${esc(p.name)}" loading="lazy" style="object-position:${p.winPos || 'center'}">`;
    return `
    <span class="stack-anchor" id="p-${p.slug}"></span>
    <div class="stack-card">
      <a class="stack-inner" href="#/${p.slug}" data-cursor="view"${bg}>
        <div class="stack-photo${contain ? ' contain' : ''}">${photo}</div>
        <div class="stack-shade"></div>
        <div class="stack-top"><span>${pad(i + 1)} / ${pad(PROJECTS.length)}</span><span>${p.models ? '<em class="chip-3d">3D</em>' : ''}${esc(p.discipline)} · ${esc(p.year)}</span></div>
        <div class="stack-meta">
          <div><h2>${esc(p.name)}</h2><p>${esc(p.subtitle)}</p></div>
          <span class="stack-cta">View project →</span>
        </div>
      </a>
    </div>
    ${i < PROJECTS.length - 1 ? '<div class="stack-gap"></div>' : '<div class="stack-tail"></div>'}`;
  }).join('');
}

/* As the next card slides up, the current one eases back, drops a touch and
   dims; its photo drifts slowly against the frame the whole way through. */
function stackFrame() {
  if (cs.classList.contains('open')) return;
  const vh = innerHeight;
  const anchors = $$('.stack-anchor');
  const cards = $$('.stack-card');
  cards.forEach((card, i) => {
    const inner = card.firstElementChild;
    const ar = anchors[i].getBoundingClientRect();
    if (ar.top > vh * 1.2) return;                                   // not reached yet
    const next = anchors[i + 1];
    const target = next ? clamp(1 - next.getBoundingClientRect().top / vh, 0, 1) : 0;
    const cur = inner._p ?? target;
    const p = REDUCED || Math.abs(target - cur) < .001 ? target : cur + (target - cur) * .12;
    inner._p = p;
    const e = p * p * (3 - 2 * p);
    inner.style.transform = e ? `scale(${(1 - e * .06).toFixed(4)}) translateY(${(e * -24).toFixed(1)}px)` : '';
    (inner._shade ??= inner.querySelector('.stack-shade')).style.opacity = (e * .7).toFixed(3);
    const meta = inner._meta ??= inner.querySelector('.stack-meta');
    meta.style.setProperty('--my', `${(e * 18).toFixed(1)}px`);
    meta.style.setProperty('--mo', (1 - e * .85).toFixed(3));
    if (!REDUCED) {
      /* the anchor never sticks, so it keeps measuring once the card pins */
      const span = vh + card.offsetHeight + (card.nextElementSibling?.offsetHeight || 0);
      const through = clamp((vh - ar.top) / span, 0, 1);
      (inner._photo ??= inner.querySelector('.stack-photo')).style.transform =
        `translate3d(0,${((through - .5) * 8).toFixed(2)}%,0)`;
    }
  });
  /* a card buried under two settled cards can't be seen — stop painting it,
     so the GPU isn't holding a dozen full-screen layers (it drops tiles) */
  cards.forEach((card, i) => {
    const above = cards[i + 1]?.firstElementChild;
    const hide = !!above && (card.firstElementChild._p ?? 0) >= .999 && (above._p ?? 0) >= .999;
    if (card._hid !== hide) { card.style.visibility = hide ? 'hidden' : ''; card._hid = hide; }
  });
}

/* ============================================================ MODELLING == */
/* A big index of tools on the left; the frame on the right shows work made
   with whichever one is active — by hover on a mouse, by scroll on a phone. */
const pics = m => m.gallery?.length ? m.gallery : [{ img: m.img, cap: m.cap }];
function buildModelling() {
  const M = SITE.modelling;
  $('#model-count').textContent = `${pad(M.length)} tools`;
  $('#model-list').innerHTML = M.map((m, i) => `
    <li class="model-row${m.slug ? ' has-page' : ''}" data-i="${i}"${m.slug ? ` data-href="#/tool/${m.slug}" data-cursor="view" data-label="Open"`
        : m.img ? ` data-cursor="zoom" data-full="${m.img}"` : ''}>
      <div class="model-pic">${pics(m).map((g, k) => g.img
        ? `<img src="${g.img}" alt="" loading="lazy" data-g="${k}"${g.fit ? ` class="${g.fit}"` : ''}>`
        : `<span class="model-soon">${esc(m.cap)}</span>`).join('')}</div>
      <span class="model-n label">${pad(i + 1)}</span>
      <div>
        <h3>${esc(m.tool)}</h3>
        <p class="model-role label">${esc(m.role)}</p>
        <p class="model-note">${esc(m.note)}</p>
        ${m.slug ? `<a class="model-open label" href="#/tool/${m.slug}">See the work →</a>` : ''}
      </div>
    </li>`).join('');
  $('#model-frames').innerHTML = M.map((m, i) => pics(m).map((g, k) =>
    g.img ? `<img src="${g.img}" alt="${esc(g.cap)}" loading="lazy" data-i="${i}" data-g="${k}"${g.fit ? ` class="${g.fit}"` : ''}>`
          : `<span class="model-soon" data-i="${i}" data-g="0">${esc(m.cap)}</span>`).join('')).join('');

  const rows = $$('.model-row'), imgs = $$('#model-frames > *'), cap = $('#model-cap');
  let current = -1, g = 0, timer = 0;
  /* one piece of the open row; a row with a gallery moves on every few seconds */
  const paint = () => {
    const list = pics(M[current]);
    imgs.forEach(im => im.classList.toggle('on', +im.dataset.i === current && +im.dataset.g === g));
    cap.textContent = list.length > 1 ? `${list[g].cap}  ·  ${g + 1} / ${list.length}` : list[0].cap;
  };
  const show = i => {
    if (i === current) return;
    current = i; g = 0;
    rows.forEach(r => r.classList.toggle('on', +r.dataset.i === i));
    paint();
    clearInterval(timer);
    if (pics(M[i]).length > 1 && !REDUCED) timer = setInterval(() => { g = (g + 1) % pics(M[current]).length; paint(); }, 2600);
  };
  show(0);
  /* a tool with a page of its own opens it */
  rows.forEach(r => r.dataset.href && r.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    location.hash = r.dataset.href;
  }));
  /* on a phone every row shows its own picture; a gallery row turns through its pieces */
  rows.forEach(r => {
    const ps = $$('.model-pic img', r);
    if (ps.length < 2) { ps[0]?.classList.add('on'); return; }
    let k = 0; ps[0].classList.add('on');
    if (!REDUCED) setInterval(() => { ps[k].classList.remove('on'); k = (k + 1) % ps.length; ps[k].classList.add('on'); }, 2600);
  });
  if (FINE) rows.forEach(r => r.addEventListener('pointerenter', () => show(+r.dataset.i)));
  else {
    /* touch: whichever row crosses the middle of the screen is active */
    const mo = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) show(+e.target.dataset.i);
    }), { rootMargin: '-45% 0px -45% 0px' });
    rows.forEach(r => mo.observe(r));
  }
}

/* ================================================================ PHONE == */
/* The phone gets its own versions of a few pieces rather than a squeezed
   desktop: a menu, a swipeable reel in place of the ring, and thumbnails
   wherever the desktop relies on hover. */

/* reel: the carousel photos side by side. The centre card is full size and
   the others shrink and fade, like the ring's depth. It drifts on its own
   until touched; tapping a card opens that project. */
function buildReel() {
  const reel = $('#reel');
  const items = SITE.carousel.map(c => ({ ...c, p: bySlug(c.project) })).filter(c => c.p);
  reel.innerHTML = items.map((c, i) => `
    <a class="reel-card" href="#/${c.p.slug}" data-i="${i}">
      <img src="${c.img}" alt="${esc(c.p.name)}" loading="${i < 3 ? 'eager' : 'lazy'}">
    </a>`).join('');
  const cards = $$('.reel-card', reel);
  let active = -1, touched = false;

  const paint = () => {
    const mid = reel.getBoundingClientRect().left + reel.clientWidth / 2;
    let best = 0, bestD = Infinity;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      const t = clamp(1 - d / (r.width * 1.1), 0, 1);           // 1 in the centre
      c.style.setProperty('--s', (.86 + t * .14).toFixed(3));
      c.style.setProperty('--o', (.45 + t * .55).toFixed(3));
      if (d < bestD) { bestD = d; best = i; }
    });
    if (best !== active) {
      active = best;
      $('#reel-n').textContent = `${pad(best + 1)} / ${pad(cards.length)}`;
      $('#reel-t').textContent = items[best].p.name;
    }
  };
  reel.addEventListener('scroll', () => requestAnimationFrame(paint), { passive: true });
  addEventListener('resize', paint);
  paint();

  const stop = () => { touched = true; };
  reel.addEventListener('touchstart', stop, { passive: true });
  reel.addEventListener('pointerdown', stop);
  if (!REDUCED) setInterval(() => {
    if (touched || !PHONE.matches || document.hidden || scrollY > innerHeight * .5 || cs.classList.contains('open')) return;
    const next = (active + 1) % cards.length;
    reel.scrollTo({ left: cards[next].offsetLeft - (reel.clientWidth - cards[next].offsetWidth) / 2, behavior: 'smooth' });
  }, 3800);
}

/* menu: everything an employer needs, one tap away */
function buildMenu() {
  const menu = $('#menu'), btn = $('#menu-btn');
  const links = [['Work', '#work'], ['Modelling', '#modelling'], ['About', '#about'], ['Contact', '#contact']];
  $('#menu-links').innerHTML = links.map(([t, h], i) =>
    `<a href="${h}"><span class="label">${pad(i + 1)}</span>${t}</a>`).join('');
  $('#menu-foot').innerHTML = `
    <a class="menu-mail" href="mailto:${SITE.email}">${esc(SITE.email)}</a>
    <div class="menu-row">
      ${SITE.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}
      <a href="${SITE.resume}" target="_blank" rel="noopener">Résumé</a>
    </div>
    <div class="menu-row menu-meta">
      <span class="status"><i></i>${esc(SITE.status)}</span>
    </div>`;

  const set = open => {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
    document.body.classList.toggle('locked', open);
    $('#nav').classList.toggle('menu-open', open);
  };
  btn.addEventListener('click', () => set(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) set(false); });
  PHONE.addEventListener('change', () => set(false));
}

/* ======================================================== ABOUT + CONTACT == */
function buildAbout() {
  const A = SITE.about;
  $('#about-where').textContent = `${SITE.school} — ${SITE.location}`;
  $('#about-say').textContent = A.statement;

  /* the four steps: hover or focus one to open it; the first starts open */
  const steps = $('#steps');
  steps.innerHTML = A.steps.map((st, i) => `
    <li class="step${i === 0 ? ' on' : ''}" style="--i:${i}">
      <a class="step-in" href="${st.href}" data-cursor="view">
        <img src="${st.img}" alt="" loading="lazy">
        <span class="step-n">${i + 1}</span>
        <span class="step-body">
          <span class="step-verb">${esc(st.verb)}</span>
          <span class="step-t">${esc(st.text)}</span>
          <span class="step-go">${esc(st.go)}</span>
        </span>
      </a>
    </li>`).join('');
  const open = li => $$('.step', steps).forEach(x => x.classList.toggle('on', x === li));
  $$('.step', steps).forEach(li => {
    li.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') open(li); });
    li.addEventListener('focusin', () => open(li));
  });

  $('#tl').innerHTML = A.timeline.map(r => `
    <li class="${r.now ? 'now' : ''}${r.future ? ' future' : ''}"><span class="tl-y">${esc(r.y)}</span><span class="tl-t">${esc(r.t)}</span></li>`).join('');

  const cell = (k, v) => `<td><span class="tb-k">${esc(k)}</span><span class="tb-v">${v}</span></td>`;
  $('#tblock').innerHTML = `
    <tr>${cell('Name', esc(SITE.name))}${cell('Studying', esc(A.degree))}</tr>
    <tr>${cell('School', esc(SITE.school))}${cell('Based in', esc(SITE.location))}</tr>
    <tr>${cell('Status', `<i class="tb-dot"></i>${esc(SITE.status)}`)}${cell('Résumé', `<a class="ul" href="${SITE.resume}" target="_blank" rel="noopener">Open the PDF</a>`)}</tr>
    <tr class="tb-foot"><td colspan="2"><span>Sheet: About</span><span>Scale 1:1</span><span>Drawn by MM</span></td></tr>`;
}

function buildContact() {
  $('#cta').innerHTML = `${esc(SITE.ctaLine1)}<br><span class="soft">${esc(SITE.ctaLine2)}</span>`;
  $('#mail').textContent = SITE.email;
  $('#links').innerHTML = [
    `<a class="ul" href="mailto:${SITE.email}">Email</a>`,
    ...SITE.socials.map(s => `<a class="ul" href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a>`),
    `<a class="ul" href="${SITE.resume}" target="_blank" rel="noopener">Résumé</a>`
  ].join('');
  $('#me-img').src = SITE.portrait;
  io.observe($('#me'));

  $('#foot-l').textContent = `© ${new Date().getFullYear()} ${SITE.name}`;
  $('#foot-r').textContent = 'Designed with curiosity';

  /* click copies the address; the cursor confirms */
  $('#mail').addEventListener('click', async () => {
    if (!FINE) { location.href = 'mailto:' + SITE.email; return; }   /* phones: open the mail app */
    try { await navigator.clipboard.writeText(SITE.email); cursorSay('Copied ✓'); }
    catch { location.href = 'mailto:' + SITE.email; }
  });
}

/* local time where Mudit is — small, but it makes the page feel inhabited */
/* ========================================================== CASE STUDY == */
/* A case study answers an employer's questions in order:
     what is it?            the 3D model (or hero image), title, summary, facts
     why does it matter?    at a glance — problem, approach, outcome
     how did he get there?  numbered chapters: the words stay pinned on the
                            left while that chapter's images scroll past
     what did he learn?     reflection
   The bar at the top always says which chapter you are in. */

function fig(m) {
  if (!m || !m.src) return '';
  return `<figure class="m">
    <img src="${m.src}" alt="${esc(m.cap || '')}" loading="lazy" data-cursor="zoom">
    ${m.cap ? `<figcaption>${esc(m.cap)}</figcaption>` : ''}
  </figure>`;
}
const mediaHTML = list => (list || []).map(m =>
  Array.isArray(m) ? `<div class="m-row">${m.map(fig).join('')}</div>` : fig(m)).join('');
const paras = t => (Array.isArray(t) ? t : [t]).filter(Boolean).map(x => `<p>${esc(x)}</p>`).join('');

const glanceOf = p => {
  const g = p.glance || {};
  return [['The problem', g.problem], ['The approach', g.approach], ['The outcome', g.outcome]].filter(r => r[1]);
};
function renderCase(p) {
  close3d(); dropInline();
  const i    = PROJECTS.indexOf(p);
  /* every other project, starting with the next one in order */
  const others = PROJECTS.slice(i + 1).concat(PROJECTS.slice(0, i));
  const ch   = p.chapters || [];
  const facts = [['Role', p.role], ['Year', p.year], ['Timeline', p.timeline],
                 ['Tools', (p.tools || []).join(', ')], ['Materials', p.materials]].filter(r => r[1]);
  const glance = glanceOf(p);
  const hero = p.hero || p.cover;
  const contain = p.winFit === 'contain' && hero === p.win;
  const heroBg = contain && p.winBg && p.winBg !== 'blur' ? ` style="background:${p.winBg}"` : '';

  const titleHTML = `
        <p class="label">${esc(p.discipline)} · ${esc(p.year)}</p>
        <h1 class="cs-title">${esc(p.name)}${p.nameLine2 ? `<span class="l2">${esc(p.nameLine2)}</span>` : ''}</h1>
        <p class="cs-summary">${esc(p.summary || p.subtitle)}</p>`;
  const factsHTML = `<dl class="cs-facts">${facts.map(([k, v]) =>
          `<div><dt class="label">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;

  /* with a real model, "View in 3D" opens a layer over the page: the model
     stays pinned while the scroll walks through the project, turning it and,
     at the approach, taking it apart. Nobody has to go through it to read
     the project. */
  const steps = p.models ? sxScenes(p, glance) : [];
  x3dHTML = p.models ? `
    <div class="cs-bar">
      <div class="wrap">
        <button type="button" class="back" data-close-3d>← Back to the project</button>
        <span class="cs-where">${esc(p.name)} in 3D${p.models[0].study ? ' · study model' : ''}</span>
        <span class="label">Esc to close</span>
      </div>
    </div>
    <section class="sx" style="--n:${steps.length}">
      <div class="sx-pin">
        <div class="sx-stage holo-on">
          <div class="viewer" id="holo-stage"></div>
        </div>
        <div class="wrap sx-copy">
          ${steps.map((st, n) => `
          <div class="sx-step${n ? '' : ' on'}" data-step="${n}">
            ${st.title ? `
            <p class="label">${st.k}</p>
            <h1 class="cs-title">${esc(p.name)}${p.nameLine2 ? `<span class="l2">${esc(p.nameLine2)}</span>` : ''}</h1>
            <p class="cs-summary">${esc(p.summary || p.subtitle)}</p>` : `
            <p class="label"><span>${pad(n + 1)}</span>${esc(st.k)}</p>
            <p class="sx-text">${esc(st.text)}</p>`}
          </div>`).join('')}
        </div>
        <p class="sx-count" aria-hidden="true"><span class="sx-count-win"><span class="sx-count-roll">${steps.map((_, n) => `<span>${pad(n + 1)}</span>`).join('')}</span></span>/ ${pad(steps.length)}</p>
        <ol class="sx-dots" aria-hidden="true">${steps.map((_, n) => `<li${n ? '' : ' class="on"'}></li>`).join('')}</ol>
        <div class="view-bar">
          ${p.models.length > 1 ? `<div class="view-switch holo-only" role="group" aria-label="Model">${p.models.map((m, k) =>
            `<button type="button" data-model="${k}"${k ? '' : ' class="on"'}>${esc(m.label)}</button>`).join('')}</div>` : ''}
          <div class="view-switch holo-only" role="group" aria-label="Tools">
            <button type="button" data-explode aria-pressed="false">Explode</button>
            <button type="button" data-zoom="out" aria-label="Zoom out">−</button>
            <button type="button" data-zoom="in" aria-label="Zoom in">+</button>
          </div>
        </div>
        <p class="sx-cue label">Scroll</p>
      </div>
    </section>
    <section class="wrap x3d-end">
      <button type="button" class="cs-3d-btn" data-close-3d>← Back to the project</button>
    </section>` : '';

  const photoIntro = `
    <header class="wrap cs-intro">
      <div class="cs-intro-text">${titleHTML}
        ${factsHTML}
      </div>
      <figure class="cs-intro-img${contain ? ' contain' : ''}"${heroBg} data-cursor="zoom" data-full="${hero}">
        ${contain && p.winBg === 'blur' ? `<img class="blur" src="${hero}" alt="">` : ''}
        <img class="main" src="${hero}" alt="${esc(p.name)}">
      </figure>
    </header>`;

  $('#cs').innerHTML = `
    <div class="cs-bar">
      <div class="wrap">
        <a class="back" href="#p-${p.slug}">← All work</a>
        <span class="cs-where" id="cs-where">Overview</span>
        <span class="label">${pad(i + 1)} / ${pad(PROJECTS.length)}</span>
      </div>
      <i class="cs-prog" id="cs-prog"></i>
    </div>

${photoIntro}
${p.models ? `
    <section class="wrap cs-model">
      <div class="cs-model-stage">
        <div class="viewer" id="inline-stage"></div>
        <p class="cs-model-hint label">${p.models[0].study ? 'Study model, built from photos · drag to turn' : 'Drag to turn'}</p>
        <div class="cs-model-bar">
          ${p.models.length > 1 ? `<div class="view-switch" role="group" aria-label="Model">${p.models.map((m, k) =>
            `<button type="button" data-inline-model="${k}"${k ? '' : ' class="on"'}>${esc(m.label)}</button>`).join('')}</div>` : ''}
          <div class="view-switch" role="group" aria-label="Tools">
            <button type="button" data-inline-explode aria-pressed="false">Explode</button>
          </div>
          <button type="button" class="cs-3d-btn" data-open-3d><span class="wide-only">Full 3D walkthrough →</span><span class="narrow-only">3D tour →</span></button>
        </div>
      </div>
    </section>` : ''}

    ${glance.length ? `
    <section class="wrap cs-glance rv">
      <p class="label">At a glance</p>
      <div class="glance-grid">${glance.map(([k, v], n) => `
        <div class="glance">
          <p class="glance-k"><span>${pad(n + 1)}</span>${esc(k)}</p>
          <p class="glance-v">${esc(v)}</p>
        </div>`).join('')}</div>
    </section>` : ''}

    ${ch.length > 1 ? `
    <nav class="wrap cs-toc" aria-label="Contents">
      <p class="label">Contents</p>
      <ol>${ch.map((c, n) => `<li><button type="button" data-go="${n}"><span>${pad(n + 1)}</span>${esc(c.title)}</button></li>`).join('')}</ol>
    </nav>` : ''}

    ${ch.map((c, n) => chapterHTML(c, n, ch.length, true)).join('')}

    ${p.reflection ? `
    <section class="wrap cs-reflect rv" data-ch="reflect">
      <p class="label">Reflection</p>
      <blockquote>${esc(p.reflection)}</blockquote>
    </section>` : ''}

    ${others.length ? `
    <a class="cs-next" href="#/${others[0].slug}" data-cursor="view" data-label="Next">
      <span class="cs-next-img"><img src="${others[0].win || others[0].cover}" alt="" loading="lazy"></span>
      <span class="wrap cs-next-in">
        <span class="label">Next project · ${pad(PROJECTS.indexOf(others[0]) + 1)} / ${pad(PROJECTS.length)}</span>
        <span class="cs-next-t">${esc(others[0].name)}${others[0].nameLine2 ? `<em>${esc(others[0].nameLine2)}</em>` : ''}</span>
        <span class="label">View project →</span>
      </span>
    </a>` : ''}

    <section class="cs-more">
      <div class="wrap">
        <div class="more-head">
          <p class="label">All projects</p>
          <a class="label" href="#p-${PROJECTS[0].slug}">All work →</a>
        </div>
        <ol class="more-list">${others.map(o => `
          <li><a class="more-row" href="#/${o.slug}" data-cursor="media" data-img="${o.win || o.cover}">
            <span class="more-thumb"><img src="${o.win || o.cover}" alt="" loading="lazy"></span>
            <span class="more-n">${pad(PROJECTS.indexOf(o) + 1)}</span>
            <span class="more-t">${esc(o.name)}</span>
            <span class="more-m">${esc(o.discipline)}</span>
            <span class="more-y">${esc(o.year)}</span>
            <span class="more-go">→</span>
          </a></li>`).join('')}
        </ol>
      </div>
    </section>`;

  /* a picture is never shown bigger than it really is: small exports stay
     crisp at their own size instead of being stretched soft */
  $$('.ch-media img, .cs-intro-img img.main', cs).forEach(im => {
    const fit = () => { if (im.naturalWidth) im.style.maxWidth = `min(100%, ${im.naturalWidth}px)`; };
    im.complete ? fit() : im.addEventListener('load', fit, { once: true });
  });
  observe($('#cs'));
  csWhere();
  /* on a phone the words come first: the model card follows the glance */
  const card = $('.cs-model', cs), gl = $('.cs-glance', cs);
  if (PHONE.matches && card && gl) gl.after(card);
  $$('[data-open-3d]', cs).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); open3d(p); }));
  if (p.models) bindInline(p);
  /* contents: jump to a chapter */
  $$('[data-go]', cs).forEach(b => b.addEventListener('click', () => {
    const el = cs.querySelector(`[data-ch="${b.dataset.go}"]`);
    if (!el) return;
    if (csLenis) csLenis.scrollTo(el, { offset: -70 }); else el.scrollIntoView({ behavior: REDUCED ? 'instant' : 'smooth' });
  }));
}

/* one chapter: its number and title, the words, any files to download, then
   its pictures across the full width. Case studies and coursework share it. */
function chapterHTML(c, n, total, track) {
  const files = c.files && c.files.length ? `<ul class="ch-files">${c.files.map(f =>
    `<li><a href="${f.href}" download><span>${esc(f.label)}</span><em>${esc(f.type)}</em></a></li>`).join('')}</ul>` : '';
  return `
    <section class="wrap ch${c.media && c.media.length ? '' : ' ch-solo'}"${track ? ` data-ch="${n}"` : ''}>
      <div class="ch-text">
        <p class="ch-n label"><span class="ch-num">${pad(n + 1)}</span> / ${pad(total)}</p>
        <h2>${esc(c.title)}</h2>
        <div class="ch-body">${paras(c.text)}${files}</div>
      </div>
      ${c.media && c.media.length ? `<div class="ch-media">${mediaHTML(c.media)}</div>` : ''}
    </section>`;
}

/* ---------------------------------------------------------------- viewer -- */
/* three.js loads the first time a model is shown */
const VIEWER_JS = './viewer.js?v=14';
const holoNote = () => `<p class="holo-note">${location.protocol === 'file:'
  ? 'The 3D view can’t run from a file opened directly. Open the site through a local server or its web address.'
  : 'The 3D view could not load. Check the connection and try again.'}</p>`;
let activeHolo = null, sx = null;
/* the model sits right of the words on a wide screen, above them on a narrow one */
const WIDE = matchMedia('(min-width: 901px)');
const sxFrameBox = () => WIDE.matches ? { x: .36, y: .02, w: .62, h: .9 } : { x: 0, y: 0, w: 1, h: .5 };
WIDE.addEventListener('change', () => activeHolo?.resize());
function dropHologram() { activeHolo?.dispose(); activeHolo = null; sx = null; }

/* the model on the page itself: it loads as it comes near, and as it
   scrolls through it comes together from apart and turns a little; left
   alone, it turns slowly on its own */
let inline = null;
function dropInline() { inline?.holo?.dispose(); inline = null; }
function bindInline(p) {
  dropInline();
  const stage = $('#inline-stage'), box = stage.parentElement;
  inline = { p, stage, box, holo: null, loading: false, lastP: -1, still: performance.now(), spin: 0, at: performance.now() };
  /* Explode by hand holds it apart; off again, the scroll has it back */
  const ex = $('[data-inline-explode]', box);
  ex.addEventListener('click', () => {
    inline.held = ex.getAttribute('aria-pressed') !== 'true';
    ex.setAttribute('aria-pressed', String(inline.held)); ex.classList.toggle('on', inline.held);
  });
  $$('[data-inline-model]', box).forEach(b => b.addEventListener('click', () => {
    $$('[data-inline-model]', box).forEach(x => x.classList.toggle('on', x === b));
    inline?.holo?.showModel(p.models[+b.dataset.inlineModel].src, 'glb');
  }));
}
function inlineFrame() {
  if (!inline) return;
  const r = inline.box.getBoundingClientRect();
  if (!inline.holo && !inline.loading && r.top < innerHeight * 1.6) {
    inline.loading = true;
    const me = inline;
    import(VIEWER_JS).then(({ mountViewer }) => {
      if (inline !== me) return;
      me.holo = mountViewer(me.stage, { model: me.p.models[0].src, type: 'glb', autoTurn: false });
      me.holo.ready?.catch(() => { me.stage.innerHTML = holoNote(); });
    }).catch(() => { me.stage.innerHTML = holoNote(); });
  }
  /* 0 as it comes in at the bottom, 1 as it leaves at the top */
  const t = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
  inline.box.style.setProperty('--in', clamp(t / .35, 0, 1).toFixed(3));
  const holo = inline.holo; if (!holo) return;
  const now = performance.now(), dt = Math.min(.05, (now - inline.at) / 1000); inline.at = now;
  if (Math.abs(t - inline.lastP) > 1e-4) { inline.lastP = t; inline.still = now; }
  inline.spin += dt * .3 * (REDUCED ? 0 : clamp((now - inline.still - 900) / 1200, 0, 1));
  holo.setPose(-.9 + t * 1.6 + inline.spin, .16);
  holo.setExplode(inline.held ? 1 : REDUCED ? 0 : clamp(1 - (t - .12) / .3, 0, 1));
}

/* the 3D layer: built when opened, thrown away when closed */
const x3d = $('#x3d');
let x3dHTML = '', x3dLenis = null;
function open3d(p) {
  if (!x3dHTML) return;
  x3d.innerHTML = x3dHTML;
  x3d.scrollTop = 0;
  x3d.classList.add('open');
  x3d.setAttribute('aria-hidden', 'false');
  x3dLenis = (window.Lenis && !REDUCED) ? new Lenis({ wrapper: x3d, content: x3d, lerp: .09, smoothWheel: true }) : null;
  $$('[data-close-3d]', x3d).forEach(b => b.addEventListener('click', close3d));
  bindHologram(p);
  inline?.holo?.setPaused(true);                         /* the page's model rests underneath */
  cursorReset();
}
function close3d() {
  if (!x3d.classList.contains('open')) return;
  dropHologram();
  x3dLenis?.destroy(); x3dLenis = null;
  x3d.classList.remove('open');
  x3d.setAttribute('aria-hidden', 'true');
  inline?.holo?.setPaused(false);
  cursorReset();
  setTimeout(() => { if (!x3d.classList.contains('open')) x3d.innerHTML = ''; }, 500);
}
function bindHologram(p) {
  const sec = $('#x3d .sx'), stage = $('#holo-stage'), box = sec.querySelector('.sx-stage');
  const exBtn = sec.querySelector('[data-explode]');
  /* Explode by hand overrides what the scroll asks for, until pressed again */
  let held = false;
  const setEx = on => { held = on; exBtn.setAttribute('aria-pressed', String(on)); exBtn.classList.toggle('on', on); if (on) activeHolo?.setExplode(1); };
  const fail = () => { stage.innerHTML = holoNote(); };
  const modelBtns = $$('[data-model]', sec);
  /* the model on show; the scroll changes it when a step asks for another */
  const showModel = k => {
    sx.model = k;
    modelBtns.forEach(x => x.classList.toggle('on', +x.dataset.model === k));
    return activeHolo?.showModel(p.models[k].src, 'glb');
  };
  sx = { sec, steps: $$('.sx-step', sec), dots: $$('.sx-dots li', sec), roll: $('.sx-count-roll', sec),
         scenes: sxScenes(p, glanceOf(p)), cur: -1, model: 0, showModel, held: () => held,
         lastT: -1, stillSince: performance.now(), spin: 0, at: performance.now() };
  import(VIEWER_JS).then(({ mountViewer }) => {
    if (!sec.isConnected) return;                        /* left the page while it loaded */
    activeHolo = mountViewer(stage, { model: p.models[0].src, type: 'glb', autoTurn: false, frame: sxFrameBox });
    activeHolo.ready?.catch(fail);
  }).catch(fail);

  sec.querySelector('.view-bar').addEventListener('click', async e => {
    const b = e.target.closest('button'); if (!b) return;
    e.stopPropagation();                                   /* not a lightbox click */
    if (b.dataset.view) {
      const holo = b.dataset.view === 'holo';
      b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      box.classList.toggle('holo-on', holo);
      activeHolo?.setPaused(!holo);
    } else if (b.dataset.model !== undefined && activeHolo) {
      await showModel(+b.dataset.model);
    } else if (b.hasAttribute('data-explode') && activeHolo) {
      setEx(!held);
    } else if (b.dataset.zoom && activeHolo) {
      activeHolo.zoomBy(b.dataset.zoom === 'in' ? 1.35 : 1 / 1.35);
    }
  });
}
/* the steps the scroll walks through, each with how the model should look
   while its words are showing: which model, which way it faces, whether it
   is apart. The title comes first; then the project's own scenes, or else
   its glance (problem / approach, taken apart / outcome). */
const POSE = { title: [-.5, .18], 'The problem': [1.05, .1], 'The approach': [-.35, .28, true], 'The outcome': [.5, .14] };
function sxScenes(p, glance) {
  const title = { title: true, k: `${esc(p.discipline)} · ${esc(p.year)}`, model: 0, yaw: POSE.title[0], tilt: POSE.title[1] };
  const rest = p.scenes || glance.map(([k, text], i) => {
    const [yaw, tilt, apart] = POSE[k] || [.6 * (i + 1), .15];
    return { k, text, model: 0, yaw, tilt, apart: !!apart };
  });
  return [title].concat(rest.map(s => ({ model: 0, yaw: 0, tilt: .15, ...s })));
}

/* where the scroll is inside the pinned section: which words show, and so
   how the model looks */
function sxFrame() {
  if (!sx) return;
  const r = sx.sec.getBoundingClientRect(), run = r.height - innerHeight;
  const t = run > 0 ? clamp(-r.top / run, 0, 1) : 0;
  const n = sx.steps.length;
  const cur = Math.min(n - 1, Math.floor(t * n * .999));
  const local = t * n - cur;                              /* 0 → 1 through this step */
  const sc = sx.scenes[cur];
  if (cur !== sx.cur) {
    sx.steps.forEach((el, k) => { el.classList.toggle('on', k === cur); el.classList.toggle('past', k < cur); });
    sx.dots.forEach((el, k) => el.classList.toggle('on', k === cur));
    sx.roll.style.transform = `translateY(${-cur * 1.6}em)`;
    if (activeHolo) {
      /* a new step: the model turns to what the words are about */
      if (sx.cur >= 0) {
        activeHolo.straighten();
        if (sc.model !== sx.model) sx.showModel(sc.model);
        else activeHolo.pulse();
      }
      sx.cur = cur; sx.spin = 0;
    }
  }
  /* stopped on a step: after a moment the model starts turning slowly */
  const now = performance.now(), dt = Math.min(.05, (now - sx.at) / 1000); sx.at = now;
  if (Math.abs(t - sx.lastT) > 1e-4) { sx.lastT = t; sx.stillSince = now; }
  const still = REDUCED ? 0 : clamp((now - sx.stillSince - 900) / 1200, 0, 1);
  sx.spin += dt * .35 * still;
  sx.sec.classList.toggle('moved', t > .02);
  if (!activeHolo) return;
  sx.sec.classList.toggle('zoomed', activeHolo.zoom > 1.2);
  /* within a step it drifts a little, so it never sits dead still */
  activeHolo.setPose(sc.yaw + (local - .5) * .3 + sx.spin, sc.tilt);
  if (!sx.held()) activeHolo.setExplode(sc.apart ? 1 : 0);
}

/* ============================================================ TOOL PAGE == */
/* Not a case study: one tool, and the work made with it. Rhino & KeyShot
   puts each model next to its render; Sketches is a wall of drawings. */
function renderTool(t) {
  close3d(); dropInline();
  const M = SITE.modelling, i = M.indexOf(t), pg = t.page;
  const proj = s => bySlug(s);
  const link = s => proj(s) ? `<a class="tool-proj label" href="#/${s}">View project →</a>` : '';
  cs.innerHTML = `
    <div class="cs-bar">
      <div class="wrap">
        <a class="back" href="#modelling">← Back</a>
        <span class="cs-where" id="cs-where">${esc(t.tool)}</span>
        <span class="label">Software · ${pad(i + 1)} / ${pad(M.length)}</span>
      </div>
      <i class="cs-prog" id="cs-prog"></i>
    </div>

    <header class="wrap tool-head">
      <p class="label">Software · ${esc(t.role)}</p>
      <h1 class="cs-title">${esc(t.tool)}</h1>
      <p class="cs-summary">${esc(pg.intro || t.note)}</p>
    </header>

    ${pg.vase ? `
    <section class="wrap gh-live">
      <div class="gh" id="gh-vase"><p class="holo-note">Loading the live vase…</p></div>
      <p class="gh-note">${esc(pg.vase.note)}</p>
    </section>` : ''}

    ${(pg.models || []).map((x, n) => `
    <section class="wrap tool-model rv">
      <div class="tool-pair-head">
        <p><span class="label">${pad(n + 1)}</span>${esc(x.name)}</p>
        ${link(x.project)}
      </div>
      <p class="label tool-sub">In Rhino — top, perspective, front, right</p>
      <figure class="tool-views" data-cursor="zoom" data-full="${x.views}">
        <img src="${x.views}" alt="${esc(x.name)} in Rhino, four views" loading="lazy">
      </figure>
      <p class="label tool-sub">Rendered in KeyShot</p>
      <div class="tool-renders">${x.renders.map(r => `
        <figure class="m${r.wide ? ' wide' : ''}${r.tall ? ' tall' : ''}"><img src="${r.src}" alt="${esc(r.cap)}" loading="lazy" data-cursor="zoom"><figcaption>${esc(r.cap)}</figcaption></figure>`).join('')}
      </div>
      ${x.own?.length ? `
      <p class="label tool-sub">His own screenshots</p>
      <div class="tool-renders">${x.own.map(r => `
        <figure class="m"><img src="${r.src}" alt="${esc(r.cap)}" loading="lazy" data-cursor="zoom"><figcaption>${esc(r.cap)}</figcaption></figure>`).join('')}
      </div>` : ''}
    </section>`).join('')}

    ${pg.coursework ? `
    <section class="wrap tool-course-head">
      <p class="label">Coursework</p>
      <h2 class="tool-h2">${esc(pg.coursework.title)}</h2>
      <p class="cs-summary">${esc(pg.coursework.text)}</p>
    </section>
    ${pg.coursework.items.map((c, n) => chapterHTML(c, n, pg.coursework.items.length, false)).join('')}
    ${pg.coursework.book ? `
    <section class="wrap tool-book">
      <ul class="ch-files"><li><a href="${pg.coursework.book.href}" download><span>${esc(pg.coursework.book.label)}</span><em>${esc(pg.coursework.book.type)}</em></a></li></ul>
    </section>` : ''}` : ''}

    ${(pg.sections || []).map((s, n) => `
    <section class="wrap sk-sec">
      <div class="sk-head">
        <p class="label">${pad(n + 1)} / ${pad(pg.sections.length)}</p>
        <h2 class="tool-h2">${esc(s.title)}</h2>
        <p class="sk-text">${esc(s.text)}</p>
      </div>
      <div class="sk-grid">${s.items.map(x => `
        <figure class="tool-sketch"><img src="${x.src}" alt="${esc(s.title)}" loading="lazy" data-cursor="zoom">${x.cap ? `<figcaption>${esc(x.cap)}</figcaption>` : ''}</figure>`).join('')}
      </div>
    </section>`).join('')}

    ${pg.sketches?.length ? `
    ${pg.sections ? `<section class="wrap sk-sec"><div class="sk-head"><p class="label">Project sketches</p><h2 class="tool-h2">From the projects</h2><p class="sk-text">Sketches made inside each case study, linked back to their project.</p></div></section>` : ''}
    <section class="wrap tool-wall">${pg.sketches.map(x => `
      <figure class="tool-sketch rv">
        <img src="${x.src}" alt="${esc(x.cap)}" loading="lazy" data-cursor="zoom">
        <figcaption><span>${esc(x.cap)}</span>${proj(x.project) ? `<a href="#/${x.project}">${esc(proj(x.project).name)} →</a>` : ''}</figcaption>
      </figure>`).join('')}
    </section>` : ''}

    <section class="cs-more">
      <div class="wrap">
        <div class="more-head"><p class="label">Other tools</p><a class="label" href="#modelling">All tools →</a></div>
        <ol class="more-list">${M.filter(o => o !== t).map(o => `
          <li><a class="more-row" href="${o.slug ? `#/tool/${o.slug}` : '#modelling'}">
            <span class="more-n">${pad(M.indexOf(o) + 1)}</span>
            <span class="more-t">${esc(o.tool)}</span>
            <span class="more-m">${esc(o.role)}</span>
            <span class="more-y">${o.slug ? '' : 'soon'}</span>
            <span class="more-go">→</span>
          </a></li>`).join('')}
        </ol>
      </div>
    </section>`;
  observe(cs);
  if (pg.vase) mountVaseInto($('#gh-vase'));
}

/* the live Grasshopper vase: three.js loads only when the page opens */
const VASE_JS = './vase.js?v=4';
let vaseLive = null, vaseReq = 0;
function dropVase() { vaseReq++; vaseLive?.dispose(); vaseLive = null; }
function mountVaseInto(el) {
  dropVase();
  const me = vaseReq;
  import(VASE_JS).then(({ mountVase }) => {
    if (me !== vaseReq || !el.isConnected) return;
    vaseLive = mountVase(el);
  }).catch(() => { if (me === vaseReq) el.innerHTML = holoNote(); });
}

/* ============================================================== ROUTER == */
const cs = $('#cs');

/* progress line + "which chapter am I in" for the top bar */
function csWhere() {
  const max = cs.scrollHeight - cs.clientHeight;
  const bar = $('#cs-prog');
  if (bar) bar.style.transform = `scaleX(${max > 0 ? cs.scrollTop / max : 0})`;
  const where = $('#cs-where');
  if (!where) return;
  const secs = $$('[data-ch]', cs);
  if (!secs.length) return;                             /* a tool page keeps its name */
  let cur = null;
  secs.forEach(sec => { if (sec.getBoundingClientRect().top < innerHeight * .45) cur = sec; });
  const total = secs.filter(x => x.dataset.ch !== 'reflect').length;
  const text = !cur ? 'Overview'
    : cur.dataset.ch === 'reflect' ? 'Reflection'
    : `${pad(+cur.dataset.ch + 1)} / ${pad(total)} — ${cur.querySelector('h2').textContent}`;
  if (where.textContent !== text) {
    where.classList.remove('swap'); void where.offsetWidth; where.classList.add('swap');
    where.textContent = text;
  }
}
cs.addEventListener('scroll', csWhere, { passive: true });

function route() {
  const m = location.hash.match(/^#\/(.+)$/);
  const tool = m && m[1].startsWith('tool/') && SITE.modelling.find(t => t.slug === m[1].slice(5) && t.page);
  if (m) {
    const p = tool ? null : bySlug(m[1]);
    if (!p && !tool) { location.hash = '#work'; return; }
    dropVase();
    if (tool) renderTool(tool); else renderCase(p);
    cs.scrollTop = 0;
    csLenis?.scrollTo(0, { immediate: true, force: true }); csLenis?.resize();
    cs.classList.add('open');
    cs.setAttribute('tabindex', '-1');
    cs.focus({ preventScroll: true });
    document.body.classList.add('locked');
    lenis?.stop();
    document.title = `${tool ? tool.tool : p.name} — ${SITE.name}`;
    cursorReset();
    return;
  }

  if (cs.classList.contains('open')) {
    cs.classList.remove('open');
    document.body.classList.remove('locked');
    lenis?.start();
    close3d(); dropInline(); dropVase();
    document.title = `${SITE.name} — Industrial Designer`;
    const t = location.hash && $(location.hash);
    /* a project card fills the screen; anything else is centred */
    if (t) scrollToEl(t, { immediate: true, offset: t.classList.contains('stack-anchor') ? 0
      : t.offsetHeight > innerHeight ? -60 : -(innerHeight - t.offsetHeight) / 2 });   /* a tall section: its top */
    cursorReset();
    setTimeout(() => { if (!cs.classList.contains('open')) cs.innerHTML = ''; }, 500);
  }
}

/* in-page anchors go through Lenis so the smooth scroll isn't fighting them */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || cs.classList.contains('open')) return;
  const href = a.getAttribute('href');
  if (href.startsWith('#/') || href === '#') return;
  const t = href === '#top' ? document.body : $(href);
  if (!t) return;
  e.preventDefault();
  history.replaceState(null, '', href);
  scrollToEl(t, { offset: 0 });
});

/* ============================================================== CURSOR == */
/* After sushantvohra.com: a dot that springs after the pointer and changes
   into whatever the thing underneath it needs — a label, a preview, a face. */
const cur = $('#cur'), curLabel = $('#cur-label'), curImg = $('#cur-img');
const P = { x: innerWidth / 2, y: innerHeight / 2 };   // pointer
const C = { x: P.x, y: P.y };                          // cursor (lagging)
let curTarget = null, sayT = null, curLocked = false;

/* only a few places say anything: a project card, the ring, the email address */
const LABELS = { view: 'View', copy: 'Copy email', drag: '←  →' };

function cursorSet(el) {
  curTarget = el;
  if (curLocked) return;
  cur.className = 'cur';
  if (!el) return;
  const kind = el.dataset.cursor;
  if (kind === 'face') {
    curImg.src = SITE.portrait;
    cur.classList.add('is-media', 'is-face');
  } else if (kind === 'media') {
    curImg.src = el.dataset.img;
    cur.classList.add('is-media');
  } else if (LABELS[kind]) {
    curLabel.textContent = el.dataset.label || LABELS[kind];
    cur.classList.add('is-pill');
  } else {
    cur.classList.add('is-link');
  }
}
function cursorReset() { curLocked = false; cursorSet(null); }
function cursorSay(text) {
  curLocked = true;
  cur.className = 'cur is-pill';
  curLabel.textContent = text;
  clearTimeout(sayT);
  sayT = setTimeout(() => { curLocked = false; cursorSet(curTarget); }, 1300);
}

function bindCursor() {
  if (!FINE) return;
  document.documentElement.classList.add('has-cur');
  addEventListener('pointermove', e => { P.x = e.clientX; P.y = e.clientY; cur.style.opacity = 1; }, { passive: true });
  document.addEventListener('pointerleave', () => { cur.style.opacity = 0; });
  addEventListener('pointerdown', () => cur.classList.add('is-down'));
  addEventListener('pointerup',   () => cur.classList.remove('is-down'));
  document.addEventListener('pointerover', e => {
    const el = e.target.closest('[data-cursor], a, button');
    if (el !== curTarget) cursorSet(el);
  });
}

function cursorFrame() {
  if (!FINE) return;
  const k = REDUCED ? 1 : .2;
  const dx = P.x - C.x;
  C.x += dx * k; C.y += (P.y - C.y) * k;
  cur.style.transform = `translate3d(${C.x}px,${C.y}px,0)`;
  /* previews tilt with the direction of travel */
  cur.style.setProperty('--mrot', `${clamp(dx * .12, -14, 14).toFixed(2)}deg`);
}

/* magnetic nav links */
function bindMagnets() {
  if (!FINE || REDUCED) return;
  $$('[data-magnet]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .35;
      const y = (e.clientY - r.top - r.height / 2) * .5;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, 500);
    });
  });
}

/* nav tucks away when reading down, returns on the way up */
let lastY = 0;
function navFrame() {
  const y = scrollY, nav = $('#nav');
  nav.classList.toggle('scrolled', y > 10);
  if (Math.abs(y - lastY) > 4) {
    nav.classList.toggle('hide', y > lastY && y > innerHeight * .8);
    lastY = y;
  }
}

/* Mudit in the contact section leans toward the cursor; the disc behind him
   drifts the other way and rises a little with the scroll */
function meFrame() {
  const me = $('#me');
  const r = me.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight || REDUCED) return;
  const t = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
  const lean = FINE ? clamp((C.x - (r.left + r.width / 2)) / (innerWidth / 2), -1, 1) : 0;
  const img = $('#me-img'), disc = $('#me-disc');
  img.style.setProperty('--ir', `${(lean * 3).toFixed(2)}deg`);
  disc.style.setProperty('--dx', `${(-lean * 22).toFixed(1)}px`);
  disc.style.setProperty('--dy', `${((.5 - t) * 60).toFixed(1)}px`);
}

/* =================================================================== LOOP == */
function loop(time) {
  lenis?.raf(time);
  if (cs.classList.contains('open')) {
    /* pictures load in after the page opens and make it longer; the smooth
       scroll has to know, or it stops at the old end */
    if (csLenis && cs.scrollHeight !== csH) { csH = cs.scrollHeight; csLenis.resize(); }
    csLenis?.raf(time); x3dLenis?.raf(time); sxFrame(); inlineFrame();
  }
  ringFrame(time);
  stackFrame();
  cursorFrame();
  navFrame();
  meFrame();
  requestAnimationFrame(loop);
}

/* ============================================================= REVEALS == */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1, rootMargin: '0px 0px -6% 0px' });
const observe = (root = document) => $$('.rv:not(.in)', root).forEach(el => io.observe(el));

/* numbers count up from zero the first time they come into view */
function bindCounters() {
  const run = dd => {
    const to = +dd.dataset.to, t0 = performance.now(), dur = 1400;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      dd.textContent = pad(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    co.unobserve(e.target);
    $$('dd[data-to]', e.target).forEach(run);
  }), { threshold: .4 });
  if (REDUCED || !$('#facts')) return;
  $$('#facts dd[data-to]').forEach(dd => { dd.textContent = '00'; });
  co.observe($('#facts'));
}

/* ============================================================ LIGHTBOX == */
function bindLightbox() {
  const lb = $('#lb'), img = $('#lb-img');
  document.addEventListener('click', e => {
    const z = e.target.closest('[data-cursor="zoom"]');
    if (!z) return;
    img.src = z.dataset.full || z.currentSrc || z.src;
    lb.classList.add('open');
    cursorSet(lb);
  });
  const close = () => { lb.classList.remove('open'); cursorSet(null); };
  lb.addEventListener('click', close);
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (lb.classList.contains('open')) close();
    else if (x3d.classList.contains('open')) close3d();
    else if (cs.classList.contains('open')) location.hash = $('#cs .back').getAttribute('href');
  });
}

/* ================================================================ BOOT == */
buildHero();
buildRing();
buildStack();
buildModelling();
buildReel();
buildMenu();
buildAbout();
buildContact();
bindCounters();
observe();
bindCursor();
bindMagnets();
bindLightbox();
addEventListener('hashchange', route);
route();
requestAnimationFrame(loop);
/* rAF alone stalls in a background tab, so the entrance has a timer too */
/* the opening flash: a count to 100 in under a second, then the screen
   splits open; the landing's words rise in as it does */
(function intro() {
  const el = $('#intro'), ready = () => document.body.classList.add('ready');
  if (!el || document.documentElement.classList.contains('no-intro')) {
    requestAnimationFrame(ready); setTimeout(ready, 300); el?.remove(); return;
  }
  try { sessionStorage.setItem('intro', '1'); } catch (e) {}
  document.body.classList.add('locked');
  const count = $('.intro-count', el), line = $('.intro-line', el), t0 = performance.now(), RUN = 900;
  const step = now => {
    const k = Math.min(1, (now - t0) / RUN), e = 1 - Math.pow(1 - k, 3);
    count.textContent = String(Math.round(e * 100)).padStart(2, '0');
    line.style.setProperty('--p', e.toFixed(3));
    if (k < 1) return requestAnimationFrame(step);
    setTimeout(() => {
      el.classList.add('open');
      document.body.classList.remove('locked');
      setTimeout(ready, 250);
      setTimeout(() => el.remove(), 1000);
    }, 120);
  };
  requestAnimationFrame(step);
})();
})();
