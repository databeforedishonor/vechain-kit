import React from 'react';
import { cn } from '@/utils/tailwind';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const cardVariants = {
  elevated: 'bg-white dark:bg-gray-800 shadow-lg border-0',
  outline: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  filled: 'bg-gray-50 dark:bg-gray-900 border-0',
};

const cardSizes = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-lg',
        cardVariants[variant],
        cardSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('mb-4 last:mb-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('flex-1', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('mt-4 first:mt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
};