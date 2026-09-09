import { motion } from "framer-motion";
import { styles } from "../styles";
import { RobotArmCanvas } from "./canvas";
import Button from "./ui/Button";
import { useLang } from "../context/Lang";

// Copy on top, arm underneath, both centred. The arm used to sit behind the
// text, which meant the overlay swallowed every pointer event and the arm
// could not be dragged at all above the lg breakpoint.
const Hero = () => {
  const { t } = useLang();

  return (
    <section className="relative mx-auto flex min-h-screen w-full flex-col justify-center">
      <div className={`${styles.paddingX} relative z-10 mx-auto w-full max-w-3xl pt-32 text-center sm:pt-36`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[12px] uppercase tracking-[0.32em] text-secondary sm:text-[13px]">
            {t.hero.greeting}
          </p>
          <h1 className={`${styles.heroHeadText} text-balance`}>{t.hero.headline}</h1>
          <p className={`${styles.heroSubText} mx-auto mt-6 max-w-xl`}>{t.hero.sub}</p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap justify-center gap-2.5"
        >
          {t.hero.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-[12px] text-secondary backdrop-blur-sm transition-colors duration-500 ease-fluid hover:border-line-strong hover:text-white sm:text-[13px]"
            >
              {chip}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button href="#projects">{t.hero.ctaPrimary}</Button>
          <Button href="#contact" variant="ghost">
            {t.hero.ctaSecondary}
          </Button>
        </motion.div>
      </div>

      {/* No flex-1 here: in a constrained flex column it wins over the height
          and collapses the canvas. */}
      <div className="relative mt-4 h-[300px] w-full shrink-0 sm:mt-6 sm:h-[400px] lg:h-[440px]">
        <RobotArmCanvas />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 pb-10">
        <p className="text-[11px] tracking-[0.14em] text-secondary/70">{t.hero.dragHint}</p>
        <a href="#about" aria-label={t.nav.about}>
          <div className="flex h-[52px] w-[28px] items-start justify-center rounded-full border-2 border-secondary/50 p-1.5 transition-colors duration-500 ease-fluid hover:border-accent">
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-2 rounded-full bg-secondary"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
