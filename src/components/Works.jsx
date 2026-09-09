import { styles } from "../styles";
import SectionWrapper from "../hoc/SectionWrapper";
import Reveal, { SectionHeading } from "./Reveal";
import { projectDiagrams } from "./ProjectDiagrams";
import { IconLink } from "./Icons";
import { useLang } from "../context/Lang";

const Block = ({ label, children }) => (
  <div>
    <p className="text-[11px] uppercase tracking-[0.18em] text-[#b58bff] mb-1.5">{label}</p>
    <p className="text-secondary text-[15px] leading-[25px]">{children}</p>
  </div>
);

const ProjectCard = ({ project, labels, index }) => {
  const Diagram = projectDiagrams[project.key];

  return (
    <Reveal
      as="article"
      delay={0.05 * index}
      className="bg-tertiary rounded-2xl overflow-hidden border border-indigo-500/20"
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <div className="bg-[#0e0a20] border-b lg:border-b-0 lg:border-r border-indigo-500/20 flex items-center justify-center p-5 sm:p-6">
          <Diagram />
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-5">
          <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-white font-bold text-[24px]">{project.name}</h3>
            <span className="text-[12px] text-[#00cea8] border border-[#00cea8]/40 rounded-full px-3 py-1">
              {project.status}
            </span>
          </header>

          <p className="text-white/80 text-[15px] -mt-2">{project.tagline}</p>

          <Block label={labels.problem}>{project.problem}</Block>
          <Block label={labels.approach}>{project.approach}</Block>
          <Block label={labels.result}>{project.result}</Block>

          {project.measured && (
            <p className="text-[13px] text-secondary/80 border-l-2 border-indigo-500/40 pl-3">
              <span className="text-[#b58bff]">{labels.measured}: </span>
              {project.measured}
            </p>
          )}

          {project.legal && (
            <p className="text-[13px] text-secondary/80 border-l-2 border-[#00cea8]/40 pl-3">
              {project.legal}
            </p>
          )}

          {project.price && (
            <p className="text-[15px] text-white">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#b58bff] mr-2">
                {labels.price}
              </span>
              {project.price}
            </p>
          )}

          <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="text-[12px] text-secondary bg-black-100 border border-indigo-500/20 rounded-md px-2.5 py-1"
                >
                  {s}
                </li>
              ))}
            </ul>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-[14px] text-white hover:text-[#b58bff] transition-colors"
              >
                <IconLink className="w-4 h-4" />
                {project.linkLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
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

      <Reveal as="p" className="mt-6 text-secondary text-[16px] max-w-3xl leading-[28px]">
        {t.works.intro}
      </Reveal>

      <div className="mt-12 flex flex-col gap-10">
        {t.projects.map((project, index) => (
          <ProjectCard key={project.key} project={project} labels={t.works.labels} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
