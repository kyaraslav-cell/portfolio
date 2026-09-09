import { useRef, useState } from "react";

// A gradient-bordered button that leans toward the pointer and sweeps a
// highlight across on hover. The lean is small on purpose: enough to feel
// responsive, not enough to look like a toy.
const MAX_LEAN = 4;

const Button = ({
  as = "a",
  variant = "primary",
  children,
  className = "",
  ...rest
}) => {
  const Tag = as;
  const ref = useRef(null);
  const [lean, setLean] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setLean({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2 * MAX_LEAN,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2 * MAX_LEAN,
    });
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] transition-[transform,box-shadow,border-color,background-color] duration-500 ease-fluid will-change-transform";

  const skin =
    variant === "primary"
      ? "bg-accent text-white shadow-lift hover:shadow-glow"
      : "border border-line-strong bg-white/[0.02] text-white hover:border-accent hover:bg-white/[0.05]";

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setLean({ x: 0, y: 0 })}
      style={{ transform: `translate3d(${lean.x}px, ${lean.y}px, 0)` }}
      className={`${base} ${skin} ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/25 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"
      />
    </Tag>
  );
};

export default Button;
