import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ParticleNetwork } from '../ui/ParticleNetwork';


export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Abstract Space Elements - 3D Orbital Rings & Particles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 0 }}>
        <ParticleNetwork />
        
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
        className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-12 lg:mt-0"
        style={{ opacity, y, scale }}
      >
        {/* Left Column: Text & CTA */}
        <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start z-20">
          
          {/* Title Badge */}
          <motion.div
            className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text text-xs tracking-[0.2em] uppercase font-bold">
              Software Developer
            </span>
          </motion.div>

          {/* Name — massive stable typography */}
          <div className="mb-6 w-full">
            <h1 className="flex flex-col items-center lg:items-start leading-[1.05]">
              <span className="block overflow-hidden flex flex-wrap justify-center lg:justify-start">
                {"Hi, I'm".split('').map((letter, i) => (
                  <motion.span
                    key={`hi-${i}`}
                    className="inline-block text-text-primary text-[clamp(3.5rem,6.5vw,6rem)] font-bold tracking-tight"
                    initial={{ y: '120%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden flex flex-wrap justify-center lg:justify-start">
                {"Saksham.".split('').map((letter, i) => (
                  <motion.span
                    key={`saksham-${i}`}
                    className="inline-block text-[clamp(3.5rem,6.5vw,6rem)] font-bold tracking-tight"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #60a5fa, #22d3ee, #34d399)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                    initial={{ y: '120%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>

          {/* Description */}
          <motion.p
            className="text-text-secondary/90 text-base md:text-lg max-w-md text-center lg:text-left leading-relaxed mb-10 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
          >
            I enjoy transforming ideas into practical software through thoughtful engineering and clean design.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          >
            <a 
              href="#projects" 
              className="px-6 py-2.5 rounded-md border border-text-secondary/20 text-text-secondary hover:border-text-secondary hover:text-text-primary transition-colors backdrop-blur-sm text-sm font-medium flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects <span>→</span>
            </a>
            <a 
              href="#contact" 
              className="px-6 py-2.5 rounded-md border border-text-secondary/20 text-text-secondary hover:border-text-secondary hover:text-text-primary transition-colors backdrop-blur-sm text-sm font-medium flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch <span>→</span>
            </a>
          </motion.div>


        </div>

        {/* Right Column: Image */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative w-full h-[350px] lg:h-[600px] pointer-events-none">
           <motion.div
             initial={{ opacity: 0, filter: 'blur(20px)' }}
             animate={{ opacity: 1, filter: 'blur(0px)' }}
             transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
             className="relative w-full h-full"
           >
              {/* Masking wrapper (Stable) */}
              <div
                className="w-full h-full flex justify-center lg:justify-end"
                style={{
                  maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
                }}
              >
                <img 
                  src="/profile_pic.jpeg" 
                  alt="Saksham Tiwari" 
                  className="w-full h-full object-cover max-w-[500px] lg:max-w-[800px]" 
                  style={{
                    mixBlendMode: 'lighten', // Perfectly blends dark background of photo with website
                    opacity: 0.85,
                    filter: 'brightness(0.9) contrast(1.15)',
                  }}
                />
              </div>
           </motion.div>
        </div>
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
