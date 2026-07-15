import React, { useEffect, useRef } from 'react';

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    // Add mouse listener
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7; // Gentle default speed
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.5 + 0.5; // Dot size
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse dodge interaction
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          // Push particle away strongly based on how close the mouse is
          const force = (150 - dist) / 150;
          this.x += (dx / dist) * force * 4; 
          this.y += (dy / dist) * force * 4;
        }

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Subtle purple/emerald dot
        ctx.fillStyle = 'rgba(139, 161, 250, 0.6)'; 
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Adjust density based on screen size, max 40 particles for a sparser, cleaner look
      const numParticles = Math.min(Math.floor(window.innerWidth / 35), 45);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw();
        
        // Draw lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 160) {
            ctx.beginPath();
            // Line opacity scales based on distance
            const opacity = 0.2 * (1 - distance / 160);
            ctx.strokeStyle = `rgba(139, 161, 250, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
