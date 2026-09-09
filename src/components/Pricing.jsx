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

      <Reveal as="p" className="mt-6 text-secondary text-[16px] max-w-3xl leading-[28px]">
        {t.pricing.intro}
      </Reveal>

      <Reveal className="mt-10 rounded-2xl border border-indigo-500/20 overflow-hidden">
        {t.pricing.rows.map((row, i) => (
          <div
            key={row.scope}
            className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-5 ${
              i % 2 ? "bg-black-100" : "bg-tertiary"
            }`}
          >
            <div className="sm:flex-1">
              <p className="text-white font-medium text-[16px]">{row.scope}</p>
              <p className="text-secondary text-[13px] mt-0.5">{row.detail}</p>
            </div>
            <p className="text-[#b58bff] font-medium text-[16px] whitespace-nowrap">{row.price}</p>
          </div>
        ))}
      </Reveal>

      <Reveal
        as="p"
        className="mt-6 text-secondary text-[15px] max-w-3xl leading-[26px] border-l-2 border-[#00cea8]/40 pl-4"
      >
        {t.pricing.note}
      </Reveal>
    </>
  );
};

export default SectionWrapper(Pricing, "pricing");
