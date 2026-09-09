import { useReducedMotion } from "framer-motion";
import { useLang } from "../context/Lang";

// Each project card carries a schematic instead of a screenshot. A screenshot
// of MailWatch or LeadFind contains real customer data, and publishing that on
// the page whose job is to prove data can be trusted here would be the wrong
// trade. The schematic also survives a UI change.
//
// The connector paths are declared once and shared by the drawn line and the
// pulse that travels along it, so a signal can never drift off its wire.

const L = {
  pl: {
    mailbox: "Skrzynka",
    rules: "Reguły + LLM",
    cleaned: "dane czyszczone",
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
    loop: "decyzja uczy kolejny prompt",
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
    loop: "the decision trains the next prompt",
  },
};

const STROKE = "#5b4b8a";
const TEXT = "#e6e1f5";
const DIM = "#8b83ad";
const ACCENT = "#915eff";
const GOOD = "#00cea8";
const FONT = "Inter, system-ui, sans-serif";

const Box = ({ x, y, w = 86, h = 40, label, sub, accent, pulse }) => {
  const left = Number(x);
  const top = Number(y);
  const width = Number(w);
  const height = Number(h);
  const midX = left + width / 2;
  const midY = top + height / 2;
  const colour = accent || STROKE;

  return (
    <g className="diagram-node">
      {pulse && (
        <rect
          x={left}
          y={top}
          width={width}
          height={height}
          rx="9"
          fill="none"
          stroke={colour}
          strokeWidth="1"
          opacity="0"
        >
          <animate attributeName="opacity" values="0;0.55;0" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="1;3.5;1" dur="2.6s" repeatCount="indefinite" />
        </rect>
      )}
      <rect
        x={left}
        y={top}
        width={width}
        height={height}
        rx="9"
        fill="#16112f"
        stroke={colour}
        strokeWidth="1.2"
      />
      <text x={midX} y={sub ? midY - 2 : midY + 4} textAnchor="middle" fill={TEXT} fontSize="11" fontFamily={FONT} fontWeight="500">
        {label}
      </text>
      {sub && (
        <text x={midX} y={midY + 12} textAnchor="middle" fill={DIM} fontSize="9" fontFamily={FONT}>
          {sub}
        </text>
      )}
    </g>
  );
};

const Wire = ({ d, colour = STROKE, dashed }) => (
  <path
    d={d}
    fill="none"
    stroke={colour}
    strokeWidth="1.2"
    strokeOpacity={dashed ? 0.55 : 0.8}
    strokeDasharray={dashed ? "4 4" : undefined}
    strokeLinecap="round"
  />
);

// A packet of work moving down a wire. Two circles: a soft halo and a core.
const Pulse = ({ d, colour = ACCENT, dur = 2.6, delay = 0 }) => {
  const motion = (extra) => (
    <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} {...extra} />
  );
  return (
    <g>
      <circle r="5" fill={colour} opacity="0.18">
        {motion()}
      </circle>
      <circle r="2.4" fill={colour}>
        {motion()}
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.12;0.85;1"
          dur={`${dur}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
};

const Frame = ({ children }) => (
  <svg viewBox="0 0 400 230" className="block h-auto w-full" role="img">
    <rect x="0" y="0" width="400" height="230" fill="transparent" />
    {children}
  </svg>
);

const Caption = ({ x, y, children, anchor = "middle" }) => (
  <text x={x} y={y} textAnchor={anchor} fill={DIM} fontSize="9.5" fontFamily={FONT}>
    {children}
  </text>
);

export const MailWatchDiagram = () => {
  const { lang } = useLang();
  const d = L[lang];
  const still = useReducedMotion();

  const inbox = "M100 114 H132";
  const toTelegram = "M224 110 C248 100, 252 74, 276 70";
  const toDropped = "M224 118 C248 128, 252 154, 276 158";
  const feedback = "M328 90 V196 H178 V134";

  return (
    <Frame>
      <Caption x="18" y="24" anchor="start">
        MailWatch
      </Caption>
      <Caption x="382" y="24" anchor="end">
        {d.volume}
      </Caption>

      <Wire d={inbox} />
      <Wire d={toTelegram} colour={GOOD} />
      <Wire d={toDropped} dashed />
      <Wire d={feedback} dashed colour={GOOD} />

      {!still && (
        <>
          <Pulse d={inbox} dur={2.2} />
          <Pulse d={toTelegram} colour={GOOD} dur={2.6} delay={0.9} />
          <Pulse d={toDropped} colour={STROKE} dur={2.6} delay={1.6} />
          <Pulse d={feedback} colour={GOOD} dur={4.2} delay={2.2} />
        </>
      )}

      <Box x="16" y="94" w="84" label={d.mailbox} sub="IMAP" />
      <Box x="132" y="94" w="92" label={d.rules} sub={d.cleaned} accent={ACCENT} pulse={!still} />
      <Box x="276" y="50" w="104" label="Telegram" sub={d.passed} accent={GOOD} />
      <Box x="276" y="138" w="104" label={d.dropped} sub={d.droppedSub} />

      <Caption x="200" y="216">
        {d.truth}
      </Caption>
    </Frame>
  );
};

export const LeadFindDiagram = () => {
  const { lang } = useLang();
  const d = L[lang];
  const still = useReducedMotion();

  const s1 = "M94 59 C118 59, 120 92, 140 96";
  const s2 = "M94 95 H140";
  const s3 = "M94 131 C118 131, 120 104, 140 100";
  const store = "M186 118 V152";
  const toQueue = "M232 98 H266";
  const toPhone = "M323 118 V140";
  const feedback = "M266 158 H244 V200 H186 V186";

  return (
    <Frame>
      <Caption x="18" y="24" anchor="start">
        LeadFind
      </Caption>
      <Caption x="382" y="24" anchor="end">
        {d.sources}
      </Caption>

      <Wire d={s1} />
      <Wire d={s2} />
      <Wire d={s3} />
      <Wire d={store} />
      <Wire d={toQueue} />
      <Wire d={toPhone} colour={GOOD} />
      <Wire d={feedback} dashed colour={GOOD} />

      {!still && (
        <>
          <Pulse d={s1} dur={2.8} delay={0} />
          <Pulse d={s2} dur={2.8} delay={0.6} />
          <Pulse d={s3} dur={2.8} delay={1.2} />
          <Pulse d={store} dur={2.2} delay={1.9} />
          <Pulse d={toQueue} dur={2.2} delay={2.1} />
          <Pulse d={toPhone} colour={GOOD} dur={2.2} delay={2.7} />
          <Pulse d={feedback} colour={GOOD} dur={4} delay={3.2} />
        </>
      )}

      <Box x="14" y="46" w="80" h="26" label={`${d.source} 1`} />
      <Box x="14" y="82" w="80" h="26" label={`${d.source} 2`} />
      <Box x="14" y="118" w="80" h="26" label={`${d.source} 3`} />
      <Box x="140" y="78" w="92" label={d.intake} sub={d.intakeSub} accent={ACCENT} pulse={!still} />
      <Box x="140" y="152" w="92" h="34" label="PostgreSQL" sub={d.leads} />
      <Box x="266" y="78" w="114" label={d.queue} sub={d.queueSub} />
      <Box x="266" y="140" w="114" h="36" label="Telegram" sub={d.decision} accent={GOOD} />

      <Caption x="200" y="220">
        {d.loop}
      </Caption>
    </Frame>
  );
};

export const projectDiagrams = {
  mailwatch: MailWatchDiagram,
  leadfind: LeadFindDiagram,
};
