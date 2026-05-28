import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(' ');

  return (
    <p ref={container} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word: string, i: number) => (
        <span key={i} className="mr-[0.25em] flex">
          {word.split('').map((char: string, j: number) => {
            const step = 1 / (text.length);
            const charIndex = text.indexOf(word) + j;
            const start = charIndex * step;
            const end = start + step;
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
            
            return (
              <span key={j} className="relative">
                <span className="invisible">{char}</span>
                <motion.span className="absolute left-0 top-0" style={{ opacity }}>
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}