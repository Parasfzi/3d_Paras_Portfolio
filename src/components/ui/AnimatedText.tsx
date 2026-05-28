import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.8', 'end 0.2']
  });

  // Split into WORDS instead of characters — massive reduction in motion values
  const words = useMemo(() => text.split(' '), [text]);
  const totalWords = words.length;

  return (
    <p ref={container} className={`flex flex-wrap justify-center gap-x-[0.3em] gap-y-1.5 ${className}`}>
      {words.map((word, i) => {
        const start = i / totalWords;
        const end = Math.min(start + 1 / totalWords, 1);
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

        return (
          <motion.span key={i} style={{ opacity }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}