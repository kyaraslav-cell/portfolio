import n8n from "../assets/tech/n8n.svg";
import allegro from "../assets/tech/allegro.svg";
import shoper from "../assets/tech/shoper.svg";
import baselinker from "../assets/tech/baselinker.svg";
import comarch from "../assets/tech/comarch.svg";
import postgresql from "../assets/tech/postgresql.svg";
import nodejs from "../assets/tech/nodejs.svg";
import typescript from "../assets/tech/typescript.svg";
import react from "../assets/tech/react.svg";
import telegram from "../assets/tech/telegram.svg";
import powerbi from "../assets/tech/powerbi.svg";
import anthropic from "../assets/tech/anthropic.svg";

// Twelve, not more: each ball is its own canvas and WebGL context, and with the
// arm, the stars and the globe on the same page, browsers start dropping the
// oldest contexts past roughly sixteen.
// Textures come from `npm run icons`.
export const techBalls = [
  { name: "n8n", icon: n8n },
  { name: "Allegro API", icon: allegro },
  { name: "Shoper", icon: shoper },
  { name: "BaseLinker", icon: baselinker },
  { name: "Comarch ERP", icon: comarch },
  { name: "PostgreSQL", icon: postgresql },
  { name: "Node.js", icon: nodejs },
  { name: "TypeScript", icon: typescript },
  { name: "React", icon: react },
  { name: "Telegram API", icon: telegram },
  { name: "Power BI", icon: powerbi },
  { name: "Claude", icon: anthropic },
];

export default techBalls;
