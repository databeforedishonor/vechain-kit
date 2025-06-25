import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, SizeVariant } from './types';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, BaseProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'filled';
  isInvalid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const sizeMap = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
    xl: 'px-6 py-4 text-lg',
  };
  return size ? sizeMap[size] : sizeMap.md;
};

const getVariantClass = (variant?: 'outline' | 'filled', isInvalid?: boolean) => {
  if (isInvalid) {
    return 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500';
  }
  
  const variantMap = {
    outline: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500',
    filled: 'border-transparent bg-gray-100 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800',
  };
  return variant ? variantMap[variant] : variantMap.outline;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    size = 'md',
    variant = 'outline',
    isInvalid,
    leftIcon,
    rightIcon,
    ...props 
  }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'block w-full rounded-md border text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
              getSizeClass(size),
              getVariantClass(variant, isInvalid),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={cn(
          'block w-full rounded-md border text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          getSizeClass(size),
          getVariantClass(variant, isInvalid),
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';