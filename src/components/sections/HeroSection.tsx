import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { identity } from '../../data/portfolio';


export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const nameLetters = identity.name.split('');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Abstract Space Elements - 3D Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
        <motion.div
          className="absolute rounded-full border border-[rgba(129,140,248,0.15)]"
          style={{ width: '60vw', height: '60vw', maxWidth: '800px', maxHeight: '800px' }}
          animate={{ rotateZ: 360, rotateX: [60, 75, 60], rotateY: [20, 40, 20] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border border-[rgba(167,139,250,0.1)]"
          style={{ width: '75vw', height: '75vw', maxWidth: '1000px', maxHeight: '1000px' }}
          animate={{ rotateZ: -360, rotateX: [70, 55, 70], rotateY: [40, 20, 40] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border border-[rgba(34,211,238,0.08)]"
          style={{ width: '90vw', height: '90vw', maxWidth: '1200px', maxHeight: '1200px' }}
          animate={{ rotateZ: 360, rotateX: [50, 70, 50], rotateY: [30, 50, 30] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        style={{ opacity, y, scale }}
      >
        {/* Name — massive stable typography */}
        <div className="mb-8">
          <h1>
            <span className="block overflow-hidden">
            {nameLetters.map((letter, i) => {
              const isFirstWord = i < (nameLetters.indexOf(' ') !== -1 ? nameLetters.indexOf(' ') : nameLetters.length);
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  style={isFirstWord ? {
                    color: 'var(--text-primary)',
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  } : {
                    backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #34d399 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}
                  initial={{ y: '120%', rotateX: -40, opacity: 0 }}
                  animate={{ y: 0, rotateX: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.04,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              );
            })}
            </span>
          </h1>
        </div>

        {/* Title */}
        <motion.p
          className="text-text-secondary text-sm md:text-xl tracking-[0.3em] uppercase mb-6 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        >
          {identity.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="gradient-text text-2xl md:text-4xl font-semibold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
        >
          {identity.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: 'easeOut' }}
        >
          {identity.heroDescription}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 flex flex-col items-center gap-3"
        style={{ translateX: '-50%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-text-tertiary text-[10px] tracking-[0.3em] uppercase font-medium">
          Scroll
        </span>
        <div className="w-5 h-8 border rounded-full flex justify-center pt-1.5" style={{ borderColor: 'var(--border-medium)' }}>
          <motion.div
            className="w-1 h-1 rounded-full bg-accent-indigo"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
