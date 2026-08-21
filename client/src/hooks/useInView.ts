/*
 * Hydrogrid Editorial — scroll reveal hook.
 * Adds .in-view to .fade-up elements when they enter the viewport.
 */
import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".fade-up"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (prefersReduced) {
              el.classList.add("in-view");
              io.unobserve(el);
              return;
            }
            const delay = Number(el.dataset.delay || 0);
            window.setTimeout(() => el.classList.add("in-view"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
