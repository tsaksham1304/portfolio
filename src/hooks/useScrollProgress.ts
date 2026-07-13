import { useScroll } from 'framer-motion';
import type { RefObject } from 'react';

export function useScrollProgress(target?: RefObject<HTMLElement | null>) {
  const { scrollY, scrollYProgress } = useScroll(
    target
      ? { target, offset: ['start end', 'end start'] as unknown as undefined }
      : undefined,
  );

  return { scrollY, scrollYProgress };
}
