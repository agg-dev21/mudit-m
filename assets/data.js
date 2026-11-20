/* ==========================================================================
   SITE DATA  —  Mudit Manocha, Industrial Design
   Everything the site renders comes from this file.
   Image paths are relative to the site root.
   ========================================================================== */

const ASSETS = 'assets/';

const SITE = {
  name:      'Mudit Manocha',
  initials:  'MM',
  role:      'Industrial Design Student',
  tagline:   'Designing with curiosity',

  /* The revolving ring of photos in the opening screen.
     Each card links to its project; the front card shows the project name. */
  carousel: [
    { project: 'electric-stove',        img: ASSETS + 'electric-stove-body-handle-s-01-28ab8b2915.jpg' },
    { project: 'cochlear-fit-enhancer', img: ASSETS + 'cochlear-implant-fit-enhance-03-6847091a4a.jpg' },
    { project: 'washer-lamp',           img: ASSETS + 'lamp/lamp-cover.jpg' },
    { project: 'module-for-chair',      img: ASSETS + 'chair/chair-cover.jpg' },
    { project: 'electric-stove',        img: ASSETS + 'electric-stove-body-handle-s-01-df7c04f617.jpg' },
    { project: 'cochlear-fit-enhancer', img: ASSETS + 'cochlear-implant-fit-enhance-03-de20e24b41.jpg' },
    { project: 'aerion-one',            img: ASSETS + 'aerion/a26-cover.jpg' },
    { project: 'spinner-plate',         img: ASSETS + 'plate/plate-47.jpg' },
    { project: 'electric-stove',        img: ASSETS + 'electric-stove-body-handle-s-01-8c9577cd6f.jpg' },
    { project: 'cochlear-fit-enhancer', img: ASSETS + 'cochlear-implant-fit-enhance-03-b00acc719b.jpg' },
    { project: 'crown-lamp',            img: ASSETS + 'rhino/a5-crown-cover.jpg' },
    { project: 'watch-table',           img: ASSETS + 'rhino/a6-watch-room-4.jpg' },
    { project: 'ear-container',         img: ASSETS + 'rhino/a7-printed-open.jpg' }
  ],
  status: 'Available for internships',
  location:  'Savannah, GA',
  school:    'SCAD',
  email:     'muditmanocha2@gmail.com',
  resume:    ASSETS + 'Mudit_Manocha_Resume.pdf',
  logo:      ASSETS + 'logo-a3dca4ae30.jpg',
  portrait:  ASSETS + 'portrait-2f12f6d817.png',
  aboutBg:   ASSETS + 'about-bg-da845aacdf.jpg',

  /* About: a one-line statement, the four steps every project goes
     through (each shown with a piece of his work), and a dated record
     taken from the resume. The title block uses school, location, status,
     degree and resume from the fields above. */
  about: {
    statement: 'Draw → Model → Render → Make',
    degree: 'BFA Industrial Design, expected 2029',
    steps: [
      /* four different products, one for each step */
      { verb: 'Draw',   img: ASSETS + 'electric-stove-body-handle-s-01-3db8b79518.jpg', href: '#/electric-stove', go: 'Electric Stove',
        text: 'Pencil first. The electric stove’s body and silhouette were worked out on paper.' },
      { verb: 'Model',  img: ASSETS + 'rhino/a7-rhino-model.jpg', href: '#/ear-container', go: 'Ear Container',
        text: 'Then Rhino. The ear container’s body, lid, spiral and thread, each modelled as its own part.' },
      { verb: 'Render', img: ASSETS + 'rhino/a5-crown-lamp-render.jpg', href: '#/crown-lamp', go: 'Crown Lamp',
        text: 'KeyShot for material and light: gold, bronze and glass on the crown lamp.' },
      { verb: 'Make',   img: ASSETS + 'lamp/lamp-02.jpg', href: '#/washer-lamp', go: 'Washer Lamp',
        text: 'Then by hand. The washer lamp was built from steel washers and wire.' }
    ],
    timeline: [
      { y: '2023', t: '2nd place, Design & Technology competition' },
      { y: '2023', t: 'Future Careers in Game Design workshop, École Intuit Lab, New Delhi' },
      { y: '2024', t: 'Atlas Summer Program: drawing, sketching and photography, Atlas SkillTech University, Mumbai' },
      { y: '2024', t: 'Creative Intelligence Award, Design & Technology' },
      { y: '2025–26', t: 'Dean’s List, SCAD, Fall 2025 – Spring 2026' },
      { y: '2026', t: '3rd place and a $2,000 honorary scholarship, SCADstartUp: Cogniva, a team-built companion robot that reduces social isolation in senior living communities' },
      { y: '2026', t: 'Club officer, IDSA club at SCAD' },
      { y: 'Now',  t: 'Open to internships', now: true },
      { y: '2029', t: 'BFA Industrial Design, SCAD (expected)', future: true }
    ]
  },

  ctaLine1: "Let's make",
  ctaLine2: 'something real.',

  socials: [
    { label: 'LinkedIn',  short: 'IN', url: 'https://www.linkedin.com/in/muditmanocha007' },
    { label: 'Instagram', short: 'IG', url: 'https://www.instagram.com/justmudit_' }
  ],


  /* Modelling section — one row per tool. `img` is a piece of work made with
     it; `cap` names it. Swap either freely; img: null shows a quiet
     "work to come" panel until there is something made with that tool.
     `gallery` (optional) is several pieces, shown one after another while
     the row is open; `fit: 'contain'` keeps a tall picture whole.
     A tool with a `slug` and `page` gets a page of its own (#/tool/slug):
       models  one section each: its four Rhino views, its renders, and
               his own screenshots of it
       sketches  a wall of drawings, each tagged with its project */
  modelling: [
    { tool: 'Rhino & KeyShot', role: 'Modelling & rendering', slug: 'rhino-keyshot',
      page: {
        intro: 'Every product here was surfaced in Rhino, and most were rendered in KeyShot. Model by model: how it sits in Rhino’s four views, beside what KeyShot made of it. The last three have no KeyShot render, so they’re shown in a plain studio view drawn from his Rhino file.',
        models: [
          { project: 'electric-stove', name: 'Electric Stove — Concept 1', views: ASSETS + 'rhino4-stove-1.jpg?v=3',
            renders: [ { src: ASSETS + 'electric-stove-body-handle-s-01-28ab8b2915.jpg', cap: 'Final render' },
                       { src: ASSETS + 'electric-stove-body-handle-s-01-8c9577cd6f.jpg', cap: 'In context on the counter' } ] },
          { project: 'electric-stove', name: 'Electric Stove — Concept 2', views: ASSETS + 'rhino4-stove-2.jpg?v=3',
            renders: [ { src: ASSETS + 'electric-stove-body-handle-s-01-402197befe.jpg', cap: 'Final render' },
                       { src: ASSETS + 'electric-stove-body-handle-s-01-f1b58eaccb.jpg', cap: 'In context on the counter' } ] },
          { project: 'cochlear-fit-enhancer', name: 'Cochlear Implant Fit Enhancer', views: ASSETS + 'rhino4-cochlear.jpg?v=3',
            renders: [ { src: ASSETS + 'cochlear-implant-fit-enhance-03-de20e24b41.jpg', cap: 'Final render' } ] },
          { project: 'aerion-one', name: 'Aerion One', views: ASSETS + 'aerion/a26-rhino-views.jpg',
            renders: [ { src: ASSETS + 'aerion/a26-hero.jpg', cap: 'Final render, on the desk', tall: true },
                       { src: ASSETS + 'aerion/a26-inuse.jpg', cap: 'Door open, tank out' },
                       { src: ASSETS + 'aerion/a26-fan.jpg', cap: 'Copper-blade fan' } ] }
        ]
      },
      note: 'Surfaces built in Rhino, then materials, light and colourways in KeyShot — the product as it would be made.',
      img: ASSETS + 'electric-stove-body-handle-s-01-28ab8b2915.jpg', cap: 'Electric Stove — Concept 1',
      gallery: [
        { img: ASSETS + 'electric-stove-body-handle-s-01-28ab8b2915.jpg', cap: 'Electric Stove — Concept 1' },
        { img: ASSETS + 'cochlear-implant-fit-enhance-03-de20e24b41.jpg', cap: 'Cochlear Implant Fit Enhancer — final render' },
        { img: ASSETS + 'electric-stove-body-handle-s-01-402197befe.jpg', cap: 'Electric Stove — Concept 2' },
        { img: ASSETS + 'aerion/a26-hero.jpg', cap: 'Aerion One', fit: 'contain' },
        { img: ASSETS + 'cochlear-implant-fit-enhance-03-41b24c8106.jpg', cap: 'Cochlear Implant Fit Enhancer — CAD model' },
        { img: ASSETS + 'electric-stove-body-handle-s-01-8c9577cd6f.jpg', cap: 'Electric Stove — in context' }
      ] },
    { tool: 'Grasshopper', role: 'Parametric design', slug: 'grasshopper',
      page: { intro: 'Rule-based form in Grasshopper — a definition of points, curves and patterns where changing one input reshapes the whole object.',
              vase: { note: 'Rebuilt live in the browser from his definition: the same four lofted circles, attractor spiral, radius and S-curve falloff. Tile count, tile size, falloff strength and how far the tiles turn and lift are matched by eye to his render.' } },   // coursework filled in below
      note: 'Rule-based patterns and variations — change one input and the whole form follows.',
      img: ASSETS + 'rhino/a8-grasshopper-form.jpg', cap: 'Parametric vase', fit: 'contain',
      gallery: [
        { img: ASSETS + 'rhino/a8-grasshopper-form.jpg', cap: 'Parametric vase', fit: 'contain' },
        { img: ASSETS + 'rhino/a8-grasshopper-definition.jpg', cap: 'The Grasshopper definition', fit: 'contain' }
      ] },
    { tool: 'Sketches',    role: 'Drawing', slug: 'sketches',
      page: {
        intro: 'I think with a pen. The page follows how a project runs: finished concepts first, then the exploration behind them, then the drawing skills underneath. Perspective, marker rendering, orthographics, exploded views and mechanisms, all by hand.',
        sketches: [
          { src: ASSETS + 'electric-stove-body-handle-s-01-3db8b79518.jpg', project: 'electric-stove', cap: 'Body silhouettes' },
          { src: ASSETS + 'electric-stove-body-handle-s-01-146796ca89.jpg', project: 'electric-stove', cap: 'Handle profiles' },
          { src: ASSETS + 'cochlear-implant-fit-enhance-03-c106688831.jpg', project: 'cochlear-fit-enhancer', cap: 'Ideation' },
          { src: ASSETS + 'cochlear-implant-fit-enhance-03-d276b0bd79.jpg', project: 'cochlear-fit-enhancer', cap: 'Ideation' },
          { src: ASSETS + 'module-for-chair-06-75963e567c.jpg', project: 'module-for-chair', cap: 'Storyboard' },
          { src: ASSETS + 'cochlear-implant-fit-enhance-03-6bef938772.jpg', project: 'cochlear-fit-enhancer', cap: 'Ideation' },
          { src: ASSETS + 'module-for-chair-06-575648948d.jpg', project: 'module-for-chair', cap: 'Mechanism sketches' },
          { src: ASSETS + 'cochlear-implant-fit-enhance-03-873e8dc290.jpg', project: 'cochlear-fit-enhancer', cap: 'Ideation' },
          { src: ASSETS + 'module-for-chair-06-d12044c064.jpg', project: 'module-for-chair', cap: 'The locking sequence' },
          { src: ASSETS + 'cochlear-implant-fit-enhance-03-b7f59bd2fc.jpg', project: 'cochlear-fit-enhancer', cap: 'Narrowing toward a clip' }
        ]
      },
      note: 'Where every project starts — proportions, silhouettes and grips worked out on paper first.',
      img: ASSETS + 'electric-stove-body-handle-s-01-3db8b79518.jpg', cap: 'Electric Stove — body silhouettes' }
  ],

  capabilities: [
    { group: 'Make',    items: ['Sketching', 'Form Development', 'Prototyping', '3D Printing'] },
    { group: 'Model',   items: ['Rhino', 'KeyShot', 'SketchUp', 'Grasshopper'] },
    { group: 'Resolve', items: ['Rendering', 'Material Research', 'Ergonomics', 'Mechanism Design'] }
  ]
};

/* --------------------------------------------------------------------------
   PROJECTS — order here is the order on the page.

   Each case study reads in this order:
     summary      one sentence: what the thing is
     glance       problem / approach / outcome — the whole project in brief
     chapters     the story, one step at a time. Each chapter has a title,
                  text (a string, or a list of paragraphs) and media.
                  media entries are either one image  { src, cap }
                  or a row of images                  [ { src, cap }, { src, cap } ]
     reflection   the closing thought

   A project with models opens on its 3D model, pinned while the scroll walks
   through short steps. By default the steps are the glance (problem,
   approach — shown taken apart — and outcome). scenes replaces them:
     { k: 'label', text: '…', model: 0, yaw: 0, tilt: 0, apart: false }
   model is which of models to show; yaw turns it round (radians, + is
   anticlockwise seen from above), tilt tips its top toward you; apart shows
   it exploded.
   -------------------------------------------------------------------------- */

const IMG = f => ASSETS + f;

const PROJECTS = [

/* ========================= 01 — ELECTRIC STOVE ========================== */
{
  slug: 'electric-stove',
  name: 'Electric Stove',
  nameLine2: 'Body & Handle System',
  subtitle: 'Form development, ergonomic grip exploration, and product architecture for a compact electric stove.',
  discipline: 'Product Design',
  year: '2026',
  role: 'Industrial Designer',
  tools: ['Sketching', 'CAD', 'Form Development'],
  cover: IMG('stove/stove-cover.jpg'),
  win:   IMG('stove/stove-cover.jpg'), winPos: 'center 55%',
  hero:  IMG('electric-stove-body-handle-s-01-8c9577cd6f.jpg'),
  models: [ { label: 'Concept 1', src: ASSETS + 'models/stove-concept-1.glb?v=2' },
            { label: 'Concept 2', src: ASSETS + 'models/stove-concept-2.glb?v=2' } ],   // real Rhino models
  /* the scroll goes through both concepts: each one whole, then apart */
  scenes: [
    { k: 'The problem', model: 0, yaw: .85, tilt: .12,
      text: 'A compact stove is lifted, carried and cleaned as much as it is cooked on — so the body and the handle have to work as one object, not two.' },
    { k: 'Concept 1 — Soft triangular geometry', model: 0, yaw: -.15, tilt: .8,
      text: 'A compact triangular footprint with softened edges, for a lightweight and approachable countertop form.' },
    { k: 'Concept 1 — Components', model: 0, yaw: -.6, tilt: .06, apart: true,
      text: 'Taken apart — the body, the cooking surface, the control strip and the knob, and how the first direction goes together.' },
    { k: 'Concept 2 — Extended control zone', model: 1, yaw: -.5, tilt: .2,
      text: 'A more conventional rectangular form with a dedicated control area and an integrated side handle.' },
    { k: 'Concept 2 — Components', model: 1, yaw: -.6, tilt: .06, apart: true,
      text: 'Taken apart — the top glass, the control keys, the side handle and the body, built around the extended control zone.' },
    { k: 'The outcome', model: 1, yaw: .6, tilt: .16,
      text: 'Two resolved concepts with CAD surfacing, orthographic sets and exploded assemblies, plus grip studies for finger clearance and comfort.' }
  ],

  summary: 'This project explores different directions for a compact electric stove, focusing on the relationship between the stove body, carrying handle, and user grip.',
  glance: {
    problem:  'A compact stove is lifted, carried and cleaned as much as it is cooked on — so the body and the handle have to work as one object, not two.',
    approach: 'Two body directions were developed side by side, each with its own control layout and integrated handle, then tested against four grip systems.',
    outcome:  'Two resolved concepts with CAD surfacing, orthographic sets and exploded assemblies, plus grip studies for finger clearance and comfort.'
  },

  chapters: [
    { title: 'Ideation',
      text: [
        'Early sketches exploring stove proportions, body silhouettes, control placement, and handle grip profiles.',
        'Focus areas — body proportions, control placement, handle profiles, finger clearance, grip interaction.'
      ],
      media: [
        [ { src: IMG('electric-stove-body-handle-s-01-3db8b79518.jpg'), cap: 'Body silhouettes' },
          { src: IMG('electric-stove-body-handle-s-01-146796ca89.jpg'), cap: 'Handle profiles' } ]
      ] },

    { title: 'Concept 1 — Soft triangular geometry',
      text: 'Exploring a compact triangular footprint with softened edges to create a lightweight and approachable countertop form.',
      media: [
        { src: IMG('electric-stove-body-handle-s-01-28ab8b2915.jpg'), cap: 'Final render' },
        [ { src: IMG('electric-stove-body-handle-s-01-0b73671a2b.jpg'), cap: 'Orthographic set' },
          { src: IMG('electric-stove-body-handle-s-01-cef376a2be.jpg'), cap: 'Surfacing in CAD' } ],
        { src: IMG('electric-stove-body-handle-s-01-d32606da93.jpg'), cap: 'Exploded view — components and materials' },
        { src: IMG('electric-stove-body-handle-s-01-8c9577cd6f.jpg'), cap: 'In context on the counter' }
      ] },

    { title: 'Concept 2 — Extended control zone',
      text: 'Exploring a more conventional rectangular form with a dedicated control area and integrated side handle.',
      media: [
        { src: IMG('electric-stove-body-handle-s-01-402197befe.jpg'), cap: 'Final render' },
        [ { src: IMG('electric-stove-body-handle-s-01-93317a6907.jpg'), cap: 'Orthographic set' },
          { src: IMG('electric-stove-body-handle-s-01-0daee852e5.jpg'), cap: 'Control layout and proportion study' } ],
        { src: IMG('electric-stove-body-handle-s-01-c957ec8356.jpg'), cap: 'Exploded view — components and materials' },
        { src: IMG('electric-stove-body-handle-s-01-f1b58eaccb.jpg'), cap: 'In context on the counter' }
      ] },

    { title: 'Handle development',
      text: 'Four grip systems were developed to investigate finger clearance, contact points, comfort, and integration with the stove body.',
      media: [
        { src: IMG('electric-stove-body-handle-s-01-df7c04f617.jpg'), cap: 'Handles design for infrared electric stove' },
        [ { src: IMG('stove/handle-10.jpg'), cap: 'Handle 1' }, { src: IMG('stove/handle-11.jpg'), cap: '' } ],
        [ { src: IMG('stove/handle-12.jpg'), cap: '' }, { src: IMG('stove/handle-13.jpg'), cap: '' } ],
        [ { src: IMG('stove/handle-14.jpg'), cap: 'Handle 2' }, { src: IMG('stove/handle-15.jpg'), cap: '' } ],
        [ { src: IMG('stove/handle-16.jpg'), cap: '' }, { src: IMG('stove/handle-17.jpg'), cap: '' } ],
        [ { src: IMG('stove/handle-18.jpg'), cap: 'Handle 3' }, { src: IMG('stove/handle-19.jpg'), cap: '' } ],
        [ { src: IMG('stove/handle-20.jpg'), cap: '' }, { src: IMG('stove/handle-21.jpg'), cap: '' } ],
        [ { src: IMG('stove/handle-22.jpg'), cap: 'Handle 4' }, { src: IMG('stove/handle-23.jpg'), cap: '' } ],
        [ { src: IMG('stove/handle-24.jpg'), cap: '' }, { src: IMG('stove/handle-25.jpg'), cap: '' } ],
        [ { src: IMG('stove/handle-26.jpg'), cap: 'Tapered split for finger clearance' }, { src: IMG('stove/handle-27.jpg'), cap: 'Individual finger domes for a secure four-point grip' } ]
      ] }
  ],

  reflection: 'Good product design is never only about how something looks. Proportion, weight, material and comfort have to work together until the object simply feels right.'
},

/* ======================== 02 — COCHLEAR IMPLANT ========================= */
{
  slug: 'cochlear-fit-enhancer',
  name: 'Cochlear Implant',
  nameLine2: 'Fit Enhancer',
  subtitle: 'An assistive accessory for stabilizing cochlear implants with spectacles — designed from my own daily experience with fit and pressure issues.',
  discipline: 'Assistive Design',
  year: '2025',
  role: 'Industrial Designer',
  tools: ['Sketching', 'CAD', 'Material Research'],
  materials: 'Silicone, TPE',
  cover: IMG('cochlear-implant-fit-enhance-03-b945f64a88.jpg'),
  win:   IMG('cochlear-implant-fit-enhance-03-b945f64a88.jpg'), winPos: 'center 35%',
  hero:  IMG('cochlear-implant-fit-enhance-03-b945f64a88.jpg'),
  models: [ { label: 'Clip', src: ASSETS + 'models/cochlear.glb' } ],

  summary: 'An assistive accessory for cochlear implant users who also wear glasses, designed from my own daily experience with fit and pressure issues.',
  glance: {
    problem:  'Glasses and a behind-the-ear hearing aid compete for the same small space. Adjusting the glasses disturbs the aid, and the overlap adds pressure and bulk.',
    approach: 'A compact clip that connects the hearing aid directly to the arm of the glasses, so the two sit together as one stable unit.',
    outcome:  'A four-part mechanism — outer case, guides, hook and torsion spring — modelled in CAD, specified in silicone and TPE, and shown in four colourways.'
  },

  chapters: [
    { title: 'The problem',
      text: [
        'Glasses and behind-the-ear hearing aids often occupy the same small area behind the ear, creating a conflict between the two. Putting on, removing, or adjusting the glasses can disturb the hearing aid, while overlapping components can create unwanted pressure and bulk.',
        'The goal was to create a compact mechanism that connects the hearing aid directly to the glasses, keeping it stable and properly positioned without compromising comfort or everyday usability.'
      ],
      media: [
        { src: IMG('cochlear-implant-fit-enhance-03-1eeb9c9bb5.jpg'), cap: 'Where the glasses and the hearing aid meet' }
      ] },

    { title: 'Ideation',
      text: 'Early exploration moved fast and wide — sketching a broad range of hook geometries, retention methods and mounting points before narrowing toward the strongest direction.',
      media: [
        [ { src: IMG('cochlear-implant-fit-enhance-03-c106688831.jpg'), cap: '' },
          { src: IMG('cochlear-implant-fit-enhance-03-d276b0bd79.jpg'), cap: '' } ],
        [ { src: IMG('cochlear-implant-fit-enhance-03-6bef938772.jpg'), cap: '' },
          { src: IMG('cochlear-implant-fit-enhance-03-873e8dc290.jpg'), cap: '' } ],
        [ { src: IMG('cochlear-implant-fit-enhance-03-8fd0bb118f.jpg'), cap: '' },
          { src: IMG('cochlear-implant-fit-enhance-03-26a1b22398.jpg'), cap: '' } ],
        [ { src: IMG('cochlear-implant-fit-enhance-03-6858667964.jpg'), cap: '' },
          { src: IMG('cochlear-implant-fit-enhance-03-b7f59bd2fc.jpg'), cap: 'Narrowing toward a clip on the glasses arm' } ]
      ] },

    { title: 'The mechanism',
      text: 'The clip is made of four parts: an outer case for structure, top and bottom guides that hold the hook in place, a C-shaped hook that holds the hearing aid, and a torsion spring that keeps the mechanism locked.',
      media: [
        [ { src: IMG('cochlear-implant-fit-enhance-03-7d2d07427a.jpg'), cap: '' },
          { src: IMG('cochlear-implant-fit-enhance-03-41b24c8106.jpg'), cap: 'CAD model' } ],
        { src: IMG('cochlear-implant-fit-enhance-03-908039b32e.jpg'), cap: 'Views of the clip' },
        { src: IMG('cochlear-drawing.jpg'), cap: 'Technical drawing' },
        { src: IMG('cochlear-implant-fit-enhance-03-8f5a774a74.jpg'), cap: 'Exploded view' },
        [ { src: IMG('cochlear-implant-fit-enhance-03-ac63746166.jpg'), cap: 'Outer case' },
          { src: IMG('cochlear-implant-fit-enhance-03-cbec3d154a.jpg'), cap: 'Top & bottom guide' } ],
        [ { src: IMG('cochlear-implant-fit-enhance-03-921622014d.jpg'), cap: 'Hook' },
          { src: IMG('cochlear-implant-fit-enhance-03-31afd34b4c.jpg'), cap: 'Torsion spring' } ]
      ] },

    { title: 'Using it',
      text: 'The sequence of attaching the hearing aid to the glasses — the clip holds it in place so the two can be worn and adjusted together.',
      media: [
        { src: IMG('cochlear-implant-fit-enhance-03-b6d913d0ae.jpg'), cap: 'Process of using it' }
      ] },

    { title: 'Materials & colour',
      text: [
        'Hook in flexible silicone / TPE. Contact areas in soft silicone for skin comfort.',
        'Four colorways explored for different user preferences.'
      ],
      media: [
        { src: IMG('cochlear-implant-fit-enhance-03-79305efdfe.jpg'), cap: 'Silicone and TPE' },
        [ { src: IMG('cochlear-implant-fit-enhance-03-b00acc719b.jpg'), cap: '' },
          { src: IMG('cochlear-implant-fit-enhance-03-b1f1c7552b.jpg'), cap: 'Colourways' } ]
      ] },

    { title: 'Final design',
      text: 'The resolved clip, worn with glasses and a behind-the-ear hearing aid.',
      media: [
        [ { src: IMG('cochlear-implant-fit-enhance-03-6847091a4a.jpg'), cap: '' },
          { src: IMG('cochlear-implant-fit-enhance-03-b945f64a88.jpg'), cap: 'Worn' } ],
        { src: IMG('cochlear-implant-fit-enhance-03-de20e24b41.jpg'), cap: 'Final render' }
      ] }
  ],

  reflection: 'This project reinforced that great product design is never only about how something looks — it is about proportion, weight, material and human comfort working together until the object simply feels right.'
},

/* ===================== 03 — HEADREST MECHANISM ========================= */
{
  slug: 'module-for-chair',
  name: 'Headrest Mechanism',
  nameLine2: 'Release & Lock Concept',
  subtitle: 'A concept for the internal workings of a swappable headrest — a module that slides in, locks itself, and releases with a push.',
  discipline: 'Mechanism Design',
  year: '2024',
  role: 'Industrial Designer',
  tools: ['Mechanism Design', 'CAD', '3D Printing'],
  cover: IMG('chair/chair-cover.jpg'),
  win:   IMG('chair/chair-cover.jpg'),
  hero:  IMG('chair/chair-cover.jpg'),
  models: [ { label: 'Study model', src: ASSETS + 'models/study-headrest.glb?v=4', study: true } ],   // built from the CAD sheets, not his file

  summary: 'A concept for the internal workings of a headrest: a release-and-locking mechanism that lets you swap the headrest when it no longer suits you, or take the back support off, by hand.',
  glance: {
    problem:  'A headrest is fixed the day the chair is bought — if it stops suiting you, there is nothing to change.',
    approach: 'A module that slides into the chair body and locks, with a button to release it, so parts can be swapped by hand.',
    outcome:  'Two mechanism directions drawn and modelled, an assembly sequence, and a storyboard of the module in use.'
  },

  chapters: [
    { title: 'The idea',
      text: 'I wanted to make a modular chair — changing the headrest when you are bored or feel uncomfortable, and removing your back support with some simple mechanism like release and locking.',
      media: [
        { src: IMG('chair/chair-01.jpg'), cap: 'The module and its housing' },
        { src: IMG('module-for-chair-06-d12044c064.jpg'), cap: 'How it locks, step by step' }
      ] },

    { title: 'How the lock works',
      text: 'A release and locking mechanism secures the module in place and allows for its controlled release when needed: the module slides in and locks, and a button inside frees it again.',
      media: [
        [ { src: IMG('module-for-chair-06-6751c853a0.jpg'), cap: 'Module released' },
          { src: IMG('module-for-chair-06-4a17e018bb.jpg'), cap: 'Module and housing' } ]
      ] },

    { title: 'Two mechanisms explored',
      text: [
        '1st mechanism: the button inside locks the module in place, and pushing it from outside frees the extended part so the module slides out.',
        '2nd mechanism: this mechanism locks itself with the module when slid in. It locks itself in the groove and is released when pushed.'
      ],
      media: [
        [ { src: IMG('chair/chair-06.jpg'), cap: 'The 1st mechanism, step by step' }, { src: IMG('chair/chair-08.jpg'), cap: 'Removable module' } ],
        [ { src: IMG('module-for-chair-06-085953f6ef.jpg'), cap: '' },
          { src: IMG('module-for-chair-06-575648948d.jpg'), cap: 'Sketches' } ],
        [ { src: IMG('module-for-chair-06-6d9e3ed630.jpg'), cap: '' },
          { src: IMG('module-for-chair-06-33cfd398b2.jpg'), cap: 'Models' } ],
        [ { src: IMG('module-for-chair-06-34ed525f61.jpg'), cap: 'The module' },
          { src: IMG('module-for-chair-06-7acd1a92ac.jpg'), cap: 'Assembly sequence' } ]
      ] },

    { title: 'Using it',
      text: 'Push the button and slide the headrest off the chair; line the next one up with the mechanism and slide it on until it locks.',
      media: [
        { src: IMG('module-for-chair-06-75963e567c.jpg'), cap: 'Storyboard — releasing, swapping and locking a headrest module' }
      ] },

    { title: '3D print model of the 1st and 2nd mechanism',
      media: [ { src: IMG('chair/chair-15.jpg'), cap: 'Printed mechanisms' } ] }
  ],

  reflection: 'This module helped me understand that designing a chair is not only about aesthetics, it is about proportions, weight distribution, and human comfort. I learned how small adjustments in angles or dimensions can completely change user experience. Working through sketching, model making, and material testing strengthened my ability to move from an abstract idea to a functional design. This project improved my visual communication, decision-making, and confidence in presenting my design process.'
},

/* ========================== 04 — WASHER LAMP ============================ */
{
  slug: 'washer-lamp',
  name: 'Washer Lamp',
  nameLine2: 'Light Through Repetition',
  subtitle: 'Exploring how a single mass-produced component can create texture, form, and light patterns.',
  discipline: 'Lighting',
  year: '2026',
  role: 'Industrial Designer',
  timeline: '1 Week',
  tools: ['Sketching', 'Prototyping', 'Fabrication'],
  materials: 'Steel Washers, Wire, LED Bulb',
  cover: IMG('lamp/lamp-02.jpg'),
  win:   IMG('lamp/lamp-cover.jpg'),
  hero:  IMG('lamp/lamp-cover.jpg'),
  models: [ { label: 'Study model', src: ASSETS + 'models/study-lamp.glb', study: true } ],        // built from the photo, not his file

  /* text and pictures follow his Adobe Portfolio page (/lamp), in its order */
  summary: 'Exploring how a single mass-produced component can create texture, form, and light patterns.',
  glance: {
    problem:  'Can one mass-produced component, a plain steel washer, create texture, form and light patterns on its own?',
    approach: 'Sketches of repeated washers as structure, then the shade built by hand on wire ring frames, washer by washer.',
    outcome:  'A hanging lamp of steel washers and wire around an LED bulb, made in one week.'
  },

  chapters: [
    { title: 'The lamp',
      text: 'Exploring how a single mass-produced component can create texture, form, and light patterns.',
      media: [
        [ { src: IMG('lamp/lamp-01.jpg'), cap: '' }, { src: IMG('lamp/lamp-03.jpg'), cap: '' } ],
        [ { src: IMG('lamp/lamp-02.jpg'), cap: '' }, { src: IMG('lamp/lamp-04.jpg'), cap: '' } ]
      ] },
    { title: 'Ideation',
      text: 'Exploring how repeated washers could create structure, transparency, and decorative light effects.',
      media: [
        [ { src: IMG('lamp/lamp-05.jpg'), cap: '' }, { src: IMG('lamp/lamp-06.jpg'), cap: '' } ],
        [ { src: IMG('lamp/lamp-07.jpg'), cap: '' }, { src: IMG('lamp/lamp-08.jpg'), cap: '' } ]
      ] },
    { title: 'Process',
      text: 'Built by hand in a week: washers, wire and pliers on the bench, the ring frames first, then the washers wired on until the shade took shape.',
      media: [
        [ { src: IMG('lamp/lamp-09.jpg'), cap: '' }, { src: IMG('lamp/lamp-10.jpg'), cap: '' } ],
        [ { src: IMG('lamp/lamp-11.jpg'), cap: '' }, { src: IMG('lamp/lamp-12.jpg'), cap: '' } ],
        [ { src: IMG('lamp/lamp-13.jpg'), cap: '' }, { src: IMG('lamp/lamp-14.jpg'), cap: '' } ],
        [ { src: IMG('lamp/lamp-15.jpg'), cap: '' }, { src: IMG('lamp/lamp-16.jpg'), cap: '' } ],
        { src: IMG('lamp/lamp-17.jpg'), cap: '' }
      ] }
  ]
},

/* ========================== 05 — AERION ONE ============================= */
{
  slug: 'aerion-one',
  name: 'Aerion One',
  nameLine2: 'Air Purifier',
  subtitle: 'A compact desk and bedside air purifier: a 2024 concept, redesigned in 2026 in Rhino and KeyShot.',
  discipline: 'Product Design',
  year: '2024 – 2026',
  role: 'Industrial Designer',
  tools: ['Sketching', 'SketchUp', 'Rhino 8', 'KeyShot', 'Premiere Pro'],
  materials: 'Olive metal, copper, smoked acrylic',
  cover: IMG('aerion/a26-cover.jpg'),
  win:   IMG('aerion/a26-cover.jpg'), winFit: 'contain', winBg: 'blur',
  hero:  IMG('aerion/a26-cover.jpg'),
  models: [ { label: 'Aerion One', src: ASSETS + 'models/aerion-one.glb?v=2' } ],   // from his 2026 Rhino file (assignment 9)

  /* Part one follows his Adobe Portfolio page (/aerion-one, 2024) in its order.
     Part two is the 2026 redesign: Rhino 8 Assignment 9, from his process book
     and his portfolio spread (the poster). */
  summary: 'A compact system that blends air cooling and purified airflow in one minimal form. First designed in 2024, then rebuilt in 2026 in Rhino and KeyShot as a three-tier unit that cleans and dries the air of a small room, with the filter and water tanks in easy reach.',
  glance: {
    problem:  'Coolers are bulky, loud and unappealing indoors; air purifiers give clean air but no thermal comfort. Nothing gives both in a size for a bedside or a desk.',
    approach: 'A vertical appliance in three layers: an airflow head, a middle module and a filtration base. Sketched and modelled in 2024, then rebuilt part by part in Rhino in 2026.',
    outcome:  'A Rhino model of every part, KeyShot materials, an exploded-view animation of about 1,000 frames, and a portfolio poster.'
  },

  chapters: [
    { title: 'About this model (2024)',
      text: 'AERION ONE is a compact smart cooling system that blends air cooling + purified airflow in one minimal cylindrical form. The design focuses on directional cooling airflow, clean aesthetics, and modular internal components.',
      media: [ { src: IMG('aerion/a24-01.jpg'), cap: 'Aerion One, 2024' } ] },
    { title: 'Why this product?',
      text: 'Traditional coolers are bulky, loud, and visually unappealing indoors. Air purifiers, on the other hand, offer clean air but no thermal comfort. AERION ONE bridges this gap by offering cool air + purified air in a compact form.',
      media: [ { src: IMG('aerion/a24-02.jpg'), cap: 'Coolers and purifiers on the market' } ] },
    { title: 'Research & insights',
      text: [
        'What users need:',
        [ 'Cool airflow without excess humidity', 'Compact size for bedrooms, study tables, and offices',
          'A direction-controlled outlet similar to car AC', 'Aesthetic product suitable for modern interiors' ]
      ],
      media: [ { src: IMG('aerion/a24-03.jpg'), cap: '' } ] },
    { title: 'Inspiration moodboard',
      media: [ [ { src: IMG('aerion/a24-04.jpg'), cap: '' }, { src: IMG('aerion/a24-05.jpg'), cap: '' } ],
        [ { src: IMG('aerion/a24-06.jpg'), cap: '' }, { src: IMG('aerion/a24-07.jpg'), cap: '' }, { src: IMG('aerion/a24-08.jpg'), cap: '' } ],
        { src: IMG('aerion/a24-09.jpg'), cap: '' } ] },
    { title: 'Technical insights',
      text: 'Understanding the cooling + purification process.',
      media: [ [ { src: IMG('aerion/a24-10.jpg'), cap: '' }, { src: IMG('aerion/a24-11.jpg'), cap: '' } ],
        { src: IMG('aerion/a24-12.jpg'), cap: '' } ] },
    { title: 'Ideation',
      text: 'Initial exploration focused on creating a vertical appliance that feels premium but functional. I experimented with airflow channels, filter placement, and a rotating top vent.',
      media: [ [ { src: IMG('aerion/a24-14.jpg'), cap: '' }, { src: IMG('aerion/a24-15.jpg'), cap: '' } ] ] },
    { title: 'Final concept direction',
      media: [ [ { src: IMG('aerion/a24-16.jpg'), cap: '' }, { src: IMG('aerion/a24-17.jpg'), cap: '' } ],
        [ { src: IMG('aerion/a24-18.jpg'), cap: '' }, { src: IMG('aerion/a24-19.jpg'), cap: '' } ] ] },
    { title: 'Exploded view',
      text: [
        'The model is divided into three layers, each with a clear function:',
        'Top airflow head', [ 'Contains the main motor', 'Responsible for directional airflow' ],
        'Middle cooling cartridge', [ 'Houses water-evaporation or cooling material', 'Circular holes bring air inside' ],
        'Bottom filtration base', [ 'Multi-layer filter (HEPA + carbon)', 'Large intake channels' ]
      ],
      media: [ [ { src: IMG('aerion/a24-20.jpg'), cap: '' }, { src: IMG('aerion/a24-21.jpg'), cap: '' }, { src: IMG('aerion/a24-22.jpg'), cap: '' } ],
        [ { src: IMG('aerion/a24-23.jpg'), cap: '' }, { src: IMG('aerion/a24-24.jpg'), cap: '' } ],
        [ { src: IMG('aerion/a24-25.jpg'), cap: '' }, { src: IMG('aerion/a24-26.jpg'), cap: '' }, { src: IMG('aerion/a24-27.jpg'), cap: '' } ] ] },
    { title: 'How it works',
      text: [
        'Airflow system:',
        [ '1. Air enters from all sides through vertical channels', '2. Air gets filtered using HEPA + activated carbon',
          '3. Air is cooled via the middle module (evaporation/cooling gel)', '4. Motor pushes the cool, clean air through the curved top vent' ],
        'This replicates the feel of a car AC vent, delivering targeted airflow.'
      ] },
    { title: 'Materials & finish (2024)',
      text: [ 'Body: bamboo finished polymer (warm, sustainable look)', 'Cooling panels: translucent blue polymer', 'Top vent: ABS plastic with matte texture' ],
      media: [ [ { src: IMG('aerion/a24-28.jpg'), cap: 'Bamboo finish' }, { src: IMG('aerion/a24-29.jpg'), cap: 'Matte ABS' }, { src: IMG('aerion/a24-30.jpg'), cap: 'Translucent blue polymer' } ] ] },
    { title: 'Final renders (2024)',
      media: [ [ { src: IMG('aerion/a24-31.jpg'), cap: '' }, { src: IMG('aerion/a24-33.jpg'), cap: '' } ],
        [ { src: IMG('aerion/a24-32.jpg'), cap: '' }, { src: IMG('aerion/a24-34.jpg'), cap: '' } ] ] },

    { title: 'The redesign: modelling in Rhino (2026)',
      text: [
        'In 2026 I rebuilt Aerion One in Rhino for my Rhino 8 class. I developed the design by creating individual components and assembling them into a modular product. It has three main sections: the upper air outlet, the central ventilation module, and the lower main body containing the filter compartment.',
        'I refined the overall shape, added ventilation details, display controls and other functional elements, and checked the model in the Perspective, Front, Right and Top views to review its proportions and overall structure.'
      ],
      media: [ { src: IMG('aerion/a26-rhino-views.jpg'), cap: 'Rhino: top, perspective, front and right' },
        [ { src: IMG('aerion/a26-rhino4.jpg'), cap: 'Form checked in four views' }, { src: IMG('aerion/a26-grill.jpg'), cap: 'Grill study for the air intake' }, { src: IMG('aerion/a26-head.jpg'), cap: 'Rounded head shell around the fan' } ] ],
      files: [ { label: 'Rhino file', type: '3DM', href: 'assets/rhino-files/09-aerion-one.3dm' } ] },
    { title: 'Design evolution',
      text: 'From a Rhino blockout of three tiers as simple volumes, to a first render with a radial intake and a tank window, to the final KeyShot render in olive metal, copper and a smoked door.',
      media: [ [ { src: IMG('aerion/a26-v1.jpg'), cap: 'V1: Rhino blockout' }, { src: IMG('aerion/a26-first-render.jpg'), cap: 'V2: first render' }, { src: IMG('aerion/a26-final.jpg'), cap: 'Final: KeyShot' } ],
        { src: IMG('aerion/aerion-one-01.jpg'), cap: 'An earlier KeyShot render' } ] },
    { title: 'Every part',
      text: [
        'The final unit is about 158 mm tall and sits on a desk. Inside, from the top down:',
        [ 'Fan: polished copper blades, black hub', 'Control head & collar: display + up / down / power', 'Filter: 60-fin pleated round filter',
          'Filter holder: seal ring + seat', 'Drip tray: copper cooling plate, aluminum heatsink', 'Main PCB: power + fan control',
          'Tank: twin clear tanks, copper pull tabs', 'Door & hinge: smoked acrylic, outside hinges', 'Base: rubber feet, rocker switch, rear cord' ],
        'The door swings open and the tank slides out; the copper-blade fan pushes clean, dry air out of the top.'
      ],
      media: [ { src: IMG('aerion/a26-exploded.jpg'), cap: 'Every part, top to bottom' },
        [ { src: IMG('aerion/a26-inuse.jpg'), cap: 'In use: the door swings open, the tank slides out' }, { src: IMG('aerion/a26-fan.jpg'), cap: 'Copper-blade fan' } ] ] },
    { title: 'KeyShot: materials and animation',
      text: [
        'After completing the Rhino model, I imported it into KeyShot to develop the materials, colours and overall appearance of the product, experimenting with different finishes to create a consistent visual identity.',
        'I then used the KeyShot animation timeline to create an exploded-view animation, showing the individual components separating from the main body. The final animation was about 1,000 frames, took around 12 hours to render, and runs about 2 minutes 20 seconds.'
      ],
      media: [ [ { src: IMG('aerion/a26-keyshot-materials.jpg'), cap: 'Materials in KeyShot' }, { src: IMG('aerion/a26-keyshot-timeline.jpg'), cap: 'The animation timeline' } ],
        { src: IMG('aerion/a26-frames.jpg'), cap: 'The rendered frames' } ],
      files: [ { label: 'KeyShot package', type: 'BIP', href: 'assets/rhino-files/09-aerion-one.bip' } ] },
    { title: 'Video editing',
      text: 'I edited the rendered animation in Adobe Premiere Pro: background music from Pixabay, labels that identify and explain each component of the purifier, and small edits to improve the flow of the presentation.',
      media: [ [ { src: IMG('aerion/a26-premiere.jpg'), cap: 'Editing in Premiere Pro' }, { src: IMG('aerion/a26-premiere-timeline.jpg'), cap: 'The final sequence' } ] ] },
    { title: 'The poster',
      text: 'The project on one portfolio spread: the product on the desk, concept development, design evolution, every part, and the purifier in use.',
      media: [ { src: IMG('aerion/a26-poster.jpg'), cap: 'Portfolio spread' } ],
      files: [ { label: 'Portfolio spread', type: 'PDF', href: 'assets/rhino-files/09-aerion-one-poster.pdf' } ] }
  ],

  reflection: 'This project helped me explore how cooling and purification can combine into one compact system. I learned how modular layering improves function, and how small design details like vent angle and intake size dramatically affect airflow performance. This workflow improved my CAD skills, detailing, and final product presentation.'
},

/* ===================== 06 — KID'S DINING PLATE DESIGN ==================== */
{
  slug: 'spinner-plate',
  name: 'Kid\'s Dining Plate',
  nameLine2: 'Design',
  subtitle: 'A playful, ergonomic dining plate that improves mealtimes for toddlers through stability, grip and engagement.',
  discipline: 'Product Design',
  year: '2024',
  role: 'Industrial Designer',
  tools: ['Sketching', 'CAD', 'Prototyping'],
  materials: 'ABS Plastic, Metal Rings',
  cover: IMG('plate/plate-47.jpg'),
  win:   IMG('plate/plate-47.jpg'), winFit: 'contain', winBg: 'blur',
  hero:  IMG('plate/plate-47.jpg'),
  models: [ { label: 'Study model', src: ASSETS + 'models/study-plate.glb', study: true } ],       // built from the photo, not his file

  /* text and pictures follow his Adobe Portfolio page (/kids-dining-plate-design), in its order */
  summary: 'A playful, ergonomic dining plate designed to improve the dining experience for toddlers through stability, grip and engagement. I created it as part of my IB Design Technology HL internal assessment.',
  glance: {
    problem:  'In a school, many children struggled with spills, unstable plates, poor grip and low engagement at mealtimes.',
    approach: 'Observation, interviews, a caregiver survey and hand measurements set the requirements. Six early concepts led to four prototypes tested with users.',
    outcome:  'The Spinner Plate with Roller: a child-safe dining plate that improves stability, encourages motor-skill development and adds playful interaction.'
  },

  chapters: [
    { title: 'Project overview',
      text: [
        'This project explores how thoughtful product design can improve mealtimes for young children. During my research in a school environment, I observed that many children struggle with spills, unstable plates, poor grip, and low engagement.',
        'My goal was to redesign a dining plate that makes eating easier, safer, and more enjoyable.',
        'The outcome is the Spinner Plate with Roller, a child-safe dining plate that improves stability, encourages motor-skill development, and adds playful interaction.'
      ],
      media: [ { src: IMG('plate/plate-01.jpg'), cap: '' } ] },
    { title: 'Understanding the problems',
      text: [
        'Young children face several dining challenges:',
        [ 'Unstable plates cause spills', 'Plates are too heavy or slippery', 'Poor finger grip', 'Food gets trapped in corners',
          'Low engagement during mealtime', 'Hard to clean surfaces', 'Uncomfortable posture due to bad plate design' ],
        'Interviews with teachers and caregivers reinforced these issues and highlighted the need for:',
        [ 'Lightweight plates', 'Non-slip bases', 'Better grip for small hands', 'Divided sections', 'Easy cleaning',
          'Safe, durable materials', 'An element of fun to keep kids focused' ]
      ],
      media: [ [ { src: IMG('plate/plate-02.jpg'), cap: '' }, { src: IMG('plate/plate-03.jpg'), cap: '' } ], [ { src: IMG('plate/plate-04.jpg'), cap: '' }, { src: IMG('plate/plate-05.jpg'), cap: '' } ], { src: IMG('plate/plate-06.jpg'), cap: '' } ] },
    { title: 'Research & insights',
      text: [
        'I analyzed commonly used children’s plates to understand their strengths and weaknesses.',
        'Key observations:',
        [ 'Many plates lack stability and slide easily', 'Most designs don’t support grip for small hands',
          'Plates trap food because of poor edge geometry', 'Some designs are too plain and don’t engage children' ]
      ],
      media: [ [ { src: IMG('plate/plate-07.jpg'), cap: '' }, { src: IMG('plate/plate-08.jpg'), cap: '' } ] ] },
    { title: 'Parent & caregiver feedback',
      text: [
        'A quick survey with caregivers and hostel staff revealed important preferences:',
        [ '40% focused on ease of cleaning', '30% highlighted plate stability and spill prevention',
          '20% wanted engaging designs for kids', '10% emphasized divided compartments' ],
        'The survey confirmed the need for a safe, stable, and child-friendly eating plate.'
      ],
      media: [ { src: IMG('plate/plate-09.jpg'), cap: 'What caregivers and hostel staff asked for first' } ] },
    { title: 'User hand measurements',
      text: [
        'To understand how children grip plates and how big handles should be, I referred to general anthropometric data available online. These measurements helped guide plate width, grip points, and ergonomics for young users.',
        'Key takeaways:',
        [ 'Children have smaller grip spans', 'Edges must be rounded and comfortable', 'Width must support two-hand holding',
          'The plate should be lightweight and balanced' ]
      ],
      media: [ { src: IMG('plate/plate-10.jpg'), cap: 'Hand measurements from general anthropometric data' } ] },
    { title: 'Design requirements',
      text: [
        'Based on the research, these became the core requirements:',
        'Safety', [ 'Rounded edges', 'Non-toxic, food-safe materials', 'Durable structure' ],
        'User experience', [ 'Child-friendly form and size', 'Playful but not distracting', 'Comfortable handling', 'Encourages independent eating' ],
        'Functional', [ 'Stable and non-slip', 'Divided compartments', 'Easy to grip & clean', 'Spill-resistant edges', 'Lightweight' ],
        'Environmental', [ 'Recyclable materials', 'Long lifespan', 'Low material waste', 'Encourages reuse' ]
      ] },
    { title: 'Ideation',
      text: 'I explored six early concepts focusing on balance, stability, form, and interaction.',
      media: [ { src: IMG('plate/plate-11.jpg'), cap: '' },
        { src: IMG('plate/plate-12.jpg'), cap: '' },
        { src: IMG('plate/plate-13.jpg'), cap: '' },
        { src: IMG('plate/plate-14.jpg'), cap: '' },
        { src: IMG('plate/plate-15.jpg'), cap: '' },
        { src: IMG('plate/plate-16.jpg'), cap: '' } ] },
    { title: 'CAD model + final ideation',
      media: [ [ { src: IMG('plate/plate-17.jpg'), cap: '' }, { src: IMG('plate/plate-18.jpg'), cap: '' } ],
        [ { src: IMG('plate/plate-19.jpg'), cap: '' }, { src: IMG('plate/plate-20.jpg'), cap: '' } ] ] },
    { title: 'Concept development',
      text: 'Four concepts were prototyped and tested with users.',
      media: [ [ { src: IMG('plate/plate-21.jpg'), cap: 'Spinner Plate with Roller' }, { src: IMG('plate/plate-22.jpg'), cap: 'Truck theme Plate' } ],
        [ { src: IMG('plate/plate-23.jpg'), cap: '360 Balancer Plate' }, { src: IMG('plate/plate-24.jpg'), cap: 'LEGO style Plate' } ] ] },
    { title: 'Research and development',
      text: 'The four prototypes scored against user feedback, aesthetics, materials, function, cost, performance, manufacturing, environment, target market and safety. The Spinner Plate with Roller scored highest, 44 out of 50.',
      media: [ { src: IMG('plate/plate-25.jpg'), cap: 'Scoring the four concepts' } ] },
    { title: 'Material selection',
      text: [
        'ABS plastic (frame)', [ 'Lightweight', 'Impact-resistant', 'Easy to clean', 'Suitable for injection molding' ],
        'Metal rings', [ 'Provides smooth roller motion', 'Improves longevity' ]
      ],
      media: [ [ { src: IMG('plate/plate-26.jpg'), cap: 'Acrylic and ABS plastic' }, { src: IMG('plate/plate-27.jpg'), cap: 'Plastic rings and metal rings' } ] ] },
    { title: 'CAD model',
      media: [ { src: IMG('plate/plate-28.jpg'), cap: '' },
        [ { src: IMG('plate/plate-29.jpg'), cap: 'Top' }, { src: IMG('plate/plate-30.jpg'), cap: 'Base' } ],
        { src: IMG('plate/plate-31.jpg'), cap: '' } ] },
    { title: 'Assembly drawing & exploded view',
      media: [ [ { src: IMG('plate/plate-32.jpg'), cap: 'Exploded view' }, { src: IMG('plate/plate-33.jpg'), cap: 'The parts' } ] ] },
    { title: 'Additional technical drawing',
      media: [ [ { src: IMG('plate/plate-34.jpg'), cap: '' }, { src: IMG('plate/plate-35.jpg'), cap: '' } ],
        [ { src: IMG('plate/plate-36.jpg'), cap: '' }, { src: IMG('plate/plate-37.jpg'), cap: '' } ],
        [ { src: IMG('plate/plate-38.jpg'), cap: '' }, { src: IMG('plate/plate-39.jpg'), cap: '' } ] ] },
    { title: 'Final product (user test edition)',
      media: [ [ { src: IMG('plate/plate-43.jpg'), cap: '' }, { src: IMG('plate/plate-47.jpg'), cap: '' } ],
        [ { src: IMG('plate/plate-48.jpg'), cap: '' }, { src: IMG('plate/plate-46.jpg'), cap: '' } ],
        [ { src: IMG('plate/plate-40.jpg'), cap: '' }, { src: IMG('plate/plate-41.jpg'), cap: '' } ],
        [ { src: IMG('plate/plate-42.jpg'), cap: '' }, { src: IMG('plate/plate-44.jpg'), cap: '' } ],
        [ { src: IMG('plate/plate-45.jpg'), cap: '' }, { src: IMG('plate/plate-49.jpg'), cap: '' } ] ] }
  ],

  reflection: 'This project strengthened my understanding of human-centered design, ergonomics, child safety, and material selection. I learned the value of prototyping, user testing, iteration, and balancing function with playfulness. Future improvements could include using softer materials for better sensory experience, refining the roller mechanism, and testing new color themes for different age groups.'
},

/* ============================ 07 — CROWN LAMP =========================== */
{
  slug: 'crown-lamp',
  name: 'Crown Lamp',
  nameLine2: 'Royal Chandelier Light',
  subtitle: 'A decorative lighting fixture drawn from a royal crown and a chandelier, modelled in Rhino and rendered in gold, bronze and glass.',
  discipline: 'Lighting',
  year: '2026',
  role: 'Student Designer',
  tools: ['Rhino 8', 'KeyShot'],
  materials: 'Gold metal, bronze, glass crystal',
  cover: IMG('rhino/a5-crown-cover.jpg'),
  win:   IMG('rhino/a5-crown-cover.jpg'), winFit: 'contain', winBg: 'blur',
  hero:  IMG('rhino/a5-crown-cover.jpg'),
  models: [ { label: 'Crown Lamp', src: ASSETS + 'models/crown-lamp.glb?v=7' } ],

  summary: 'A decorative lighting fixture inspired by a royal crown and a chandelier — a circular crown body on a twisted stem, hung with crystal drops and set on a round base.',
  glance: {
    problem:  'Make a product that is rendered, not just modelled: one where metal, glass and light carry as much of the design as the shape does.',
    approach: 'Build every part in Rhino — crown body, twisted support, crystals, ornament, base — then give each one its own material and light it in KeyShot.',
    outcome:  'A Rhino model of the full fixture and a studio render in gold, bronze and glass, with reflections and shadows set to show off each material.'
  },

  chapters: [
    { title: 'Modelling in Rhino',
      text: 'The main structure and every detail was built in Rhino: the circular crown-shaped body, the twisted central support, the hanging crystal-like pieces, the decorative patterns and the circular base. The aim was to combine curved forms, geometric shapes and ornament so the fixture feels elegant and luxurious.',
      media: [
        { src: IMG('rhino/a5-crown-model-views.jpg'), cap: 'Rhino — top, perspective, front and right' },
        { src: IMG('rhino/a5-crown-model.jpg'), cap: 'The model in perspective' }
      ],
      files: [ { label: 'Rhino file', type: '3DM', href: 'assets/rhino-files/05-crown-lamp.3dm' } ] },

    { title: 'Materials & light in KeyShot',
      text: 'The model went into KeyShot, where I applied gold metal, bronze accents and transparent glass-like materials, then adjusted the lighting, reflections, shadows and studio background so every material and detail reads clearly.',
      media: [
        { src: IMG('rhino/a5-crown-lamp-render.jpg'), cap: 'Final KeyShot render — gold, bronze and glass' }
      ],
      files: [ { label: 'KeyShot package', type: 'BIP', href: 'assets/rhino-files/05-crown-lamp.bip' } ] }
  ]
},

/* =========================== 08 — WATCH TABLE =========================== */
{
  slug: 'watch-table',
  name: 'Watch Table',
  nameLine2: 'A Coffee Table in Context',
  subtitle: 'A coffee table designed to look like a wristwatch, and a room built so that the table is its hero.',
  discipline: 'Furniture',
  year: '2026',
  role: 'Student Designer',
  tools: ['Rhino 8', 'KeyShot'],
  cover: IMG('rhino/a6-watch-room-4.jpg'),
  win:   IMG('rhino/a6-watch-room-4.jpg'), winPos: 'center 70%',
  hero:  IMG('rhino/a6-watch-room-4.jpg'),
  models: [ { label: 'The table', src: ASSETS + 'models/watch-table.glb?v=7' },
            { label: 'The room',  src: ASSETS + 'models/watch-table-room.glb?v=7' } ],
  scenes: [
    { k: 'The product', model: 0, yaw: -.55, tilt: .42,
      text: 'A coffee table made to look like a luxury watch — a round dial with hands and subdials, a knurled bezel, a glass crystal, lugs and a bracelet that runs out across the floor.' },
    { k: 'Inside the table', model: 0, yaw: .55, tilt: .5, apart: true,
      text: 'Taken apart: the crystal, dial and hands, and the layers of gears and movement that sit beneath them.' },
    { k: 'The environment', model: 1, yaw: .7, tilt: .22,
      text: 'The room built around it — marble floor and round rug, curved sofas, curtains, a wood-panelled wall with shelving, and a ring light overhead.' },
    { k: 'The outcome', model: 0, yaw: -.2, tilt: .3,
      text: 'A product and its setting designed together, rendered from several cameras that keep the table at the centre.' }
  ],

  summary: 'A coffee table designed to look like a wristwatch — and a luxurious room built around it so the table, not the decor, is what the eye lands on.',
  glance: {
    problem:  'The brief was to make a product, then make an environment where that product is the hero — so the room has to support the object instead of competing with it.',
    approach: 'A coffee table drawn from a watch — dial, bezel, gears, bracelet — modelled in Rhino, with sofas, curtains, wood panelling and a ring light arranged around it.',
    outcome:  'A Rhino model of the table and its room, and KeyShot renders from different cameras, from a wide view of the room to a close look at the table.'
  },

  chapters: [
    { title: 'The product: a table that is a watch',
      text: 'The product is a coffee table that reads as a luxury watch: a round dial with hands, subdials and minute markers, a bezel with a knurled edge, a glass crystal, lugs, and a bracelet that stretches across the rug. Under the dial, the Rhino model carries a layered movement of gears.',
      media: [
        { src: IMG('rhino/a6-table-closeup.jpg'), cap: 'The table, seen from above' }
      ] },

    { title: 'The environment: a room that serves the hero',
      text: 'Around the table I modelled the space: a marble floor and a round rug, curved sofas with cushions, curtains, a wood-panelled wall with shelving and a screen, windows onto the city, and a layered ring light overhead. Everything is arranged to lead the eye to the table.',
      media: [
        { src: IMG('rhino/a6-room-model-views.jpg'), cap: 'Rhino — top, perspective, front and right' },
        { src: IMG('rhino/a6-room-model-perspective.jpg'), cap: 'The scene in perspective' }
      ],
      files: [ { label: 'Rhino file', type: '3DM', href: 'assets/rhino-files/06-watch-table.3dm' } ] },

    { title: 'Light, material, camera',
      text: 'In KeyShot I applied materials, textures and lighting to make the space feel realistic and luxurious, then moved the camera between the whole room and a close look at the table, so it reads as the hero from every angle.',
      media: [
        { src: IMG('rhino/a6-watch-room-4.jpg'), cap: 'The room, with the table at its centre' },
        { src: IMG('rhino/a6-watch-room-2.jpg'), cap: 'A wider view' },
        { src: IMG('rhino/a6-watch-room-3.jpg'), cap: 'Ceiling light, wall and table' }
      ] }
  ]
},

/* ========================== 09 — EAR CONTAINER ========================== */
{
  slug: 'ear-container',
  name: 'Ear Container',
  nameLine2: 'Digital Fabrication',
  subtitle: 'A small screw-top container shaped after the human ear — modelled in Rhino, 3D printed, flatbed printed and rendered.',
  discipline: 'Product Design',
  year: '2026',
  role: 'Student Designer',
  tools: ['Rhino 8', '3D Printing', 'Flatbed Printing', 'KeyShot'],
  materials: 'Matte black print, wood-effect flatbed print',
  cover: IMG('rhino/a7-printed-open.jpg'),
  win:   IMG('rhino/a7-printed-open.jpg'), winFit: 'contain', winBg: 'blur',
  hero:  IMG('rhino/a7-printed-open.jpg'),
  models: [ { label: 'Ear container', src: ASSETS + 'models/ear-container.glb?v=7' } ],

  summary: 'A compact, rounded container whose lid follows the curves of the human ear, closed with a threaded screw — taken from a Rhino model all the way to a printed object in the hand.',
  glance: {
    problem:  'Digital fabrication is only real once the file becomes an object — so the design had to fit together, print and hold up in the hand.',
    approach: 'Model the body, lid, spiral detail and threaded screw as separate parts in Rhino, print them in 3D, and make the top detail on a flatbed printer.',
    outcome:  'A finished container, about 3.04 × 2.00 × 2.15 in, in matte black with a wood-effect top, plus lifestyle renders for scale.'
  },

  chapters: [
    { title: 'Rhino modelling',
      text: 'I began with an ear-inspired shape as the foundation: a compact, rounded body with a detailed top that follows the structure of the ear. The main body, top lid, raised spiral details and threaded screw were modelled separately, and I refined proportions, edges and surface detail until the object looked clean and cohesive. It measures about 3.04 × 2.00 × 2.15 inches.',
      media: [
        { src: IMG('rhino/a7-rhino-model.jpg'), cap: 'The Rhino model' },
        { src: IMG('rhino/a7-rhino-views.jpg'), cap: 'Top, perspective, front and right' },
        { src: IMG('rhino/a7-orthographics.jpg'), cap: 'Orthographic drawings with dimensions' }
      ],
      files: [ { label: 'Rhino file', type: '3DM', href: 'assets/rhino-files/07-ear-container.3dm' } ] },

    { title: '3D printing',
      text: 'The separate components were prepared for 3D printing. The body and lid had to fit together while keeping the overall shape and proportions. Printing let me test structure, surface detail and assembly, see how the parts connect, and spot where adjustments would improve the product.',
      media: [
        [ { src: IMG('rhino/a7-print-lid.jpg'), cap: 'Printed lid' },
          { src: IMG('rhino/a7-print-body.jpg'), cap: 'Printed body with dividers' } ],
        { src: IMG('rhino/a7-print-thread.jpg'), cap: 'The threaded closure' }
      ],
      files: [ { label: 'Print file', type: '3MF', href: 'assets/rhino-files/07-ear-container.3mf' },
               { label: 'Container', type: 'STL', href: 'assets/rhino-files/07-container.stl' },
               { label: 'Lid', type: 'STL', href: 'assets/rhino-files/07-lid.stl' },
               { label: 'Bolt', type: 'STL', href: 'assets/rhino-files/07-bolt.stl' } ] },

    { title: 'Flatbed printing',
      text: 'The decorative top elements were prepared as flat artwork for flatbed printing, in a wood-inspired finish that contrasts with the black exterior and gives the design a more premium feel. The printed detail follows the curved ear pattern on the lid.',
      media: [
        { src: IMG('rhino/a7-flatbed-wood.jpg'), cap: 'Wood-effect top details, printed flat' }
      ] },

    { title: 'Rendering & final presentation',
      text: 'For the final renders I explored material and colour combinations: a matte black body for a clean, minimal look, and the wood-effect detail on top for warmth. A lifestyle render on a coffee table, beside everyday objects, shows its scale and how it could live in a real room.',
      media: [
        { src: IMG('rhino/a7-printed-open.jpg'), cap: 'The finished container, open' },
        { src: IMG('rhino/a7-printed-closed.jpg'), cap: 'Closed' },
        { src: IMG('rhino/a7-lifestyle-render.jpg'), cap: 'Lifestyle render on a coffee table' }
      ] }
  ],

  reflection: 'Printing the parts helped me understand how a digital design translates into a physical object — and where its components connect and could be improved.'
}

];

/* ==========================================================================
   TOOL PAGES — added work
   Rhino & KeyShot: the three large assignments sit beside the other models,
   and the smaller first-term assignments follow as "coursework".
   Sketches: the Visualizing Ideas sketchbook, section by section.
   ========================================================================== */
(() => {
  const SK = (g, n) => ASSETS + `sketchbook/sk-${g}-${String(n).padStart(2, '0')}.jpg`;
  const run = (g, from, to, cap = '') => Array.from({ length: to - from + 1 }, (_, i) => ({ src: SK(g, from + i), cap }));

  const rk = SITE.modelling.find(t => t.slug === 'rhino-keyshot').page;
  rk.models.push(
    { project: 'crown-lamp', name: 'Crown Lamp', views: ASSETS + 'rhino/a5-crown-model-views.jpg',
      renders: [ { src: ASSETS + 'rhino/a5-crown-lamp-render.jpg', cap: 'KeyShot — gold, bronze and glass', wide: true } ] },
    { project: 'watch-table', name: 'Watch Table — in its room', views: ASSETS + 'rhino/a6-room-model-views.jpg',
      renders: [ { src: ASSETS + 'rhino/a6-watch-room-4.jpg', cap: 'The room, table at the centre', wide: true },
                 { src: ASSETS + 'rhino/a6-table-closeup.jpg', cap: 'The table from above' },
                 { src: ASSETS + 'rhino/a6-watch-room-3.jpg', cap: 'Ceiling light and wall' } ] },
    { project: 'ear-container', name: 'Ear Container', views: ASSETS + 'rhino/a7-rhino-views.jpg',
      renders: [ { src: ASSETS + 'rhino/a7-lifestyle-render.jpg', cap: 'Lifestyle render', wide: true },
                 { src: ASSETS + 'rhino/a7-printed-open.jpg', cap: 'Printed — open', tall: true },
                 { src: ASSETS + 'rhino/a7-printed-closed.jpg', cap: 'Printed — closed' } ] },
    /* Rhino models with no KeyShot render: a studio view lit for the site from his
       own .3dm (his geometry and object colours, nothing added). Labelled as such. */
    { name: 'Wall Fan Panel', views: ASSETS + 'rhino4-wall-fan.jpg', renders: [],
      studio: [ { src: ASSETS + 'studio-wall-fan-1.jpg', cap: 'Three-quarter view' },
                { src: ASSETS + 'studio-wall-fan-2.jpg', cap: 'From above' } ] },
    { name: 'Trade Show Booth', views: ASSETS + 'rhino4-trade-booth.jpg', renders: [],
      studio: [ { src: ASSETS + 'studio-trade-booth-1.jpg', cap: 'From the stair side' },
                { src: ASSETS + 'studio-trade-booth-2.jpg', cap: 'At eye level' } ] },
    { name: 'Spoon', views: ASSETS + 'rhino4-spoon.jpg', renders: [],
      studio: [ { src: ASSETS + 'studio-spoon-1.jpg', cap: 'Three-quarter view' },
                { src: ASSETS + 'studio-spoon-2.jpg', cap: 'In profile' } ] }
  );

  rk.coursework = {
    title: 'First-term coursework',
    text: 'The smaller Rhino 8 assignments from the same term — 2D curves, solids and surfaces. The larger ones are projects of their own: Crown Lamp, Watch Table, Ear Container and the Aerion One redesign; the parametric vase is on the Grasshopper page.',
    items: [
      { title: 'Logos in 2D CAD',
        text: 'Three logos rebuilt as 2D CAD curves with the basic drawing tools, each one a clean, closed figure traced from the reference.',
        media: [ { src: ASSETS + 'rhino/a1-logos.jpg', cap: 'Three logos as closed curves' } ],
        files: [ { label: 'Rhino file', type: '3DM', href: 'assets/rhino-files/01-logos.3dm' } ] },
      { title: 'Toy concepts in 3D',
        text: 'My first toy concepts modelled in Rhino 8 with curves, surfaces and solids, working across Top, Front, Right and Perspective views to control proportion, and organised on layers.',
        media: [ [ { src: ASSETS + 'rhino/a2-toys-perspective.jpg', cap: 'Toy concepts' },
                   { src: ASSETS + 'rhino/a2-toys-layers.jpg', cap: 'Organised by layer' } ] ],
        files: [ { label: 'Rhino file', type: '3DM', href: 'assets/rhino-files/02-toy-concepts.3dm' } ] },
      { title: 'Cup form exploration',
        text: 'Three cups with different bodies, proportions and handles, compared in all four views to see how small changes shift the silhouette.',
        media: [ { src: ASSETS + 'rhino/a3-cups-views.jpg', cap: 'Three cups compared' },
                 [ { src: ASSETS + 'rhino/a3-cups-perspective.jpg', cap: '' },
                   { src: ASSETS + 'rhino/a3-cup-detail.jpg', cap: 'Handle detail' } ] ],
        files: [ { label: 'Rhino file', type: '3DM', href: 'assets/rhino-files/03-cups.3dm' } ] },
      { title: 'Mouse surface modelling',
        text: [ 'Two computer mice built from curves into smooth surfaces. The first has a rounded, organic profile — raised at the rear, lowered at the front for a comfortable hand position. The second works on silhouette, proportion and the transitions between surfaces.',
                'Building the outline from curves took about twenty attempts with 2-Point Curves before I switched to the Loft command, which finally gave the form while still showing how curves control a surface.' ],
        media: [ [ { src: ASSETS + 'rhino/a4-mouse1-perspective.jpg', cap: 'Mouse 01' },
                   { src: ASSETS + 'rhino/a4-mouse1-views.jpg', cap: 'Mouse 01 — views' } ],
                 { src: ASSETS + 'rhino/a4-mouse2-rhino.jpg', cap: 'Mouse 02' },
                 [ { src: ASSETS + 'rhino/a4-mouse-attempts.jpg', cap: 'The failed outlines' },
                   { src: ASSETS + 'rhino/a4-mouse-loft.jpg', cap: 'The Loft approach' } ] ],
        files: [ { label: 'Rhino file', type: '3DM', href: 'assets/rhino-files/04-mouse.3dm' } ] }
    ],
    book: { label: 'Process book — the full term, assignments 1–9', type: 'PDF', href: 'assets/rhino-files/Mudit_Manocha_Process_Book.pdf?v=2' }
  };

  SITE.modelling.find(t => t.slug === 'grasshopper').page.coursework = {
    title: 'Parametric vase',
    text: 'An introduction to Grasshopper from the first-term Rhino class: a vase whose form and surface pattern are generated entirely by the definition.',
    items: [
      { title: 'The parametric vase',
        text: 'A parametric vase. Points and curves driven by sine and cosine make an hourglass profile, developed with Loft, Divide and Graph Mapper; a repeated pattern of small rectangles, rotated and moved around the surface, gives it its layered texture.',
        media: [ { src: ASSETS + 'rhino/a8-grasshopper-form.jpg', cap: 'The parametric vase' },
                 { src: ASSETS + 'rhino/a8-grasshopper-definition.jpg', cap: 'The Grasshopper definition' } ],
        files: [ { label: 'Grasshopper file', type: 'GH', href: 'assets/rhino-files/08-grasshopper-vase.gh' } ] }
    ]
  };

  const sk = SITE.modelling.find(t => t.slug === 'sketches').page;
  const I = n => SK('idus226', n);
  sk.sections = [
    { id: 'finished', title: 'Finished concepts', layout: 'feature',
      shows: ['Product thinking', 'Marker rendering', 'Linework to render'],
      text: 'Concepts taken all the way from pencil linework to marker render, with the details called out: how a part attaches, what opens, where the port sits, what the shape looks like from each side.',
      items: [
        { src: I(1), span: 6, tag: 'Marker + linework', cap: 'Swim goggles with a quick-release mount for a hearing aid' },
        { src: I(4), span: 6, tag: 'Marker render', cap: 'Carry case: power bank, splitter and mesh pocket' },
        { src: I(2), span: 6, tag: 'Mechanism', cap: 'Clip mechanism studies, closed and exploded' },
        { src: I(3), span: 6, tag: 'Linework', cap: 'The same case in pencil, with callouts and USB-C input' },
        { src: I(5), span: 7, tag: 'Marker on toned paper', cap: 'Chair concept with a seated figure for scale' },
        { src: I(6), span: 5, tag: 'Marker + orthographics', cap: 'Form study with front, side and top views' },
        { src: I(7), span: 12, tag: 'Marker + orthographics', cap: 'Rounded form study, with side and front views' }
      ] },
    { id: 'process', title: 'Ideation to exploded view', layout: 'feature',
      shows: ['Ideation', 'Exploded views', 'Iteration'],
      text: 'How an idea gets worked out. A purifier ceiling fan goes from thumbnails to a hand-drawn exploded view with every part named, beside watch and flat-product explorations that push one idea through many shapes.',
      items: [
        { src: SK('exploded', 1), span: 5, tag: 'Exploded view', cap: 'Purifier ceiling fan: parts, top and side views' },
        { src: SK('exploded', 4), span: 7, tag: 'Ideation', cap: 'Watch form exploration' },
        { src: SK('exploded', 2), span: 3, tag: 'Ideation', cap: 'Fan thumbnails: blades, canopy, filter' },
        { src: SK('exploded', 3), span: 3, tag: 'Ideation', cap: 'Flat product thumbnails, parts labelled' },
        { src: SK('exploded', 5), span: 3, tag: 'Annotated', cap: 'Watch concepts, features called out' },
        { src: SK('exploded', 6), span: 3, tag: 'Shape options', cap: 'Watch and ring shapes, best in colour' }
      ] },
    { id: 'rendering', title: 'Marker rendering', fold: 9,
      shows: ['Materials', 'Light and shadow', 'Range of products'],
      text: 'Colour, light and material in marker: glossy paint, glass, fabric, polished metal and wood grain, across cars, chairs, watches, lamps, shoes and kettles.',
      items: [
        { src: SK('marker', 18), cap: 'Lamp with a plant, chrome and warm light' },
        { src: SK('marker', 19), cap: 'Plant in a lamp' },
        { src: SK('marker', 1), cap: 'Cars and perfume bottles' },
        { src: SK('marker', 17), cap: 'Chairs and a table, wood and moulded shell' },
        { src: SK('marker', 4), cap: 'Armchairs and a bag' },
        { src: SK('marker', 3), cap: 'Plugs and tools on toned paper' },
        { src: SK('marker', 16), cap: 'Wood grain, hammer and carafe' },
        { src: SK('marker', 20), cap: 'Plant in a lamp, second study' },
        { src: SK('marker', 2), cap: 'Primary forms and a chair' },
        { src: SK('marker', 5), cap: 'Chairs' },
        { src: SK('marker', 6), cap: 'Lounge chairs' },
        { src: SK('marker', 7), cap: 'Watches' },
        { src: SK('marker', 8), cap: 'Footwear' },
        { src: SK('marker', 9), cap: 'Jugs and kettle' },
        { src: SK('marker', 10), cap: 'Coffee makers and jugs' },
        { src: SK('marker', 11), cap: 'Pendant lamps' },
        { src: SK('marker', 12), cap: 'Table lamps' },
        { src: SK('marker', 13), cap: 'Watches and a ring' },
        { src: SK('marker', 14), cap: 'Watch straps and cases' },
        { src: SK('marker', 15), cap: 'Wood grain samples and blocks' }
      ] },
    { id: 'construction', title: 'Constructing products',
      shows: ['Perspective', 'Proportion', 'Volumes'],
      text: 'Box-first drawing. Every product starts as a simple volume in perspective, then gets cut, softened and detailed, so the proportions are right before any detail goes in.',
      items: run('construct', 1, 6) },
    { id: 'thumbnails', title: 'Thumbnails and object studies',
      shows: ['Volume of ideas', 'Visual library'],
      text: 'Dense pages of objects drawn by the dozen, such as kettles, cookware, shoes and chairs, to build a visual library fast and see which shapes are worth developing.',
      items: run('studies', 1, 5) },
    { id: 'drills', title: 'Warm-ups', fold: 0,
      shows: ['Line control', 'Ellipses'],
      text: 'Circles of every size, ellipses, soft organic volumes and quick car silhouettes. The daily practice behind the cleaner pages above.',
      items: run('drills', 1, 4) }
  ];
})();
