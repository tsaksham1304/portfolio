import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../ui/SocialIcons';
import { identity } from '../../data/portfolio';
import { GradientText } from '../ui/GradientText';
import { MagneticButton } from '../ui/MagneticButton';

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text
      const el = document.createElement('textarea');
      el.value = identity.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 px-6 md:px-12 lg:px-24 flex items-center"
    >
      {/* Green Aurora theme return — narrative closure */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vh] rounded-full opacity-10 animate-aurora"
          style={{ background: 'var(--accent-green)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vh] rounded-full opacity-5"
          style={{
            background: 'var(--accent-cyan)',
            filter: 'blur(60px)',
            animation: 'aurora 22s ease infinite reverse',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full relative text-center pb-16">
        <motion.span
          className="text-accent-green text-sm tracking-[0.3em] uppercase font-medium block mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Signal
        </motion.span>

        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Let&rsquo;s{' '}
          <GradientText>connect</GradientText>
        </motion.h2>

        <motion.p
          className="text-text-primary font-medium text-lg md:text-xl max-w-lg mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Always open to interesting conversations, collaboration opportunities,
          and new challenges.
        </motion.p>

        {/* Email — click to copy */}
        <motion.button
          onClick={handleCopyEmail}
          className="group mx-auto mb-16 flex items-center gap-3 px-8 py-4 rounded-2xl glass transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          data-cursor-hover
        >
          <Mail size={18} className="text-accent-green" />
          <span className="text-text-primary font-medium">{identity.email}</span>
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy
              size={16}
              className="text-text-tertiary group-hover:text-text-secondary transition-colors"
            />
          )}
        </motion.button>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MagneticButton href={identity.socials.github}>
            <GithubIcon size={18} />
            GitHub
          </MagneticButton>
          <MagneticButton href={identity.socials.linkedin}>
            <LinkedinIcon size={18} />
            LinkedIn
          </MagneticButton>
          <MagneticButton href={identity.socials.leetcode}>
            <LeetcodeIcon size={18} />
            LeetCode
          </MagneticButton>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-text-tertiary text-xs tracking-[0.2em] uppercase hover:text-text-secondary transition-colors duration-300 mb-4 block mx-auto"
          data-cursor-hover
        >
          Back to top ↑
        </button>
        <p className="text-text-tertiary text-xs">
          Designed & Built by{' '}
          <span className="gradient-text font-medium">{identity.name}</span>
        </p>
      </motion.footer>
    </section>
  );
}
