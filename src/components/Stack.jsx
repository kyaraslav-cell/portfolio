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

      <Reveal as="p" className="mt-6 text-secondary text-[16px] max-w-3xl leading-[28px]">
        {t.stack.intro}
      </Reveal>

      <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-8">
        {techBalls.map((tech, i) => (
          <Reveal
            key={tech.name}
            delay={0.03 * i}
            className="w-[92px] sm:w-[104px] flex flex-col items-center gap-2"
          >
            <LazyMount
              className="h-[84px] w-[84px] sm:h-[96px] sm:w-[96px]"
              placeholder={<div className="h-full w-full rounded-full bg-black-100/60" />}
            >
              <BallCanvas icon={tech.icon} />
            </LazyMount>
            <p className="text-secondary text-[12px] text-center leading-tight">{tech.name}</p>
          </Reveal>
        ))}
      </div>

      <Reveal as="p" className={`${styles.sectionSubText} mt-20`}>
        {t.stack.groupsKicker}
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {t.stack.groups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={0.05 * i}
            className={`rounded-2xl p-6 border ${
              i === 0 ? "border-[#8d48e6]/60 bg-tertiary" : "border-indigo-500/20 bg-black-100"
            }`}
          >
            <h3 className="text-white font-bold text-[17px] mb-4">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-[13px] text-secondary border border-indigo-500/25 rounded-lg px-3 py-1.5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Stack, "technologies");
