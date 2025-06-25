import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, SizeVariant } from './types';

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'color'>, BaseProps, SizeVariant {
  as?: 'p' | 'span' | 'div' | 'label';
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const sizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  return size ? sizeMap[size] : 'text-base';
};

const getFontWeightClass = (fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold') => {
  const weightMap = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  return fontWeight ? weightMap[fontWeight] : '';
};

const getColorClass = (color?: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error') => {
  const colorMap = {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
  };
  return color ? colorMap[color] : 'text-gray-900 dark:text-white';
};

const getAlignClass = (align?: 'left' | 'center' | 'right') => {
  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  return align ? alignMap[align] : '';
};

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    children, 
    className, 
    as = 'p', 
    size = 'md',
    fontWeight,
    color = 'primary',
    align,
    truncate,
    ...props 
  }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          getSizeClass(size),
          getFontWeightClass(fontWeight),
          getColorClass(color),
          getAlignClass(align),
          truncate && 'truncate',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';