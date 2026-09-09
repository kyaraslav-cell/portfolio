import { styles } from "../styles";

// The section is a plain element. Reveal-on-scroll lives on the individual
// items inside it, so a long section cannot leave its own contents hidden.
const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <section className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    );
  };

export default SectionWrapper;
