import { useRef, useState } from "react";

// A soft light follows the pointer across the card and the border warms up.
// Cheap to run: one CSS variable pair per card, no re-render of children.
const SpotlightCard = ({ children, className = "", as = "div", ...rest }) => {
  const Tag = as;
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [lit, setLit] = useState(false);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setLit(true)}
      onMouseLeave={() => setLit(false)}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-white/[0.02] transition-[border-color,transform,box-shadow] duration-500 ease-fluid hover:-translate-y-1 hover:border-line-strong hover:shadow-lift ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-fluid"
        style={{
          opacity: lit ? 1 : 0,
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(145,94,255,0.16), transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  );
};

export default SpotlightCard;
