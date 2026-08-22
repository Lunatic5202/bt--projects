import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, LineChart, Users, Wrench } from "lucide-react";
import SectionLabel from "./SectionLabel";
import {
  getCyclicTeamIndex,
  getTeamSwipeDirection,
  getVisibleTeamStack,
} from "./teamCardStack";
import { getRevealTransition } from "./motionTransitions";

const TEAM_WORKSTREAMS = [
  {
    id: "delivery-engineering",
    eyebrow: "01 — TURNKEY DELIVERY",
    name: "Project execution",
    role: "Civil, mechanical & electrical",
    image: "/manus-storage/team-sample-arun-mehta_cba1713f.webp",
    title: "Built to specification",
    description:
      "End-to-end delivery across water supply, wastewater, pumping, intake structures, substations, and associated civil works.",
    focus: ["Construction", "Installation", "Commissioning"],
    icon: Wrench,
  },
  {
    id: "field-operations",
    eyebrow: "02 — ASSET SUPPORT",
    name: "Lifecycle support",
    role: "Repair, rehabilitation & O&M",
    image: "/manus-storage/team-sample-neha-sen_ddf1221c.webp",
    title: "Performance that lasts",
    description:
      "Repair, maintenance, rehabilitation, and operational support for pumps, substations, chlorine equipment, and treatment assets.",
    focus: ["Pump repairs", "Preventive maintenance", "Rehabilitation"],
    icon: LineChart,
  },
  {
    id: "client-coordination",
    eyebrow: "03 — OPERATIONAL CONTINUITY",
    name: "Utility partnership",
    role: "Reliable public infrastructure",
    image: "/manus-storage/team-sample-rohan-iyer_7ada1601.webp",
    title: "Keeping the work moving",
    description:
      "Clear coordination across project delivery, service requirements, handover, and the next stage of long-term operation.",
    focus: ["Clear handovers", "Service response", "Long-term performance"],
    icon: Users,
  },
] as const;

const CARD_DEPTH = [
  { y: 0, scale: 1, rotate: 0, opacity: 1 },
  { y: 15, scale: 0.965, rotate: 1.35, opacity: 0.9 },
  { y: 29, scale: 0.93, rotate: -1.1, opacity: 0.72 },
] as const;

export function MeetTeam() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [canDrag, setCanDrag] = useState(false);
  const cards = getVisibleTeamStack(TEAM_WORKSTREAMS, activeIndex);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setCanDrag(media.matches);
    updateCapability();
    media.addEventListener("change", updateCapability);
    return () => media.removeEventListener("change", updateCapability);
  }, []);

  const moveCards = (offset: number) => {
    setActiveIndex((current) => getCyclicTeamIndex(current, offset, TEAM_WORKSTREAMS.length));
  };

  return (
    <section id="team" className="team-section bg-navy text-white blueprint-grid relative overflow-hidden">
      <div className="mobile-section container py-20 md:py-28 relative z-10">
        <motion.div
          className="team-heading grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={getRevealTransition(shouldReduceMotion)}
        >
          <div>
            <SectionLabel index="06" text="How We Work" />
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-tight leading-tight text-3xl md:text-4xl">
              One connected team across the lifecycle
            </h2>
          </div>
          <p className="max-w-xl text-white/65 leading-relaxed md:justify-self-end">
            From turnkey execution to ongoing operational support, we coordinate the disciplines that keep critical infrastructure reliable.
          </p>
        </motion.div>

        <motion.div
          className="team-stack-layout mt-12 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={getRevealTransition(shouldReduceMotion, 0.06)}
        >
          <div className="team-stack-intro">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bolt">
              Working across the lifecycle
            </p>
            <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-white">
              Practical ownership from build to operation
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/62">
              Browse the stack to see how delivery, asset support, and operational continuity work together across every project.
            </p>
            <p className="team-stack-drag-hint mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              Drag a card or use the controls
            </p>
          </div>

          <div className="team-stack-shell">
            <div
              className="team-stack-stage"
              role="group"
              aria-roledescription="card stack"
              aria-label="Meet the Team workstream cards"
              aria-live="polite"
            >
              {cards.map((card, depth) => {
                const Icon = card.icon;
                const isActive = depth === 0;
                const depthStyle = CARD_DEPTH[depth];

                return (
                  <motion.article
                    key={card.id}
                    className={`team-stack-card ${isActive ? "is-active" : ""}`}
                    style={{ zIndex: TEAM_WORKSTREAMS.length - depth }}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
                    animate={{
                      x: 0,
                      y: depthStyle.y,
                      scale: depthStyle.scale,
                      rotate: depthStyle.rotate,
                      opacity: depthStyle.opacity,
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 300, damping: 28, mass: 0.72 }
                    }
                    drag={isActive && canDrag && !shouldReduceMotion ? "x" : false}
                    dragElastic={0.16}
                    dragConstraints={{ left: -150, right: 150 }}
                    dragSnapToOrigin
                    whileDrag={shouldReduceMotion ? undefined : { scale: 1.015, rotate: 2.1, cursor: "grabbing" }}
                    onDragEnd={(_, info) => {
                      const direction = getTeamSwipeDirection(info.offset.x);
                      if (direction !== 0) moveCards(direction);
                    }}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-bolt">
                        {card.eyebrow}
                      </p>
                      <span className="team-stack-icon" aria-hidden="true">
                        <Icon size={22} strokeWidth={1.65} />
                      </span>
                    </div>
                    <div className="team-stack-profile mt-6">
                      <img
                        src={card.image}
                        alt={`${card.name} capability workstream at BT Projects`}
                        className="team-stack-portrait"
                      />
                      <div>
                        <p className="team-stack-sample-label">Capability workstream</p>
                        <p className="team-stack-name">{card.name}</p>
                        <p className="team-stack-role">{card.role}</p>
                      </div>
                    </div>
                    <h3 className="mt-6 font-display text-3xl font-extrabold uppercase tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-white/68">
                      {card.description}
                    </p>
                    <ul className="team-stack-focus mt-auto grid gap-2 pt-6" aria-label={`${card.title} focus areas`}>
                      {card.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
            </div>

            <div className="team-stack-controls mt-8 flex items-center justify-between border-t border-white/15 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                {activeIndex + 1} / {TEAM_WORKSTREAMS.length}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="team-stack-control"
                  onClick={() => moveCards(-1)}
                  aria-label="Show previous team workstream"
                >
                  <ChevronLeft size={19} strokeWidth={1.7} />
                </button>
                <button
                  type="button"
                  className="team-stack-control"
                  onClick={() => moveCards(1)}
                  aria-label="Show next team workstream"
                >
                  <ChevronRight size={19} strokeWidth={1.7} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
