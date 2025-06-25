import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  variant?: 'outline' | 'filled' | 'elevated';
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement>, BaseProps {}

const getVariantClass = (variant?: 'outline' | 'filled' | 'elevated') => {
  const variantMap = {
    outline: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
    filled: 'bg-gray-50 dark:bg-gray-800 border border-transparent',
    elevated: 'bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700',
  };
  return variant ? variantMap[variant] : variantMap.outline;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'outline', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          getVariantClass(variant),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';