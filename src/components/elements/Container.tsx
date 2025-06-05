import { ReactNode, ElementType } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
  as?: ElementType;
}

export function Container({ 
  children, 
  className = '', 
  size = 'default',
  as: Component = 'div'
}: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-5xl',
    wide: 'max-w-6xl',
  };

  return (
    <Component className={`${sizeClasses[size]} mx-auto px-4 ${className}`}>
      {children}
    </Component>
  );
}
