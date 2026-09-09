import { useCallback, useEffect, useRef, useState } from "react";

// Native scroll-snap rather than a carousel library: it drags and flicks
// correctly on touch for free, keeps keyboard and scrollbar behaviour, and
// degrades to a plain scroller if the script never runs.
const Arrow = ({ dir, onClick, disabled, label }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-white/[0.03] text-white transition-all duration-400 ease-fluid enabled:hover:border-accent enabled:hover:bg-accent/20 disabled:opacity-25"
  >
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "prev" ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  </button>
);

const Carousel = ({ items, renderItem, labels, className = "" }) => {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = [...track.children];
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((s, i) => {
      const c = s.offsetLeft + s.offsetWidth / 2;
      const d = Math.abs(c - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIndex(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => track.removeEventListener("scroll", measure);
  }, [measure]);

  const goTo = (i) => {
    const track = trackRef.current;
    const slide = track?.children[i];
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className={className}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div
            key={item.key ?? i}
            className="w-[min(100%,860px)] shrink-0 snap-center"
            aria-hidden={index !== i ? undefined : undefined}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <Arrow dir="prev" label={labels.prev} onClick={() => goTo(index - 1)} disabled={index === 0} />
        <div className="flex items-center gap-2.5">
          {items.map((item, i) => (
            <button
              key={item.key ?? i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${labels.goTo} ${i + 1}`}
              aria-current={index === i}
              className={`h-1.5 rounded-full transition-all duration-500 ease-fluid ${
                index === i ? "w-8 bg-accent" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <Arrow
          dir="next"
          label={labels.next}
          onClick={() => goTo(index + 1)}
          disabled={index === items.length - 1}
        />
      </div>
    </div>
  );
};

export default Carousel;
