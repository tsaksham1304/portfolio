import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { currentFocus } from '../../data/portfolio';
import { GradientText } from '../ui/GradientText';

export function FocusSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <section
      ref={ref}
      id="focus"
      className="relative py-20 px-6 md:px-12 lg:px-24 flex items-center"
    >
      {/* Green background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, var(--accent-green), transparent 70%)',
          opacity: 0.15,
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative">
        <motion.span
          className="text-accent-green text-sm tracking-[0.3em] uppercase font-medium block mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Path
        </motion.span>

        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-24 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          What I&rsquo;m{' '}
          <GradientText>focused on</GradientText>
        </motion.h2>

        <div className="space-y-12 max-w-2xl">
          {currentFocus.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-6 group"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Pulsing dot */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: 'var(--accent-green)' }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'var(--accent-green)' }}
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              </div>

              {/* Animated line */}
              <motion.div
                className="h-px flex-shrink-0"
                style={{
                  background: 'linear-gradient(90deg, var(--accent-green), transparent)',
                  width: `${30 + i * 10}px`,
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
              />

              {/* Text */}
              <span className="text-lg md:text-xl text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
