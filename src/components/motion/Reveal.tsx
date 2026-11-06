import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={{ y: reduced ? 0 : 18 }}
      whileInView={{ y: 0 }}
      transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.12 }}
    >
      {children}
    </m.div>
  );
}
