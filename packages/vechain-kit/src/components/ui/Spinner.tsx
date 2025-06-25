import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, SizeVariant } from './types';

export interface SpinnerProps extends BaseProps, SizeVariant {
  color?: 'primary' | 'secondary' | 'white';
}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };
  return size ? sizeMap[size] : sizeMap.md;
};

const getColorClass = (color?: 'primary' | 'secondary' | 'white') => {
  const colorMap = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
  };
  return color ? colorMap[color] : colorMap.primary;
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', color = 'primary' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin',
          getSizeClass(size),
          className
        )}
        role="status"
        aria-label="Loading"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          className={cn('w-full h-full', getColorClass(color))}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';