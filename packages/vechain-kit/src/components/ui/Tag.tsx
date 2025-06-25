import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, SizeVariant, ColorVariant } from './types';

export interface TagProps extends HTMLAttributes<HTMLSpanElement>, BaseProps, SizeVariant, ColorVariant {}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const sizeMap = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-sm',
    xl: 'px-4 py-2.5 text-base',
  };
  return size ? sizeMap[size] : sizeMap.md;
};

const getVariantClass = (variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' | 'link') => {
  const variantMap = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent',
    ghost: 'text-gray-600 dark:text-gray-400 bg-transparent',
    link: 'text-blue-600 dark:text-blue-400 bg-transparent hover:underline',
  };
  return variant ? variantMap[variant] : variantMap.secondary;
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ children, className, size = 'md', variant = 'secondary', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          getSizeClass(size),
          getVariantClass(variant),
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';