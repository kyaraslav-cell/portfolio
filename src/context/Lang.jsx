import { createContext, useContext, useEffect, useMemo, useState } from "react";
import content from "../constans/content";

const LangContext = createContext(null);

// Polish is the default because the buyers this site targets are Polish SMEs.
// English is a toggle, not an equal first option.
const pickInitial = () => {
  if (typeof window === "undefined") return "pl";
  const stored = window.localStorage.getItem("lang");
  if (stored === "pl" || stored === "en") return stored;
  return navigator.language?.toLowerCase().startsWith("pl") ? "pl" : "pl";
};

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(pickInitial);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", content[lang].meta.description);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((l) => (l === "pl" ? "en" : "pl")),
      t: content[lang],
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
};

export default LangContext;
