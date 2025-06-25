import React from 'react';
import { cn } from '@/utils/tailwind';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  thickness?: number;
  className?: string;
}

const spinnerSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'currentColor',
  thickness = 2,
  className 
}) => {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-transparent',
        spinnerSizes[size],
        className
      )}
      style={{
        borderTopColor: color,
        borderWidth: `${thickness}px`,
      }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};