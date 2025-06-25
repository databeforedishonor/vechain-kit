import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseProps {
  isInvalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, isInvalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          'h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2',
          isInvalid && 'border-red-300 text-red-600 focus:ring-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';