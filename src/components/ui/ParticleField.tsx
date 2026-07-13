import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  hue: number;
  pulseSpeed: number;
  pulsePhase: number;
}

const CONNECTION_DISTANCE = 150;
const MOUSE_RADIUS = 180;
const MOUSE_FORCE = 0.8;

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    // More particles for a richer field
    const count = Math.min(120, Math.floor((width * height) / 12000));
    particlesRef.current = Array.from({ length: count }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1, // Bigger particles
        opacity: Math.random() * 0.5 + 0.2, // More visible
        hue: Math.random() * 60 + 210, // Range from blue-ish to cyan (210-270)
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const isDark = true;

    const animate = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw connection lines first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.2;

            // Lines near cursor glow brighter
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDist = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2);
            const mouseBoost = mouseDist < MOUSE_RADIUS * 1.5
              ? (1 - mouseDist / (MOUSE_RADIUS * 1.5)) * 0.4
              : 0;

            if (isDark) {
              ctx.strokeStyle = `rgba(129, 140, 248, ${lineOpacity + mouseBoost})`;
            } else {
              ctx.strokeStyle = `rgba(79, 70, 229, ${lineOpacity * 0.5 + mouseBoost * 0.3})`;
            }
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // Mouse repulsion — stronger and more dramatic
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) ** 2;
          p.vx += (dx / dist) * force * MOUSE_FORCE;
          p.vy += (dy / dist) * force * MOUSE_FORCE;
        }

        // Gentle drift back toward base position (subtle spring)
        p.vx += (p.baseX - p.x) * 0.0003;
        p.vy += (p.baseY - p.y) * 0.0003;

        // Damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -20) { p.x = canvas.width + 20; p.baseX = p.x; }
        if (p.x > canvas.width + 20) { p.x = -20; p.baseX = p.x; }
        if (p.y < -20) { p.y = canvas.height + 20; p.baseY = p.y; }
        if (p.y > canvas.height + 20) { p.y = -20; p.baseY = p.y; }

        // Pulsing opacity
        const pulse = Math.sin(timeRef.current * p.pulseSpeed + p.pulsePhase) * 0.2 + 0.8;
        const finalOpacity = p.opacity * pulse;

        // Proximity glow — particles near cursor get brighter and bigger
        const mouseProximity = dist < MOUSE_RADIUS
          ? (1 - dist / MOUSE_RADIUS)
          : 0;
        const finalSize = p.size + mouseProximity * 2;

        // Draw glow (neon halo)
        if (isDark && (mouseProximity > 0.3 || finalOpacity > 0.35)) {
          const glowSize = finalSize * 4;
          const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, glowSize,
          );
          gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${finalOpacity * 0.3})`);
          gradient.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Draw core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, finalSize, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${finalOpacity})`;
        } else {
          ctx.fillStyle = `rgba(79, 70, 229, ${finalOpacity * 0.6})`;
        }
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -10 }}
      aria-hidden="true"
    />
  );
}
