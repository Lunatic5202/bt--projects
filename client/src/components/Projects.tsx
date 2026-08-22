/*
 * Hydrogrid Editorial — What We Deliver.
 * Desktop uses a scroll-pinned horizontal progression; mobile keeps a natural stack.
 */
import { type CSSProperties, useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import { getActiveProjectIndex, getProjectScrollProgress } from "./projectPinning";

const IMG_RESERVOIR = "/manus-storage/proj-elevated-reservoir_85f4da03.webp";
const IMG_PUMP = "/manus-storage/proj-pump-station_ff05e924.webp";
const IMG_STP = "/manus-storage/proj-stp-plant_2684fa05.webp";
const IMG_PIPELINE = "/manus-storage/proj-pipeline-work_d46aeb31.webp";

/* Illustrative placeholders while the real portfolio is being prepared. */
export const PROJECTS = [
  {
    code: "BTP/PJ-01",
    img: IMG_RESERVOIR,
    title: "Government Water supply & Water Management",
    scope: "WATER INFRASTRUCTURE",
    description:
      "End-to-end development of essential water distribution networks including raw water pumping and flow management.",
    points: [],
  },
  {
    code: "BTP/PJ-02",
    img: IMG_PUMP,
    title: "Government Sewage pumping & sewage treatment",
    scope: "WASTEWATER & TREATMENT",
    description:
      "Construction of critical wastewater infrastructure, featuring sewage treatment plants and heavy-duty pumping.",
    points: [],
  },
  {
    code: "BTP/PJ-03",
    img: IMG_STP,
    title: "intake bridge and jetty & intake barge",
    scope: "STRUCTURAL & MARINE",
    description:
      "Specialized structural engineering for raw water sourcing and floating barge deployment.",
    points: [],
  },
  {
    code: "BTP/PJ-04",
    img: IMG_PIPELINE,
    title: "construction of pumphouse and substation",
    scope: "ELECTRICAL & CIVIL",
    description:
      "Integrated civil and electrical works, including 33 kb substations, to power large-scale water networks.",
    points: [],
  },
];

function ProjectDetails({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <>
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy/50 mb-2">{project.scope}</p>
      <h3 className="font-display font-bold uppercase tracking-wide text-lg md:text-xl text-navy leading-snug">{project.title}</h3>
      <p className="mt-3 text-sm text-navy/65 leading-relaxed">{project.description}</p>
      {project.points.length > 0 ? (
        <ul className="mt-4 space-y-1.5">
          {project.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-xs font-medium text-navy/70 uppercase tracking-wide">
              <span className="h-1 w-3 bg-bolt/80 inline-block" />
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function ProjectImage({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div className="project-image relative group">
      <div className="overflow-hidden border border-navy/10">
        <img
          src={project.img}
          alt={project.title}
          loading="eager"
          decoding="async"
          fetchPriority="low"
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ transitionTimingFunction: "var(--fluid-wave)" }}
        />
      </div>
      <div className="absolute -top-3 -right-3 h-full w-full border border-navy/15 pointer-events-none hidden md:block" />
    </div>
  );
}

export function Projects() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin || !window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;

    let frame = 0;
    const update = () => {
      const rect = pin.getBoundingClientRect();
      const progress = getProjectScrollProgress(rect.top, rect.height, window.innerHeight);
      pin.style.setProperty("--projects-progress", progress.toFixed(4));
      const nextIndex = getActiveProjectIndex(progress, PROJECTS.length);
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="projects" className="bg-white">
      <div className="mobile-section container py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr] md:items-end mb-10">
          <div>
            <SectionLabel index="04" text="What We Deliver" />
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-tight leading-tight text-3xl md:text-4xl text-navy">Delivered and running</h2>
          </div>
          <p className="text-navy/65 leading-relaxed max-w-lg">
            Selected capabilities from our portfolio of water and wastewater infrastructure work. We handle the development, construction, and commissioning of essential systems—ensuring each is built to specification and handed over for reliable, long-term operation.
          </p>
        </div>


        <p className="mobile-project-hint font-mono text-[10px] tracking-[0.16em] uppercase text-navy/55 mb-4">
          Swipe across the project record
        </p>

        <div ref={pinRef} className="projects-pin" style={{ "--projects-progress": 0 } as CSSProperties}>
          <div className="projects-pin-sticky">
            <div className="projects-pin-panel">
              <div className="projects-pin-meta">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-navy/55">Scroll through the record</p>
                <p className="font-mono text-bolt text-xs tracking-[0.16em]">PROJECT {String(activeIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</p>
              </div>
              <div className="projects-pin-progress" aria-label={`Project ${activeIndex + 1} of ${PROJECTS.length}`} role="progressbar" aria-valuemin={1} aria-valuemax={PROJECTS.length} aria-valuenow={activeIndex + 1}>
                {PROJECTS.map((project, index) => <span key={project.code} className={index <= activeIndex ? "is-active" : ""} />)}
              </div>
              <div className="projects-pin-viewport">
                <div className="projects-pin-rail">
                  {PROJECTS.map((project) => (
                    <article key={project.code} className="projects-pin-card">
                      <p className="font-mono text-bolt text-sm tracking-[0.18em]">{project.code}</p>
                      <div className="projects-pin-content"><ProjectDetails project={project} /></div>
                      <ProjectImage project={project} />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="projects-stack divide-y divide-navy/12 border-y border-navy/12" role="list" aria-label="What we deliver capability records">
          {PROJECTS.map((project, index) => (
            <article key={project.code} role="listitem" className="fade-up grid gap-6 md:grid-cols-[8rem_1fr_1.1fr] md:items-center py-10 md:py-12" data-delay={String(index * 110)}>
              <p className="font-mono text-bolt text-sm tracking-[0.18em]">{project.code}</p>
              <div><ProjectDetails project={project} /></div>
              <ProjectImage project={project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
