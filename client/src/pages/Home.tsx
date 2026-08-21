/*
 * BT Projects Pvt Ltd — Home.
 * Hydrogrid Editorial: navy/white blueprint aesthetic, asymmetric sections.
 */
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Hero, Overview, Services } from "@/components/Sections";
import { Operations, Why, Contact } from "@/components/Sections2";
import { MeetTeam } from "@/components/MeetTeam";
import { Projects } from "@/components/Projects";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useInView";

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <WhatsAppButton />
        <Hero />
        <Overview />
        <Services />
        <Operations />
        <Projects />
        <Why />
        <MeetTeam />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
