import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { contact as details } from "../constans/content";
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

      {/* Portalled to <body>. Once scrolled, the nav gets backdrop-blur, and a
          backdrop filter makes the nav the containing block for any fixed
          child: the menu then covered only the nav's own strip and the page
          showed straight through it. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mobile-menu fixed inset-0 z-[25] overflow-y-auto xl:hidden"
            >
              <span aria-hidden="true" className="mobile-menu-glow" />
              {/* The page's nav lives inside the app root's stacking context,
                  so this body-level layer paints over it. The menu carries its
                  own header, close button included. */}
              <div className={`${styles.paddingX} relative flex items-center justify-between py-4`}>
                <span className="flex items-center gap-2">
                  <img src={logo} alt="" className="h-12 w-12 object-contain" />
                  <span className="font-display text-[16px] font-bold leading-tight text-white">Jarosław</span>
                </span>
                <div className="flex items-center gap-4">
                  <LangToggle />
                  <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                    <img src={close} alt="" className="h-7 w-7 object-contain" />
                  </button>
                </div>
              </div>
              <nav className="relative flex min-h-[calc(100%-80px)] flex-col px-8 pb-10 pt-8">
                <ul className="flex list-none flex-col">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-line"
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={() => {
                          setActive(link.id);
                          setOpen(false);
                        }}
                        className={`group flex items-baseline gap-4 py-4 font-display text-[26px] font-semibold transition-colors duration-500 ease-fluid hover:text-accent-soft ${
                          active === link.id ? "text-accent-soft" : "text-white"
                        }`}
                      >
                        <span className="w-6 font-sans text-[12px] font-medium tracking-wider text-signal/80">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.title}
                        <span className="ml-auto text-[18px] text-secondary/40 transition-transform duration-500 ease-fluid group-hover:translate-x-1 group-hover:text-accent-soft">
                          →
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href={`mailto:${details.email}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-auto pt-10 text-[14px] text-secondary transition-colors duration-500 ease-fluid hover:text-white"
                >
                  {details.email}
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
