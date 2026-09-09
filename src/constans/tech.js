import n8n from "../assets/tech/n8n.svg";
import allegro from "../assets/tech/allegro.svg";
import shoper from "../assets/tech/shoper.svg";
import baselinker from "../assets/tech/baselinker.svg";
import comarch from "../assets/tech/comarch.svg";
import subiekt from "../assets/tech/subiekt.svg";
import ksef from "../assets/tech/ksef.svg";
import postgresql from "../assets/tech/postgresql.svg";
import docker from "../assets/tech/docker.svg";
import restapi from "../assets/tech/restapi.svg";
import nodejs from "../assets/tech/nodejs.svg";
import typescript from "../assets/tech/typescript.svg";
import react from "../assets/tech/react.svg";
import git from "../assets/tech/git.svg";
import telegram from "../assets/tech/telegram.svg";
import anthropic from "../assets/tech/anthropic.svg";
import powerbi from "../assets/tech/powerbi.svg";
import googleanalytics from "../assets/tech/googleanalytics.svg";
import googlesheets from "../assets/tech/googlesheets.svg";
import excel from "../assets/tech/excel.svg";

// One entry per technology and nothing repeated elsewhere on the page: this
// list is the whole stack section. Order runs from the tools worth hiring me
// for to the ones that make those work.
// Textures come from `npm run icons`.
export const techBalls = [
  { name: "n8n", icon: n8n },
  { name: "Allegro API", icon: allegro },
  { name: "Shoper", icon: shoper },
  { name: "BaseLinker", icon: baselinker },
  { name: "Comarch ERP", icon: comarch },
  { name: "Subiekt", icon: subiekt },
  { name: "KSeF", icon: ksef },
  { name: "PostgreSQL", icon: postgresql },
  { name: "REST API", icon: restapi },
  { name: "Docker", icon: docker },
  { name: "Node.js", icon: nodejs },
  { name: "TypeScript", icon: typescript },
  { name: "React", icon: react },
  { name: "Git", icon: git },
  { name: "Telegram API", icon: telegram },
  { name: "Claude", icon: anthropic },
  { name: "Power BI", icon: powerbi },
  { name: "Google Analytics", icon: googleanalytics },
  { name: "Google Sheets", icon: googlesheets },
  { name: "Excel", icon: excel },
];

export default techBalls;
