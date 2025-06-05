import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-5xl',
    wide: 'max-w-6xl',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}
