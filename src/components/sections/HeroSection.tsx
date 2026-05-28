import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import ContactButton from '../ui/ContactButton';
import ParticleCanvas from '../ui/ParticleCanvas';
import MobileNav from '../ui/MobileNav';

export default function HeroSection({ onOpenContact }: { onOpenContact: () => void }) {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
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

  // Cursor parallax on avatar (desktop only)
  useEffect(() => {
    if (window.innerWidth < 768) return;
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
    <section id="hero" ref={sectionRef} className="h-screen relative flex items-center justify-center overflow-hidden z-10 bg-[#070707]">

      {/* LAYER 1: Background & Particles */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(182,0,168,0.12) 0%, rgba(118,33,176,0.06) 40%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* LAYER 2: Midground Typography (Now Foreground) */}
      <div className="absolute inset-0 z-25 flex flex-col justify-center items-center pointer-events-none select-none">

        {/* "HI, I'M" */}
        <div className="w-full max-w-[1400px] relative px-4 md:px-10">
          <FadeIn delay={0.15} y={20} className="w-full flex justify-start pl-[5%] sm:pl-[8%] mb-[-2vh] sm:mb-[-4vh] md:mb-[-6vh] relative z-20">
            <h2
              className={`animate-float text-[#D7E2EA] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[clamp(1.8rem,4.5vw,5rem)] leading-none opacity-95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] glitch ${isGlitching ? 'is-glitching' : ''}`}
              data-text="HI, I'M"
            >
              HI, I'M
            </h2>
          </FadeIn>
        </div>

        {/* "PARAS" — Giant */}
        <div className="relative w-full overflow-visible flex justify-center">
          <FadeIn delay={0.25} y={40} className="w-full flex justify-center">
            <h1
              data-text="PARAS"
              className={`hero-heading-cinematic glitch font-black uppercase tracking-tighter leading-none whitespace-nowrap text-[28vw] sm:text-[28vw] md:text-[26vw] lg:text-[25vw] xl:text-[23vw] origin-center z-50 ${isGlitching ? 'is-glitching' : ''}`}
              style={{ display: 'block' }}
            >
              PARAS
            </h1>
          </FadeIn>
        </div>

        {/* Subtitle Pill */}
        <FadeIn delay={0.4} y={20} className="mt-3 sm:mt-5 md:mt-7 pointer-events-auto z-40 relative">
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3.5 rounded-full border border-white/10 bg-black/60 w-max shadow-lg shadow-black/50">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#B600A8] animate-pulse shadow-[0_0_10px_#B600A8]" />
            <span className="text-[#D7E2EA]/95 text-[10px] sm:text-xs md:text-sm lg:text-base font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase">
              Full Stack Developer &amp; UI Craftsman
            </span>
          </div>
        </FadeIn>
      </div>

      {/* LAYER 3: Foreground Avatar */}
      <motion.div
        style={{ x: avatarX, y: avatarY, willChange: 'transform' }}
        className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none w-[clamp(220px,55vw,580px)] sm:w-[clamp(260px,50vw,580px)] md:w-[clamp(280px,45vw,580px)] bottom-[-2vh] sm:-bottom-[4vh] md:-bottom-[8vh]"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="absolute inset-0 bg-black/50 blur-[30px] rounded-full scale-75 translate-y-12 z-[-1]" />
        <img
          src="/paras_pawar_avatar.png"
          alt="Paras Pawar 3D Portrait"
          className="w-full h-auto relative"
          loading="eager"
          style={{
            filter: 'drop-shadow(-12px 0px 16px rgba(0,255,255,0.22)) drop-shadow(12px 0px 16px rgba(182,0,168,0.22)) drop-shadow(0px 16px 32px rgba(0,0,0,0.85))'
          }}
        />
      </motion.div>

      {/* LAYER 4 removed — second ParticleCanvas eliminated for performance */}


      {/* LAYER 5: UI Elements */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between">

        {/* Top Nav */}
        <FadeIn delay={0} y={-20} as="nav" className="flex justify-between items-center px-4 sm:px-6 md:px-10 pt-5 sm:pt-6 md:pt-8 pointer-events-auto">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm lg:text-base hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile: logo/name placeholder on left */}
          <span className="md:hidden text-[#D7E2EA] font-black uppercase tracking-[0.15em] text-sm">
            PARAS
          </span>

          {/* Desktop: Contact button */}
          <button
            onClick={onOpenContact}
            className="hidden md:block text-[#D7E2EA] font-medium uppercase tracking-wider text-sm lg:text-base hover:text-white transition-colors duration-200"
          >
            Contact
          </button>

          {/* Mobile: Hamburger */}
          <div className="md:hidden">
            <MobileNav onOpenContact={onOpenContact} />
          </div>
        </FadeIn>

        {/* Bottom Content */}
        <div className="flex flex-col justify-end h-full pb-5 sm:pb-7 md:pb-10 pointer-events-auto px-4 sm:px-6 md:px-10">
          <div className="w-full flex justify-between items-end relative">
            {/* Left: Description — hidden on small screens */}
            <FadeIn delay={0.35} y={20} className="hidden sm:block">
              <p className="text-[#D7E2EA]/70 font-light uppercase tracking-wider leading-snug text-[clamp(0.65rem,1.2vw,1rem)] w-[180px] sm:w-[220px] md:w-[280px]">
                Building modern web experiences with React, Next.js &amp; Node.js
              </p>
            </FadeIn>

            {/* Right: Contact Button */}
            <FadeIn delay={0.5} y={20} className="ml-auto sm:ml-0">
              <ContactButton onClick={onOpenContact} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
