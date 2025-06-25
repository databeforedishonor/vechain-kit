import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, SizeVariant, ColorVariant, LoadingState } from './types';

export interface IconButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
    BaseProps, 
    SizeVariant, 
    ColorVariant, 
    LoadingState {
  icon?: React.ReactNode;
  'aria-label': string; // Required for accessibility
}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const sizeMap = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4',
  };
  return size ? sizeMap[size] : sizeMap.md;
};

const getVariantClass = (variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' | 'link') => {
  const variantMap = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border border-transparent',
    success: 'bg-green-600 hover:bg-green-700 text-white border border-transparent',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white border border-transparent',
    error: 'bg-red-600 hover:bg-red-700 text-white border border-transparent',
    outline: 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent',
    link: 'bg-transparent hover:underline text-blue-600 dark:text-blue-400 border border-transparent',
  };
  return variant ? variantMap[variant] : variantMap.ghost;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    size = 'md',
    variant = 'ghost',
    icon,
    isLoading,
    isDisabled,
    disabled,
    children,
    ...props 
  }, ref) => {
    const isButtonDisabled = isDisabled || disabled || isLoading;
    
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          getSizeClass(size),
          getVariantClass(variant),
          className
        )}
        disabled={isButtonDisabled}
        {...props}
      >
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
        ) : (
          icon || children
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';