import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { about } from '../../data/portfolio';
import { GradientText } from '../ui/GradientText';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { GlassCard } from '../ui/GlassCard';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const badgeY1 = useTransform(scrollYProgress, [0, 1], [100, -60]);
  const badgeY2 = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 px-6 md:px-12 lg:px-24 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section label */}
        <motion.span
          className="text-accent-indigo text-sm tracking-[0.3em] uppercase font-medium block mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Origin
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left — Story paragraphs */}
          <div className="lg:col-span-7 space-y-10">
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-lg md:text-xl leading-relaxed text-text-secondary text-justify"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {highlightText(paragraph, about.highlights[i])}
              </motion.p>
            ))}
          </div>

          {/* Right — Floating glass badges */}
          <div className="lg:col-span-5 relative min-h-[420px] hidden lg:block">
            <motion.div style={{ y: badgeY1 }} className="absolute top-0 right-0 z-10">
              <GlassCard className="p-8" spotlight tilt3d>
                <div className="text-text-tertiary text-xs tracking-[0.25em] uppercase mb-4">
                  Education
                </div>
                <div className="text-text-primary font-semibold text-lg mb-1">
                  {about.education.degree}
                </div>
                <div className="text-text-secondary text-sm mb-4">
                  {about.education.field}
                </div>
                <div className="text-text-tertiary text-sm">
                  {about.education.university}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div style={{ y: badgeY2 }} className="absolute top-56 left-0 z-20">
              <GlassCard className="p-8" spotlight tilt3d>
                <div className="text-text-tertiary text-xs tracking-[0.25em] uppercase mb-4">
                  Academic
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <AnimatedCounter
                    value={about.education.cgpa}
                    decimals={2}
                    className="text-4xl font-bold gradient-text"
                    duration={2.5}
                  />
                  <span className="text-text-tertiary text-sm">CGPA</span>
                </div>

              </GlassCard>
            </motion.div>
          </div>

          {/* Mobile: Education info inline */}
          <div className="lg:hidden col-span-1 flex flex-col gap-4 sm:flex-row">
            <GlassCard className="p-6 flex-1" spotlight>
              <div className="text-text-tertiary text-xs tracking-[0.25em] uppercase mb-3">
                Education
              </div>
              <div className="text-text-primary font-semibold mb-1">
                {about.education.degree}
              </div>
              <div className="text-text-secondary text-sm">
                {about.education.field}
              </div>
            </GlassCard>
            <GlassCard className="p-6 flex-1" spotlight>
              <div className="text-text-tertiary text-xs tracking-[0.25em] uppercase mb-3">
                Academic
              </div>
              <div className="flex items-baseline gap-2">
                <AnimatedCounter
                  value={about.education.cgpa}
                  decimals={2}
                  className="text-3xl font-bold gradient-text"
                />
                <span className="text-text-tertiary text-sm">CGPA</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Highlights specific phrases in a paragraph with gradient text.
 */
function highlightText(text: string, phrases: readonly string[]): ReactNode {
  if (!phrases || phrases.length === 0) return text;

  let parts: (string | ReactNode)[] = [text];

  phrases.forEach((phrase) => {
    const newParts: (string | ReactNode)[] = [];
    parts.forEach((part) => {
      if (typeof part !== 'string') {
        newParts.push(part);
        return;
      }
      const idx = part.indexOf(phrase);
      if (idx === -1) {
        newParts.push(part);
        return;
      }
      if (idx > 0) newParts.push(part.slice(0, idx));
      newParts.push(
        <GradientText key={phrase} className="font-medium">
          {phrase}
        </GradientText>,
      );
      if (idx + phrase.length < part.length) {
        newParts.push(part.slice(idx + phrase.length));
      }
    });
    parts = newParts;
  });

  return parts;
}
