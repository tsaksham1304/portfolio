import { useRef } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon } from '../ui/SocialIcons';
import { projects, type Project } from '../../data/portfolio';
import { GradientText } from '../ui/GradientText';
import { MagneticButton } from '../ui/MagneticButton';

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32">
      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-accent-cyan text-xs tracking-[0.3em] uppercase font-bold block mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Work
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Things I&rsquo;ve{' '}
            <GradientText>built</GradientText>
          </motion.h2>
        </div>
      </div>

      {/* Project showcases */}
      <div className="flex flex-col gap-48 pb-32">
        {projects.map((project) => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

import { GlassCard } from '../ui/GlassCard';

function ProjectShowcase({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="px-6 md:px-12 lg:px-24 relative min-h-[50vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <GlassCard tilt3d tiltMode="local" spotlight className="p-8 md:p-12 w-full h-full">
          {/* Top Meta Data */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                className="text-text-tertiary text-xs tracking-[0.3em] uppercase font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                {project.featured ? 'Featured Project' : 'Project Showcase'}
              </motion.div>
              <motion.h3
                className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <GradientText variant={project.accentColor}>{project.title}</GradientText>
              </motion.h3>
              <motion.p
                className="text-text-secondary text-xl font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {project.subtitle}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MagneticButton href={project.github}>
                <GithubIcon size={18} />
                View Source
              </MagneticButton>
            </motion.div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left: Description & Tech */}
            <motion.div 
              className="md:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-text-secondary text-lg leading-relaxed mb-10 font-light text-justify">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-5 py-2 rounded-full text-xs font-medium tracking-wide glass-strong text-text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: Feature Highlights */}
            <motion.div 
              className="md:col-span-5 flex flex-col justify-between md:border-l border-[var(--border-subtle)] md:pl-12"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="space-y-8">
                {project.highlights.map((highlight, i) => (
                  <div key={i}>
                    {highlight.metric && (
                      <div className="text-4xl font-bold mb-2">
                        <GradientText variant={project.accentColor}>{highlight.metric}</GradientText>
                      </div>
                    )}
                    <div className="text-text-secondary text-sm leading-relaxed">
                      {highlight.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

