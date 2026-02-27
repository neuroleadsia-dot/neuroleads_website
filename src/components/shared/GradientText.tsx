import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`bg-gradient-to-r from-[#0066FF] to-[#00D4AA] bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}
