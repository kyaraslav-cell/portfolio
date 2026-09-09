import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import Reveal, { SectionHeading } from "./Reveal";
import { useLang } from "../context/Lang";

const Pricing = () => {
  const { t } = useLang();

  return (
    <>
      <SectionHeading
        kicker={t.pricing.kicker}
        heading={t.pricing.heading}
        kickerClass={styles.sectionSubText}
        headingClass={styles.sectionHeadText}
      />

      <Reveal as="p" className={`${styles.sectionIntro} mt-7`}>
        {t.pricing.intro}
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-line">
        {t.pricing.rows.map((row, i) => (
          <div
            key={row.scope}
            className={`group flex flex-col gap-1 px-7 py-6 text-center transition-colors duration-500 ease-fluid hover:bg-accent/[0.07] sm:flex-row sm:items-center sm:gap-6 sm:text-left ${
              i ? "border-t border-line" : ""
            }`}
          >
            <div className="sm:flex-1">
              <p className="font-display text-[17px] font-semibold text-white">{row.scope}</p>
              <p className="mt-1 text-[13px] text-secondary">{row.detail}</p>
            </div>
            <p className="font-display text-[18px] font-bold text-accent-soft transition-transform duration-500 ease-fluid group-hover:scale-105 sm:whitespace-nowrap">
              {row.price}
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal as="p" className="mx-auto mt-8 max-w-2xl text-center text-[14px] leading-[1.65] text-secondary">
        {t.pricing.note}
      </Reveal>
    </>
  );
};

export default SectionWrapper(Pricing, "pricing");
