import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    period: '2024 — Present',
    role: 'Full Stack Developer',
    company: 'Freelance',
    desc: 'Building custom web applications for clients using React, Next.js, Node.js, and modern deployment pipelines. Delivering pixel-perfect UIs and scalable backends.',
    tech: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    accent: '#a855f7',
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Developer',
    company: 'Self-Employed',
    desc: 'Designed and developed responsive web interfaces, interactive dashboards, and portfolio websites. Focused on animations, micro-interactions, and performance.',
    tech: ['TypeScript', 'Tailwind', 'Framer Motion', 'Vite'],
    accent: '#06b6d4',
  },
  {
    period: '2022 — 2023',
    role: 'Web Developer Intern',
    company: 'Learning Phase',
    desc: 'Mastered HTML, CSS, JavaScript fundamentals. Built multiple projects including landing pages, to-do apps, and weather dashboards to strengthen core skills.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Git'],
    accent: '#22c55e',
  },
];

function TimelineItem({ exp }: { exp: typeof experiences[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, position: 'relative', paddingBottom: 'clamp(24px, 4vw, 48px)', paddingLeft: '28px' }}
    >
      {/* Left dot + line */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
      }} />
      <div style={{
        position: 'absolute', left: '-5px', top: '24px',
        width: '11px', height: '11px', borderRadius: '50%',
        background: exp.accent, border: '2px solid rgba(255,255,255,0.2)',
        boxShadow: `0 0 16px ${exp.accent}80`,
      }} />

      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: 'clamp(18px, 4vw, 28px) clamp(18px, 4vw, 32px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: '16px', right: '16px', height: '1px',
          background: `linear-gradient(90deg, transparent, ${exp.accent}50, transparent)`,
        }} />

        <div style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: exp.accent, marginBottom: '6px',
          fontFamily: 'monospace',
        }}>
          {exp.period}
        </div>

        <h3 style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 700,
          color: '#fff', margin: '0 0 4px', lineHeight: 1.3,
        }}>
          {exp.role}
        </h3>

        <div style={{
          fontSize: '13px', color: 'rgba(255,255,255,0.35)',
          fontWeight: 500, marginBottom: '10px',
        }}>
          {exp.company}
        </div>

        <p style={{
          fontSize: 'clamp(12px, 1.5vw, 14px)',
          color: 'rgba(215,226,234,0.45)',
          lineHeight: 1.7, margin: '0 0 14px',
        }}>
          {exp.desc}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {exp.tech.map(t => (
            <span key={t} style={{
              fontSize: '10px', fontFamily: 'monospace', fontWeight: 600,
              padding: '3px 10px', borderRadius: '6px',
              background: `${exp.accent}12`, color: exp.accent,
              border: `1px solid ${exp.accent}25`,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{
        backgroundColor: '#080808',
        position: 'relative', zIndex: 10,
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 4rem)',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="hero-heading"
        style={{
          fontWeight: 800, textTransform: 'uppercase', textAlign: 'center',
          fontSize: 'clamp(2.5rem, 10vw, 8rem)',
          marginBottom: 'clamp(2.5rem, 8vw, 6rem)',
          letterSpacing: '-0.02em', lineHeight: 1,
        }}
      >
        Experience
      </motion.h2>

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
        {experiences.map((exp, i) => (
          <TimelineItem key={i} exp={exp} />
        ))}
      </div>
    </section>
  );
}
