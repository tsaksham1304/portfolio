import { useRef, useCallback } from 'react';
import { useSpring } from 'framer-motion';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic(options: MagneticOptions = {}) {
  const { strength = 0.3, radius = 200 } = options;
  const ref = useRef<HTMLElement>(null);

  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        springX.set(distX * strength);
        springY.set(distY * strength);
      }
    },
    [radius, strength, springX, springY],
  );

  const handleMouseLeave = useCallback(() => {
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  return {
    ref,
    x: springX,
    y: springY,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
