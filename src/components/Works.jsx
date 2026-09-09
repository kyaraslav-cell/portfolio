import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import Reveal, { SectionHeading } from "./Reveal";
import SpotlightCard from "./ui/SpotlightCard";
import Carousel from "./ui/Carousel";
import { projectDiagrams } from "./ProjectDiagrams";
import { IconLink } from "./Icons";
import { useLang } from "../context/Lang";

const Metric = ({ value, label }) => (
  <div className="px-2 py-4 text-center">
    <p className="font-display text-[26px] font-extrabold leading-none tracking-[-0.03em] text-white sm:text-[30px]">
      {value}
    </p>
    <p className="mx-auto mt-2 max-w-[150px] text-[12px] leading-[1.4] text-secondary">{label}</p>
  </div>
);

const Line = ({ label, children }) => (
  <p className="text-[14px] leading-[1.6] text-secondary">
    <span className="mr-2 text-[11px] uppercase tracking-[0.18em] text-accent-soft">{label}</span>
    {children}
  </p>
);

const ProjectCard = ({ project, labels }) => {
  const Diagram = projectDiagrams[project.key];

  return (
    <SpotlightCard className="h-full">
      <div className="border-b border-line bg-[#0b0719] p-5 sm:p-7">
        <Diagram />
      </div>

      <div className="px-6 py-8 text-center sm:px-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <h3 className="font-display text-[26px] font-extrabold text-white">{project.name}</h3>
          <span className="rounded-full border border-signal/40 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-signal">
            {project.status}
          </span>
        </div>
        <p className="mx-auto mt-2 max-w-md text-[14px] text-white/70">{project.tagline}</p>

        <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-line overflow-hidden rounded-2xl border border-line sm:grid-cols-4 sm:divide-y-0">
          {project.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-2.5 text-left">
          <Line label={labels.problem}>{project.problem}</Line>
          <Line label={labels.approach}>{project.approach}</Line>
          <Line label={labels.result}>{project.result}</Line>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-[12px] leading-[1.5] text-secondary/60">
          {labels.measured}: {project.measured}
          {project.legal ? ` ${project.legal}` : ""}
        </p>

        <p className="mt-7 font-display text-[15px] font-semibold text-white">{project.price}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-line px-2.5 py-1 text-[12px] text-secondary transition-colors duration-400 ease-fluid hover:border-line-strong hover:text-white"
            >
              {s}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex items-center gap-2 text-[14px] text-white transition-colors duration-400 ease-fluid hover:text-accent-soft"
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

      <Reveal as="p" className={`${styles.sectionIntro} mt-7`}>
        {t.works.intro}
      </Reveal>

      <Reveal className="mt-14">
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
