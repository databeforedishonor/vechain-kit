import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, BaseProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl') => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };
  return size ? sizeMap[size] : 'text-2xl';
};

const getFontWeightClass = (fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold') => {
  const weightMap = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  return fontWeight ? weightMap[fontWeight] : 'font-semibold';
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className, as = 'h2', size, fontWeight, ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref}
        className={cn(
          'text-gray-900 dark:text-white',
          getSizeClass(size),
          getFontWeightClass(fontWeight),
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';