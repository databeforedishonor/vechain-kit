import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, SizeVariant, ColorVariant, LoadingState } from './types';

export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
    BaseProps, 
    SizeVariant, 
    ColorVariant, 
    LoadingState {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isFullWidth?: boolean;
}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const sizeMap = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
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
    link: 'bg-transparent hover:underline text-blue-600 dark:text-blue-400 border border-transparent p-0',
  };
  return variant ? variantMap[variant] : variantMap.primary;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    size = 'md',
    variant = 'primary',
    leftIcon,
    rightIcon,
    isLoading,
    isDisabled,
    isFullWidth,
    disabled,
    ...props 
  }, ref) => {
    const isButtonDisabled = isDisabled || disabled || isLoading;
    
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          getSizeClass(size),
          getVariantClass(variant),
          isFullWidth && 'w-full',
          className
        )}
        disabled={isButtonDisabled}
        {...props}
      >
        {isLoading && (
          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
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
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';