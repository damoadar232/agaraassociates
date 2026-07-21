import { HeroSection } from "@/components/marketing/sections/hero-section";
import { ServicesSection } from "@/components/marketing/sections/services-section";
import { ProjectsSection } from "@/components/marketing/sections/projects-section";
import { PhilosophySection } from "@/components/marketing/sections/philosophy-section";
import { JournalSection } from "@/components/marketing/sections/journal-section";
import { AboutSection } from "@/components/marketing/sections/about-section";
import { ContactSection } from "@/components/marketing/sections/contact-section";

export function AgaraLandingPage() {
  return (
    <>
      <HeroSection />
      <ServicesSection variant="home" />
      <ProjectsSection variant="home" limit={4} />
      <PhilosophySection />
      <JournalSection variant="home" limit={3} />
      <AboutSection variant="home" />
      <ContactSection variant="home" />
    </>
  );
}
