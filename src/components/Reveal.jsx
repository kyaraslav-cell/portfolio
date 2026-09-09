import { motion } from "framer-motion";

const OFFSET = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

// Every revealed element carries its own trigger rather than inheriting one
// from the section. A section taller than a few screens can never reach a
// fractional intersection threshold, which left whole sections blank; a
// per-element trigger with amount "some" fires as soon as any part shows.
const Reveal = ({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.55,
  className = "",
  ...rest
}) => {
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...OFFSET[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -60px 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const SectionHeading = ({ kicker, heading, kickerClass, headingClass }) => (
  <Reveal>
    <p className={kickerClass}>{kicker}</p>
    <h2 className={headingClass}>{heading}</h2>
  </Reveal>
);

export default Reveal;
