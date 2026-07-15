import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navItems } from '../../data/portfolio';

export function NavBar() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });
    
    // Also observe the hero section so scrolling back up clears the active state
    const heroEl = document.querySelector('#hero');
    if (heroEl) observer.observe(heroEl);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#06060a]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.05)]' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="w-full px-8 md:px-16 lg:px-24 h-16 flex items-center justify-between">
        {/* Logo & Name */}
        <a href="#hero" className="flex items-center gap-3 group" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <div className="w-6 h-6 flex items-center justify-center overflow-hidden rounded-md">
            <img 
              src="/favicon_1_updated.jpeg" 
              alt="Saksham Tiwari Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="text-text-primary font-medium text-lg tracking-tight group-hover:text-accent-emerald transition-colors">
            Saksham Tiwari
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-5 py-2 text-sm transition-colors duration-300 font-medium rounded-full ${
                  isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
                data-cursor-hover
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#1a1f2e] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
