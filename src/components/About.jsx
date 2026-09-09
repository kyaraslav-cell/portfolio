import Tilt from "react-parallax-tilt";
import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import Reveal, { SectionHeading } from "./Reveal";
import { serviceIcons } from "./Icons";
import { useLang } from "../context/Lang";

const ServiceCard = ({ index, title, body, icon: Icon }) => (
  <Reveal delay={0.06 * index} className="w-full sm:w-[280px]">
    <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className="h-full">
      <div className="w-full green-pink-gradient p-[1px] shadow-card rounded-[20px] h-full">
        <div className="bg-tertiary rounded-[20px] py-8 px-7 min-h-[260px] h-full flex flex-col gap-4">
          <span className="text-[#b58bff]">
            <Icon className="w-9 h-9" />
          </span>
          <h3 className="text-[18px] text-white font-bold leading-tight">{title}</h3>
          <p className="text-secondary text-[14px] leading-[22px]">{body}</p>
        </div>
      </div>
    </Tilt>
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

      <div className="mt-6 max-w-3xl flex flex-col gap-5">
        {t.about.paragraphs.map((p, i) => (
          <Reveal as="p" key={i} delay={0.05 * i} className="text-secondary text-[16px] leading-[28px]">
            {p}
          </Reveal>
        ))}
      </div>

      <Reveal as="p" className={`${styles.sectionSubText} mt-16`}>
        {t.about.servicesKicker}
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-start">
        {t.services.map((card, index) => (
          <ServiceCard
            key={card.key}
            index={index}
            icon={serviceIcons[card.key]}
            title={card.title}
            body={card.body}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
