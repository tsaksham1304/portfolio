import { useEffect, useState } from 'react';

export function ShootingStars() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    // Generate a fixed number of shooting stars with random properties
    const newStars = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80}%`, // Keep mostly in upper 80% of sections
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 12}s`, // Staggered start times
      duration: `${10 + Math.random() * 10}s`, // 10-20s loop, crosses screen in 3-5s
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}
