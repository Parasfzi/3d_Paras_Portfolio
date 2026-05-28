export default function ContactButton({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative group px-10 py-4 sm:px-12 sm:py-4.5 md:px-14 md:py-5 text-xs sm:text-sm md:text-base text-white font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: 'linear-gradient(135deg, rgba(182, 0, 168, 0.25) 0%, rgba(118, 33, 176, 0.25) 100%)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(182, 0, 168, 0.6)',
        boxShadow: '0 0 20px rgba(182, 0, 168, 0.3), inset 0 0 15px rgba(182, 0, 168, 0.2)'
      }}
    >
      {/* Neon glow layer on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
        background: 'linear-gradient(135deg, rgba(182, 0, 168, 0.6) 0%, rgba(118, 33, 176, 0.6) 100%)',
        boxShadow: '0 0 30px rgba(182,0,168,0.7) inset, 0 0 20px rgba(118,33,176,0.8)'
      }} />
      <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">Contact Me</span>
    </button>
  );
}