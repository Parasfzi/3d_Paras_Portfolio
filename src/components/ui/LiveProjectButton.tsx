export default function LiveProjectButton({ href }: { href?: string }) {
  return (
    <a 
      href={href || "#"} 
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-10 py-4 sm:px-12 sm:py-4.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors"
    >
      Live Project
    </a>
  );
}