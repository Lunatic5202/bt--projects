import { useEffect } from "react";
import { getSiteImageSources } from "./siteImagePreload";

function preloadAndDecode(src: string, priority: "high" | "low"): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.setAttribute("fetchpriority", priority);

    const settle = () => {
      void image.decode().catch(() => undefined).finally(() => resolve());
    };

    image.onload = settle;
    image.onerror = () => resolve();
    image.src = src;

    if (image.complete) settle();
  });
}

/**
 * Starts managed image requests while the opening preloader is still visible.
 * This keeps below-the-fold visual sections ready before normal scrolling.
 */
export default function SiteImagePreloader() {
  useEffect(() => {
    let active = true;
    const root = document.documentElement;
    root.dataset.siteImages = "loading";

    const critical = getSiteImageSources("critical");
    const secondary = getSiteImageSources("secondary");

    void Promise.all([
      ...critical.map((src) => preloadAndDecode(src, "high")),
      ...secondary.map((src) => preloadAndDecode(src, "low")),
    ]).then(() => {
      if (active) root.dataset.siteImages = "ready";
    });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
