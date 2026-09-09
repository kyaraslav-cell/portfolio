import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import Reveal, { SectionHeading } from "./Reveal";
import SpotlightCard from "./ui/SpotlightCard";
import { trustIcons } from "./Icons";
import { useLang } from "../context/Lang";

// Big icon, short title, one line. A wall of reassuring paragraphs reads as
// someone talking themselves into it.
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

      <Reveal as="p" className={`${styles.sectionIntro} mt-7`}>
        {t.trust.intro}
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.trust.points.map((point, i) => {
          const Icon = trustIcons[i % trustIcons.length];
          return (
            <Reveal key={point.title} delay={0.05 * i}>
              <SpotlightCard className="h-full px-7 py-10 text-center">
                <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-signal/25 bg-signal/[0.07] text-signal transition-transform duration-500 ease-fluid group-hover:scale-110">
                  <Icon className="h-10 w-10" />
                </span>
                <h3 className="font-display text-[17px] font-bold leading-snug text-white">
                  {point.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[240px] text-[14px] leading-[1.55] text-secondary">
                  {point.body}
                </p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Trust, "trust");
