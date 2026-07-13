import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';
import { certifications, about } from '../../data/portfolio';
import { GradientText } from '../ui/GradientText';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { GlassCard } from '../ui/GlassCard';

export function CertSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="certifications"
      className="relative py-20 px-6 md:px-12 lg:px-24 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.span
          className="text-accent-indigo text-sm tracking-[0.3em] uppercase font-medium block mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Proof
        </motion.span>

        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Credentials &{' '}
          <GradientText>recognition</GradientText>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — CGPA highlight */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-10 text-center" spotlight>
                <div className="text-text-tertiary text-xs tracking-[0.25em] uppercase mb-6">
                  Current CGPA
                </div>
                <AnimatedCounter
                  value={about.education.cgpa}
                  decimals={2}
                  className="text-6xl md:text-7xl font-bold gradient-text"
                  duration={2.5}
                />
                <div className="mt-4 text-text-secondary text-sm">out of 10.0</div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right — Certifications */}
          <div className="lg:col-span-8">
            <div className="space-y-5">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                >
                  <GlassCard className="p-6" spotlight>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: cert.badge?.includes('Gold')
                              ? 'linear-gradient(135deg, var(--accent-amber), var(--accent-rose))'
                              : cert.badge?.includes('Silver')
                                ? 'linear-gradient(135deg, #94a3b8, #818cf8)'
                                : 'var(--glow-primary)',
                          }}
                        >
                          <Award
                            size={18}
                            className={cert.badge ? 'text-white' : 'text-accent-indigo'}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-text-primary">
                            {cert.title}
                          </div>
                          <div className="text-text-tertiary text-sm">{cert.issuer}</div>
                        </div>
                      </div>
                      {cert.badge && (
                        <span
                          className="px-4 py-1.5 rounded-full text-xs font-semibold flex-shrink-0"
                          style={cert.badge.includes('Gold') ? {
                            background:
                              'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(244,63,94,0.1))',
                            color: 'var(--accent-amber)',
                            border: '1px solid rgba(245,158,11,0.3)',
                          } : {
                            background:
                              'linear-gradient(135deg, rgba(148,163,184,0.15), rgba(129,140,248,0.1))',
                            color: '#94a3b8',
                            border: '1px solid rgba(148,163,184,0.25)',
                          }}
                        >
                          {cert.badge}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
