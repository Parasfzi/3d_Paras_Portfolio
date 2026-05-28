import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const clicking = useRef(false);
  const rafId = useRef(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isLink = !!(t.closest('a') || t.closest('button'));
      if (hovering.current !== isLink) {
        hovering.current = isLink;
        ring.style.width = ring.style.height = isLink ? '72px' : '36px';
        ring.style.borderRadius = isLink ? '6px' : '50%';
        ring.style.background = isLink ? 'rgba(182,0,168,0.08)' : 'transparent';
      }
    };

    const onDown = () => { clicking.current = true; dot.style.transform = 'translate(-50%,-50%) scale(0.4)'; };
    const onUp = () => { clicking.current = false; dot.style.transform = 'translate(-50%,-50%) scale(1)'; };

    function tick() {
      rafId.current = requestAnimationFrame(tick);
      // Dot: instant
      dot!.style.left = pos.current.x + 'px';
      dot!.style.top = pos.current.y + 'px';
      // Ring: lerp for lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      ring!.style.left = ringPos.current.x + 'px';
      ring!.style.top = ringPos.current.y + 'px';
    }
    rafId.current = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
          width: 5, height: 5, borderRadius: '50%', background: '#D7E2EA',
          transform: 'translate(-50%,-50%)', willChange: 'left, top',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9998,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid rgba(215,226,234,0.45)',
          transform: 'translate(-50%,-50%)', mixBlendMode: 'difference',
          transition: 'width 0.25s, height 0.25s, border-radius 0.25s, background 0.25s',
          willChange: 'left, top',
        }}
      />
    </>
  );
}
