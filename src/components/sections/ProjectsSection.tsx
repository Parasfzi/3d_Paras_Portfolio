import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback } from 'react';
import LiveProjectButton from '../ui/LiveProjectButton';

// Dark code-themed project "screenshots" rendered as styled divs
function CodeMockup({ lang, lines }: { lang: string; lines: string[] }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden" style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Editor top bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-xs font-mono text-white/30">{lang}</span>
      </div>
      {/* Code lines */}
      <div className="p-4 font-mono text-xs leading-relaxed overflow-hidden">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-white/20 select-none w-4 flex-shrink-0">{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowserMockup({ url, title, accent }: { url: string; title: string; accent: string }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden" style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#161b22', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 flex-1 bg-white/5 rounded-md px-3 py-1 text-xs font-mono text-white/30">{url}</div>
      </div>
      {/* Page content mock */}
      <div className="p-6 flex flex-col gap-3">
        <div className="h-8 rounded-lg w-1/2" style={{ background: `${accent}20` }} />
        <div className="h-4 rounded w-3/4 bg-white/5" />
        <div className="h-4 rounded w-2/3 bg-white/5" />
        <div className="mt-2 flex gap-2">
          <div className="h-8 w-24 rounded-lg" style={{ background: `${accent}30` }} />
          <div className="h-8 w-20 rounded-lg bg-white/5" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-16 rounded-xl" style={{ background: n === 1 ? `${accent}15` : 'rgba(255,255,255,0.04)' }} />
          ))}
        </div>
        <div className="text-center mt-2 text-xs font-mono text-white/20">{title}</div>
      </div>
    </div>
  );
}

const projects = [
  {
    num: '01',
    cat: 'Personal',
    name: 'Dev Portfolio',
    href: '#',
    tech: ['React', 'Vite', 'Framer Motion', 'TypeScript'],
    desc: 'This very portfolio — built with React, Vite, Framer Motion and TypeScript with glitch animations and 3D parallax effects.',
    accent: '#B600A8',
    preview: {
      left: { type: 'code' as const, lang: 'HeroSection.tsx', lines: [
        '<span style="color:#ff7b72">export default</span> <span style="color:#d2a8ff">function</span> <span style="color:#79c0ff">Hero</span><span style="color:#ffffff">() {</span>',
        '  <span style="color:#ff7b72">const</span> <span style="color:#ffffff">[glitch, setGlitch] =</span>',
        '    <span style="color:#d2a8ff">useState</span><span style="color:#ffffff">(</span><span style="color:#79c0ff">false</span><span style="color:#ffffff">);</span>',
        '  <span style="color:#8b949e">// Cursor parallax</span>',
        '  <span style="color:#ff7b72">const</span> <span style="color:#ffffff">x =</span> <span style="color:#d2a8ff">useSpring</span><span style="color:#ffffff">(</span><span style="color:#79c0ff">0</span><span style="color:#ffffff">);</span>',
        '  <span style="color:#ff7b72">return</span> <span style="color:#ffffff">(</span>',
        '    <span style="color:#7ee787">&lt;section</span> <span style="color:#79c0ff">id</span><span style="color:#ffffff">=</span><span style="color:#a5d6ff">"hero"</span><span style="color:#7ee787">&gt;</span>',
      ]},
      right: { type: 'browser' as const, url: 'paraspawar.dev', title: 'Portfolio Live View' },
    },
  },
  {
    num: '02',
    cat: 'Client',
    name: 'ShopFlow — E-Commerce',
    href: '#',
    tech: ['Next.js', 'MongoDB', 'Stripe', 'Tailwind'],
    desc: 'Full-featured e-commerce platform with cart management, Stripe payments, admin dashboard, and real-time inventory tracking.',
    accent: '#38BDF8',
    preview: {
      left: { type: 'code' as const, lang: 'checkout.ts', lines: [
        '<span style="color:#ff7b72">const</span> <span style="color:#79c0ff">session</span> <span style="color:#ffffff">=</span> <span style="color:#ff7b72">await</span>',
        '  <span style="color:#ffffff">stripe.checkout.sessions</span>',
        '  <span style="color:#79c0ff">.create</span><span style="color:#ffffff">({</span>',
        '  <span style="color:#79c0ff">mode</span><span style="color:#ffffff">:</span> <span style="color:#a5d6ff">"payment"</span><span style="color:#ffffff">,</span>',
        '  <span style="color:#79c0ff">line_items</span><span style="color:#ffffff">: cart,</span>',
        '  <span style="color:#79c0ff">success_url</span><span style="color:#ffffff">: url,</span>',
        '<span style="color:#ffffff">});</span>',
      ]},
      right: { type: 'browser' as const, url: 'shopflow.app', title: 'ShopFlow Dashboard' },
    },
  },
  {
    num: '03',
    cat: 'Personal',
    name: 'TaskFlow — SaaS App',
    href: '#',
    tech: ['React', 'Node.js', 'PostgreSQL', 'tRPC'],
    desc: 'Collaborative task management SaaS with real-time updates, workspace roles, Kanban boards, and productivity analytics.',
    accent: '#68A063',
    preview: {
      left: { type: 'code' as const, lang: 'tasks.router.ts', lines: [
        '<span style="color:#ff7b72">export const</span> <span style="color:#79c0ff">taskRouter</span> <span style="color:#ffffff">=</span>',
        '  <span style="color:#d2a8ff">router</span><span style="color:#ffffff">({</span>',
        '  <span style="color:#79c0ff">getAll</span><span style="color:#ffffff">:</span> <span style="color:#d2a8ff">protectedProcedure</span>',
        '    <span style="color:#79c0ff">.query</span><span style="color:#ffffff">(</span><span style="color:#ff7b72">async</span> <span style="color:#ffffff">({ctx}) =&gt;</span>',
        '      <span style="color:#ff7b72">await</span> <span style="color:#ffffff">ctx.db.task</span>',
        '      <span style="color:#79c0ff">.findMany</span><span style="color:#ffffff">({</span>',
        '      <span style="color:#79c0ff">where</span><span style="color:#ffffff">: {userId},</span>',
      ]},
      right: { type: 'browser' as const, url: 'taskflow.app/board', title: 'TaskFlow Kanban' },
    },
  },
];

interface ProjectData {
  num: string;
  cat: string;
  name: string;
  href?: string;
  tech: string[];
  desc: string;
  accent: string;
  preview: {
    left: { type: 'code'; lang: string; lines: string[] };
    right: { type: 'browser'; url: string; title: string };
  };
}

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
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, ${proj.accent}10 40%, transparent 65%)`;
      shine.style.opacity = '1';
    }
  }, [proj.accent]);

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
          borderRadius: '32px',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(135deg, rgba(25,25,25,0.95) 0%, rgba(15,15,15,0.99) 100%)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          boxShadow: `0 20px 50px rgba(0,0,0,0.5)`,
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Holographic shine */}
        <div className="card-shine" style={{ opacity: 0, transition: 'opacity 0.4s' }} />
        {/* Top border glow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${proj.accent}80, transparent)` }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, #E0E0E0 0%, #8ca8ba 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{proj.num}</span>
            <div>
              <div style={{ color: proj.accent, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.25rem' }}>{proj.cat}</div>
              <div style={{ color: '#ffffff', fontWeight: 500, textTransform: 'uppercase', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', letterSpacing: '0.05em' }}>{proj.name}</div>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md" style={{ background: `${proj.accent}15`, color: proj.accent, border: `1px solid ${proj.accent}30` }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <LiveProjectButton href={proj.href} />
        </div>

        {/* Description */}
        <p style={{ color: 'rgba(215,226,234,0.45)', fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)', lineHeight: 1.7, marginBottom: '1.5rem', position: 'relative', zIndex: 3, maxWidth: '700px' }}>
          {proj.desc}
        </p>

        {/* Mockup Images — stack on mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 3 }}
          className="sm:flex-row"
        >
          <div style={{ width: '100%' }} className="sm:w-[40%]">
            <div style={{ height: 'clamp(160px, 30vw, 280px)' }}>
              <CodeMockup lang={proj.preview.left.lang} lines={proj.preview.left.lines} />
            </div>
          </div>
          <div style={{ width: '100%' }} className="sm:w-[60%]">
            <div style={{ height: 'clamp(160px, 30vw, 280px)' }}>
              <BrowserMockup url={proj.preview.right.url} title={proj.preview.right.title} accent={proj.accent} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default function ProjectsSection() {
  // Each card sticks at this offset from the top of the viewport
  const STICKY_TOP = 70;
  // How many px of scroll is dedicated to each non-last card
  // while it's "pinned" before the next one slides over it
  const SCROLL_PER_CARD = 380;

  return (
    <section
      id="projects"
      style={{
        backgroundColor: '#050505',
        borderRadius: '32px 32px 0 0',
        position: 'relative',
        zIndex: 10,
        paddingTop: 'clamp(6rem, 12vw, 10rem)',
        paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
        paddingRight: 'clamp(1.5rem, 4vw, 3rem)',
        borderTop: '1px solid rgba(255,255,255,0.03)',
        // Total height = header + (N-1 scroll regions) + last card natural flow + bottom pad
        paddingBottom: '6rem',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="hero-heading"
        style={{
          fontWeight: 800,
          textTransform: 'uppercase',
          textAlign: 'center',
          fontSize: 'clamp(2.5rem, 10vw, 8rem)',
          marginBottom: 'clamp(3rem, 8vw, 8rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1
        }}
      >
        Projects
      </motion.h2>

      {/*
        Stack logic:
        - Each card lives in a wrapper div.
        - Non-last wrappers have a fixed tall height (SCROLL_PER_CARD px)
          so the user must scroll through that distance before the next card
          comes along and stacks on top.
        - The last wrapper has height:auto so it just takes its natural size.
        - All cards are position:sticky at the same STICKY_TOP so they stack
          at exactly the same vertical position — no offset jitter.
        - z-index increases per card so later cards draw on top.
      */}
      <div style={{ position: 'relative' }}>
        {projects.map((proj, i) => {
          const isLast = i === projects.length - 1;
          return (
            <div
              key={i}
              style={{
                // Non-last cards get a tall container for scroll breathing room.
                // Last card: auto height — it just sits and completes the section.
                height: isLast ? 'auto' : `${SCROLL_PER_CARD}px`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'sticky',
                  top: `${STICKY_TOP}px`,
                  zIndex: i + 1,
                }}
              >
                <ProjectCard proj={proj} index={i} totalCards={projects.length} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
