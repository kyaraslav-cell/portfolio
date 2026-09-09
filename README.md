# Portfolio

Personal site for Jarosław Krukowski, positioned on e-commerce automation and
ERP integration rather than general web development. Polish first, English
behind a toggle, because the buyers it is written for are Polish SMEs.

Built on the React and Three.js portfolio template that was already in
`Desktop/Return/MyPortfolio`. The build is the template's; the content,
structure and 3D scene are not.

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:5173. `npm run build` produces `dist/`.

## Deploy

Live at **https://kyaraslav-cell.github.io/portfolio/**, served from the
`gh-pages` branch.

```bash
npm run deploy
```

Builds and force-pushes `dist/` to `gh-pages`. Vite is configured with
`base: "./"`, so every asset path is relative and the build works under the
`/portfolio/` sub-path without knowing the repo name.

There is a GitHub Actions workflow ready at `docs/ci/github-pages.yml`, unused
because the local `gh` token has no `workflow` scope and GitHub rejects pushes
that add workflow files without it. To switch to CI:

```bash
gh auth refresh -s workflow
mkdir -p .github/workflows && cp docs/ci/github-pages.yml .github/workflows/
```

then set the Pages source to "GitHub Actions" in the repository settings.

## Where things are

| Path | What |
|---|---|
| `src/constans/content.js` | Every piece of copy, PL and EN, plus contact details. Edit here, not in components. |
| `src/context/Lang.jsx` | Language state, stored in `localStorage`, drives `<title>` and the meta description too. |
| `src/components/canvas/RobotArm.jsx` | The hero scene. Built from Three.js primitives, not a downloaded model. Drag to turn it. |
| `src/components/canvas/Planets.jsx` | The whole stack section: 20 spheres in one WebGL context, each draggable. |
| `src/components/ProjectDiagrams.jsx` | The schematic on each case study card. |
| `src/components/Icons.jsx` | UI icons, inline SVG. |
| `src/components/ui/` | Button, SpotlightCard, Carousel. |
| `src/constans/tech.js` | The brand icons on the spinning balls. |
| `src/components/Reveal.jsx` | Reveal-on-scroll. Every animated element uses it. |
| `src/components/LazyMount.jsx` | Mounts a WebGL canvas only once it is near the viewport. |
| `scripts/gen-tech-icons.mjs` | Regenerates the brand SVGs: `npm run icons`. |

Sections in order: hero, about and services, case studies, stack, data
handling, pricing, contact.

## Design

Type is Manrope for display and Inter for text: upright, geometric, nothing
scripted. One easing everywhere (`ease-fluid`, a slow-out curve with no
bounce), longer durations than the template used, and hover states that lift
and warm a border rather than bounce.

Components follow the patterns those component registries publish - gradient
border with a shimmer sweep, pointer-following spotlight card, scroll-snap
carousel - written directly against Tailwind and this project's tokens. The
registry CLI expects a shadcn/ui install with `components.json`, and adding
Radix plus that scaffolding to a seven-section site costs more than the three
components are worth.

Sections are centred, and the copy is deliberately short: icons and measured
numbers carry the meaning, and the case studies lead with four figures each.

## Decisions worth knowing

**The stack section is one canvas, not twenty.** One WebGL context per sphere
is what the template did; twenty of them sit on the browser's context limit and
start evicting each other. A single orthographic canvas lays the grid out in
pixels, so the columns stay responsive and each sphere still hovers and spins
under the pointer on its own. The whole page now uses four contexts.

**Every technology appears exactly once.** The spheres are the entire stack
section; there is no second list underneath repeating the same names.

**Reveal-on-scroll is CSS, not a JS animation.** An IntersectionObserver adds a
class and a transition does the rest, so an element reaches its final state
even when no animation frame runs - a background tab, reduced motion, a script
that failed. Content can never be left invisible waiting for a frame.

**The schematics carry live signals.** Pulses travel the same path data the
drawn wire uses, so a signal cannot drift off its wire, and the node doing the
work carries a slow ring. Both are suppressed under `prefers-reduced-motion`.

**Dragging turns the arm, it does not orbit the camera.** OrbitControls rotates
the camera around the middle of the scene, which swung the arm out of frame.
The pointer handlers now add yaw to the arm's own pivot and let it coast to a
stop. `touch-action: pan-y` on the canvas keeps a vertical swipe scrolling the
page while a horizontal drag turns the arm.

**The hero is centred, with the arm below the copy at every width.** The arm
used to sit behind the text on desktop, and the overlay spanned the full width,
so it swallowed every pointer event and the arm could not be dragged at all
above `lg`. Stacking also makes it fully visible on a phone.

**Brand icons come from simple-icons (CC0)**, recoloured into `src/assets/tech`
by `npm run icons`. The package is a devDependency: the site ships plain SVG
files. Only tools with an open-source mark are on the balls; Shoper,
BaseLinker, Comarch and Subiekt have none, so they stay as named chips. Their
logos are trademarks and are not redrawn here.

**The 3D asset is code, not a model file.** The template shipped a 1.5 MB
gaming-PC glTF. A robotic arm made of cylinders and boxes is the same visual
job, correlates with what the site sells, weighs nothing, needs no licence, and
its joint angles are drivable. `public/desktop_pc/` was deleted.

**Project cards show schematics, not screenshots.** A screenshot of MailWatch
or LeadFind contains real customer data. Publishing that on the page whose job
is to prove data can be trusted here would be the wrong trade. The schematics
also survive a UI change.

**No named client.** The MailWatch case study describes the deployment without
naming the shop, because written permission to name it has not been obtained
yet. Once it is, the name goes in `content.js` and nowhere else.

**Numbers are labelled as measured or not.** Each case study carries a
`measured` line saying what the figure was counted from. Claims that are design
intent rather than measurement are worded as such. Do not add a number here
that nobody actually counted.

**No hourly rate, but stated price ranges.** A stated range filters out people
who were never going to pay and stops the negotiation starting at zero. An
hourly rate invites comparison with people charging 30 zł/h.

## Fixes made to the template

- Title said "Portoflio".
- `scroll-behavior: smooth` was set on `*` instead of `html`.
- `fadeIn` and `slideIn` passed the caller's `type` straight into the
  transition, and call sites passed `""`. Defaults added.
- `SectionWrapper` used `viewport={{ one: true }}`; the prop is `once`.
- The desktop navbar switched at `lg`, where the brand and the links sat 5px
  apart. It switches at `xl` now.
- Mobile menu state was initialised to the string `"false"`, so the first tap
  did nothing.
- **Whole sections rendered blank.** `SectionWrapper` gated a section's
  contents on `whileInView` with `amount: 0.25`. A section taller than four
  screens can never reach a 25% intersection ratio, so on smaller viewports the
  observer never fired and the section stayed at `opacity: 0` forever. Reveals
  now sit on individual elements with `amount: "some"`.
- **Diagram box labels were invisible.** JSX passes `x="94"` as a string, so
  `x + w / 2` concatenated instead of adding and threw every label thousands of
  units outside the viewBox. Coordinates are coerced with `Number()` now.
- **The hero canvas collapsed to 150px.** `flex-1` on a fixed-height child in a
  constrained flex column beats the height and shrinks it. Explicit height and
  `shrink-0` now.
- **The hero overlay blocked the arm.** It was `lg:absolute lg:inset-0`, so it
  covered the canvas edge to edge and no drag ever reached it.

## Not done yet

- The repository is public so that Pages can serve it, which the free plan
  requires. Nothing secret is tracked: `.env` is ignored and the history has
  been checked.
- Contact still uses the template's EmailJS service. Works, but the account is
  the old one.
- No booking link. The plan was to replace the form with a calendar and keep
  the form as fallback.
- No domain, no hosting.
- Testimonial and permission to name the shop.
