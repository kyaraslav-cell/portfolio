import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import Reveal, { SectionHeading } from "./Reveal";
import { PlanetsCanvas } from "./canvas";
import LazyMount from "./LazyMount";
import { techBalls } from "../constans/tech";
import { useLang } from "../context/Lang";

// The spheres are the whole section. Nothing is listed twice.
const Stack = () => {
  const { t } = useLang();

  return (
    <>
      <SectionHeading
        kicker={t.stack.kicker}
        heading={t.stack.heading}
        kickerClass={styles.sectionSubText}
        headingClass={styles.sectionHeadText}
      />

      <Reveal as="p" className={`${styles.sectionIntro} mt-6`}>
        {t.stack.intro}
      </Reveal>

      <Reveal className="mt-14">
        <LazyMount placeholder={<div className="h-[420px] w-full" />}>
          <PlanetsCanvas items={techBalls} />
        </LazyMount>
      </Reveal>
    </>
  );
};

export default SectionWrapper(Stack, "technologies");
