import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import Reveal, { SectionHeading } from "./Reveal";
import SpotlightCard from "./ui/SpotlightCard";
import Carousel from "./ui/Carousel";
import { projectDiagrams } from "./ProjectDiagrams";
import { IconLink } from "./Icons";
import { useLang } from "../context/Lang";

const Metric = ({ value, label }) => (
  <div className="px-1.5 py-4 text-center sm:px-3 sm:py-5">
    <p className="font-display text-[22px] font-extrabold leading-none tracking-[-0.03em] text-white sm:text-[30px]">
      {value}
    </p>
    <p className="mx-auto mt-2 max-w-[140px] text-[11px] leading-[1.35] text-secondary sm:text-[12px]">{label}</p>
  </div>
);

const Line = ({ label, children }) => (
  <p className="text-[14px] leading-[1.55] text-secondary">
    <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-accent-soft sm:text-[11px]">{label}</span>
    {children}
  </p>
);

const ProjectCard = ({ project, labels }) => {
  const Diagram = projectDiagrams[project.key];

  return (
    <SpotlightCard className="h-full">
      <div className="border-b border-line bg-[#0b0719] p-3 sm:p-7">
        <Diagram />
      </div>

      <div className="px-5 py-7 text-center sm:px-10 sm:py-9">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <h3 className="font-display text-[22px] font-extrabold text-white sm:text-[26px]">{project.name}</h3>
          <span className="rounded-full border border-signal/40 px-3 py-1 text-[12px] leading-snug text-signal sm:text-[13px]">
            {project.status}
          </span>
        </div>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-white/70">{project.tagline}</p>

        <div className="mt-6 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line sm:mt-8">
          {project.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-2 text-left sm:mt-8">
          <Line label={labels.problem}>{project.problem}</Line>
          <Line label={labels.result}>{project.result}</Line>
        </div>

        <p className="mt-4 text-[11px] text-secondary/60 sm:text-[12px]">{project.measured}</p>

        <p className="mt-6 font-display text-[15px] font-semibold text-white">{project.price}</p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-2 text-[14px] text-white transition-colors duration-500 ease-fluid hover:text-accent-soft"
          >
            <IconLink className="h-4 w-4" />
            {project.linkLabel}
          </a>
        )}
      </div>
    </SpotlightCard>
  );
};

const Works = () => {
  const { t } = useLang();

  return (
    <>
      <SectionHeading
        kicker={t.works.kicker}
        heading={t.works.heading}
        kickerClass={styles.sectionSubText}
        headingClass={styles.sectionHeadText}
      />

      <Reveal as="p" className={`${styles.sectionIntro} mt-6`}>
        {t.works.intro}
      </Reveal>

      <Reveal className="mt-10 sm:mt-14">
        <Carousel
          items={t.projects}
          labels={t.works.labels}
          renderItem={(project) => <ProjectCard project={project} labels={t.works.labels} />}
        />
      </Reveal>
    </>
  );
};

export default SectionWrapper(Works, "projects");
