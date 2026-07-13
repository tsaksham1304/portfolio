import { motion, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
  tilt3d?: boolean;
  tiltMode?: 'global' | 'local';
}

export function GlassCard({ children, className = '', spotlight = false, tilt3d = false, tiltMode = 'global' }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rotateX = useSpring(0, { stiffness: 100, damping: 30, mass: 0.5 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 30, mass: 0.5 });
  const translateX = useSpring(0, { stiffness: 100, damping: 30, mass: 0.5 });
  const translateY = useSpring(0, { stiffness: 100, damping: 30, mass: 0.5 });

  // Dynamic shadow for local tilt mode
  const shadowX = useTransform(rotateY, [-15, 15], [-20, 20]);
  const shadowY = useTransform(rotateX, [-15, 15], [20, -20]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]) => `0px 10px 30px rgba(0,0,0,0.2), ${x}px ${y}px 40px rgba(0,0,0,0.4)`
  );

  useEffect(() => {
    if (!tilt3d) return;

    if (tiltMode === 'global') {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - cardCenterX;
        const deltaY = e.clientY - cardCenterY;
        
        const maxDist = Math.max(window.innerWidth, window.innerHeight) / 2;
        const normalizedX = Math.max(-1, Math.min(1, deltaX / maxDist));
        const normalizedY = Math.max(-1, Math.min(1, deltaY / maxDist));
        
        const maxTilt = 20;
        rotateX.set(-normalizedY * maxTilt);
        rotateY.set(normalizedX * maxTilt);
        
        const maxShift = 15;
        translateX.set(normalizedX * maxShift);
        translateY.set(normalizedY * maxShift);
      };

      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    } 
    
    // Local tilt mode
    if (tiltMode === 'local') {
      if (!isHovered) {
        rotateX.set(0);
        rotateY.set(0);
        translateX.set(0);
        translateY.set(0);
        return;
      }

      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = mousePos.x - centerX;
        const deltaY = mousePos.y - centerY;
        
        const normalizedX = Math.max(-1, Math.min(1, deltaX / centerX));
        const normalizedY = Math.max(-1, Math.min(1, deltaY / centerY));
        
        const maxTilt = 12; // Subtle SaaS-like tilt
        rotateX.set(-normalizedY * maxTilt);
        rotateY.set(normalizedX * maxTilt);
      }
    }
  }, [tilt3d, tiltMode, isHovered, mousePos, rotateX, rotateY, translateX, translateY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl glass ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: tilt3d ? 1500 : 'none',
        rotateX: tilt3d ? rotateX : 0, 
        rotateY: tilt3d ? rotateY : 0,
        x: tilt3d ? translateX : 0,
        y: tilt3d ? translateY : 0,
        transformStyle: tilt3d ? 'preserve-3d' : 'flat',
        boxShadow: (tilt3d && tiltMode === 'local' && isHovered) ? boxShadow : undefined
      }}
      animate={tilt3d ? { scale: isHovered ? (tiltMode === 'local' ? 1.03 : 1.05) : 1 } : {}}
      whileHover={!tilt3d ? { scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {spotlight && (
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--glow-primary), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
