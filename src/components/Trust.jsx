import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import Reveal, { SectionHeading } from "./Reveal";
import { trustIcons } from "./Icons";
import { useLang } from "../context/Lang";

const Trust = () => {
  const { t } = useLang();

  return (
    <>
      <SectionHeading
        kicker={t.trust.kicker}
        heading={t.trust.heading}
        kickerClass={styles.sectionSubText}
        headingClass={styles.sectionHeadText}
      />

      <Reveal as="p" className="mt-6 text-secondary text-[16px] max-w-3xl leading-[28px]">
        {t.trust.intro}
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.trust.points.map((point, i) => {
          const Icon = trustIcons[i % trustIcons.length];
          return (
            <Reveal
              key={point.title}
              delay={0.05 * i}
              className="bg-black-100 border border-indigo-500/20 rounded-2xl p-6 flex flex-col gap-3"
            >
              <span className="text-[#00cea8]">
                <Icon className="w-7 h-7" />
              </span>
              <h3 className="text-white font-bold text-[16px] leading-snug">{point.title}</h3>
              <p className="text-secondary text-[14px] leading-[23px]">{point.body}</p>
            </Reveal>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Trust, "trust");
