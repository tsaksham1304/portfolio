import { AuroraBackground } from './components/ui/AuroraBackground';
import { ParticleField } from './components/ui/ParticleField';
import { ShootingStars } from './components/ui/ShootingStars';
import { CustomCursor } from './components/layout/CustomCursor';
import { NavBar } from './components/layout/NavBar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { TechSection } from './components/sections/TechSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CertSection } from './components/sections/CertSection';
import { FocusSection } from './components/sections/FocusSection';
import { ContactSection } from './components/sections/ContactSection';
import { SectionTransition } from './components/ui/SectionTransition';

export function App() {
  return (
    <div className="noise-overlay">
      {/* Global effects layer */}
      <AuroraBackground />
      <ParticleField />
      <ShootingStars />
      <CustomCursor />
      <ScrollProgress />
      <NavBar />

      {/* Scroll narrative */}
      <main>
        <HeroSection />
        <SectionTransition variant="line" />
        <AboutSection />
        <SectionTransition variant="fade" />
        <TechSection />
        <SectionTransition variant="dot" />
        <ProjectsSection />
        <SectionTransition variant="line" />
        <CertSection />
        <SectionTransition variant="fade" />
        <FocusSection />
        <SectionTransition variant="dot" />
        <ContactSection />
      </main>
    </div>
  );
}
