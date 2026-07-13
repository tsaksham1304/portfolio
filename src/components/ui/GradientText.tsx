import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'warm' | 'shimmer' | 'cyan' | 'amber' | 'indigo' | 'purple' | string;
}

export function GradientText({
  children,
  className = '',
  variant = 'default',
}: GradientTextProps) {
  if (variant === 'default' || variant === 'warm' || variant === 'shimmer') {
    const variantClass =
      variant === 'warm'
        ? 'gradient-text-warm'
        : variant === 'shimmer'
          ? 'gradient-text-shimmer'
          : 'gradient-text';

    return <span className={`${variantClass} ${className}`}>{children}</span>;
  }

  // Fallback for custom theme colors (cyan, amber, etc.)
  return (
    <span
      className={className}
      style={{
        background: `linear-gradient(135deg, var(--accent-${variant}), #ffffff)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  );
}
