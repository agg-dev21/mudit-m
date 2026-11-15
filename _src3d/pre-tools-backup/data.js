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
    { project: 'module-for-chair',      img: ASSETS + 'module-for-chair-06-4a17e018bb.jpg' },
    { project: 'electric-stove',        img: ASSETS + 'electric-stove-body-handle-s-01-df7c04f617.jpg' },
    { project: 'cochlear-fit-enhancer', img: ASSETS + 'cochlear-implant-fit-enhance-03-de20e24b41.jpg' },
    { project: 'aerion-one',            img: ASSETS + 'aerion-one-01.jpg' },
    { project: 'spinner-plate',         img: ASSETS + 'spinner-plate-05-8a6493e0f3.jpg' },
    { project: 'electric-stove',        img: ASSETS + 'electric-stove-body-handle-s-01-8c9577cd6f.jpg' },
    { project: 'cochlear-fit-enhancer', img: ASSETS + 'cochlear-implant-fit-enhance-03-b00acc719b.jpg' }
  ],
  status: 'Available for internships',
  location:  'Savannah, GA',
  school:    'SCAD',
  email:     'muditmanocha2@gmail.com',
  resume:    ASSETS + 'resume-acea587ec7.pdf',
  logo:      ASSETS + 'logo-a3dca4ae30.jpg',
  portrait:  ASSETS + 'portrait-2f12f6d817.png',
  aboutBg:   ASSETS + 'about-bg-da845aacdf.jpg',

  about: [
    "I'm an Industrial Design student at SCAD with a curiosity for how everyday products can be made more thoughtful, functional, and engaging.",
    "I enjoy exploring ideas through sketching, CAD, prototyping, and hands-on making — moving between digital and physical forms to understand how a product works and how people interact with it."
  ],

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
     the row is open; `fit: 'contain'` keeps a tall picture whole. */
  modelling: [
    { tool: 'Rhino & KeyShot', role: 'Modelling & rendering',
      note: 'Surfaces built in Rhino, then materials, light and colourways in KeyShot — the product as it would be made.',
      img: ASSETS + 'electric-stove-body-handle-s-01-28ab8b2915.jpg', cap: 'Electric Stove — Concept 1',
      gallery: [
        { img: ASSETS + 'electric-stove-body-handle-s-01-28ab8b2915.jpg', cap: 'Electric Stove — Concept 1' },
        { img: ASSETS + 'cochlear-implant-fit-enhance-03-de20e24b41.jpg', cap: 'Cochlear Implant Fit Enhancer — final render' },
        { img: ASSETS + 'electric-stove-body-handle-s-01-402197befe.jpg', cap: 'Electric Stove — Concept 2' },
        { img: ASSETS + 'aerion-one-01.jpg', cap: 'Aerion One', fit: 'contain' },
        { img: ASSETS + 'cochlear-implant-fit-enhance-03-41b24c8106.jpg', cap: 'Cochlear Implant Fit Enhancer — CAD model' },
        { img: ASSETS + 'electric-stove-body-handle-s-01-8c9577cd6f.jpg', cap: 'Electric Stove — in context' },
        { img: ASSETS + 'cochlear-implant-fit-enhance-03-b945f64a88.jpg', cap: 'Cochlear Implant Fit Enhancer — worn' }
      ] },
    { tool: 'SketchUp',    role: 'Quick 3D massing',
      note: 'Fast blocking-out of form, scale and layout before committing to detailed surfaces.',
      img: null, cap: 'SketchUp work to come' },            // no SketchUp work to show yet
    { tool: 'Grasshopper', role: 'Parametric design',
      note: 'Rule-based patterns and variations — change one input and the whole form follows.',
      img: null, cap: 'Grasshopper work to come' },         // no Grasshopper work to show yet
    { tool: 'Sketches',    role: 'Drawing',
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
  cover: IMG('module-for-chair-06-d12044c064.jpg'),
  win:   IMG('module-for-chair-06-d12044c064.jpg'), winFit: 'contain', winBg: '#ffffff',
  hero:  IMG('module-for-chair-06-d12044c064.jpg'),
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
        { src: IMG('module-for-chair-06-75963e567c.jpg'), cap: 'Storyboard — releasing, swapping and locking a headrest module' }
      ] },

    { title: 'How the lock works',
      text: 'A release and locking mechanism secures the module in place and allows for its controlled release when needed: the module slides in and locks, and a button inside frees it again.',
      media: [
        [ { src: IMG('module-for-chair-06-032a4e7791.jpg'), cap: 'Module seated' },
          { src: IMG('module-for-chair-06-6751c853a0.jpg'), cap: 'Module released' } ]
      ] },

    { title: 'Two mechanisms explored',
      text: 'Two types of mechanism were sketched and modelled before choosing a direction.',
      media: [
        [ { src: IMG('module-for-chair-06-085953f6ef.jpg'), cap: '' },
          { src: IMG('module-for-chair-06-575648948d.jpg'), cap: 'Sketches' } ],
        [ { src: IMG('module-for-chair-06-6d9e3ed630.jpg'), cap: '' },
          { src: IMG('module-for-chair-06-33cfd398b2.jpg'), cap: 'Models' } ],
        [ { src: IMG('module-for-chair-06-34ed525f61.jpg'), cap: 'The module' },
          { src: IMG('module-for-chair-06-4a17e018bb.jpg'), cap: 'Module and housing' } ],
        { src: IMG('module-for-chair-06-7acd1a92ac.jpg'), cap: 'Assembly sequence' }
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
}

];
