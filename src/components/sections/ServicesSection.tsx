import { useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  { num: '01', name: '3D Modeling', desc: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.' },
  { num: '02', name: 'Rendering', desc: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.' },
  { num: '03', name: 'Motion Design', desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.' },
  { num: '04', name: 'Branding', desc: 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.' },
  { num: '05', name: 'Web Design', desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.' },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="price"
      style={{ backgroundColor: '#0a0a0a', position: 'relative', zIndex: 50 }}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      {/* top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '55%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(182,0,168,0.7), rgba(118,33,176,0.7), transparent)',
      }} />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          background: 'linear-gradient(90deg, #ffffff 0%, #D7E2EA 50%, #8ca8ba 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          fontSize: 'clamp(3rem, 12vw, 10rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          marginBottom: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 1,
        }}
      >
        Services
      </motion.h2>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {services.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            className="svc-row"
            style={{
              position: 'relative',
              borderBottom: '1px solid rgba(215,226,234,0.07)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem) 1.5rem clamp(1.5rem, 3vw, 2.5rem) 2rem',
              cursor: 'default',
              background: hovered === i ? 'rgba(215,226,234,0.025)' : 'transparent',
              transition: 'background 0.35s',
            }}
          >
            {/* left accent bar */}
            <div
              className="svc-line"
              style={{ width: hovered === i ? '3px' : '0' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 3rem)' }}>
              {/* Large number */}
              <div style={{
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 1,
                background: hovered === i
                  ? 'linear-gradient(135deg, #B600A8 0%, #7621B0 50%, #BE4C00 100%)'
                  : 'linear-gradient(135deg, rgba(215,226,234,0.12), rgba(215,226,234,0.06))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transition: 'all 0.4s',
                minWidth: 'clamp(3.5rem, 9vw, 7rem)',
                flexShrink: 0,
              }}>
                {svc.num}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{
                  color: hovered === i ? '#ffffff' : 'rgba(215,226,234,0.8)',
                  fontSize: 'clamp(1rem, 2.4vw, 2rem)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'color 0.3s',
                }}>
                  {svc.name}
                </div>
                <div style={{
                  color: 'rgba(215,226,234,0.4)',
                  fontSize: 'clamp(0.8rem, 1.3vw, 1rem)',
                  marginTop: '0.4rem',
                  maxWidth: '520px',
                  lineHeight: 1.65,
                  maxHeight: hovered === i ? '80px' : '0px',
                  overflow: 'hidden',
                  opacity: hovered === i ? 1 : 0,
                  transition: 'max-height 0.4s ease, opacity 0.35s',
                }}>
                  {svc.desc}
                </div>
              </div>

              {/* Arrow */}
              <div style={{
                fontSize: '1.4rem',
                transform: hovered === i ? 'translate(6px, -6px)' : 'translate(0,0)',
                color: hovered === i ? '#B600A8' : 'rgba(215,226,234,0.2)',
                transition: 'transform 0.3s, color 0.3s',
                flexShrink: 0,
              }}>→</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
