import FadeIn from '../ui/FadeIn';
import AnimatedText from '../ui/AnimatedText';
import ContactButton from '../ui/ContactButton';

// Floating tech icon SVG components for corners
const ReactIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="50" cy="50" r="10" fill="#61DAFB" opacity="0.9" />
    <ellipse cx="50" cy="50" rx="40" ry="16" stroke="#61DAFB" strokeWidth="3" opacity="0.6" fill="none" />
    <ellipse cx="50" cy="50" rx="40" ry="16" stroke="#61DAFB" strokeWidth="3" opacity="0.6" fill="none" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="40" ry="16" stroke="#61DAFB" strokeWidth="3" opacity="0.6" fill="none" transform="rotate(120 50 50)" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="#68A063" strokeWidth="3" fill="rgba(104,160,99,0.1)" opacity="0.8" />
    <text x="50" y="58" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#68A063" fontFamily="monospace">JS</text>
  </svg>
);

const TSIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="10" y="10" width="80" height="80" rx="10" fill="rgba(49,120,198,0.15)" stroke="#3178C6" strokeWidth="3" opacity="0.8" />
    <text x="50" y="62" textAnchor="middle" fontSize="34" fontWeight="900" fill="#3178C6" fontFamily="monospace">TS</text>
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
    <text x="50" y="58" textAnchor="middle" fontSize="18" fontWeight="900" fill="white" fontFamily="monospace">NEXT</text>
  </svg>
);

const floatAnim = `
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(5deg); }
}
@keyframes float-slow-rev {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(14px) rotate(-5deg); }
}
`;

export default function AboutSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section id="about" className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden">
      <style>{floatAnim}</style>

      {/* Corner floating tech icons */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="hidden sm:block absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[90px] sm:w-[120px] md:w-[150px]">
        <div style={{ animation: 'float-slow 5s ease-in-out infinite' }}>
          <ReactIcon />
        </div>
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[80px] sm:w-[110px] md:w-[130px]">
        <div style={{ animation: 'float-slow-rev 6s ease-in-out infinite' }}>
          <NodeIcon />
        </div>
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[90px] sm:w-[120px] md:w-[150px]">
        <div style={{ animation: 'float-slow 6.5s ease-in-out infinite 0.5s' }}>
          <TSIcon />
        </div>
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="hidden sm:block absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[100px] sm:w-[130px] md:w-[160px]">
        <div style={{ animation: 'float-slow-rev 5.5s ease-in-out infinite 1s' }}>
          <NextIcon />
        </div>
      </FadeIn>

      <div className="z-20 flex flex-col items-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 md:mt-16 flex flex-col items-center">
          <AnimatedText
            text="I'm Paras Pawar, a Full Stack Developer passionate about building fast, beautiful, and scalable web applications. With hands-on experience in React, Next.js, Node.js, and modern UI design, I craft digital experiences that are both powerful under the hood and stunning on the surface. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed w-full max-w-[600px] text-[clamp(0.9rem,1.8vw,1.35rem)] px-2"
          />
        </div>

        {/* Stats row */}
        <FadeIn delay={0.25} y={30} className="mt-10 sm:mt-12 md:mt-14 flex flex-wrap justify-center gap-6 sm:gap-10 sm:gap-14">
          {[
            { value: '2+', label: 'Years Experience' },
            { value: '20+', label: 'Projects Shipped' },
            { value: '10+', label: 'Tech Stack' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                className="font-black text-[clamp(2rem,6vw,4rem)] leading-none"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #B600A8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </span>
              <span className="text-[#D7E2EA]/50 uppercase tracking-widest text-xs sm:text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </FadeIn>

        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.2}>
            <ContactButton onClick={onOpenContact} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}