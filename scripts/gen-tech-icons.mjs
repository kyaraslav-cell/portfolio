// Writes the ball textures into src/assets/tech.
//
// Two families:
//  - Brand marks from simple-icons (CC0), in the brand colour.
//  - Neutral pictograms for tools with no open-source mark. Their logos are
//    trademarks, so nothing is redrawn from memory; the ball carries a plain
//    pictogram and the name sits under it.
//
// Re-run after changing either list: npm run icons
import { writeFileSync } from "node:fs";
import * as si from "simple-icons";

const OUT = (file) => new URL(`../src/assets/tech/${file}.svg`, import.meta.url);
const wrap = (body, viewBox = "-4 -4 32 32") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="256" height="256">${body}</svg>`;

const BRANDS = [
  ["n8n", "siN8n"],
  ["allegro", "siAllegro"],
  ["postgresql", "siPostgresql"],
  ["docker", "siDocker"],
  ["nodejs", "siNodedotjs"],
  ["typescript", "siTypescript"],
  ["react", "siReact"],
  ["telegram", "siTelegram"],
  ["git", "siGit"],
  ["googleanalytics", "siGoogleanalytics"],
  ["googlesheets", "siGooglesheets"],
  ["anthropic", "siAnthropic"],
];

for (const [file, key] of BRANDS) {
  const icon = si[key];
  if (!icon) throw new Error(`simple-icons has no ${key}`);
  writeFileSync(
    OUT(file),
    wrap(`<title>${icon.title}</title><path d="${icon.path}" fill="#${icon.hex}"/>`)
  );
  console.log(`brand      ${file}.svg  ${icon.title}`);
}

// Stroke pictograms, drawn on a 24x24 grid.
const INK = "#3f3568";
const stroke = (d, title) =>
  wrap(
    `<title>${title}</title><g fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</g>`,
    "-3 -3 30 30"
  );

const PICTOGRAMS = [
  // storefront
  ["shoper", "Shoper", '<path d="M3 9h18l-1.4-4.2A2 2 0 0 0 17.7 3.4H6.3A2 2 0 0 0 4.4 4.8Z"/><path d="M4.5 9v10.5h15V9"/><path d="M9.5 19.5v-6h5v6"/>'],
  // chain link between two systems
  ["baselinker", "BaseLinker", '<rect x="2.5" y="4" width="8" height="6" rx="1.5"/><rect x="13.5" y="14" width="8" height="6" rx="1.5"/><path d="M10.5 7h4a3 3 0 0 1 3 3v4"/><path d="M13.5 17h-4a3 3 0 0 1-3-3v-4"/>'],
  // ledger
  ["comarch", "Comarch ERP", '<path d="M5 3.5h11.5a2 2 0 0 1 2 2V21H7a2 2 0 0 1-2-2Z"/><path d="M5 17.5h13.5"/><path d="M9 7.5h6"/><path d="M9 11h6"/>'],
  // invoice
  ["subiekt", "Subiekt", '<path d="M6 3.5h9L18.5 7v13.5l-2.5-1.4-2.5 1.4-2.5-1.4-2.5 1.4-2.5-1.4V5.5a2 2 0 0 1 2-2Z"/><path d="M9 8.5h6"/><path d="M9 12h6"/>'],
  // stamped document
  ["ksef", "KSeF", '<path d="M6.5 3.5h7L18 8v12.5H6.5Z"/><path d="M13 3.5V8h4.5"/><circle cx="12" cy="14.5" r="2.6"/><path d="M10.6 14.4l1 1 2-2"/>'],
  // bar chart
  ["powerbi", "Power BI", '<path d="M3.5 20.5h17"/><rect x="5" y="12" width="3.4" height="6"/><rect x="10.3" y="7.5" width="3.4" height="10.5"/><rect x="15.6" y="14" width="3.4" height="4"/>'],
  // spreadsheet grid
  ["excel", "Excel", '<rect x="3.5" y="4.5" width="17" height="15" rx="1.6"/><path d="M3.5 9.5h17"/><path d="M9 9.5v10"/><path d="M3.5 14.5h17"/>'],
  // API brackets
  ["restapi", "REST API", '<path d="M8.5 5.5 4 12l4.5 6.5"/><path d="M15.5 5.5 20 12l-4.5 6.5"/><path d="M13.5 4.5 10.5 19.5"/>'],
];

for (const [file, title, d] of PICTOGRAMS) {
  writeFileSync(OUT(file), stroke(d, title));
  console.log(`pictogram  ${file}.svg  ${title}`);
}
