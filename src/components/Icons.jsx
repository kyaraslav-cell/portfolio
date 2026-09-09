// Stroke icons drawn inline. No raster files, no brand marks, one visual
// language across the page.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Svg = ({ children, className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
    {children}
  </svg>
);

// Two systems with traffic between them.
export const IconIntegrations = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="3.5" width="7" height="6" rx="1.5" />
    <rect x="14.5" y="14.5" width="7" height="6" rx="1.5" />
    <path d="M9.5 6.5h6.5a2 2 0 0 1 2 2v6" />
    <path d="M16 12.5 18 14.5 20 12.5" />
    <path d="M14.5 17.5H8a2 2 0 0 1-2-2v-6" />
    <path d="M8 11.5 6 9.5 4 11.5" />
  </Svg>
);

// A document being lifted out of a stack.
export const IconDocuments = (p) => (
  <Svg {...p}>
    <path d="M6 20.5h9a2 2 0 0 0 2-2V8l-4.5-4.5H8a2 2 0 0 0-2 2v3" />
    <path d="M12.5 3.5V8H17" />
    <path d="M2.5 12.5h7" />
    <path d="M7 10 9.5 12.5 7 15" />
    <path d="M9.5 16.5h4" />
  </Svg>
);

// A signal reaching a handset.
export const IconMonitoring = (p) => (
  <Svg {...p}>
    <rect x="8.5" y="9.5" width="7" height="11" rx="1.8" />
    <path d="M11 18.5h2" />
    <path d="M17.5 8a5 5 0 0 0-5-5" />
    <path d="M20.5 7.5A8 8 0 0 0 12.5 .8" transform="translate(0 2)" />
    <circle cx="12" cy="13.5" r="1" />
  </Svg>
);

// Bars that update themselves.
export const IconReporting = (p) => (
  <Svg {...p}>
    <path d="M3.5 20.5h17" />
    <rect x="5" y="12" width="3.2" height="6" rx="0.8" />
    <rect x="10.4" y="8" width="3.2" height="10" rx="0.8" />
    <rect x="15.8" y="14" width="3.2" height="4" rx="0.8" />
    <path d="M4.5 6.5A4 4 0 0 1 11 5" />
    <path d="M11 3v2.2H8.8" />
  </Svg>
);

export const IconServer = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="6" rx="1.6" />
    <rect x="3" y="14" width="18" height="6" rx="1.6" />
    <path d="M6.5 7h.01M6.5 17h.01" />
    <path d="M10 7h5M10 17h5" />
  </Svg>
);

export const IconMask = (p) => (
  <Svg {...p}>
    <path d="M2.8 12S6 6.5 12 6.5c1.5 0 2.8.35 4 .9" />
    <path d="M21.2 12s-1.4 2.4-3.9 4.1" />
    <path d="M9.6 14.4a3.4 3.4 0 0 0 4.8-4.8" />
    <path d="M3.5 3.5l17 17" />
  </Svg>
);

export const IconAgreement = (p) => (
  <Svg {...p}>
    <path d="M6 21h10.5a1.5 1.5 0 0 0 1.5-1.5V8l-4.5-4.5H7.5A1.5 1.5 0 0 0 6 5v4" />
    <path d="M13.5 3.5V8H18" />
    <path d="M3 17.5c1.6-3.2 3.3-3.2 4.4-1.4.8 1.3-.6 3.4-1.6 2.6-.7-.6.6-2 2.2-2H12" />
  </Svg>
);

export const IconKey = (p) => (
  <Svg {...p}>
    <circle cx="7.5" cy="14.5" r="3.5" />
    <path d="M10.2 12.2 19 3.5" />
    <path d="M16.4 6.1 18.6 8.3" />
    <path d="M14 8.5 16.2 10.7" />
  </Svg>
);

export const IconShield = (p) => (
  <Svg {...p}>
    <path d="M12 3 19.5 6v5.6c0 4.2-3 7.4-7.5 9.4-4.5-2-7.5-5.2-7.5-9.4V6Z" />
    <path d="M9 12.2 11.2 14.4 15.3 10.3" />
  </Svg>
);

export const IconHuman = (p) => (
  <Svg {...p}>
    <circle cx="9.5" cy="8" r="3.2" />
    <path d="M3.5 20c0-3.3 2.7-5.4 6-5.4 1.2 0 2.3.3 3.2.8" />
    <path d="M14.5 17.5 16.5 19.5 21 15" />
  </Svg>
);

export const IconMail = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M3.5 6.5 12 13l8.5-6.5" />
  </Svg>
);

export const IconPhone = (p) => (
  <Svg {...p}>
    <path d="M5 3.5h3l1.6 4-2 1.4a11 11 0 0 0 5.5 5.5l1.4-2 4 1.6v3a1.9 1.9 0 0 1-2.1 1.9C9.6 18.4 5.6 14.4 3.1 5.6A1.9 1.9 0 0 1 5 3.5Z" />
  </Svg>
);

export const IconLink = (p) => (
  <Svg {...p}>
    <path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.4 6.4" />
    <path d="M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.4-1.4" />
  </Svg>
);

export const serviceIcons = {
  integrations: IconIntegrations,
  documents: IconDocuments,
  monitoring: IconMonitoring,
  reporting: IconReporting,
};

export const trustIcons = [
  IconServer,
  IconMask,
  IconAgreement,
  IconKey,
  IconShield,
  IconHuman,
];
