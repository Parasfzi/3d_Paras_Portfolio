import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback } from 'react';
import LiveProjectButton from '../ui/LiveProjectButton';

const projects = [
  {
    num: '01', cat: 'Client', name: 'Nextlevel Studio',
    href: 'https://example.com/nextlevel',
    images: {
      l1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      l2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      r: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
  },
  {
    num: '02', cat: 'Personal', name: 'Aura Brand Identity',
    href: 'https://example.com/aura',
    images: {
      l1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      l2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      r: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
  },
  {
    num: '03', cat: 'Client', name: 'Solaris Digital',
    href: 'https://example.com/solaris',
    images: {
      l1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      l2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      r: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
  },
];

interface ProjectData { num: string; cat: string; name: string; href?: string; images: { l1: string; l2: string; r: string; } }

function ProjectCard({ proj, index, totalCards }: { proj: ProjectData; index: number; totalCards: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'start start'] });
  const scaleVal = 1 - (totalCards - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleVal]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -7;
    const ry = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    const shine = card.querySelector('.card-shine') as HTMLElement;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, rgba(182,0,168,0.06) 40%, transparent 65%)`;
      shine.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    const shine = card.querySelector('.card-shine') as HTMLElement;
    if (shine) { shine.style.opacity = '0'; }
  }, []);

  return (
    <motion.div ref={containerRef} style={{ scale, width: '100%' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card-3d"
        style={{
          borderRadius: '32px', // Refined Apple-like radius
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(135deg, rgba(25,25,25,0.8) 0%, rgba(15,15,15,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(138,43,226,0.05)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Holographic shine */}
        <div className="card-shine" style={{ opacity: 0, transition: 'opacity 0.4s' }} />
        {/* Top border glow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(182,0,168,0.6), rgba(118,33,176,0.6), transparent)' }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, #E0E0E0 0%, #8ca8ba 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{proj.num}</span>
            <div>
              <div style={{ color: '#B600A8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.25rem' }}>{proj.cat}</div>
              <div style={{ color: '#ffffff', fontWeight: 500, textTransform: 'uppercase', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '0.05em' }}>{proj.name}</div>
            </div>
          </div>
          <LiveProjectButton href={proj.href} />
        </div>

        {/* Images */}
        <div style={{ display: 'flex', gap: '1.25rem', height: 'clamp(260px, 32vw, 460px)', position: 'relative', zIndex: 3 }}>
          <div style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <img src={proj.images.l1} style={{ width: '100%', flex: 1, objectFit: 'cover', borderRadius: '16px', minHeight: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }} alt="" />
            <img src={proj.images.l2} style={{ width: '100%', flex: 1.4, objectFit: 'cover', borderRadius: '16px', minHeight: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }} alt="" />
          </div>
          <div style={{ width: '60%' }}>
            <img src={proj.images.r} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }} alt="" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const CARD_OFFSET = 24; // px gap between stacked card tops
  const TOP_START = 100;   // first card sticks at this distance from top

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#050505',
        borderRadius: '32px 32px 0 0',
        position: 'relative',
        zIndex: 10,
        paddingTop: 'clamp(6rem, 12vw, 10rem)',
        paddingBottom: '14rem',
        paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
        paddingRight: 'clamp(1.5rem, 4vw, 3rem)',
        borderTop: '1px solid rgba(255,255,255,0.03)'
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="hero-heading"
        style={{ fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', fontSize: 'clamp(3rem, 10vw, 8rem)', marginBottom: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
      >
        Projects
      </motion.h2>

      <div style={{ position: 'relative' }}>
        {projects.map((proj, i) => (
          <div
            key={i}
            style={{
              position: 'sticky',
              top: TOP_START + i * CARD_OFFSET,
              zIndex: i + 1,
              paddingBottom: i < projects.length - 1 ? '140px' : 0,
            }}
          >
            <ProjectCard proj={proj} index={i} totalCards={projects.length} />
          </div>
        ))}
      </div>
    </section>
  );
}
