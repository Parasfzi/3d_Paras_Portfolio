import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from './components/sections/HeroSection';
import MarqueeSection from './components/sections/MarqueeSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactModal from './components/ui/ContactModal';
import CustomCursor from './components/ui/CustomCursor';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {/* Grain overlay */}
      <div className="grain-layer" />
      <CustomCursor />
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />
      <MarqueeSection />
      <AboutSection onOpenContact={() => setIsContactOpen(true)} />
      <ServicesSection />
      <ProjectsSection />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;
