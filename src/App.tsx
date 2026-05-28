import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import Preloader from './components/ui/Preloader';
import HeroSection from './components/sections/HeroSection';
import MarqueeSection from './components/sections/MarqueeSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import FooterSection from './components/sections/FooterSection';
import ContactModal from './components/ui/ContactModal';
import CustomCursor from './components/ui/CustomCursor';
import SectionReveal from './components/ui/SectionReveal';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [isLoaded]);

  return (
    <>
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main content */}
      <div style={{ position: 'relative', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        {/* Grain overlay */}
        <div className="grain-layer" />
        <CustomCursor />

        <HeroSection onOpenContact={() => setIsContactOpen(true)} />

        <SectionReveal>
          <MarqueeSection />
        </SectionReveal>

        <SectionReveal>
          <AboutSection onOpenContact={() => setIsContactOpen(true)} />
        </SectionReveal>

        <SectionReveal>
          <ServicesSection />
        </SectionReveal>

        <SectionReveal>
          <ExperienceSection />
        </SectionReveal>

        <SectionReveal>
          <ProjectsSection />
        </SectionReveal>

        <FooterSection onOpenContact={() => setIsContactOpen(true)} />

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </>
  );
}

export default App;
