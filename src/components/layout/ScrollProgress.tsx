import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-purple), var(--accent-cyan))',
        zIndex: 51,
      }}
    />
  );
}
