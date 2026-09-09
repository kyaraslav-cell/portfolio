import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { logo, menu, close } from "../assets";
import { useLang } from "../context/Lang";

const SECTIONS = ["about", "projects", "technologies", "trust", "pricing", "contact"];
const NAV_KEYS = {
  about: "about",
  projects: "projects",
  technologies: "stack",
  trust: "trust",
  pricing: "pricing",
  contact: "contact",
};

const LangToggle = ({ className = "" }) => {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`flex items-center rounded-full border border-indigo-500/40 overflow-hidden text-[13px] ${className}`}
    >
      {["pl", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-3 py-1 uppercase transition-colors duration-200 ${
            lang === code ? "bg-[#8d48e6] text-white" : "text-secondary hover:text-white"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const { t } = useLang();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = SECTIONS.map((id) => ({ id, title: t.nav[NAV_KEYS[id]] }));

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-primary/95 backdrop-blur-sm border-b border-indigo-500/15" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center gap-6 max-w-7xl mx-auto">
        <a
          href="#"
          className="flex items-center gap-2 shrink-0"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="" className="w-12 h-12 object-contain" />
          <span className="text-white text-[16px] font-bold leading-tight">
            Jarosław<span className="sm:inline hidden"> Krukowski</span>
          </span>
        </a>

        <div className="hidden xl:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-6">
            {links.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.id ? "text-white" : "text-secondary"
                } hover:text-white text-[16px] font-medium cursor-pointer transition-colors duration-200`}
                onClick={() => setActive(link.id)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
          <LangToggle />
        </div>

        <div className="xl:hidden flex items-center gap-4">
          <LangToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <img src={open ? close : menu} alt="" className="w-7 h-7 object-contain z-10" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-20 bg-primary p-8 pt-24 xl:hidden"
          >
            <ul className="list-none flex flex-col gap-6">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => {
                      setActive(link.id);
                      setOpen(false);
                    }}
                    className="text-white text-[28px] font-medium hover:text-[#b58bff] transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
