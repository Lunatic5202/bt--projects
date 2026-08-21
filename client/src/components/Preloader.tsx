/*
 * Hydrogrid Editorial — water-themed preloader v3.
 * Sequence:
 *   1. drop — A single droplet falls from the top and splashes at center,
 *      rippling outward on the water surface.
 *   2. show — The big BT logo rises out of the impact point (a brand moment
 *      with the wordmark and a flowing fill line).
 *   3. wave — A wave washes up from the bottom of the screen.
 *   4. fly — The logo rides the wave as it shrinks and glides to the top-left
 *      header slot. The overlay fades only after the flight genuinely lands.
 * Reduced-motion visitors skip straight to the site.
 */
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const LOGO_URL = "/manus-storage/bt-logo_026b8bce.png";
// The logo is allowed to surface during the first visible ripple rather than
// waiting for the full impact scene to complete. The canvas keeps running
// independently to dissolve the remaining water effects beneath it.
const LOGO_REVEAL_MS = 365;
const CINEMATIC_SCENE_MS = 780;
const SHOW_TO_WAVE_MS = 1050;
const WAVE_TO_FLY_MS = 520;

export default function Preloader() {
  const previewDrop =
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).get("preloaderPreview") === "drop";
  const [stage, setStage] = useState<"drop" | "show" | "wave" | "fly" | "done">(
    "drop",
  );
  const [flyEnded, setFlyEnded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [fadeEnded, setFadeEnded] = useState(false);
  const [flightGeometry, setFlightGeometry] = useState({
    dx: 0,
    dy: 0,
    scale: 0.42,
    flySize: 96,
  });
  const flyerRef = useRef<HTMLImageElement>(null);
  const dropletCanvasRef = useRef<HTMLCanvasElement>(null);
  const cinematicStartRef = useRef<number | null>(null);

  // Adapted from the supplied cinematic canvas reveal: a glossy falling drop,
  // a centre-aligned water plane, irregular ripples, splash particles, and a
  // refracted glow prepare the exact centre point where the logo appears.
  useEffect(() => {
    if (stage !== "drop" && stage !== "show") return;
    const canvas = dropletCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frameId = 0;
    let width = 0;
    let height = 0;
    if (cinematicStartRef.current === null) {
      cinematicStartRef.current = performance.now();
    }
    const startedAt = cinematicStartRef.current;
    const tau = Math.PI * 2;
    const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
    const smooth = (value: number) => value * value * (3 - 2 * value);
    const easeOut = (value: number) => 1 - Math.pow(1 - value, 4);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawDrop = (x: number, y: number, radius: number, alpha: number, stretch = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, stretch);
      ctx.globalAlpha = alpha;
      const fill = ctx.createRadialGradient(-radius * 0.34, -radius * 0.38, radius * 0.05, 0, 0, radius * 1.18);
      fill.addColorStop(0, "rgba(255,255,255,.96)");
      fill.addColorStop(0.16, "rgba(204,242,255,.92)");
      fill.addColorStop(0.46, "rgba(76,207,255,.84)");
      fill.addColorStop(0.76, "rgba(3,132,199,.92)");
      fill.addColorStop(1, "rgba(10,31,68,.45)");
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * 0.92, 0, 0, tau);
      ctx.fill();
      ctx.globalAlpha *= 0.7;
      ctx.strokeStyle = "rgba(255,255,255,.9)";
      ctx.lineWidth = Math.max(1, radius * 0.055);
      ctx.beginPath();
      ctx.arc(-radius * 0.18, -radius * 0.15, radius * 0.62, Math.PI * 1.1, Math.PI * 1.75);
      ctx.stroke();
      ctx.restore();
    };

    const drawFrame = (now: number) => {
      const timeline = previewDrop ? 0.86 : (now - startedAt) / CINEMATIC_SCENE_MS;
      const cx = width / 2;
      const waterY = height / 2;
      ctx.clearRect(0, 0, width, height);
      const sceneFade = clamp((timeline - 1.05) / 0.78);
      ctx.save();
      ctx.globalAlpha = 1 - sceneFade;

      const background = ctx.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, "rgba(10,31,68,0)");
      background.addColorStop(0.48, "rgba(10,31,68,.08)");
      background.addColorStop(1, "rgba(2,15,38,.26)");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const water = ctx.createLinearGradient(0, waterY - 50, 0, height);
      water.addColorStop(0, "rgba(77,214,255,.09)");
      water.addColorStop(0.12, "rgba(20,119,176,.16)");
      water.addColorStop(1, "rgba(4,26,62,.36)");
      ctx.fillStyle = water;
      ctx.fillRect(0, waterY - 5, width, height - waterY + 5);

      const fall = clamp((timeline - 0.05) / 0.54);
      if (fall < 1) {
        const progress = smooth(fall);
        const y = height * 0.16 + (waterY - height * 0.16) * progress;
        drawDrop(cx, y, Math.min(width * 0.042, height * 0.028), 1, 1 + Math.pow(progress, 3) * 0.8);
      }

      const impact = clamp((timeline - 0.56) / 0.44);
      for (let ring = 0; ring < 9; ring += 1) {
        const ringProgress = clamp((impact - ring * 0.07) / 0.92);
        if (ringProgress <= 0) continue;
        const radius = 9 + ring * 7 + ringProgress * (width * 0.28 + ring * 7);
        ctx.save();
        ctx.globalAlpha = Math.pow(1 - ringProgress, 1.5) * (0.26 + (8 - ring) * 0.025);
        ctx.strokeStyle = ring % 2 ? "rgba(26,134,188,.8)" : "rgba(222,247,255,.9)";
        ctx.lineWidth = ring < 3 ? 1.5 : 1;
        ctx.beginPath();
        for (let step = 0; step <= 72; step += 1) {
          const angle = (step / 72) * tau;
          const wobble = Math.sin(angle * 7 + timeline * 6 + ring) * 1.8 + Math.sin(angle * 13 - timeline * 4) * 0.9;
          const rx = radius + wobble;
          const x = cx + Math.cos(angle) * rx;
          const y = waterY + Math.sin(angle) * rx * 0.17;
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      }

      const splashProgress = clamp((timeline - 0.56) / 0.62);
      if (splashProgress > 0 && splashProgress < 1) {
        const e = easeOut(splashProgress);
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        for (let particle = 0; particle < 28; particle += 1) {
          const angle = (particle / 28) * tau + Math.sin(particle * 8.1) * 0.05;
          const distance = 18 + (particle % 6) * 4 + e * (42 + (particle % 7) * 13);
          const x = cx + Math.cos(angle) * distance;
          const y = waterY + Math.sin(angle) * distance * 0.16 - (1 - e) * 13;
          const radius = (1.2 + (particle % 4) * 0.65) * (1 - splashProgress);
          ctx.fillStyle = "rgba(232,249,252,.88)";
          ctx.beginPath();
          ctx.ellipse(x, y, radius, radius * 1.7, 0, 0, tau);
          ctx.fill();
        }
        ctx.restore();
      }

      const refracted = clamp((timeline - 0.72) / 0.28);
      if (refracted > 0) {
        const glow = ctx.createRadialGradient(cx, waterY + 18, 4, cx, waterY + 18, Math.min(width, height) * 0.22);
        glow.addColorStop(0, `rgba(168,238,255,${0.32 * refracted})`);
        glow.addColorStop(1, "rgba(76,207,255,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, waterY - 60, width, height - waterY + 60);
      }

      ctx.restore();
      if (!previewDrop && timeline < 1.85) frameId = window.requestAnimationFrame(drawFrame);
    };

    frameId = window.requestAnimationFrame(drawFrame);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [previewDrop, stage]);

  // The header is already mounted underneath the opaque preloader. Hide its
  // circular mark until the travelling logo has landed, then cross-fade the
  // two marks at the exact same coordinates.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("preloader-running");
    return () => {
      root.classList.remove("preloader-running", "preloader-logo-landed");
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("preloader-logo-landed", flyEnded);
    if (fadeEnded) {
      root.classList.remove("preloader-running", "preloader-logo-landed");
    }
  }, [fadeEnded, flyEnded]);

  // Preload the logo so the droplet stage never shows a blank/broken image.
  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.onload = () => {
      if (mounted) setLoaded(true);
    };
    img.onerror = () => {
      // Show the site rather than hang forever on a failed asset.
      if (mounted) setLoaded(true);
    };
    img.src = LOGO_URL;
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setStage("done");
      return;
    }
    if (!loaded) return; // wait for the logo image before starting the show
    if (previewDrop) return; // Development-only deterministic visual inspection.

    let mounted = true;
    const next = (fn: () => void, ms: number) =>
      window.setTimeout(() => {
        if (!mounted) return;
        fn();
      }, ms);
    const t1 = next(() => setStage("show"), LOGO_REVEAL_MS); // begins inside the first ripple
    const t2 = next(() => setStage("wave"), LOGO_REVEAL_MS + SHOW_TO_WAVE_MS);
    const t3 = next(
      () => setStage("fly"),
      LOGO_REVEAL_MS + SHOW_TO_WAVE_MS + WAVE_TO_FLY_MS,
    );
    return () => {
      mounted = false;
      [t1, t2, t3].forEach((t) => window.clearTimeout(t));
    };
  }, [loaded, previewDrop]);

  // Measure the real header logo rather than aiming for hard-coded viewport
  // coordinates. This keeps the flight continuous at every breakpoint.
  useLayoutEffect(() => {
    if (stage !== "wave" && stage !== "fly") return;

    const measureTarget = () => {
      const target = document.querySelector<HTMLElement>("[data-header-logo-image]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const flySize = window.matchMedia("(min-width: 768px)").matches ? 128 : 96;
      setFlightGeometry({
        dx: rect.left + rect.width / 2 - window.innerWidth / 2,
        dy: rect.top + rect.height / 2 - window.innerHeight / 2,
        scale: rect.width / flySize,
        flySize,
      });
    };

    measureTarget();
    window.addEventListener("resize", measureTarget);
    return () => window.removeEventListener("resize", measureTarget);
  }, [stage]);

  // Wait for the CSS logoFly animation to actually complete before fading.
  useEffect(() => {
    if (stage !== "fly") return;
    let mounted = true;
    const done = () => {
      if (mounted && !flyEnded) setFlyEnded(true);
    };
    const flyer = flyerRef.current;
    if (flyer) {
      flyer.addEventListener("animationend", done);
    }
    // Safety: if the animation never fires (HMR, missing stylesheet), fall
    // back after a generous window.
    const safety = window.setTimeout(done, 1800);
    return () => {
      mounted = false;
      window.clearTimeout(safety);
      if (flyer) flyer.removeEventListener("animationend", done);
    };
  }, [stage, flyEnded]);

  // Once the flight finishes, the overlay fades out over 500ms — keep it
  // mounted until that fade completes so the fade actually plays.
  useEffect(() => {
    if (!flyEnded) return;
    const t = window.setTimeout(() => setFadeEnded(true), 520);
    return () => window.clearTimeout(t);
  }, [flyEnded]);

  const resolved = stage === "done" || fadeEnded;
  const flyerStyle = {
    "--fly-dx": `${flightGeometry.dx}px`,
    "--fly-dy": `${flightGeometry.dy}px`,
    "--fly-scale": flightGeometry.scale,
    "--fly-size": `${flightGeometry.flySize}px`,
  } as CSSProperties;
  if (resolved) return null;

  return (
    <div
      aria-hidden={stage === "fly"}
      data-preloader-stage={stage}
      className={`fixed inset-0 z-[100] bg-navy blueprint-grid transition-opacity duration-500 ${
        stage === "fly" && flyEnded
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
    >
      {/* --- Stage 1: supplied-canvas-inspired cinematic water reveal. */}
      {(stage === "drop" || stage === "show") && (
        <div
          className={`preloader-drop-scene pointer-events-none absolute inset-0 ${
            previewDrop ? "preloader-drop-preview" : ""
          }`}
          aria-hidden="true"
        >
          <canvas
            ref={dropletCanvasRef}
            aria-hidden="true"
            data-cinematic-active={loaded ? "true" : "false"}
            className="preloader-cinematic-canvas absolute inset-0 h-full w-full"
          />
        </div>
      )}

      {/* Wave sheet rising from the bottom — starts only at the wave stage */}
      <div
        className={`preloader-wave pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${
          stage === "wave" || stage === "fly" ? "preloader-wave-active" : "h-0"
        }`}
        aria-hidden="true"
      >
        <svg
          className="preloader-wave-svg absolute bottom-0 w-[120%] -left-[10%]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ height: "180vh" }}
        >
          <path
            className="preloader-wave-path-1"
            d="M0,60 C180,20 360,100 540,60 C720,20 900,100 1080,60 C1260,20 1440,100 1440,60 L1440,120 L0,120 Z"
            fill="oklch(0.78 0.09 250 / 18%)"
          />
          <path
            className="preloader-wave-path-2"
            d="M0,70 C200,100 400,30 600,70 C800,110 1000,30 1200,70 C1340,95 1440,40 1440,70 L1440,120 L0,120 Z"
            fill="oklch(0.78 0.09 250 / 12%)"
          />
          <path
            className="preloader-wave-path-3"
            d="M0,80 C240,50 480,100 720,70 C960,40 1200,100 1440,80 L1440,120 L0,120 Z"
            fill="oklch(0.97 0.01 250 / 85%)"
          />
        </svg>
      </div>

      {/* Centered brand cluster — rises out of the droplet impact point */}
      <div
        className={`preloader-logo-cluster absolute inset-0 ${
          stage === "drop" ? "preloader-logo-cluster-hidden" : ""
        } ${stage === "fly" ? "preloader-logo-cluster-hide" : ""}`}
      >
        <div className="preloader-logo-stack absolute left-1/2 top-1/2 w-max -translate-x-1/2">
          <img
            src={LOGO_URL}
            alt="BT Projects logo"
            className="preloader-logo-big h-24 w-24 md:h-32 md:w-32 rounded-full border border-white/25 shadow-[0_0_60px_oklch(0.78_0.09_250/40%)]"
          />
          <div className="preloader-logo-copy absolute left-1/2 top-[76px] w-max -translate-x-1/2 text-center md:top-[100px]">
            <p className="preloader-logo-word font-display font-extrabold uppercase tracking-[0.22em] text-white text-base md:text-lg">
              BT Projects
            </p>
            <p className="preloader-logo-tag font-mono mt-2 text-[10px] tracking-[0.3em] uppercase text-white/45">
              Private Limited
            </p>
            <div className="preloader-logo-line mx-auto mt-7 h-4 w-32 overflow-hidden" aria-hidden="true">
              <svg viewBox="0 0 128 16" className="h-full w-full" fill="none">
                <path
                  d="M-8 8 C0 3 8 3 16 8 S32 13 40 8 S56 3 64 8 S80 13 88 8 S104 3 112 8 S128 13 136 8"
                  className="preloader-logo-wave-track"
                />
                <path
                  d="M-8 8 C0 3 8 3 16 8 S32 13 40 8 S56 3 64 8 S80 13 88 8 S104 3 112 8 S128 13 136 8"
                  className="preloader-logo-wave"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* The flying logo — rides from center to the header slot.
          Appears from the moment the wave peaks so the eye follows one
          continuous mark; the centered cluster hides beneath it. */}
      <img
        src={LOGO_URL}
        alt=""
        aria-hidden="true"
        ref={flyerRef}
        style={flyerStyle}
        className={`preloader-logo-fly fixed left-1/2 top-1/2 rounded-full border border-white/25 ${
          stage === "fly"
            ? `preloader-logo-fly-active ${flyEnded ? "preloader-logo-fly-landed" : ""}`
            : "opacity-0"
        }`}
      />
    </div>
  );
}
