// Each project card carries a schematic of the system instead of a screenshot.
// A screenshot of MailWatch or LeadFind would contain real customer data, and
// publishing that on the page whose job is to prove data can be trusted to me
// would be the wrong trade. The schematic also survives a UI change.

import { useLang } from "../context/Lang";

const L = {
  pl: {
    mailbox: "Skrzynka",
    rules: "Reguły + LLM",
    cleaned: "dane wyczyszczone",
    passed: "25% poczty",
    dropped: "Pominięte",
    droppedSub: "75% poczty",
    truth: "odpowiedzi obsługi = dane uczące",
    volume: "4 156 wiadomości",
    source: "Źródło",
    sources: "7 źródeł",
    intake: "Intake",
    intakeSub: "dedup + zapis",
    leads: "1 602 leady",
    queue: "Kolejka + ocena",
    queueSub: "model językowy",
    decision: "decyzja właściciela",
    loop: "pętla zwrotna uczy kolejny prompt",
    study: "Projekt studyjny",
    ui: "interfejs",
    accounts: "konta, historia",
    own: "własny backend i schemat bazy",
  },
  en: {
    mailbox: "Mailbox",
    rules: "Rules + LLM",
    cleaned: "data stripped",
    passed: "25% of mail",
    dropped: "Held back",
    droppedSub: "75% of mail",
    truth: "staff replies = training data",
    volume: "4,156 messages",
    source: "Source",
    sources: "7 sources",
    intake: "Intake",
    intakeSub: "dedupe + store",
    leads: "1,602 leads",
    queue: "Queue + scoring",
    queueSub: "language model",
    decision: "owner decides",
    loop: "feedback loop trains the next prompt",
    study: "Study project",
    ui: "interface",
    accounts: "accounts, history",
    own: "own backend and schema",
  },
};

const STROKE = "#5b4b8a";
const TEXT = "#cfc9e6";
const DIM = "#8b83ad";
const ACCENT = "#915eff";
const GOOD = "#00cea8";

// Coordinates arrive from JSX as strings, so they are coerced before any
// arithmetic: "94" + 20 concatenates and puts the label off the canvas.
const Box = ({ x, y, w = 86, h = 40, label, sub, accent }) => {
  const left = Number(x);
  const top = Number(y);
  const width = Number(w);
  const height = Number(h);
  const midX = left + width / 2;
  const midY = top + height / 2;

  return (
    <g>
      <rect
        x={left}
        y={top}
        width={width}
        height={height}
        rx="8"
        fill="#171233"
        stroke={accent || STROKE}
        strokeWidth="1.2"
      />
      <text
        x={midX}
        y={sub ? midY - 2 : midY + 4}
        textAnchor="middle"
        fill={TEXT}
        fontSize="11"
        fontFamily="Poppins, sans-serif"
      >
        {label}
      </text>
      {sub && (
        <text
          x={midX}
          y={midY + 12}
          textAnchor="middle"
          fill={DIM}
          fontSize="9"
          fontFamily="Poppins, sans-serif"
        >
          {sub}
        </text>
      )}
    </g>
  );
};

const Arrow = ({ d, color = STROKE, dashed }) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth="1.3"
    strokeDasharray={dashed ? "4 4" : undefined}
    markerEnd="url(#head)"
  />
);

const Defs = () => (
  <defs>
    <marker id="head" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill={STROKE} />
    </marker>
  </defs>
);

const Frame = ({ children }) => (
  <svg viewBox="0 0 400 230" className="w-full h-auto block" role="img">
    <rect x="0" y="0" width="400" height="230" fill="#0e0a20" />
    <Defs />
    {children}
  </svg>
);

export const MailWatchDiagram = () => {
  const { lang } = useLang();
  const d = L[lang];
  return (
  <Frame>
    <text x="20" y="26" fill={DIM} fontSize="10" fontFamily="Poppins, sans-serif">
      MailWatch
    </text>

    <Box x="16" y="94" w="84" label={d.mailbox} sub="IMAP" />
    <Arrow d="M104 114 H128" />
    <Box x="132" y="94" w="92" label={d.rules} sub={d.cleaned} accent={ACCENT} />

    <Arrow d="M228 108 C250 100, 250 74, 272 70" color={GOOD} />
    <Arrow d="M228 120 C250 128, 250 154, 272 158" dashed />

    <Box x="276" y="50" w="104" label="Telegram" sub={d.passed} accent={GOOD} />
    <Box x="276" y="138" w="104" label={d.dropped} sub={d.droppedSub} />

    <path d="M178 138 V178 H60 V132" fill="none" stroke={STROKE} strokeWidth="1.1" strokeDasharray="3 4" />
    <text x="120" y="196" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="Poppins, sans-serif">
      {d.truth}
    </text>

    <text x="384" y="26" textAnchor="end" fill={DIM} fontSize="10" fontFamily="Poppins, sans-serif">
      {d.volume}
    </text>
  </Frame>
  );
};

export const LeadFindDiagram = () => {
  const { lang } = useLang();
  const d = L[lang];
  return (
  <Frame>
    <text x="20" y="26" fill={DIM} fontSize="10" fontFamily="Poppins, sans-serif">
      LeadFind
    </text>

    <Box x="14" y="46" w="80" h="26" label={`${d.source} 1`} />
    <Box x="14" y="82" w="80" h="26" label={`${d.source} 2`} />
    <Box x="14" y="118" w="80" h="26" label={`${d.source} 3`} />
    <text x="54" y="164" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="Poppins, sans-serif">
      {d.sources}
    </text>

    <Arrow d="M98 59 C120 59, 118 92, 136 96" />
    <Arrow d="M98 95 H136" />
    <Arrow d="M98 131 C120 131, 118 102, 136 100" />

    <Box x="140" y="78" w="92" label={d.intake} sub={d.intakeSub} accent={ACCENT} />
    <Arrow d="M186 122 V148" />
    <Box x="140" y="152" w="92" h="34" label="PostgreSQL" sub={d.leads} />

    <Arrow d="M236 98 H262" />
    <Box x="266" y="78" w="114" label={d.queue} sub={d.queueSub} />
    <Arrow d="M323 122 C323 150, 300 158, 282 158" />
    <Box x="266" y="140" w="114" h="36" label="Telegram" sub={d.decision} accent={GOOD} />

    <path d="M266 158 H244 V196 H186 V190" fill="none" stroke={GOOD} strokeWidth="1.1" strokeDasharray="3 4" />
    <text x="196" y="212" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="Poppins, sans-serif">
      {d.loop}
    </text>
  </Frame>
  );
};

export const RecognitionDiagram = () => {
  const { lang } = useLang();
  const d = L[lang];
  return (
  <Frame>
    <text x="20" y="26" fill={DIM} fontSize="10" fontFamily="Poppins, sans-serif">
      {d.study}
    </text>

    <Box x="24" y="94" w="92" label="React" sub={d.ui} />
    <Arrow d="M120 114 H150" />
    <Box x="154" y="94" w="92" label="Node.js" sub="API" accent={ACCENT} />
    <Arrow d="M250 114 H280" />
    <Box x="284" y="94" w="92" label="PostgreSQL" sub={d.accounts} />

    <Arrow d="M200 90 V56" />
    <Box x="154" y="26" w="92" h="30" label="Clarifai API" />

    <text x="200" y="200" textAnchor="middle" fill={DIM} fontSize="9" fontFamily="Poppins, sans-serif">
      {d.own}
    </text>
  </Frame>
  );
};

export const projectDiagrams = {
  mailwatch: MailWatchDiagram,
  leadfind: LeadFindDiagram,
  recognition: RecognitionDiagram,
};
