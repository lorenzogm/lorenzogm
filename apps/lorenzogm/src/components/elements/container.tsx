import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: "default" | "wide" | "narrow";
}

export function Container({
  children,
  className = "",
  size = "default",
  as: Component = "div",
  fullWidth = false,
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-5xl",
    wide: "max-w-6xl",
  };

  if (fullWidth) {
    return (
      <Component className={className}>
        <div className={`${sizeClasses[size]} mx-auto px-4`}>{children}</div>
      </Component>
    );
  }

  return (
    <Component className={`${sizeClasses[size]} mx-auto px-4 ${className}`}>
      {children}
    </Component>
  );
}
