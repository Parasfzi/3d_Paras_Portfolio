import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

interface FadeInProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: any;
}

export default function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '', as = 'div', ...props }: FadeInProps) {
  const MotionComponent = motion[as as keyof typeof motion] as any;
  
  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}