import { useEffect, useState } from 'react';

// Tech stack data — no external image dependencies
const techStack = [
  { name: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.06)', symbol: '⚛' },
  { name: 'TypeScript', color: '#3178C6', bg: 'rgba(49,120,198,0.06)', symbol: 'TS' },
  { name: 'Next.js', color: '#ffffff', bg: 'rgba(255,255,255,0.04)', symbol: 'N' },
  { name: 'Node.js', color: '#68A063', bg: 'rgba(104,160,99,0.06)', symbol: '⬡' },
  { name: 'Tailwind', color: '#38BDF8', bg: 'rgba(56,189,248,0.06)', symbol: '~' },
  { name: 'MongoDB', color: '#4DB33D', bg: 'rgba(77,179,61,0.06)', symbol: '🍃' },
  { name: 'PostgreSQL', color: '#336791', bg: 'rgba(51,103,145,0.06)', symbol: '🐘' },
  { name: 'Docker', color: '#2496ED', bg: 'rgba(36,150,237,0.06)', symbol: '🐳' },
  { name: 'Git', color: '#F05032', bg: 'rgba(240,80,50,0.06)', symbol: '⌥' },
  { name: 'Figma', color: '#F24E1E', bg: 'rgba(242,78,30,0.06)', symbol: '◈' },
  { name: 'GraphQL', color: '#E535AB', bg: 'rgba(229,53,171,0.06)', symbol: '◉' },
  { name: 'Python', color: '#FFD43B', bg: 'rgba(255,212,59,0.06)', symbol: '🐍' },
  { name: 'Redis', color: '#DC382D', bg: 'rgba(220,56,45,0.06)', symbol: '⚡' },
  { name: 'Prisma', color: '#5A67D8', bg: 'rgba(90,103,216,0.06)', symbol: '△' },
  { name: 'Vite', color: '#BD34FE', bg: 'rgba(189,52,254,0.06)', symbol: '⚡' },
  { name: 'tRPC', color: '#398CCB', bg: 'rgba(57,140,203,0.06)', symbol: '◌' },
  { name: 'AWS', color: '#FF9900', bg: 'rgba(255,153,0,0.06)', symbol: '☁' },
  { name: 'Vercel', color: '#ffffff', bg: 'rgba(255,255,255,0.04)', symbol: '▲' },
  { name: 'Linux', color: '#FCC624', bg: 'rgba(252,198,36,0.06)', symbol: '🐧' },
  { name: 'Framer', color: '#BB4B96', bg: 'rgba(187,75,150,0.06)', symbol: 'F' },
];

const row1 = techStack.slice(0, 10);
const row2 = techStack.slice(10);

function TechCard({ tech }: { tech: typeof techStack[0] }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all duration-300 z-20"
      style={{
        background: tech.bg,
        borderColor: `${tech.color}30`,
        minWidth: '160px',
        boxShadow: `0 0 20px ${tech.color}10`,
        zIndex: 20,
      }}
    >
      <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{tech.symbol}</span>
      <span
        className="font-bold text-base uppercase tracking-wider"
        style={{ color: tech.color, fontFamily: 'monospace' }}
      >
        {tech.name}
      </span>
    </div>
  );
}

export default function MarqueeSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('marquee-section');
      if (section) {
        const sectionTop = section.offsetTop;
        const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        setOffset(scrollOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="marquee-section" className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 relative z-30 overflow-hidden">
      {/* Section label */}
      <div className="flex justify-center mb-10">
        <span className="text-[#D7E2EA]/30 uppercase tracking-[0.4em] text-sm font-medium font-mono">
          — Tech Stack —
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1 — slides right */}
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
        >
          {[...row1, ...row1, ...row1].map((tech, i) => (
            <TechCard key={`r1-${i}`} tech={tech} />
          ))}
        </div>
        {/* Row 2 — slides left */}
        <div
          className="flex z-20 gap-4 whitespace-nowrap"
          style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
        >
          {[...row2, ...row2, ...row2].map((tech, i) => (
            <TechCard key={`r2-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}