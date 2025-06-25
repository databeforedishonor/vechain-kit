import React, { forwardRef } from 'react';
import { cn } from '@/utils/tailwind';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'unstyled';
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
}

const inputSizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const inputVariants = {
  outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800',
  filled: 'border-0 bg-gray-100 dark:bg-gray-700',
  unstyled: 'border-0 bg-transparent',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  variant = 'outline',
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
  className,
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-md transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
        'text-gray-900 dark:text-white',
        inputSizes[size],
        inputVariants[variant],
        isInvalid && 'border-red-500 focus:ring-red-500',
        isDisabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700',
        isReadOnly && 'cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      readOnly={isReadOnly}
      {...props}
    />
  );
});

Input.displayName = 'Input';