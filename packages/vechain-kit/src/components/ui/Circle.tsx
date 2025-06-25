import React from 'react';
import { cn } from '@/utils/tailwind';

export interface CircleProps {
  size?: string | number;
  children?: React.ReactNode;
  className?: string;
  bg?: string;
  color?: string;
  style?: React.CSSProperties;
}

export const Circle: React.FC<CircleProps> = ({
  size = '40px',
  children,
  className,
  bg = 'bg-gray-200 dark:bg-gray-700',
  color = 'text-gray-700 dark:text-gray-300',
  style,
  ...props
}) => {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full flex-shrink-0',
        bg,
        color,
        className
      )}
      style={{
        width: sizeValue,
        height: sizeValue,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};