import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Parasfzi',
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/paras-pawar-96665b262',
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: 'https://x.com/paraspawar',
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.638 5.903-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '14px',
  padding: '14px 18px',
  fontSize: '14px',
  color: '#fff',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
};

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleFocus = (el: HTMLInputElement | HTMLTextAreaElement, color: string) => {
    el.style.border = `1px solid ${color}`;
    el.style.background = 'rgba(255,255,255,0.06)';
    el.style.boxShadow = `0 0 24px ${color}33`;
  };
  const handleBlur = (el: HTMLInputElement | HTMLTextAreaElement) => {
    el.style.border = '1px solid rgba(255,255,255,0.1)';
    el.style.background = 'rgba(255,255,255,0.04)';
    el.style.boxShadow = 'none';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => { onClose(); setStatus('idle'); }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '660px',
              maxHeight: '92vh',
              overflowY: 'auto',
              borderRadius: '28px',
              background: 'linear-gradient(155deg, rgba(14,14,28,0.97) 0%, rgba(7,7,16,0.99) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: [
                '-16px 0 50px -8px rgba(6,182,212,0.3)',
                '16px 0 50px -8px rgba(168,85,247,0.3)',
                '0 40px 80px -20px rgba(0,0,0,0.9)',
                'inset 0 0 0 1px rgba(255,255,255,0.04)',
              ].join(', '),
              scrollbarWidth: 'none' as const,
            }}
          >
            {/* Top neon border line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px', borderRadius: '28px 28px 0 0',
              background: 'linear-gradient(90deg, rgba(6,182,212,0.8) 0%, rgba(168,85,247,0.8) 50%, rgba(217,70,239,0.8) 100%)',
            }} />
            {/* Left glow edge */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '1px', bottom: 0,
              background: 'linear-gradient(180deg, rgba(6,182,212,0.7) 0%, rgba(6,182,212,0.1) 60%, transparent 100%)',
            }} />
            {/* Right glow edge */}
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '1px', bottom: 0,
              background: 'linear-gradient(180deg, rgba(168,85,247,0.7) 0%, rgba(168,85,247,0.1) 60%, transparent 100%)',
            }} />
            {/* Top-center glowing dot */}
            <div style={{
              position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
              width: '7px', height: '7px', borderRadius: '50%',
              background: 'white', boxShadow: '0 0 12px 3px rgba(255,255,255,0.9)',
            }} />

            {/* ====== CONTENT ====== */}
            <div style={{ padding: 'clamp(24px, 5vw, 44px) clamp(20px, 5vw, 48px) clamp(24px, 5vw, 40px)' }}>

              {/* Close */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.45)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
              >
                <X size={15} />
              </button>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'clamp(20px, 4vw, 32px)', paddingRight: 'clamp(32px, 5vw, 48px)' }}>
                <div>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                    fontWeight: 900, textTransform: 'uppercase',
                    lineHeight: 1, letterSpacing: '-0.01em', marginBottom: '14px',
                  }}>
                    <span style={{ color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>LET'S </span>
                    <span style={{
                      background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.6))',
                    }}>TALK</span>
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.65, maxWidth: '280px' }}>
                    I'm always open to discussing new projects, creative ideas or opportunities.
                  </p>
                </div>

                {/* Radar icon */}
                <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: '1px dashed rgba(255,255,255,0.15)',
                    animation: 'spin 18s linear infinite',
                  }} />
                  <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)' }} />
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Send size={16} color="rgba(255,255,255,0.65)" strokeWidth={1.5} style={{ transform: 'translateX(1px) translateY(-1px)' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Success */}
              {status === 'success' ? (
                <div style={{ padding: '40px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(168,85,247,0.15))',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(168,85,247,0.2)',
                  }}>
                    <Send size={28} color="#fff" strokeWidth={1.5} style={{ transform: 'translateX(2px) translateY(-2px)', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' }} />
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Transmission Sent!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>Link established. I'll respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Name + Email row — single column on mobile, two on sm+ */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        <User size={11} color="#06b6d4" /> Name
                      </label>
                      <input
                        id="contact-name" required type="text" placeholder="John Doe"
                        style={inputBase}
                        onFocus={e => handleFocus(e.target as HTMLInputElement, 'rgba(6,182,212,0.7)')}
                        onBlur={e => handleBlur(e.target as HTMLInputElement)}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        <Mail size={11} color="#a855f7" /> Email
                      </label>
                      <input
                        id="contact-email" required type="email" placeholder="john@example.com"
                        style={inputBase}
                        onFocus={e => handleFocus(e.target as HTMLInputElement, 'rgba(168,85,247,0.7)')}
                        onBlur={e => handleBlur(e.target as HTMLInputElement)}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      <MessageSquare size={11} color="#06b6d4" /> Message
                    </label>
                    <textarea
                      id="contact-message" required rows={4} placeholder="Tell me about your project..."
                      style={{ ...inputBase, resize: 'none', fontFamily: 'inherit' }}
                      onFocus={e => handleFocus(e.target as HTMLTextAreaElement, 'rgba(255,255,255,0.3)')}
                      onBlur={e => handleBlur(e.target as HTMLTextAreaElement)}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'submitting'}
                    style={{
                      position: 'relative',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '17px 24px',
                      borderRadius: '16px',
                      background: 'linear-gradient(90deg, #06b6d4 0%, #7c3aed 50%, #c026d3 100%)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      boxShadow: '0 4px 32px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                      transition: 'all 0.2s ease',
                      marginTop: '4px',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 48px rgba(124,58,237,0.7), 0 0 80px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
                  >
                    <Send size={16} style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }} />
                    <span style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' }}>
                      {status === 'submitting' ? 'INITIALIZING...' : 'SEND TRANSMISSION'}
                    </span>
                    <span style={{
                      position: 'absolute', right: '24px',
                      color: 'rgba(255,255,255,0.4)', fontSize: '15px', letterSpacing: '0.02em',
                    }}>›››</span>
                  </button>
                </form>
              )}

              {/* Social Links */}
              <div style={{
                marginTop: '28px', paddingTop: '24px',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px',
              }}>
                {socialLinks.map((link, idx) => (
                  <div key={link.name} style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                        fontSize: '13px', fontWeight: 600, letterSpacing: '0.03em',
                        transition: 'all 0.2s ease', position: 'relative', paddingBottom: '4px',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = '#fff';
                        const icon = (e.currentTarget as HTMLElement).querySelector('svg');
                        if (icon) icon.style.filter = 'drop-shadow(0 0 10px #06b6d4)';
                        const underline = (e.currentTarget as HTMLElement).querySelector('.underline-bar') as HTMLElement;
                        if (underline) underline.style.opacity = '1';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)';
                        const icon = (e.currentTarget as HTMLElement).querySelector('svg');
                        if (icon) icon.style.filter = 'none';
                        const underline = (e.currentTarget as HTMLElement).querySelector('.underline-bar') as HTMLElement;
                        if (underline) underline.style.opacity = '0';
                      }}
                    >
                      <span style={{ color: '#06b6d4' }}>{link.icon}</span>
                      {link.name}
                      <span className="underline-bar" style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        height: '1.5px', borderRadius: '2px',
                        background: 'linear-gradient(90deg, #06b6d4, transparent)',
                        boxShadow: '0 0 8px #06b6d4',
                        opacity: 0, transition: 'opacity 0.2s',
                      }} />
                    </a>
                    {idx < socialLinks.length - 1 && (
                      <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)' }} />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}