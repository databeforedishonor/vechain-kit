import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/tailwind';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'error' | 'success' | 'primary';
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ 
    className, 
    as: Component = 'p', 
    size = 'md',
    weight = 'normal',
    color = 'default',
    ...props 
  }, ref) => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const colors = {
      default: 'text-gray-900 dark:text-gray-100',
      muted: 'text-gray-500 dark:text-gray-400',
      error: 'text-red-600 dark:text-red-400',
      success: 'text-green-600 dark:text-green-400',
      primary: 'text-blue-600 dark:text-blue-400',
    };

    const Comp = Component as any;
    
    return (
      <Comp
        className={cn(
          sizes[size],
          weights[weight],
          colors[color],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text };