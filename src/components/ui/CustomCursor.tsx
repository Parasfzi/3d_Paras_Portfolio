import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useSpring(0, { stiffness: 900, damping: 50, mass: 0.3 });
  const cursorY = useSpring(0, { stiffness: 900, damping: 50, mass: 0.3 });
  const followerX = useSpring(0, { stiffness: 100, damping: 22, mass: 0.8 });
  const followerY = useSpring(0, { stiffness: 100, damping: 22, mass: 0.8 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(!!(t.closest('a') || t.closest('button')));
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      {/* Precise dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
        animate={{ scale: isClicking ? 0.4 : 1 }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      >
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D7E2EA', transform: 'translate(-50%, -50%)' }} />
      </motion.div>

      {/* Lagging ring */}
      <motion.div
        style={{ x: followerX, y: followerY, position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998 }}
        animate={{
          scale: isHovering ? 2.4 : isClicking ? 0.7 : 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: isHovering ? '6px' : '50%',
            border: '1.5px solid rgba(215,226,234,0.45)',
            transform: 'translate(-50%, -50%)',
            background: isHovering ? 'rgba(182,0,168,0.08)' : 'transparent',
            transition: 'border-radius 0.25s, background 0.25s',
            mixBlendMode: 'difference',
          }}
        />
      </motion.div>
    </>
  );
}
