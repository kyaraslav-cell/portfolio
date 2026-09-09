import { motion } from "framer-motion";
import { styles } from "../styles";
import { RobotArmCanvas } from "./canvas";
import { useLang } from "../context/Lang";

const Hero = () => {
  const { t } = useLang();

  return (
    <section className="relative w-full mx-auto lg:h-screen">
      <div
        className={`${styles.paddingX} relative z-10 max-w-7xl mx-auto flex flex-row items-start gap-5 pt-28 pb-4 lg:pt-0 lg:pb-0 lg:absolute lg:inset-0 lg:top-[110px]`}
      >
        <div className="flex flex-col justify-center items-center mt-5 shrink-0">
          <div className="w-5 h-5 rounded-full bg-[#8d48e6]" />
          <div className="w-1 h-40 sm:h-80 violet-gradient" />
        </div>

        <div className="max-w-xl lg:max-w-2xl">
          <p className="text-secondary tracking-[0.2em] uppercase text-[12px] sm:text-[14px]">
            {t.hero.greeting}
          </p>
          <h1 className={`${styles.heroHeadText} text-white`}>{t.hero.headline}</h1>
          <p className={`${styles.heroSubText} mt-4 text-[#dfd9ff] max-w-2xl`}>{t.hero.sub}</p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {t.hero.chips.map((chip) => (
              <li
                key={chip}
                className="text-[12px] sm:text-[13px] text-secondary border border-indigo-500/30 bg-tertiary/60 backdrop-blur-sm rounded-full px-3.5 py-1.5"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-[#8d48e6] hover:bg-[#7a35d6] text-white font-medium rounded-xl px-6 py-3 transition-colors duration-200"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#contact"
              className="border border-indigo-500/40 hover:border-indigo-500 text-white font-medium rounded-xl px-6 py-3 transition-colors duration-200"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Its own block below the copy on small screens, a full-bleed layer
          behind it from lg up. */}
      <div className="relative h-[320px] sm:h-[400px] w-full lg:absolute lg:inset-0 lg:h-full lg:z-0">
        <RobotArmCanvas />
      </div>
      <p className="lg:hidden pb-8 text-center text-[11px] text-secondary/70">{t.hero.dragHint}</p>

      <div className="hidden lg:flex absolute bottom-10 w-full justify-center items-center pointer-events-none">
        <a href="#about" className="pointer-events-auto">
          <div className="w-[35px] h-[64px] rounded-3xl border-[4px] border-secondary flex justify-center items-start p-2 opacity-75">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
