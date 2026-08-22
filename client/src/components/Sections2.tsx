/*
 * Hydrogrid Editorial — operations, why-us, contact sections.
 * Alternating navy/white ledger panels, mono labels, hairline rules.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Expand,
  Mail,
  MapPin,
  Phone,
  Wrench,
  LineChart,
  FileCheck2,
  ShieldCheck,
  Clock3,
  TrendingDown,
  Users,
  X,
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
  Send,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { OfficeMap } from "./OfficeMap";
import WhatsAppButton, {
  WHATSAPP_URL,
} from "./WhatsAppButton";
import { trpc } from "@/lib/trpc";
import { getWrappedGalleryIndex } from "./whyGallery";
import { getMotionDelay, getRevealTransition } from "./motionTransitions";
import { getEnquiryFeedbackStatus } from "./enquiryFeedback";

/* ---------- Operations (O&M process) ---------- */
const STEPS = [
  {
    icon: ClipboardCheck,
    n: "A",
    t: "Plan",
    d: "Project planning, site assessment, and technical coordination across pumps, pipelines, treatment facilities, and utilities.",
  },
  {
    icon: Wrench,
    n: "B",
    t: "Build",
    d: "Civil, mechanical, and electrical construction for water supply, wastewater, pumping, intake, and power-distribution systems.",
  },
  {
    icon: LineChart,
    n: "C",
    t: "Commission",
    d: "Installation, testing, commissioning, and handover of pumping stations, treatment plants, chlorination systems, and substations.",
  },
  {
    icon: FileCheck2,
    n: "D",
    t: "Maintain",
    d: "Repair, rehabilitation, operation, and maintenance support that protects reliability and long-term asset performance.",
  },
];

export function Operations() {
  const shouldReduceMotion = useReducedMotion();

return (
    <section id="operations" className="bg-navy text-white blueprint-grid relative overflow-hidden">
<div className="mobile-section container py-20 md:py-28 relative z-10">
        <motion.div
          className="max-w-2xl"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={getRevealTransition(shouldReduceMotion)}
        >
          <SectionLabel index="03" text="Operations & Maintenance" />
          <h2 className="mt-5 font-display font-extrabold uppercase tracking-tight leading-tight text-3xl md:text-4xl">
            Engineered uptime for systems a city depends on
          </h2>
          <p className="mt-5 text-white/65 leading-relaxed">
            Our operation and maintenance discipline follows one cycle,
            executed without fail: assess, maintain, operate, report. Reliable
            operation, timely maintenance, and efficient performance — not as
promises, but as a working method.
</p>
        </motion.div>

        <div className="mt-14 grid gap-px bg-white/15 border border-white/15 sm:grid-cols-2 lg:grid-cols-4">
{STEPS.map((s, i) => (
            <motion.div
key={s.n}
              className="operations-step bg-navy-deep p-8"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={shouldReduceMotion ? undefined : { y: -6, backgroundColor: "#071735" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={getRevealTransition(shouldReduceMotion, getMotionDelay(i))}
            >
              <div className="flex items-center justify-between">
                <s.icon className="h-7 w-7 text-white/85" strokeWidth={1.5} />
                <span className="font-mono text-bolt text-sm">{s.n}</span>
              </div>
              <h3 className="mt-6 font-display font-bold uppercase tracking-wide text-navy-light text-white">
                {s.t}
              </h3>
<p className="mt-3 text-sm text-white/60 leading-relaxed">{s.d}</p>
            </motion.div>
))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why BT ---------- */
const WHY = [
  {
    icon: ShieldCheck,
    t: "Reliable infrastructure",
    d: "We build and support critical systems that public utilities can depend on for safe, consistent performance.",
    note: "Water supply, wastewater, pumping, and power-distribution capability.",
  },
  {
    icon: Clock3,
    t: "Full lifecycle support",
    d: "Our work continues beyond construction through repair, rehabilitation, operation, and maintenance.",
    note: "Support from installation and commissioning through ongoing O&M.",
  },
  {
    icon: TrendingDown,
    t: "Integrated delivery",
    d: "Civil, mechanical, and electrical disciplines work together so every subsystem performs as one.",
    note: "Pump houses, substations, intake structures, treatment, and controls.",
  },
  {
    icon: Users,
    t: "Operational resilience",
    d: "Practical engineering and equipped repair facilities help keep essential systems running safely and efficiently.",
    note: "Pump repairs, substation equipment, chlorine equipment, and field support.",
  },
];

const WHY_GALLERY = [
  {
    id: "pump-room",
    eyebrow: "01 — EQUIPMENT CARE",
    title: "pump repairs",
    caption:
      "Supported by our efficient equipped maintenance repairhouse for all pumping systems, substation equipment, and chlorine equipment.",
    alt: "Pump repairs in a maintenance repairhouse",
    src: "/manus-storage/pump-maintenance-workshop_f4afac72.jpeg",
  },
  {
    id: "network-view",
    eyebrow: "02 — WATER QUALITY",
    title: "chlorination system",
    caption:
      "Specialized infrastructure works involving chlorine equipment and dosing systems for compliant water treatment.",
    alt: "Chlorination equipment for water treatment",
    src: "/manus-storage/water-infrastructure-aerial_0c1429f5.jpg",
  },
  {
    id: "treatment-view",
    eyebrow: "03 — SOURCE EXTRACTION",
    title: "Raw water pumping",
    caption:
      "Managing the critical first step with robust, heavy-duty pumping solutions designed for high-volume, uninterrupted flow.",
    alt: "Raw water pumping infrastructure",
    src: "/manus-storage/wastewater-treatment-aerial_10c73ccd.jpg",
  },
] as const;

export function Why() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [readyGalleryImages, setReadyGalleryImages] = useState<Set<string>>(
    () => new Set(),
  );
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const selectedItem = selectedIndex === null ? null : WHY_GALLERY[selectedIndex];

  const closeLightbox = () => setSelectedIndex(null);
  const markGalleryImageReady = (id: string) => {
    setReadyGalleryImages((current) => {
      if (current.has(id)) return current;
      return new Set(current).add(id);
    });
  };
  const moveLightbox = (direction: -1 | 1) => {
    setSelectedIndex((current) =>
      current === null
        ? current
        : getWrappedGalleryIndex(current, direction, WHY_GALLERY.length),
      );
  };

  useEffect(() => {
    let cancelled = false;
    const markDecoded = (id: string) => {
      if (!cancelled) markGalleryImageReady(id);
    };

    WHY_GALLERY.forEach(({ id, src }) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        void image.decode().catch(() => undefined).finally(() => markDecoded(id));
      };
      image.onerror = () => markDecoded(id);
      image.src = src;

      if (image.complete) {
        void image.decode().catch(() => undefined).finally(() => markDecoded(id));
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = originalOverflow;
      triggerRef.current?.focus();
    };
  }, [selectedIndex]);

  return (
<section id="why" className="bg-water-paper blueprint-grid-light">
<div className="mobile-section container py-20 md:py-28">
        <motion.div
          className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-end mb-14"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.26 }}
          transition={getRevealTransition(shouldReduceMotion)}
        >
          <div>
            <SectionLabel index="05" text="Why BT Projects" />
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-tight leading-tight text-3xl md:text-4xl text-navy">
              Built for critical public utilities
            </h2>
          </div>
          <p className="text-navy/65 leading-relaxed">
            We provide integrated infrastructure solutions with a focus on
            reliability, operational efficiency, long-term asset performance, and
            sustainable water and wastewater management.
</p>
        </motion.div>

<div className="why-principles-grid grid sm:grid-cols-2 gap-6">
{WHY.map((w, i) => (
            <motion.div
key={w.t}
className="why-principle-card fluid-card relative bg-white border border-navy/12 p-8"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={getRevealTransition(shouldReduceMotion, getMotionDelay(i))}
            >
              <w.icon className="h-7 w-7 text-navy" strokeWidth={1.75} />
              <h3 className="mt-5 font-display font-bold uppercase tracking-wide text-navy">
                {w.t}
              </h3>
              <p className="mt-3 text-sm text-navy/60 leading-relaxed">{w.d}</p>
              <p className="mt-5 pt-4 border-t border-navy/10 font-mono text-[10px] uppercase tracking-[0.13em] leading-relaxed text-navy/50">
{w.note}
</p>
            </motion.div>
))}
        </div>

        <motion.div
          className="why-gallery-panel mt-16 border border-navy/15 bg-white/70"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={getRevealTransition(shouldReduceMotion, 0.06)}
        >
          <div className="grid gap-6 p-6 md:grid-cols-[0.72fr_1.28fr] md:items-end md:p-8 border-b border-navy/12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-navy/55">
                Operational view – visual reference
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight text-navy">
                Look closer at the work behind reliable flow
              </h3>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-navy/65 md:justify-self-end">
              From mechanical attention at the pump to specialized water
              treatment processes, these field disciplines reflect our commitment
              to keeping critical systems running safely and efficiently.
            </p>
          </div>

          <div className="why-gallery-grid grid gap-px bg-navy/12 md:grid-cols-3">
{WHY_GALLERY.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`why-gallery-tile group ${readyGalleryImages.has(item.id) ? "is-ready" : "is-loading"}`}
                aria-label={`Open ${item.title} image in the detail viewer`}
                aria-busy={!readyGalleryImages.has(item.id)}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelectedIndex(index);
                }}
              >
                <motion.img
                  layoutId={`why-gallery-image-${item.id}`}
                  src={item.src}
                  alt={item.alt}
                  className="why-gallery-image"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onLoad={() => markGalleryImageReady(item.id)}
                  onError={() => markGalleryImageReady(item.id)}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 28 }
                  }
                />
                <span className="why-gallery-loading" aria-hidden="true" />
                <span className="why-gallery-scrim" aria-hidden="true" />
                <span className="why-gallery-copy">
                  <span className="why-gallery-eyebrow">{item.eyebrow}</span>
                  <span className="why-gallery-title">{item.title}</span>
                </span>
                <span className="why-gallery-expand" aria-hidden="true">
                  <Expand size={16} strokeWidth={1.75} />
                  View detail
                </span>
              </button>
            ))}
</div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <motion.div
            className="why-lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="why-lightbox-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <motion.div
              className="why-lightbox-shell"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="why-lightbox-topline">
                <p className="why-lightbox-index">
                  {selectedItem.eyebrow} <span>— {selectedIndex! + 1}/{WHY_GALLERY.length}</span>
                </p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="why-lightbox-close"
                  onClick={closeLightbox}
                  aria-label="Close image detail viewer"
                >
                  <X size={18} strokeWidth={1.75} />
                  Close
                </button>
              </div>

              <div className="why-lightbox-main">
                <button
                  type="button"
                  className="why-lightbox-nav why-lightbox-nav-left"
                  onClick={() => moveLightbox(-1)}
                  aria-label="View previous image"
                >
                  <ChevronLeft size={26} strokeWidth={1.5} />
                </button>
                <div className="why-lightbox-image-wrap">
                  <motion.img
                    key={selectedItem.id}
                    layoutId={`why-gallery-image-${selectedItem.id}`}
                    src={selectedItem.src}
                    alt={selectedItem.alt}
                    className="why-lightbox-image"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 260, damping: 28 }
                    }
                  />
                </div>
                <button
                  type="button"
                  className="why-lightbox-nav why-lightbox-nav-right"
                  onClick={() => moveLightbox(1)}
                  aria-label="View next image"
                >
                  <ChevronRight size={26} strokeWidth={1.5} />
                </button>
              </div>

              <div className="why-lightbox-caption">
                <div>
                  <h3 id="why-lightbox-title">{selectedItem.title}</h3>
                  <p>{selectedItem.caption}</p>
                </div>
                <p className="why-lightbox-help">Esc to close · ← → to browse</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Contact ---------- */
export const COMPANY = {
  name: "BT Projects Private Limited",
  business: "Water, Wastewater & Power Infrastructure",
  focus: "Water supply · Sewage · Pumping · Civil & electrical works",
  email: "btprojects.official@btprojects.co.in",
  phone: "+033 3585 0822",
  address: "FE-159, FE Block, Sector 3, Bidhannagar, Kolkata, West Bengal 700106",
};

const buildEnquiryMailto = (form: typeof INITIAL_ENQUIRY_FORM) => {
  const subject = encodeURIComponent(`BT Projects enquiry from ${form.name.trim() || "website visitor"}`);
  const body = encodeURIComponent([
    `Name: ${form.name.trim() || "Not provided"}`,
    `Email: ${form.email.trim() || "Not provided"}`,
    `Phone: ${form.phone.trim() || "Not provided"}`,
    `Organisation: ${form.company.trim() || "Not provided"}`,
    `Service: ${form.serviceType || "Not provided"}`,
    `Project stage: ${form.projectStage || "Not provided"}`,
    `Site location: ${form.siteLocation.trim() || "Not provided"}`,
    "",
    `${form.message.trim() || "No message provided"}`,
  ].join("\n"));

  return `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
};

const INITIAL_ENQUIRY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  serviceType: "",
  projectStage: "",
  siteLocation: "",
  message: "",
};

const ENQUIRY_SERVICE_OPTIONS = [
  "Government water supply",
  "Water management",
  "Sewage pumping / STP",
  "Chlorination systems",
  "Pumping systems / repairs",
  "Civil & electrical infrastructure",
  "Operation & maintenance",
  "Not sure yet",
] as const;

const ENQUIRY_STAGE_OPTIONS = [
  "New requirement",
  "Existing system issue",
  "Planned maintenance / O&M",
  "Upgrade / expansion",
  "Urgent support",
] as const;

export function Contact() {
const [form, setForm] = useState(INITIAL_ENQUIRY_FORM);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionOutcome, setSubmissionOutcome] = useState<"idle" | "success" | "error">("idle");
  const shouldReduceMotion = useReducedMotion();
  const successMessageRef = useRef<HTMLDivElement | null>(null);
  const nameFieldRef = useRef<HTMLInputElement | null>(null);
  const successTimerRef = useRef<number | null>(null);
const submitMutation = trpc.enquiries.submit.useMutation({
    onSuccess: () => {
      const mailtoUrl = buildEnquiryMailto(form);
      window.location.href = mailtoUrl;
      setSubmissionOutcome("success");
      successTimerRef.current = window.setTimeout(() => {
        setForm(INITIAL_ENQUIRY_FORM);
        setHasSubmitted(true);
      }, shouldReduceMotion ? 0 : 620);
    },
    onError: () => {
      const mailtoUrl = buildEnquiryMailto(form);
      window.location.href = mailtoUrl;
      setSubmissionOutcome("error");
      toast.error("The form could not send automatically, so your email app has been opened with the enquiry details.");
    },
  });
  const enquiryStatus = getEnquiryFeedbackStatus(submitMutation.isPending, submissionOutcome);

  useEffect(() => () => {
    if (successTimerRef.current !== null) window.clearTimeout(successTimerRef.current);
  }, []);

  useEffect(() => {
    if (hasSubmitted) successMessageRef.current?.focus();
  }, [hasSubmitted]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.serviceType || !form.projectStage || !form.message.trim()) {
      setSubmissionOutcome("error");
      toast.error("Please complete the required contact, service, project stage, and project detail fields.");
      return;
    }
    setHasSubmitted(false);
    setSubmissionOutcome("idle");
    submitMutation.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      company: form.company.trim() || undefined,
      serviceType: form.serviceType as (typeof ENQUIRY_SERVICE_OPTIONS)[number],
      projectStage: form.projectStage as (typeof ENQUIRY_STAGE_OPTIONS)[number],
      siteLocation: form.siteLocation.trim() || undefined,
      message: form.message.trim(),
    });
  };

  const startAnotherEnquiry = () => {
    setHasSubmitted(false);
    setSubmissionOutcome("idle");
    window.requestAnimationFrame(() => nameFieldRef.current?.focus());
  };

  return (
    <section id="contact" className="bg-white">
      <div className="mobile-section container py-20 md:py-28">
<div className="contact-layout grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            className="order-2 lg:order-none"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={getRevealTransition(shouldReduceMotion)}
          >
            <SectionLabel index="07" text="Contact" className="!text-navy" />
            <h2 className="mt-5 font-display font-extrabold uppercase tracking-tight leading-tight text-3xl md:text-4xl text-navy">
              Start the conversation
            </h2>
            <p className="mt-5 text-navy/65 leading-relaxed max-w-md">
              Connect with us to collaborate on sustainable, robust water and
              wastewater infrastructure projects. We deliver end-to-end support
              from construction and installation through maintenance, repair,
              rehabilitation, and operational support.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 fluid-btn text-xs font-semibold uppercase tracking-wide text-white bg-[#128C7E] px-5 py-3 hover:bg-[#0f7368]"
            >
              Chat on WhatsApp
            </a>
            <div className="mt-10 border border-navy/12 divide-y divide-navy/10">
              <div className="flex items-start gap-6 px-5 py-4">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy/50 w-24 pt-0.5">
                  Company
                </span>
                <span className="text-sm text-navy/85">{COMPANY.name}</span>
              </div>
              <div className="flex items-start gap-6 px-5 py-4">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy/50 w-24 pt-0.5">
                  Focus
                </span>
                <span className="text-sm text-navy/85">{COMPANY.focus}</span>
              </div>
              <div className="flex items-start gap-6 px-5 py-4">
                <Phone className="h-4 w-4 text-navy/55 mt-0.5 flex-none" strokeWidth={1.75} />
                <a href="tel:+913335850822" className="text-sm text-navy/85 nav-link">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-start gap-6 px-5 py-4">
                <Mail className="h-4 w-4 text-navy/55 mt-0.5 flex-none" strokeWidth={1.75} />
                <a href={`mailto:${COMPANY.email}`} className="text-sm text-navy/85 nav-link break-all">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-start gap-6 px-5 py-4">
                <MapPin className="h-4 w-4 text-navy/55 mt-0.5 flex-none" strokeWidth={1.75} />
                <span className="text-sm text-navy/85">{COMPANY.address}</span>
              </div>
            </div>

            <motion.div
              className="mt-10"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.14 }}
              transition={getRevealTransition(shouldReduceMotion, 0.1)}
            >
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy/55 mb-4">
                Find us — office location
              </p>
<OfficeMap />
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form-panel order-1 bg-water-paper border border-navy/12 p-8 md:p-10 lg:order-none"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={getRevealTransition(shouldReduceMotion, 0.08)}
          >
            <AnimatePresence mode="wait">
              {hasSubmitted ? (
                <motion.div
                  key="enquiry-success"
                  ref={successMessageRef}
                  className="enquiry-success"
                  role="status"
                  aria-live="polite"
                  tabIndex={-1}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={getRevealTransition(shouldReduceMotion)}
                >
                  <span className="enquiry-success-icon" aria-hidden="true"><CheckCircle2 size={24} strokeWidth={1.8} /></span>
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy/55">Enquiry received — BTP/ENQ</p>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-navy">Thank you for reaching out.</h3>
                  <p className="max-w-md text-sm leading-relaxed text-navy/65">Your enquiry has been sent to our team. We will review the details and get back to you using the contact information provided.</p>
                  <button type="button" onClick={startAnotherEnquiry} className="fluid-btn enquiry-success-action border border-navy/25 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-navy hover:bg-white">Send another enquiry</button>
                </motion.div>
              ) : (
                <motion.form key="enquiry-form" onSubmit={submit} initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }} transition={getRevealTransition(shouldReduceMotion)}>
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy/55 mb-6">Enquiry sheet — BTP/ENQ</p>
	                  <div className="grid sm:grid-cols-2 gap-5">
	                    <label className="block"><span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Name</span><input ref={nameFieldRef} required autoComplete="name" className="mt-2 w-full bg-white border border-navy/20 px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy-light transition-all duration-300" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label>
	                    <label className="block"><span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Email</span><input type="email" required autoComplete="email" className="mt-2 w-full bg-white border border-navy/20 px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy-light transition-all duration-300" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></label>
	                  </div>
	                  <div className="grid sm:grid-cols-2 gap-5 mt-5">
	                    <label className="block"><span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Phone <span className="normal-case font-normal text-navy/45">(optional)</span></span><input type="tel" autoComplete="tel" className="mt-2 w-full bg-white border border-navy/20 px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy-light transition-all duration-300" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your contact number" /></label>
	                    <label className="block"><span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Organisation <span className="normal-case font-normal text-navy/45">(optional)</span></span><input autoComplete="organization" className="mt-2 w-full bg-white border border-navy/20 px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy-light transition-all duration-300" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company or authority" /></label>
	                  </div>
	                  <div className="grid sm:grid-cols-2 gap-5 mt-5">
	                    <label className="block"><span className="text-xs font-semibold uppercase tracking-wide text-navy/70">What do you need?</span><select required className="mt-2 w-full appearance-none bg-white border border-navy/20 px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy-light transition-all duration-300" value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })}><option value="" disabled>Select a service</option>{ENQUIRY_SERVICE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
	                    <label className="block"><span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Project stage</span><select required className="mt-2 w-full appearance-none bg-white border border-navy/20 px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy-light transition-all duration-300" value={form.projectStage} onChange={(e) => setForm({ ...form, projectStage: e.target.value })}><option value="" disabled>Select a stage</option>{ENQUIRY_STAGE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
	                  </div>
	                  <label className="block mt-5"><span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Site or project location <span className="normal-case font-normal text-navy/45">(optional)</span></span><input autoComplete="address-level2" className="mt-2 w-full bg-white border border-navy/20 px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy-light transition-all duration-300" value={form.siteLocation} onChange={(e) => setForm({ ...form, siteLocation: e.target.value })} placeholder="City, district, or project site" /></label>
	                  <label className="block mt-5"><span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Project details</span><textarea required rows={5} className="mt-2 w-full bg-white border border-navy/20 px-4 py-3 text-sm text-navy focus:outline-none focus:border-navy-light transition-colors resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about the system, current issue, scope, or timeline…" /></label>
	                  <motion.button layout type="submit" disabled={enquiryStatus === "sending" || enquiryStatus === "success"} aria-busy={enquiryStatus === "sending"} className="mt-7 fluid-btn inline-flex min-h-12 w-full items-center justify-center bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto" transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 32 }}>
	                    <AnimatePresence mode="wait" initial={false}>
	                      <motion.span key={enquiryStatus} className="inline-flex items-center justify-center gap-2" initial={shouldReduceMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={shouldReduceMotion ? undefined : { opacity: 0, y: -7 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.16, ease: "easeOut" }}>
	                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15" aria-hidden="true">{enquiryStatus === "idle" ? <Send size={13} /> : enquiryStatus === "sending" ? <LoaderCircle className="animate-spin" size={14} /> : enquiryStatus === "success" ? <CheckCircle2 size={14} /> : <CircleAlert size={14} />}</span>
	                        <span aria-live="polite">{enquiryStatus === "idle" ? "Submit enquiry" : enquiryStatus === "sending" ? "Sending enquiry" : enquiryStatus === "success" ? "Enquiry sent" : "Try sending again"}</span>
	                      </motion.span>
	                    </AnimatePresence>
	                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
