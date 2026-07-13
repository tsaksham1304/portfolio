import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionTransitionProps {
  variant?: 'line' | 'dot' | 'fade';
}

export function SectionTransition({ variant = 'line' }: SectionTransitionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  if (variant === 'dot') {
    return (
      <div ref={ref} className="flex justify-center py-8">
        <motion.div
          className="w-2 h-2 rounded-full bg-accent-indigo"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.6 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    );
  }

  if (variant === 'fade') {
    return (
      <div ref={ref} className="py-8">
        <motion.div
          className="mx-auto h-px max-w-xs"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--border-medium), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    );
  }

  // Default: vertical line
  return (
    <div ref={ref} className="flex justify-center py-10">
      <motion.div
        className="h-16 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, var(--accent-indigo), transparent)',
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 0.5 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}
