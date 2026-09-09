import { useEffect, useRef, useState } from "react";

// An IntersectionObserver toggles a class and CSS does the move. Two reasons
// over a JS animation library: content reaches its final state even if no
// animation frame ever runs (a background tab, reduced motion, a failed
// script), so a section can never be left invisible; and 150 elements each
// holding an animation loop is a lot of work for a fade.
const Reveal = ({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  className = "",
  ...rest
}) => {
  const Tag = as;
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={`reveal reveal-${direction} ${shown ? "is-shown" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const SectionHeading = ({ kicker, heading, kickerClass, headingClass }) => (
  <Reveal className="text-center">
    <p className={kickerClass}>{kicker}</p>
    <h2 className={`${headingClass} mt-4`}>{heading}</h2>
  </Reveal>
);

export default Reveal;
