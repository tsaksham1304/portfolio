import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { techStack, type TechCategory } from '../../data/portfolio';
import { GradientText } from '../ui/GradientText';

export function TechSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="relative py-20 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.span
          className="text-accent-indigo text-sm tracking-[0.3em] uppercase font-medium block mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Arsenal
        </motion.span>

        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-24 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Technologies I{' '}
          <GradientText>work with</GradientText>
        </motion.h2>

        {/* Tech categories — dense grid for compactness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {techStack.map((category, index) => (
            <TechCategoryBlock
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCategoryBlock({
  category,
  index,
}: {
  category: TechCategory;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="text-text-secondary text-xs tracking-[0.25em] uppercase mb-6 font-medium border-b border-border-subtle pb-3">
        {category.name}
      </div>
      <div className="flex flex-wrap gap-3">
        {category.items.map((item, i) => (
          <TechPill key={item} name={item} delay={index * 0.1 + i * 0.06} isInView={isInView} />
        ))}
      </div>
    </motion.div>
  );
}

function TechPill({
  name,
  delay,
  isInView,
}: {
  name: string;
  delay: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className="relative px-5 py-2.5 rounded-full text-sm font-medium glass transition-all duration-300"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      data-cursor-hover
      style={{
        boxShadow: isHovered ? '0 0 30px var(--glow-primary)' : 'none',
      }}
    >
      <span className={isHovered ? 'gradient-text' : 'text-text-primary'}>
        {name}
      </span>
    </motion.span>
  );
}
