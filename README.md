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

## Where things are

| Path | What |
|---|---|
| `src/constans/content.js` | Every piece of copy, PL and EN, plus contact details. Edit here, not in components. |
| `src/context/Lang.jsx` | Language state, stored in `localStorage`, drives `<title>` and the meta description too. |
| `src/components/canvas/RobotArm.jsx` | The hero scene. Built from Three.js primitives, not a downloaded model. Drag to turn it. |
| `src/components/ProjectDiagrams.jsx` | The schematic on each case study card. |
| `src/components/Icons.jsx` | UI icons, inline SVG. |
| `src/constans/tech.js` | The brand icons on the spinning balls. |
| `src/components/Reveal.jsx` | Reveal-on-scroll. Every animated element uses it. |
| `src/components/LazyMount.jsx` | Mounts a WebGL canvas only once it is near the viewport. |
| `scripts/gen-tech-icons.mjs` | Regenerates the brand SVGs: `npm run icons`. |

Sections in order: hero, about and services, case studies, stack, data
handling, pricing, contact.

## Decisions worth knowing

**Dragging turns the arm, it does not orbit the camera.** OrbitControls rotates
the camera around the middle of the scene, which swung the arm out of frame.
The pointer handlers now add yaw to the arm's own pivot and let it coast to a
stop. `touch-action: pan-y` on the canvas keeps a vertical swipe scrolling the
page while a horizontal drag turns the arm.

**The hero stacks below `lg`.** On a phone the copy fills the screen, so the
arm gets its own block underneath instead of sitting behind the text, where it
collided with the buttons and was barely visible. From `lg` up it goes back to
a full-bleed layer behind the copy.

**Reveal-on-scroll is per element, not per section.** See the bug note below.

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

## Not done yet

- Not in git and not pushed anywhere. Running locally only.
- Contact still uses the template's EmailJS service. Works, but the account is
  the old one.
- No booking link. The plan was to replace the form with a calendar and keep
  the form as fallback.
- No domain, no hosting.
- Testimonial and permission to name the shop.
