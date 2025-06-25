import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  centerContent?: boolean;
}

const getMaxWidthClass = (maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full') => {
  const maxWidthMap = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };
  return maxWidth ? maxWidthMap[maxWidth] : maxWidthMap.full;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, maxWidth = 'full', centerContent = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          getMaxWidthClass(maxWidth),
          centerContent && 'mx-auto px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';