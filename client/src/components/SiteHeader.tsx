/*
 * Hydrogrid Editorial — site header.
 * Fixed nav: transparent navy over hero → opaque white on scroll.
 * Logo: provided BT circular monogram + ARCHIVO 800 wordmark.
 */
import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { getActiveSectionId, type SectionVisibility } from "./activeSection";
import { getHeroPointerPull } from "./heroPointer";

const LOGO_URL = "/manus-storage/bt-logo_026b8bce.png";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", href: "#overview" },
  { id: "services", label: "Services", href: "#services" },
  { id: "operations", label: "Operations", href: "#operations" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "why", label: "Why BT", href: "#why" },
  { id: "team", label: "Team", href: "#team" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const OBSERVED_SECTION_IDS = NAV_ITEMS.map((item) => item.id);

const NAV_POINTER_SPRING = { type: "spring" as const, stiffness: 460, damping: 28, mass: 0.32 };

function NavPointerLink({
  href,
  className,
  light,
  isActive,
  children,
}: {
  href: string;
  className: string;
  light: boolean;
  isActive?: boolean;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [isPointerActive, setIsPointerActive] = useState(false);

  const settle = () => {
    animate(x, 0, NAV_POINTER_SPRING);
    animate(y, 0, NAV_POINTER_SPRING);
    animate(scale, 1, NAV_POINTER_SPRING);
    animate(pointerX, 0, NAV_POINTER_SPRING);
    animate(pointerY, 0, NAV_POINTER_SPRING);
  };

  return (
    <motion.a
      href={href}
      className={`top-nav-ios-pointer ${isPointerActive ? "is-custom-pointer-active" : ""} ${isActive ? "is-active" : ""} relative inline-flex items-center ${className}`}
      style={shouldReduceMotion ? undefined : { x, y, scale }}
      aria-current={isActive ? "page" : undefined}
      onPointerEnter={(event) => {
        if (!shouldReduceMotion && event.pointerType === "mouse") setIsPointerActive(true);
      }}
      onPointerMove={(event) => {
        if (shouldReduceMotion || event.pointerType !== "mouse") return;

        const bounds = event.currentTarget.getBoundingClientRect();
        const localX = event.clientX - bounds.left;
        const localY = event.clientY - bounds.top;
        const pull = getHeroPointerPull({ x: localX, y: localY, width: bounds.width, height: bounds.height });

        x.set(pull.x);
        y.set(pull.y);
        scale.set(pull.scale);
        pointerX.set(localX - bounds.width / 2);
        pointerY.set(localY - bounds.height / 2);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        setIsPointerActive(false);
        settle();
      }}
      onPointerCancel={() => {
        setIsPointerActive(false);
        settle();
      }}
    >
      <span className="relative z-10">{children}</span>
      {!shouldReduceMotion && (
        <motion.span
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 z-20 -ml-2.5 -mt-2.5 grid h-5 w-5 place-items-center rounded-full border text-[10px] shadow-lg backdrop-blur-sm ${
            light ? "border-white/40 bg-white text-navy" : "border-navy/20 bg-navy text-white"
          }`}
          style={{ x: pointerX, y: pointerY }}
          animate={{ opacity: isPointerActive ? 1 : 0, scale: isPointerActive ? 1 : 0.72 }}
          transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
        >
          <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2.5} />
        </motion.span>
      )}
    </motion.a>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const visibility = new Map<string, SectionVisibility>();
    const observedSections = OBSERVED_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null,
    );

    if (observedSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, {
            id: entry.target.id,
            isIntersecting: entry.isIntersecting,
            ratio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
          });
        });

        const nextActiveSection = getActiveSectionId(Array.from(visibility.values()));
        setActiveSection((current) => (current === nextActiveSection ? current : nextActiveSection));
      },
      {
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.12, 0.28, 0.5, 0.72],
      },
    );

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const light = !scrolled && !open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        light
          ? "text-white bg-transparent"
          : "text-navy bg-white/92 backdrop-blur-xl border-b border-border"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="group flex items-center gap-3">
          <span className="header-logo relative inline-flex items-center justify-center">
            {/* Subtle water ripples that expand on hover */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-full ${
                light ? "border border-white/50" : "border border-navy/40"
              } opacity-0 group-hover:opacity-100`}
              style={{ animation: "headerRipple 1.4s var(--fluid-wave) infinite" }}
            />
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-full ${
                light ? "border border-white/50" : "border border-navy/40"
              } opacity-0 group-hover:opacity-100`}
              style={{ animation: "headerRipple 1.4s var(--fluid-wave) 0.35s infinite" }}
            />
            <img
              src={LOGO_URL}
              alt="BT Projects logo"
              data-header-logo-image
              className={`h-10 w-10 md:h-11 md:w-11 rounded-full border ${
                light ? "border-white/30" : "border-navy/15"
              }`}
            />
          </span>
          <span className="leading-none">
            <span className="block font-display font-extrabold tracking-wide text-base md:text-lg uppercase">
              BT Projects
            </span>
            <span
              className={`block font-mono text-[10px] tracking-[0.25em] uppercase mt-1 ${
                light ? "text-white/60" : "text-navy/55"
              }`}
            >
              Private Limited
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavPointerLink
              key={item.href}
              href={item.href}
              className="nav-link text-sm font-medium tracking-wide"
              light={light}
              isActive={activeSection === item.id}
            >
              {item.label}
            </NavPointerLink>
          ))}
          <span
            className={`hidden xl:block font-mono text-[11px] tracking-[0.15em] uppercase ${
              light ? "text-white/65" : "text-navy/55"
            }`}
          >
            +033 3585 0822
          </span>
          <NavPointerLink
            href="#contact"
            className={`text-sm font-semibold px-4 py-2 transition-colors duration-200 ${
              light
                ? "bg-white text-navy hover:bg-white/90"
                : "bg-navy text-white hover:bg-navy-deep"
            }`}
            light={light}
          >
            Enquire
          </NavPointerLink>
        </nav>

        <button
          className={`lg:hidden p-2 -mr-2 ${light ? "text-white" : "text-navy"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-site-navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white text-navy border-t border-border shadow-lg">
          <nav id="mobile-site-navigation" className="container py-4 flex flex-col gap-1" aria-label="Mobile site navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={`mobile-nav-link py-3 border-b border-border/60 text-sm font-medium tracking-wide last:border-0 ${
                  activeSection === item.id ? "is-active" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
