import { motion, useReducedMotion } from "framer-motion";
import { getMotionDelay, getRevealTransition } from "./motionTransitions";

/*
 * Hydrogrid Editorial — footer. Deep navy panel with blueprint grid,
 * mono section indices, hairline rules.
 */
const LOGO_URL = "/manus-storage/bt-logo_026b8bce.png";

const FOOTER_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Services", href: "#services" },
  { label: "Operations", href: "#operations" },
  { label: "What We Deliver", href: "#projects" },
  { label: "Why BT Projects", href: "#why" },
  { label: "Contact", href: "#contact" },
];

function WaveDivider() {
  return (
    <svg className="block w-full" style={{ height: "2.25rem" }} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
      <path className="wave-move-2" fill="oklch(0.22 0.075 262 / 85%)" d="M0,20 C120,4 240,36 360,22 C480,8 600,32 720,20 C840,8 960,34 1080,22 C1200,10 1320,30 1440,18 L1440,40 L0,40 Z" />
      <path className="wave-move-1" fill="oklch(0.22 0.075 262)" d="M0,26 C160,40 320,14 480,26 C640,38 800,14 960,26 C1120,38 1280,16 1440,26 L1440,40 L0,40 Z" />
    </svg>
  );
}

export default function SiteFooter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-navy-deep text-white blueprint-grid">
      <div className="footer-content container py-16 md:py-20">
        <div className="footer-grid grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={getRevealTransition(shouldReduceMotion)}>
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="BT Projects logo" className="h-12 w-12 rounded-full border border-white/25" />
              <span className="leading-none">
                <span className="block font-display font-extrabold tracking-wide text-lg uppercase">BT Projects</span>
                <span className="block font-mono text-[10px] tracking-[0.25em] uppercase mt-1 text-white/50">Private Limited</span>
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/65 max-w-sm">End-to-end critical infrastructure solutions across municipal and industrial water management, wastewater treatment, power distribution, and full-lifecycle asset support.</p>
          </motion.div>

          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={getRevealTransition(shouldReduceMotion, getMotionDelay(1))}>
            <p className="section-label !text-white/50 mb-6">Navigate</p>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}><a href={link.href} className="nav-link text-sm text-white/80 hover:text-white">{link.label}</a></li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={getRevealTransition(shouldReduceMotion, getMotionDelay(2))}>
            <p className="section-label !text-white/50 mb-6">Contact</p>
            <ul className="space-y-3 text-sm text-white/80">
              <li>BT Projects Private Limited</li>
              <li><a href="tel:+913335850822" className="nav-link">+033 3585 0822</a></li>
              <li><a href="mailto:btprojects.official@btprojects.co.in" className="nav-link break-all">btprojects.official@btprojects.co.in</a></li>
              <li className="text-white/60 text-xs leading-relaxed">FE-159, FE Block, Sector 3, Bidhannagar, Kolkata, West Bengal 700106</li>
            </ul>
          </motion.div>
        </div>

        <motion.div className="footer-bottom mt-14 pt-6 border-t border-white/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={getRevealTransition(shouldReduceMotion, 0.16)}>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/45">© {new Date().getFullYear()} BT Projects Private Limited</p>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/45">Sheet No. 01 — Built for critical public utilities.</p>
        </motion.div>
      </div>
      <WaveDivider />
    </footer>
  );
}
