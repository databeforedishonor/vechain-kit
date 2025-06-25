import React, { forwardRef } from 'react';
import { cn } from '@/utils/tailwind';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'gray';
  isInvalid?: boolean;
  isIndeterminate?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const checkboxSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const getColorClasses = (colorScheme: string, isChecked: boolean) => {
  if (!isChecked) return 'border-gray-300 dark:border-gray-600';
  
  const colorMap = {
    blue: 'bg-blue-500 border-blue-500',
    green: 'bg-green-500 border-green-500',
    red: 'bg-red-500 border-red-500',
    gray: 'bg-gray-500 border-gray-500',
  };
  
  return colorMap[colorScheme as keyof typeof colorMap] || colorMap.blue;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  size = 'md',
  colorScheme = 'blue',
  isInvalid = false,
  isIndeterminate = false,
  children,
  className,
  checked,
  ...props
}, ref) => {
  const isChecked = checked || isIndeterminate;

  return (
    <label className={cn(
      'flex items-center gap-2 cursor-pointer',
      props.disabled && 'cursor-not-allowed opacity-50',
      className
    )}>
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            'appearance-none border-2 rounded transition-colors duration-200',
            'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            checkboxSizes[size],
            getColorClasses(colorScheme, !!isChecked),
            isInvalid && 'border-red-500',
            props.disabled && 'cursor-not-allowed'
          )}
          checked={checked}
          {...props}
        />
        {isChecked && (
          <div className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-none',
            'text-white text-xs'
          )}>
            {isIndeterminate ? '−' : '✓'}
          </div>
        )}
      </div>
      {children && (
        <span className={cn(
          'text-gray-700 dark:text-gray-300',
          props.disabled && 'opacity-50'
        )}>
          {children}
        </span>
      )}
    </label>
  );
});