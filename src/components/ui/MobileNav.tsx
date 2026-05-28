import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
];

export default function MobileNav({ onOpenContact }: { onOpenContact: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLink = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        style={{
          width: '44px', height: '44px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '5px', background: 'none', border: 'none',
          cursor: 'pointer', padding: '8px', zIndex: 200,
          position: 'relative',
        }}
      >
        <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'block', width: '22px', height: '2px', background: '#D7E2EA', borderRadius: '2px', transformOrigin: 'center' }}
        />
        <motion.span animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'block', width: '16px', height: '2px', background: '#D7E2EA', borderRadius: '2px', alignSelf: 'flex-start', marginLeft: '3px' }}
        />
        <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'block', width: '22px', height: '2px', background: '#D7E2EA', borderRadius: '2px', transformOrigin: 'center' }}
        />
      </button>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 150 }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(300px, 85vw)',
                background: 'linear-gradient(160deg, rgba(14,14,28,0.98) 0%, rgba(7,7,16,0.99) 100%)',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
                zIndex: 160, display: 'flex', flexDirection: 'column',
                padding: '80px 32px 40px',
              }}
            >
              {/* Top neon line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(6,182,212,0.8), transparent)',
              }} />

              {/* Nav links */}
              <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                  >
                    <button
                      onClick={() => handleLink(link.href)}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '14px 0',
                        fontSize: '28px', fontWeight: 800, color: 'rgba(255,255,255,0.5)',
                        fontFamily: 'Kanit, sans-serif', textTransform: 'uppercase',
                        letterSpacing: '0.05em', lineHeight: 1,
                        transition: 'color 0.2s',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                    >
                      <span style={{ fontSize: '12px', color: 'rgba(168,85,247,0.6)', marginRight: '12px', fontWeight: 400 }}>
                        0{i + 1}
                      </span>
                      {link.label}
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.35 }}
              >
                <button
                  onClick={() => { setIsOpen(false); setTimeout(onOpenContact, 300); }}
                  style={{
                    width: '100%', padding: '14px 24px', borderRadius: '14px',
                    border: '1px solid rgba(168,85,247,0.4)',
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(6,182,212,0.15))',
                    color: '#fff', fontSize: '14px', fontWeight: 700,
                    cursor: 'pointer', letterSpacing: '0.15em', textTransform: 'uppercase',
                    fontFamily: 'Kanit, sans-serif',
                  }}
                >
                  Contact Me
                </button>

                {/* Social mini links */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '20px', justifyContent: 'center' }}>
                  {[
                    { label: 'GH', href: 'https://github.com/Parasfzi' },
                    { label: 'LI', href: 'https://www.linkedin.com/in/paras-pawar-96665b262' },
                    { label: 'X', href: 'https://x.com/paraspawar' },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 700,
                        fontFamily: 'monospace', textDecoration: 'none', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#a855f7'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.4)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    >{s.label}</a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
