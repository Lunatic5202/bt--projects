/*
 * Hydrogrid Editorial — main page sections.
 * Asymmetric navy/white panels, blueprint grid texture, mono indices.
 */
import {
  Droplets,
  Gauge,
  Wrench,
  Recycle,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  TrendingDown,
} from "lucide-react";
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionLabel from "./SectionLabel";
import { getBobbleSpringImpulse, type PointerVelocity } from "./bobbleHover";
import { getParallaxOffset } from "./serviceParallax";
import { getMotionDelay, getRevealTransition } from "./motionTransitions";

const IMG_HERO = "/manus-storage/hero-water-plant_c037dda2.webp";
const IMG_PUMP = "/manus-storage/service-pumping_2b8eec90.webp";
const IMG_SEWAGE = "/manus-storage/service-sewage_6c756091.webp";
const IMG_MAINT = "/manus-storage/service-maintenance_2e0d97c5.webp";

const BOBBLE_SPRING = { type: "spring" as const, stiffness: 260, damping: 16, mass: 0.7 };

type OverviewCard = {
  icon: typeof Droplets;
  t: string;
  d: string;
};

const OVERVIEW_CARDS: OverviewCard[] = [
  {
    icon: Droplets,
    t: "Water supply",
    d: "Systems that deliver clean water from source to point of use.",
  },
  {
    icon: Recycle,
    t: "Water & sewage management",
    d: "Collection, conveyance, and treatment of water and wastewater.",
  },
  {
    icon: Gauge,
    t: "Pumping & equipment",
    d: "Installation, commissioning, and optimisation of pump systems.",
  },
  {
    icon: Wrench,
    t: "Operation & maintenance",
    d: "Planned, preventive care that keeps facilities running.",
  },
];

function usePointerVelocity(shouldReduceMotion: boolean) {
  const velocityRef = useRef<PointerVelocity>({ x: 0, y: 0 });
  const previousPointerRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      velocityRef.current = { x: 0, y: 0 };
      previousPointerRef.current = null;
      return;
    }

    const trackPointer = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const time = event.timeStamp || performance.now();
      const previous = previousPointerRef.current;

      if (previous) {
        const elapsedSeconds = Math.max((time - previous.time) / 1000, 1 / 120);
        velocityRef.current = {
          x: (event.clientX - previous.x) / elapsedSeconds,
          y: (event.clientY - previous.y) / elapsedSeconds,
        };
      }

      previousPointerRef.current = { x: event.clientX, y: event.clientY, time };
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => window.removeEventListener("pointermove", trackPointer);
  }, [shouldReduceMotion]);

  return velocityRef;
}

function OverviewBobbleCard({
  card,
  index,
  shouldReduceMotion,
  pointerVelocity,
}: {
  card: OverviewCard;
  index: number;
  shouldReduceMotion: boolean;
  pointerVelocity: React.MutableRefObject<PointerVelocity>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);

  const settleFrom = (velocity: PointerVelocity) => {
    if (shouldReduceMotion) return;

    const impulse = getBobbleSpringImpulse(velocity);
    animate(x, 0, { ...BOBBLE_SPRING, velocity: impulse.xVelocity });
    animate(y, 0, { ...BOBBLE_SPRING, velocity: impulse.yVelocity });
    animate(rotate, 0, { ...BOBBLE_SPRING, velocity: impulse.rotateVelocity });
    animate(scaleX, 1, { ...BOBBLE_SPRING, velocity: impulse.scaleXVelocity });
    animate(scaleY, 1, { ...BOBBLE_SPRING, velocity: impulse.scaleYVelocity });
  };

  const Icon = card.icon;

  return (
    <motion.div
      className="overview-bobble-card relative bg-white p-6 transition-colors duration-300 hover:bg-water-paper will-change-transform"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={getRevealTransition(shouldReduceMotion, getMotionDelay(index))}
      style={shouldReduceMotion ? undefined : { x, y, rotate, scaleX, scaleY }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") settleFrom(pointerVelocity.current);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") settleFrom({ x: 0, y: 0 });
      }}
    >
      <Icon className="h-6 w-6 text-navy" strokeWidth={1.75} />
      <p className="mt-4 font-display font-bold text-navy text-sm uppercase tracking-wide">
        {card.t}
      </p>
      <p className="mt-2 text-sm text-navy/60 leading-relaxed">{card.d}</p>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  return (
    <section id="top" className="hero-title-page relative bg-navy text-white blueprint-grid overflow-hidden">
      {/* navy gradient so text stays readable over image */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy/88 to-navy/35" />
      <div
        className="absolute inset-[-20px] bg-cover bg-center opacity-45 mix-blend-luminosity drift-slow"
        style={{ backgroundImage: `url(${IMG_HERO})` }}
      />
      <div className="hero-content container relative z-10 pt-32 md:pt-44 pb-24 md:pb-32">
        <div className="max-w-3xl">
          <p className="section-label !text-white/70 fade-up in-view" data-delay="0">
            <span className="text-bolt">BT / 00</span>
            <span>Engineering &amp; Infrastructure</span>
          </p>
          <h1
            className="fade-up in-view mt-6 font-display font-extrabold uppercase tracking-tight leading-[1.02]"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)", transitionDelay: "60ms" }}
          >
            Water, moving
            <br />
            <span className="text-white/75">when it must.</span>
          </h1>
          <p
            className="fade-up in-view mt-7 text-base md:text-lg leading-relaxed text-white/75 max-w-xl"
            style={{ transitionDelay: "140ms" }}
          >
            BT Projects Private Limited provides technical support for essential
            water and wastewater infrastructure — pumping systems, equipment,
            and the facilities around them — built on reliable operation,
            timely maintenance, and efficient system performance.
          </p>
          <div className="fade-up in-view mt-9 flex flex-wrap gap-4" style={{ transitionDelay: "220ms" }}>
            <a href="#services" className="fluid-btn bg-white text-navy font-semibold text-sm px-6 py-3 hover:bg-white/90">
              Explore services
            </a>
            <a href="#contact" className="fluid-btn border border-white/40 text-white font-semibold text-sm px-6 py-3 hover:bg-white/10">
              Talk to our engineers
            </a>
          </div>
        </div>

        {/* stat strip */}
        <div className="hero-stat-strip fade-up in-view mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-white/20 pt-8 gap-8">
          {[
            { k: "Water supply", v: "Intake to distribution" },
            { k: "Sewage management", v: "Collection to treatment" },
            { k: "Pumping systems", v: "Installed to optimised" },
            { k: "O&M", v: "Planned, predictable uptime" },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-bolt">
                {s.k}
              </p>
              <p className="mt-2 text-sm text-white/80">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Overview ---------- */
export function Overview() {
  const shouldReduceMotion = useReducedMotion();
  const pointerVelocity = usePointerVelocity(Boolean(shouldReduceMotion));

  return (
    <section id="overview" className="relative bg-water-paper blueprint-grid-light">
      <div className="mobile-section container py-20 md:py-28">
        <div className="overview-layout grid gap-12 md:grid-cols-[1fr_1.5fr] md:items-start">
          <motion.div
            className="md:sticky md:top-28"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.32 }}
            transition={getRevealTransition(shouldReduceMotion)}
          >
            <SectionLabel index="01" text="Overview" />
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-tight leading-tight text-3xl md:text-4xl text-navy">
              Engineering the systems a city depends on
            </h2>
            <div className="mt-6 h-1 w-16 bg-bolt draw-line" />
          </motion.div>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={getRevealTransition(shouldReduceMotion, 0.08)}
          >
            <p className="text-navy/85 text-base md:text-lg leading-relaxed">
              BT Projects Private Limited is an engineering and infrastructure
              company focused on <strong>water supply</strong>,{" "}
              <strong>water and sewage management</strong>, and the{" "}
              <strong>operation and maintenance</strong> of related systems.
            </p>
            <p className="mt-5 text-navy/65 leading-relaxed">
              We provide technical support for essential water and wastewater
              infrastructure, including pumping systems, equipment, and
              associated facilities — with a focus on reliable operation,
              timely maintenance, and efficient system performance. When water
              must flow, our engineering keeps it flowing.
            </p>
            <div className="overview-card-grid mt-10 grid sm:grid-cols-2 gap-px bg-navy/12 border border-navy/12 stagger">
              {OVERVIEW_CARDS.map((card, index) => (
                <OverviewBobbleCard
                  key={card.t}
                  card={card}
                  index={index}
                  shouldReduceMotion={Boolean(shouldReduceMotion)}
                  pointerVelocity={pointerVelocity}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const SERVICES = [
  {
    index: "02.1",
    img: IMG_PUMP,
    title: "Water supply systems",
    text: "End-to-end technical support for raw water intake, treatment, storage, and distribution. We work on the pumps, valves, pipelines, and instrumentation that move water reliably from source to consumer.",
    points: ["Intake & raw water handling", "Treatment plant support", "Storage & distribution networks", "Instrumentation & control"],
  },
  {
    index: "02.2",
    img: IMG_SEWAGE,
    title: "Water & sewage management",
    text: "Collection, conveyance, and treatment of wastewater engineered for consistent performance — from sewerage networks and pumping stations to treatment facilities and discharge systems.",
    points: ["Sewerage collection networks", "Sewage pumping stations", "Effluent treatment support", "Discharge compliance systems"],
  },
  {
    index: "02.3",
    img: IMG_MAINT,
    title: "Pumping systems & equipment",
    text: "Selection, installation, commissioning, and lifecycle care of pumping systems and associated mechanical and electrical equipment — matched to your flow, head, and duty requirements.",
    points: ["Pump selection & installation", "Commissioning & testing", "Mechanical & electrical works", "Spares & retrofits"],
  },
];

function useDesktopParallax() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

function ServiceParallaxRow({ service, position }: { service: (typeof SERVICES)[number]; position: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const isDesktop = useDesktopParallax();
  const reducedMotion = useReducedMotion();
  const parallaxEnabled = isDesktop && !reducedMotion;
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const indexY = useTransform(scrollYProgress, (value) => getParallaxOffset(value, 66));
  const copyY = useTransform(scrollYProgress, (value) => getParallaxOffset(value, -96));
  const imageY = useTransform(scrollYProgress, (value) => getParallaxOffset(value, 142));
  const imageCropY = useTransform(scrollYProgress, (value) => getParallaxOffset(value, -46));
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.22, 1.07, 1.18]);

  return (
    <article
      ref={rowRef}
      className="services-parallax-row relative grid gap-8 md:grid-cols-[7rem_1fr_1.1fr] md:items-center py-12 md:py-16"
    >
      <motion.p
        className="services-parallax-index font-mono text-bolt text-sm tracking-[0.18em]"
        style={{ y: parallaxEnabled ? indexY : 0 }}
      >
        {service.index}
      </motion.p>
      <motion.div className="services-parallax-copy md:order-1" style={{ y: parallaxEnabled ? copyY : 0 }}>
        <h3 className="font-display font-bold uppercase tracking-wide text-xl md:text-2xl text-navy">
          {service.title}
        </h3>
        <p className="mt-4 text-navy/65 leading-relaxed">{service.text}</p>
        <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {service.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-sm text-navy/80">
              <CheckCircle2 className="h-4 w-4 text-navy flex-none" strokeWidth={1.75} />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div className="services-parallax-visual relative" style={{ y: parallaxEnabled ? imageY : 0 }}>
        <div className="services-parallax-image-frame">
          <motion.img
            src={service.img}
            alt={service.title}
            loading="eager"
            decoding="async"
            fetchPriority="low"
            className="services-parallax-image w-full aspect-[4/3] object-cover border border-navy/10"
            style={{
              y: parallaxEnabled ? imageCropY : 0,
              scale: parallaxEnabled ? imageScale : 1,
            }}
          />
        </div>
        <div className="absolute -top-3 -right-3 h-full w-full border border-navy/15 pointer-events-none hidden md:block" />
      </motion.div>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-white">
      <div className="mobile-section container py-20 md:py-28">
        <div className="services-heading grid gap-10 md:grid-cols-[1fr_1.5fr] md:items-end mb-14">
          <div>
            <SectionLabel index="02" text="Services" />
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-tight leading-tight text-3xl md:text-4xl text-navy">
              What we engineer
            </h2>
          </div>
          <p className="text-navy/65 leading-relaxed max-w-lg">
            Three connected disciplines, delivered as one accountable
            engagement — because water infrastructure only performs when every
            subsystem is maintained to the same standard.
          </p>
        </div>

        <p className="mobile-service-hint font-mono text-[10px] uppercase tracking-[0.14em] text-navy/52">
          Swipe to explore all services
        </p>

        <div className="services-parallax-list divide-y divide-navy/12 border-y border-navy/12">
          {SERVICES.map((service, position) => (
            <ServiceParallaxRow key={service.index} service={service} position={position} />
          ))}
        </div>
      </div>
    </section>
  );
}
