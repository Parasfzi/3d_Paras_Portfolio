import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import ContactButton from '../ui/ContactButton';
import ParticleCanvas from '../ui/ParticleCanvas';

export default function HeroSection({ onOpenContact }: { onOpenContact: () => void }) {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Price', href: '#price' },
    { label: 'Projects', href: '#projects' },
  ];

  const [isGlitching, setIsGlitching] = useState(false);
  const avatarX = useSpring(0, { stiffness: 35, damping: 18, mass: 1.4 });
  const avatarY = useSpring(0, { stiffness: 35, damping: 18, mass: 1.4 });
  const sectionRef = useRef<HTMLElement>(null);

  // Random glitch trigger
  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 3500 + Math.random() * 4000;
      return setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          timerId = scheduleGlitch();
        }, 380);
      }, delay);
    };
    let timerId = scheduleGlitch();
    return () => clearTimeout(timerId);
  }, []);

  // Cursor parallax on avatar
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (e.clientY > rect.bottom) return;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      avatarX.set(((e.clientX - cx) / cx) * 35);
      avatarY.set(((e.clientY - cy) / cy) * 22);
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [avatarX, avatarY]);

  return (
    <section id="hero" ref={sectionRef} className="h-screen flex flex-col overflow-x-clip relative">
      {/* Particle network */}
      <ParticleCanvas />

      {/* Radial purple glow behind avatar */}
      <div
        style={{
          position: 'absolute',
          left: '50%', top: '55%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(182,0,168,0.18) 0%, rgba(118,33,176,0.1) 35%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Nav */}
      <FadeIn delay={0} y={-20} as="nav" className="flex justify-between px-6 md:px-10 pt-6 md:pt-8 relative z-20">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-60 transition-opacity duration-200"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={onOpenContact}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-60 transition-opacity duration-200"
        >
          Contact
        </button>
      </FadeIn>

      {/* Glitch hero heading */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden relative z-20">
        <FadeIn delay={0.15} y={40} className="w-full flex justify-center mt-6 sm:mt-4 md:-mt-5">
          <h1
            data-text="Hi, i'm paras"
            className={`hero-heading glitch font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] ${isGlitching ? 'is-glitching' : ''}`}
          >
            Hi, i&apos;m paras
          </h1>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>

      {/* Cursor-following avatar */}
      <motion.div
        style={{
          x: avatarX, y: avatarY,
          position: 'absolute',
          left: '50%', zIndex: 10,
          width: 'clamp(260px, 40vw, 520px)',
          pointerEvents: 'none',
        }}
        className="top-1/2 -translate-y-1/2 -translate-x-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img src="/chatgpt.png" alt="Paras 3D Portrait" className="w-full h-auto drop-shadow-2xl" />
      </motion.div>
    </section>
  );
}
