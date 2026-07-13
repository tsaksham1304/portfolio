import { useMousePosition } from '../../hooks/useMousePosition';

export function AuroraBackground() {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -20 }}>
      {/* Deep black base */}
      <div className="absolute inset-0 bg-bg-deep" />

      {/* Aurora blob 1 — indigo/blue (top-left) */}
      <div
        className="absolute will-change-transform"
        style={{
          top: '-30%',
          left: '-15%',
          transform: `translate(${normalizedX * 40}px, ${normalizedY * 25}px)`,
        }}
      >
        <div
          className="w-[80vw] h-[80vh] rounded-full animate-aurora"
          style={{
            background: 'radial-gradient(circle, var(--aurora-1), transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Aurora blob 2 — rose/red (bottom-right) */}
      <div
        className="absolute will-change-transform"
        style={{
          bottom: '-25%',
          right: '-15%',
          transform: `translate(${normalizedX * -25}px, ${normalizedY * -20}px)`,
        }}
      >
        <div
          className="w-[70vw] h-[70vh] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--aurora-2), transparent 65%)',
            filter: 'blur(90px)',
            animation: 'aurora 25s ease infinite reverse',
          }}
        />
      </div>

      {/* Aurora blob 3 — green/emerald (center-right) */}
      <div
        className="absolute will-change-transform"
        style={{
          top: '15%',
          right: '10%',
          transform: `translate(${normalizedX * 20}px, ${normalizedY * -15}px)`,
        }}
      >
        <div
          className="w-[55vw] h-[55vh] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--aurora-3), transparent 65%)',
            filter: 'blur(80px)',
            animation: 'aurora 18s ease infinite 5s',
          }}
        />
      </div>

      {/* Aurora blob 4 — cyan (bottom-left, adds extra neon depth) */}
      <div
        className="absolute will-change-transform"
        style={{
          bottom: '5%',
          left: '15%',
          transform: `translate(${normalizedX * -15}px, ${normalizedY * 12}px)`,
        }}
      >
        <div
          className="w-[45vw] h-[45vh] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--aurora-4), transparent 65%)',
            filter: 'blur(70px)',
            animation: 'aurora 22s ease infinite 8s',
          }}
        />
      </div>

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text-primary) 0.5px, transparent 0.5px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Vignette — darkens edges for a cinematic look */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, var(--bg-deep) 100%)',
        }}
      />
    </div>
  );
}
