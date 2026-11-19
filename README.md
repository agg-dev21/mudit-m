# Mudit Manocha — Portfolio

A static site. No build step, no framework, no dependencies to install.

```
index.html          page shell — you rarely need to touch this
assets/data.js      ALL the content lives here (text, projects, image paths)
assets/site.css     the design system
assets/site.js      behaviour (hero, routing, lightbox, scroll effects)
assets/*.jpg|png    images
_archive/           the previous version of the site, kept for reference
```

## Editing the site

Everything you'd want to change is in **`assets/data.js`**. Open it in any text
editor. It's two parts:

**`SITE`** — your name, role, tagline, the carousel photos, about paragraphs,
email, socials, résumé link, and the tool lists in the About section.

### The carousel

`SITE.carousel` is the ring of photos that turns behind your name on the
opening screen. Each entry is `{ project: 'slug', img: ASSETS + 'file.jpg' }`.
The card links to that project, and hovering it shows the project's name.
Eight to twelve photos works best. Visitors can turn it by scrolling sideways
(a trackpad swipe, or shift + mouse wheel), by dragging, with the left and right
arrow keys (Enter opens the front card), or by swiping on a phone; it also turns
as the page scrolls down.

**`PROJECTS`** — one block per project, in the order they appear on the page.

### Adding a project

Copy an existing project block, change the fields, and drop it where you want it
in the list:

```js
{
  slug: 'my-new-project',        // the URL: yoursite.com/#/my-new-project
  name: 'Project Name',
  nameLine2: 'Subtitle Line',    // optional second line, set '' to skip
  subtitle: 'One sentence on what it is.',
  discipline: 'Product Design',
  year: '2026',
  role: 'Industrial Designer',
  timeline: '3 Weeks',           // optional
  tools: ['Sketching', 'CAD'],
  materials: 'ABS, Aluminium',   // optional
  cover: ASSETS + 'my-cover.jpg',
  win:   ASSETS + 'my-win.jpg',     // the full-screen card on the home page
  hero:  ASSETS + 'my-hero.jpg',    // the big image on the case study's first screen
  summary: 'One sentence on what it is.',
  glance: { problem: '…', approach: '…', outcome: '…' },
  chapters: [ /* the story — see Case studies below */ ],
  reflection: 'The closing thought.'
}
```

### Case studies

Each project page reads top to bottom in the same order, so an employer gets
the idea at once and the detail as they scroll:

| field | what it is |
|---|---|
| `summary` | one sentence: what the project is. Shown large on the first screen |
| `glance` | `{ problem, approach, outcome }`: the whole project in three statements |
| `chapters` | the story, one step at a time (see below) |
| `reflection` | the closing thought |

A chapter is `{ title, text, media }`. `text` is a sentence or a list of
paragraphs. `media` is a list where each entry is one image `{ src, cap }` or a
row of two `[ { src, cap }, { src, cap } ]`. The chapter's text stays pinned
beside its images while they scroll. A chapter with no `media` is shown as text
on its own. Captions are optional; leave `cap` as `''` to hide one.

### Project cards

Each project on the home page is a full-screen card. Cards pin in place and
the next one slides up over them. The `win` image fills the card by default. If
it crops badly:

- add `winPos: 'center 30%'` to move the crop, or
- add `winFit: 'contain', winBg: '#ffffff'` to show the whole image centred on a
  flat colour. Match `winBg` to the image's own background, or use
  `winBg: 'blur'` for a soft blurred copy of the photo behind it. Small images
  are never stretched past their real size.

### What the cursor does

On a mouse or trackpad the cursor is an orange dot that changes with what is
under it: "← →" on the opening screen, the project's name on carousel photos,
"View project" on project cards, a preview of each project in the "More
projects" list at the end of a case study, your portrait
over your name, "Zoom" on images, and "Copy email" on the address. Phones and tablets keep their normal
touch behaviour.

### The Modelling section

`SITE.modelling` lists the tools shown large in the Modelling section. Each
entry has a `tool` name, a short `role`, a one-line `note`, and an `img` with
its caption `cap`: a piece of work made with that tool. Hovering a tool (or
scrolling past it on a phone) swaps the image.

### The About section

Everything comes from `SITE.about`:

- `statement`: the one line at the top.
- `steps`: the four panels (Draw, Model, Render, Make). Each has a `verb`, an
  `img` from his work, a short `text`, and where it links (`href`, `go`).
  Hovering or tabbing to a panel opens it; on a phone they swipe.
- `timeline`: dated lines from the résumé. `now: true` marks the current line,
  `future: true` the expected degree.
- The title block beside it uses `SITE.name`, `school`, `location`, `status`,
  `resume` and `about.degree`.

### The Grasshopper page

The vase at the top is rebuilt live in `assets/vase.js` from his definition
(the four lofted circles, the attractor spiral, `radius` and `t`). It loads
only on that page. The sliders match the ones in his definition.

### On phones

Phones get their own layout rather than a shrunk desktop. The nav becomes a
Menu button with a full-screen menu (links, email, socials, résumé).
The ring becomes a swipeable reel of the same `SITE.carousel` photos. Modelling
becomes swipeable cards. Image pairs in case studies become swipeable galleries,
and "More projects" shows thumbnails. Nothing extra needs editing: it all comes
from the same data.

### Colours

All colours are set once at the top of `assets/site.css`, in `:root`.

### Adding images

Drop the file in `assets/` and reference it as `ASSETS + 'filename.jpg'`.
Keep images under about 500 KB each — export at around 1600 px on the long edge.

### After you edit

Bump the version numbers at the bottom of `index.html` so browsers pick up your
changes instead of serving an old cached copy:

```html
<link rel="stylesheet" href="assets/site.css?v=3">
<script defer src="assets/data.js?v=3"></script>
<script defer src="assets/site.js?v=3"></script>
```

Any number works — just make all three match and change them together.

## Viewing it locally

Double-clicking `index.html` works. To check it exactly as it will be hosted,
run a local server from this folder:

```bash
py -3 -m http.server 8411
```

then open `http://localhost:8411`.

## Publishing

Upload the whole folder (`index.html` + `assets/`) to any static host — GitHub
Pages, Netlify, Vercel, Cloudflare Pages. There is nothing to build.

## Still to add

Two projects are written but thin on imagery — they currently run on one image
each:

- **Washer Lamp** — has the lit hero shot. Process photos, the wire jig, and a
  shot of the cast light pattern would make it a full case study.
- **Aerion One** — has one render. Orthographics, an exploded view, and any
  sketch work would bring it up to the level of the stove and cochlear pages.

**Spinner Plate** has one photo. The CAD, the ring mechanism, and more use shots
would help.

Drop the files in `assets/`, then add them to the `media` of the matching
chapter in `data.js`. Those three projects' chapters already exist, so new
images slot straight in beside the right text.

## Coursework, files and sketches

- Projects 07-09 (Crown Lamp, Watch Table, Ear Container) are the larger Rhino/KeyShot assignments, each with 3D models in `assets/models`. The smaller first-term assignments live on the Rhino & KeyShot tool page (`rk.coursework` at the bottom of `data.js`).
- A chapter can carry `files: [{ label, type, href }]`: a download list shown under its text. Source files are in `assets/rhino-files`. The 137 MB KeyShot scene is deliberately not included.
- The Sketches page reads `page.sections` (also at the bottom of `data.js`); the images are in `assets/sketchbook`.

## Phones

The site is built to show the work first on a phone: no opening flash, no ring
(the swipeable reel is used instead), no smooth-scroll library, 3D models wait
for a tap, and pictures come from phone-sized WebP copies in `assets/m/`.

After adding or changing pictures, run once:

```
pip install pillow
python3 tools/make-mobile-images.py
```

If a phone copy is missing the site just uses the original, so nothing breaks.
Tapping a picture to zoom always opens the full-size original.

The first picture of the phone reel is preloaded from `index.html`
(`<link rel="preload" ... assets/m/...>`). If you change the first photo in
`SITE.carousel`, update that one line to match.
