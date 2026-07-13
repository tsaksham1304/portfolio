import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const glowX = useSpring(0, { stiffness: 150, damping: 20 });
  const glowY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Detect touch-only devices
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, glowX, glowY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Spotlight glow — large, slow follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 400 : 300,
          height: isHovering ? 400 : 300,
          background: 'radial-gradient(circle, var(--spotlight-color), transparent 70%)',
          opacity: isHidden ? 0 : 0.8,
          transition: 'width 0.4s, height 0.4s, opacity 0.3s',
          zIndex: 9998,
        }}
      />

      {/* Inner cursor dot — fast, precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 48 : 8,
          height: isHovering ? 48 : 8,
          backgroundColor: isHovering ? 'transparent' : 'var(--accent-indigo)',
          border: isHovering ? '1.5px solid var(--accent-indigo)' : '1.5px solid transparent',
          opacity: isHidden ? 0 : 1,
          transition:
            'width 0.3s cubic-bezier(0.4,0,0.2,1), height 0.3s cubic-bezier(0.4,0,0.2,1), background-color 0.3s, border-color 0.3s, opacity 0.3s',
          zIndex: 9999,
        }}
      />
    </>
  );
}
