import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 800);
    const t2 = setTimeout(() => setPhase('exit'), 2200);
    const t3 = setTimeout(() => onComplete(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#050505',
          pointerEvents: phase === 'exit' ? 'none' : 'all',
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '80px', height: '80px', borderRadius: '20px',
            border: '2px solid rgba(168,85,247,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(168,85,247,0.08)',
            boxShadow: '0 0 40px rgba(168,85,247,0.3)',
            marginBottom: '32px',
          }}
        >
          <span style={{
            fontSize: '36px', fontWeight: 900, color: 'white',
            fontFamily: 'Kanit, sans-serif',
            textShadow: '0 0 20px rgba(255,255,255,0.5)',
          }}>P</span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'logo' ? 0 : 1, y: phase === 'logo' ? 20 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{
            fontSize: '28px', fontWeight: 800, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'white', margin: 0,
            fontFamily: 'Kanit, sans-serif',
          }}>
            PARAS PAWAR
          </h1>
          <p style={{
            fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(168,85,247,0.8)', marginTop: '8px', fontWeight: 600,
          }}>
            Full Stack Developer
          </p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          style={{
            position: 'absolute', bottom: '60px', width: '120px', height: '2px',
            background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.0, ease: 'linear' }}
            style={{
              height: '100%', borderRadius: '2px',
              background: 'linear-gradient(90deg, #06b6d4, #a855f7)',
              boxShadow: '0 0 10px rgba(168,85,247,0.6)',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
