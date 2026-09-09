import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import Reveal, { SectionHeading } from "./Reveal";
import SpotlightCard from "./ui/SpotlightCard";
import { serviceIcons } from "./Icons";
import { useLang } from "../context/Lang";

const ServiceCard = ({ index, title, line, icon: Icon }) => (
  <Reveal delay={0.06 * index}>
    <SpotlightCard className="h-full px-7 py-10 text-center">
      <span className="mx-auto mb-6 grid h-[72px] w-[72px] place-items-center rounded-2xl border border-line bg-accent/10 text-accent-soft transition-transform duration-500 ease-fluid group-hover:scale-110">
        <Icon className="h-9 w-9" />
      </span>
      <h3 className="font-display text-[19px] font-bold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-[220px] text-[14px] leading-[1.55] text-secondary">{line}</p>
    </SpotlightCard>
  </Reveal>
);

const About = () => {
  const { t } = useLang();

  return (
    <>
      <SectionHeading
        kicker={t.about.kicker}
        heading={t.about.heading}
        kickerClass={styles.sectionSubText}
        headingClass={styles.sectionHeadText}
      />

      <Reveal as="p" className={`${styles.sectionIntro} mt-7`}>
        {t.about.intro}
      </Reveal>

      <Reveal as="p" className="mx-auto mt-5 max-w-xl text-center text-[14px] leading-[1.65] text-secondary/70">
        {t.about.note}
      </Reveal>

      <Reveal as="p" className={`${styles.sectionSubText} mt-20 text-center`}>
        {t.about.servicesKicker}
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.services.map((card, index) => (
          <ServiceCard
            key={card.key}
            index={index}
            icon={serviceIcons[card.key]}
            title={card.title}
            line={card.line}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
