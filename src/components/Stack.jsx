import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import Reveal, { SectionHeading } from "./Reveal";
import { BallCanvas } from "./canvas";
import LazyMount from "./LazyMount";
import { techBalls } from "../constans/tech";
import { useLang } from "../context/Lang";

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

      <div className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10">
        {techBalls.map((tech, i) => (
          <Reveal key={tech.name} delay={0.03 * i} className="flex w-[88px] flex-col items-center gap-2 sm:w-[100px]">
            <LazyMount className="ball-canvas h-[88px] w-[88px] sm:h-[100px] sm:w-[100px]">
              <BallCanvas icon={tech.icon} />
            </LazyMount>
            <p className="text-center text-[12px] leading-tight text-secondary">{tech.name}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Stack, "technologies");
