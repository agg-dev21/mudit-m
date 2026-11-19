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
    { project: 'washer-lamp',           img: ASSETS + 'washer-lamp-01.jpg' },
    { project: 'module-for-chair',      img: ASSETS + 'module-for-chair-06-032a4e7791.jpg' },
    { project: 'electric-stove',        img: ASSETS + 'electric-stove-body-handle-s-01-df7c04f617.jpg' },
    { project: 'cochlear-fit-enhancer', img: ASSETS + 'cochlear-implant-fit-enhance-03-de20e24b41.jpg' },
    { project: 'aerion-one',            img: ASSETS + 'aerion-one-01.jpg' },
    { project: 'spinner-plate',         img: ASSETS + 'spinner-plate-05-8a6493e0f3.jpg' },
    { project: 'electric-stove',        img: ASSETS + 'electric-stove-body-handle-s-01-8c9577cd6f.jpg' },
    { project: 'cochlear-fit-enhancer', img: ASSETS + 'cochlear-implant-fit-enhance-03-b00acc719b.jpg' },
    { project: 'crown-lamp',            img: ASSETS + 'rhino/a5-crown-lamp-render.jpg' },
    { project: 'watch-table',           img: ASSETS + 'rhino/a6-watch-room-4.jpg' },
    { project: 'ear-container',         img: ASSETS + 'rhino/a7-printed-open.jpg' }
  ],
  status: 'Available for internships',
  location:  'Savannah, GA',
  school:    'SCAD',
  email:     'muditmanocha2@gmail.com',
  resume:    ASSETS + 'resume-acea587ec7.pdf',
  logo:      ASSETS + 'logo-a3dca4ae30.jpg',
  portrait:  ASSETS + 'portrait-2f12f6d817.png',
  aboutBg:   ASSETS + 'about-bg-da845aacdf.jpg',

  /* About: a one-line statement, the four steps every project goes
     through (each shown with a piece of his work), and a dated record
     taken from the resume. The title block uses school, location, status,
     degree and resume from the fields above. */
  about: {
    statement: 'Designing with curiosity',
    degree: 'BA Industrial Design, expected 2029',
    steps: [
      /* four different products, one for each step */
      { verb: 'Draw',   img: ASSETS + 'electric-stove-body-handle-s-01-3db8b79518.jpg', href: '#/electric-stove', go: 'Electric Stove',
        text: 'Pencil first. The electric stove’s body and silhouette were worked out on paper.' },
      { verb: 'Model',  img: ASSETS + 'rhino/a7-rhino-model.jpg', href: '#/ear-container', go: 'Ear Container',
        text: 'Then Rhino. The ear container’s body, lid, spiral and thread, each modelled as its own part.' },
      { verb: 'Render', img: ASSETS + 'rhino/a5-crown-lamp-render.jpg', href: '#/crown-lamp', go: 'Crown Lamp',
        text: 'KeyShot for material and light: gold, bronze and glass on the crown lamp.' },
      { verb: 'Make',   img: ASSETS + 'washer-lamp-01.jpg', href: '#/washer-lamp', go: 'Washer Lamp',
        text: 'Then by hand. The washer lamp was built from steel washers and wire.' }
    ],
    timeline: [
      { y: '2023', t: '2nd place, Design & Technology competition' },
      { y: '2023', t: 'Future Careers in Game Design workshop, École Intuit Lab, New Delhi' },
      { y: '2024', t: 'Atlas Summer Program: drawing, sketching and photography, Atlas SkillTech University, Mumbai' },
      { y: '2024', t: 'Creative Intelligence Award, Design & Technology' },
      { y: '2025', t: 'Dean’s List, SCAD, fall quarter' },
      { y: 'Now',  t: 'Open to internships', now: true },
      { y: '2029', t: 'BA Industrial Design, SCAD (expected)', future: true }
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
          { project: 'aerion-one', name: 'Aerion One', views: ASSETS + 'rhino4-aerion.jpg?v=3',
            renders: [ { src: ASSETS + 'aerion-one-01.jpg', cap: 'Final render', tall: true } ] }
        ]
      },
      note: 'Surfaces built in Rhino, then materials, light and colourways in KeyShot — the product as it would be made.',
      img: ASSETS + 'electric-stove-body-handle-s-01-28ab8b2915.jpg', cap: 'Electric Stove — Concept 1',
      gallery: [
        { img: ASSETS + 'electric-stove-body-handle-s-01-28ab8b2915.jpg', cap: 'Electric Stove — Concept 1' },
        { img: ASSETS + 'cochlear-implant-fit-enhance-03-de20e24b41.jpg', cap: 'Cochlear Implant Fit Enhancer — final render' },
        { img: ASSETS + 'electric-stove-body-handle-s-01-402197befe.jpg', cap: 'Electric Stove — Concept 2' },
        { img: ASSETS + 'aerion-one-01.jpg', cap: 'Aerion One', fit: 'contain' },
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
        intro: 'Every project starts on paper — proportions, silhouettes, grips and mechanisms worked out by hand before anything is modelled.',
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
  cover: IMG('electric-stove-body-handle-s-01-402197befe.jpg'),
  win:   IMG('electric-stove-body-handle-s-01-402197befe.jpg'), winPos: 'center 60%',
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
        { src: IMG('electric-stove-body-handle-s-01-df7c04f617.jpg'), cap: 'Grip and clearance study' }
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
  cover: IMG('module-for-chair-06-032a4e7791.jpg'),
  win:   IMG('module-for-chair-06-032a4e7791.jpg'), winFit: 'contain', winBg: '#ffffff',
  hero:  IMG('module-for-chair-06-032a4e7791.jpg'),
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
        { src: IMG('module-for-chair-06-d12044c064.jpg'), cap: 'How it locks, step by step' }
      ] },

    { title: 'How the lock works',
      text: 'A release and locking mechanism secures the module in place and allows for its controlled release when needed: the module slides in and locks, and a button inside frees it again.',
      media: [
        [ { src: IMG('module-for-chair-06-6751c853a0.jpg'), cap: 'Module released' },
          { src: IMG('module-for-chair-06-4a17e018bb.jpg'), cap: 'Module and housing' } ]
      ] },

    { title: 'Two mechanisms explored',
      text: 'Two types of mechanism were sketched and modelled before choosing a direction.',
      media: [
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
      ] }
  ],

  reflection: 'Designing a chair is not only about how it looks — it is proportion, weight distribution and comfort, and a small change in an angle or a dimension changes the whole experience. Moving from sketches to models and material tests taught me how to take an abstract idea to something that works.'
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
  cover: IMG('washer-lamp-01.jpg'),
  win:   IMG('washer-lamp-01.jpg'), winFit: 'contain', winBg: 'blur',
  hero:  IMG('washer-lamp-01.jpg'),
  models: [ { label: 'Study model', src: ASSETS + 'models/study-lamp.glb', study: true } ],        // built from the photo, not his file

  summary: 'A hanging lamp built entirely from steel washers and wire — exploring how a single mass-produced component can create texture, form, and light patterns.',
  glance: {
    problem:  'Can a single, ordinary bought-in part become a finished object on its own — without moulding or custom pieces?',
    approach: 'Steel washers wired into a hanging lattice around an LED bulb, built by hand over one week.',
    outcome:  'A working pendant lamp whose gaps throw a pattern of light across the room.'
  },

  chapters: [
    { title: 'The brief',
      text: 'Take a single mass-produced part and build a resolved object from repetition alone.' },
    { title: 'The making',
      text: 'Washers were linked with wire into a hanging lattice that forms the shade, with loose washers hanging free below it.',
      media: [
        { src: IMG('washer-lamp-01.jpg'), cap: 'The finished lamp, lit' }
      ] },
    { title: 'The light',
      text: 'Lit from inside, light escapes through the gaps between the washers, turning the shade into a pattern on the surfaces around it.' }
  ],

  reflection: 'This project reinforced that great product design is never only about how something looks — it is about proportion, weight, material and human comfort working together until the object simply feels right.'
},

/* ========================== 05 — AERION ONE ============================= */
{
  slug: 'aerion-one',
  name: 'Aerion One',
  nameLine2: 'Air Purifier',
  subtitle: 'Premium bedside & desk air purifier — cool air and purified air from one compact form.',
  discipline: 'Product Design',
  year: '2024',
  role: 'Industrial Designer',
  tools: ['CAD', 'Form Development', 'Rendering'],
  materials: 'Bamboo-finished Polymer, ABS, Translucent Polymer',
  cover: IMG('aerion-one-01.jpg'),
  win:   IMG('aerion-one-01.jpg'), winFit: 'contain', winBg: '#676767',
  hero:  IMG('aerion-one-01.jpg'),
  models: [ { label: 'Aerion One', src: ASSETS + 'models/aerion-one.glb' } ],

  summary: 'A compact system that blends air cooling and purified airflow in one minimal form, built around directional cooling, clean aesthetics and modular internal parts.',
  glance: {
    problem:  'Coolers are bulky, loud and unappealing indoors; air purifiers give clean air but no thermal comfort. Nothing gives both in a size for a bedside or a desk.',
    approach: 'A vertical appliance in three layers — a filtration base, a cooling cartridge and an airflow head — with a curved top vent that aims the air like a car AC.',
    outcome:  'A resolved concept with an exploded view of every layer, the airflow system, materials and final renders.'
  },

  chapters: [
    { title: 'Why this product',
      text: [
        'Traditional coolers are bulky, loud and visually unappealing indoors. Air purifiers offer clean air but no thermal comfort. Aerion One bridges the gap: cool air and purified air in one compact form.',
        'What users need — cool airflow without excess humidity, a compact size for bedrooms, study tables and offices, a direction-controlled outlet like a car AC, and a look that suits a modern interior.'
      ] },
    { title: 'Three layers',
      text: [
        'The model is divided into three layers, each with a clear job. The top airflow head holds the main motor and directs the airflow. The middle cooling cartridge houses the evaporative or cooling material, with circular holes drawing air in. The bottom filtration base carries a multi-layer HEPA and carbon filter behind large intake channels.'
      ],
      media: [
        { src: IMG('aerion-one-01.jpg'), cap: 'Aerion One' }
      ] },
    { title: 'How it works',
      text: [
        'Air enters from all sides through vertical channels, is filtered by HEPA and activated carbon, cooled by the middle module, and pushed by the motor through the curved top vent — targeted airflow, like a car AC vent.'
      ] },
    { title: 'Materials & finish',
      text: 'A bamboo-finished polymer body for a warm, sustainable look; translucent blue polymer cooling panels; and a matte-textured ABS top vent.' }
  ],

  reflection: 'Combining cooling and purification in one compact system showed me how modular layering improves function — and how small details like the vent angle and the intake size change the airflow. It pushed my CAD, detailing and presentation.'
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
  cover: IMG('spinner-plate-05-8a6493e0f3.jpg'),
  win:   IMG('spinner-plate-05-8a6493e0f3.jpg'), winFit: 'contain', winBg: 'blur',
  hero:  IMG('spinner-plate-05-8a6493e0f3.jpg'),
  models: [ { label: 'Study model', src: ASSETS + 'models/study-plate.glb', study: true } ],       // built from the photo, not his file

  summary: 'A playful, ergonomic dining plate that makes mealtimes easier, safer and more fun for toddlers — through stability, grip and engagement. Made for my IB Design Technology HL internal assessment.',
  glance: {
    problem:  'In a school, children struggled with spills, unstable plates, poor grip and low engagement at mealtimes — and teachers and caregivers confirmed it.',
    approach: 'Research, a caregiver survey and hand measurements set the requirements. Six early concepts narrowed to four prototypes, tested with users.',
    outcome:  'The Spinner Plate with Roller — a child-safe plate that improves stability, encourages motor-skill development and adds playful interaction.'
  },

  chapters: [
    { title: 'Understanding the problem',
      text: [
        'During research in a school, I saw children struggle with plates that slide and spill, are too heavy or slippery, trap food in their corners, are hard to clean, and give them nothing to engage with.',
        'Teachers and caregivers asked for the same things: lightweight plates, non-slip bases, better grip for small hands, divided sections, easy cleaning, safe materials — and an element of fun to keep children focused.'
      ] },
    { title: 'Research & insights',
      text: [
        'Comparing common children’s plates showed most slide easily, don’t support small hands, and trap food at the edges.',
        'A survey of caregivers and hostel staff put ease of cleaning first (40%), then stability and spill prevention (30%), engaging design (20%) and divided compartments (10%). Children’s hand measurements set the plate width, grip points and edge radii.'
      ] },
    { title: 'Concepts',
      text: 'Six early concepts explored balance, stability, form and interaction. Four were prototyped and tested with users — the Spinner Plate with Roller, a truck-theme plate, a 360 balancer plate and a LEGO-style plate.' },
    { title: 'The final product',
      text: 'The Spinner Plate with Roller: an ABS frame — lightweight, impact-resistant, easy to clean and suited to injection moulding — with metal rings for a smooth, long-lasting roller motion.',
      media: [
        { src: IMG('spinner-plate-05-8a6493e0f3.jpg'), cap: 'The user-test edition in use' }
      ] }
  ],

  reflection: 'This project deepened my understanding of human-centred design, ergonomics, child safety and material choice — and of prototyping and testing with real users to balance function with play. Next I would try softer materials, refine the roller and test new colour themes for different ages.'
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
  cover: IMG('rhino/a5-crown-lamp-render.jpg'),
  win:   IMG('rhino/a5-crown-lamp-render.jpg'), winFit: 'contain', winBg: 'blur',
  hero:  IMG('rhino/a5-crown-lamp-render.jpg'),
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
  win:   IMG('rhino/a6-table-closeup.jpg'), winFit: 'contain', winBg: 'blur',
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
    text: 'The smaller Rhino 8 assignments from the same term — 2D curves, solids and surfaces. The three larger ones are projects of their own: Crown Lamp, Watch Table and Ear Container; the parametric vase is on the Grasshopper page.',
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
    book: { label: 'Process book — the full term', type: 'PDF', href: 'assets/rhino-files/Mudit_Manocha_Process_Book.pdf' }
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
  sk.sections = [
    { title: 'Ideation to exploded view',
      text: 'A purifier ceiling fan, taken from thumbnails to a hand-drawn exploded view, alongside watch and cooktop explorations.',
      items: run('exploded', 1, 6) },
    { title: 'Marker rendering',
      text: 'Adding colour, light and material with marker — cars and perfume bottles, chairs, watches, lamps, shoes and kettles, wood grain, and a plant in a lamp.',
      items: run('marker', 1, 20) },
    { title: 'Thumbnails & object studies',
      text: 'Dense pages of objects drawn by the dozen — kettles, cookware, shoes, chairs — to build a visual library fast.',
      items: run('studies', 1, 5) },
    { title: 'Constructing products',
      text: 'Box-first drawing: every product starts as a simple volume that is then cut, softened and detailed.',
      items: run('construct', 1, 6) },
    { title: 'Line & form drills',
      text: 'A few of the warm-up pages: circles of every size, ellipses, soft organic volumes and quick car silhouettes.',
      items: run('drills', 1, 4) },
    { title: 'Final projects',
      text: 'Final projects taken from pencil linework into marker: swim goggles with a quick-release mount for a hearing aid, a clip mechanism, a carry case with a power bank and splitter, and form studies with front, side and top views.',
      items: [
        { src: SK('idus226', 1), cap: 'Goggles: quick-release hearing aid mount' },
        { src: SK('idus226', 2), cap: 'Clip mechanism studies' },
        { src: SK('idus226', 3), cap: 'Carry case: linework' },
        { src: SK('idus226', 4), cap: 'Carry case: marker render' },
        { src: SK('idus226', 5), cap: 'Chair concept on toned paper' },
        { src: SK('idus226', 6), cap: 'Form study with orthographic views' },
        { src: SK('idus226', 7), cap: 'Rounded form study: side and front views' }
      ] }
  ];
})();
