// Writes brand icons from simple-icons (CC0) into src/assets/tech as coloured
// SVGs, so the site ships plain assets and does not depend on the package at
// runtime. Re-run after changing the list: node scripts/gen-tech-icons.mjs
import { writeFileSync } from "node:fs";
import * as si from "simple-icons";

const ICONS = [
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

for (const [file, key] of ICONS) {
  const icon = si[key];
  if (!icon) throw new Error(`simple-icons has no ${key}`);
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 32 32" width="256" height="256">',
    `<title>${icon.title}</title>`,
    `<path d="${icon.path}" fill="#${icon.hex}"/>`,
    "</svg>",
  ].join("");
  writeFileSync(new URL(`../src/assets/tech/${file}.svg`, import.meta.url), svg);
  console.log(`${file}.svg  ${icon.title}  #${icon.hex}`);
}
