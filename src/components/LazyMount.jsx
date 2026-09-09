import { useEffect, useRef, useState } from "react";

// Each WebGL canvas costs a context, and browsers cap how many exist at once.
// Mounting them only once they are near the viewport keeps the first paint
// cheap and keeps a page full of balls under the cap.
const LazyMount = ({ children, rootMargin = "300px", className = "", placeholder = null }) => {
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
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {shown ? children : placeholder}
    </div>
  );
};

export default LazyMount;
