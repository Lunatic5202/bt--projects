import { ArrowLeft, ArrowUpRight, Droplets, Home } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = "/manus-storage/bt-logo_026b8bce.png";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => setLocation("/");
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    setLocation("/");
  };

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-navy text-white blueprint-grid">
      <header className="relative z-10 border-b border-white/15">
        <div className="container flex items-center justify-between py-5">
          <button
            type="button"
            onClick={handleGoHome}
            className="group flex items-center gap-3 text-left"
            aria-label="Return to BT Projects home"
          >
            <img
              src={LOGO_URL}
              alt="BT Projects logo"
              className="h-11 w-11 rounded-full border border-white/25 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="leading-none">
              <span className="block font-display text-base font-extrabold uppercase tracking-wide">
                BT Projects
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.25em] text-white/50">
                Private Limited
              </span>
            </span>
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            Sheet 404
          </span>
        </div>
      </header>

      <section className="relative z-10 flex flex-1 items-center">
        <div className="container grid gap-12 py-20 md:grid-cols-[0.85fr_1.15fr] md:items-center md:py-28">
          <div aria-hidden="true" className="relative mx-auto w-full max-w-sm md:mx-0">
            <div className="absolute -inset-6 border border-white/10" />
            <div className="absolute -inset-3 border border-bolt/30" />
            <div className="relative flex aspect-square items-center justify-center border border-white/20 bg-navy-deep/70">
              <div className="absolute inset-8 border border-white/10" />
              <div className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-white/10" />
              <div className="absolute left-8 top-1/2 h-px w-[calc(100%-4rem)] -translate-y-1/2 bg-white/10" />
              <span className="relative font-display text-[clamp(5rem,18vw,10rem)] font-extrabold leading-none tracking-[-0.08em] text-white/90">
                404
              </span>
              <Droplets className="absolute bottom-8 right-8 h-7 w-7 text-bolt" strokeWidth={1.5} />
            </div>
          </div>

          <div className="max-w-2xl">
            <p className="section-label !text-white/70">
              <span className="text-bolt">BT / 404</span>
              <span>Route not found</span>
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-6xl">
              This flow has been diverted.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              The page you are looking for is not part of this system, may have
              moved, or may no longer be active. Let&apos;s get you back to the
              BT Projects infrastructure overview.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleGoHome}
                className="fluid-btn inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-white/90"
              >
                <Home className="h-4 w-4" strokeWidth={1.75} />
                Return home
              </button>
              <button
                type="button"
                onClick={handleGoBack}
                className="fluid-btn inline-flex items-center gap-2 border border-white/35 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                Go back
              </button>
            </div>

            <div className="mt-14 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-2">
              <a
                href="/#services"
                className="group flex items-start justify-between gap-4 border border-white/15 bg-navy-deep/35 p-5 transition-colors duration-200 hover:border-white/35 hover:bg-navy-deep/60"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-bolt">
                    Explore
                  </span>
                  <span className="mt-2 block font-display text-lg font-bold uppercase tracking-wide">
                    What we build
                  </span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-white/55 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href="/#contact"
                className="group flex items-start justify-between gap-4 border border-white/15 bg-navy-deep/35 p-5 transition-colors duration-200 hover:border-white/35 hover:bg-navy-deep/60"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-bolt">
                    Connect
                  </span>
                  <span className="mt-2 block font-display text-lg font-bold uppercase tracking-wide">
                    Talk to our engineers
                  </span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-white/55 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/15">
        <div className="container flex flex-col gap-2 py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Water, wastewater &amp; power infrastructure</span>
          <span>Built for critical public utilities</span>
        </div>
      </footer>
    </main>
  );
}
