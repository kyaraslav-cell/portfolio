import n8n from "../assets/tech/n8n.svg";
import allegro from "../assets/tech/allegro.svg";
import postgresql from "../assets/tech/postgresql.svg";
import docker from "../assets/tech/docker.svg";
import nodejs from "../assets/tech/nodejs.svg";
import typescript from "../assets/tech/typescript.svg";
import react from "../assets/tech/react.svg";
import telegram from "../assets/tech/telegram.svg";
import git from "../assets/tech/git.svg";
import googleanalytics from "../assets/tech/googleanalytics.svg";
import googlesheets from "../assets/tech/googlesheets.svg";
import anthropic from "../assets/tech/anthropic.svg";

// Icons come from simple-icons (CC0), recoloured into src/assets/tech by
// `npm run icons`. Only tools with an open-source mark are here; the Polish
// ERP and shop systems have none, so they stay as named chips below.
export const techBalls = [
  { name: "n8n", icon: n8n },
  { name: "Allegro API", icon: allegro },
  { name: "PostgreSQL", icon: postgresql },
  { name: "Docker", icon: docker },
  { name: "Node.js", icon: nodejs },
  { name: "TypeScript", icon: typescript },
  { name: "React", icon: react },
  { name: "Telegram API", icon: telegram },
  { name: "Git", icon: git },
  { name: "Google Analytics", icon: googleanalytics },
  { name: "Google Sheets", icon: googlesheets },
  { name: "Claude", icon: anthropic },
];

export default techBalls;
