import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Parasfzi' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/paras-pawar-96665b262' },
  { name: 'Twitter / X', href: 'https://x.com/paraspawar' },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
];

export default function FooterSection({ onOpenContact }: { onOpenContact: () => void }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#030305',
      position: 'relative', zIndex: 10,
      padding: '60px clamp(1.5rem, 5vw, 4rem) 32px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '40%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
            alignItems: 'flex-start', gap: 'clamp(24px, 5vw, 40px)', marginBottom: '40px',
          }}
        >
          {/* Brand */}
          <div>
            <h3 style={{
              fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 800, color: '#fff',
              letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px',
              fontFamily: 'Kanit, sans-serif',
            }}>
              PARAS PAWAR
            </h3>
            <p style={{
              fontSize: '13px', color: 'rgba(255,255,255,0.35)',
              maxWidth: '260px', lineHeight: 1.6,
            }}>
              Full Stack Developer crafting fast, beautiful, and scalable web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '14px',
            }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map(link => (
                <a key={link.label} href={link.href} style={{
                  fontSize: '13px', color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none', transition: 'color 0.2s',
                  fontWeight: 500,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{
              fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '14px',
            }}>
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {socialLinks.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: '13px', color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none', transition: 'color 0.2s',
                  fontWeight: 500,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a855f7')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 style={{
              fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '14px',
            }}>
              Let's Work Together
            </h4>
            <button
              onClick={onOpenContact}
              style={{
                padding: '10px 24px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(6,182,212,0.3))',
                color: '#fff', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'all 0.2s',
                boxShadow: '0 0 20px rgba(168,85,247,0.15)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(168,85,247,0.5), rgba(6,182,212,0.5))';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(168,85,247,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(6,182,212,0.3))';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(168,85,247,0.15)';
              }}
            >
              Get In Touch
            </button>
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{
          height: '1px', width: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          marginBottom: '24px',
        }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
          alignItems: 'center', gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
            © {currentYear} Paras Pawar. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.15)', margin: 0 }}>
            Crafted with <span style={{ color: '#a855f7' }}>♥</span> using React + Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
