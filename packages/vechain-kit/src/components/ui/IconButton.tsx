import React, { forwardRef } from 'react';
import { cn } from '@/utils/tailwind';

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
  colorScheme?: 'blue' | 'green' | 'red' | 'gray' | 'yellow' | 'purple';
  isRound?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  'aria-label': string;
  icon?: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
}

const iconButtonSizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

const getVariantClasses = (variant: string, colorScheme: string) => {
  const colorMap = {
    blue: {
      solid: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500',
      outline: 'border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
      ghost: 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    green: {
      solid: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
      outline: 'border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
      ghost: 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20',
    },
    red: {
      solid: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
      outline: 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
      ghost: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20',
    },
    gray: {
      solid: 'bg-gray-500 hover:bg-gray-600 text-white border-gray-500',
      outline: 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
      ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
    },
    yellow: {
      solid: 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500',
      outline: 'border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
      ghost: 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
    },
    purple: {
      solid: 'bg-purple-500 hover:bg-purple-600 text-white border-purple-500',
      outline: 'border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20',
      ghost: 'text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20',
    },
  };

  return colorMap[colorScheme as keyof typeof colorMap]?.[variant as keyof typeof colorMap['blue']] || '';
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({
  size = 'md',
  variant = 'solid',
  colorScheme = 'gray',
  isRound = false,
  isLoading = false,
  isDisabled = false,
  icon,
  children,
  className,
  ...props
}, ref) => {
  const variantClasses = getVariantClasses(variant, colorScheme);

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        iconButtonSizes[size],
        isRound ? 'rounded-full' : 'rounded-md',
        variant === 'outline' ? 'border' : 'border-0',
        variantClasses,
        className
      )}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-transparent border-t-current" />
      ) : (
        icon || children
      )}
    </button>
  );
});

IconButton.displayName = 'IconButton';