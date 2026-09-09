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
      className={`flex items-center overflow-hidden rounded-full border border-line text-[12px] ${className}`}
    >
      {["pl", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-3 py-1.5 uppercase tracking-wider transition-colors duration-500 ease-fluid ${
            lang === code ? "bg-accent text-white" : "text-secondary hover:text-white"
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
        scrolled ? "border-b border-line bg-primary/80 backdrop-blur-xl" : "bg-transparent"
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
          <span className="font-display text-[16px] font-bold leading-tight text-white">
            Jarosław<span className="hidden sm:inline"> Krukowski</span>
          </span>
        </a>

        <div className="hidden xl:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-6">
            {links.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.id ? "text-white" : "text-secondary"
                } cursor-pointer text-[15px] font-medium transition-colors duration-500 ease-fluid hover:text-white`}
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
                    className="font-display text-[28px] font-semibold text-white transition-colors duration-500 ease-fluid hover:text-accent-soft"
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
