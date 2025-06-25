import React from 'react';
import { cn } from '@/utils/tailwind';

export interface AlertProps {
  status?: 'info' | 'warning' | 'success' | 'error';
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent';
  children: React.ReactNode;
  className?: string;
}

export interface AlertIconProps {
  className?: string;
}

export interface AlertTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const getAlertClasses = (status: string, variant: string) => {
  const statusColors = {
    info: {
      subtle: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-200',
      solid: 'bg-blue-500 border-blue-500 text-white',
      'left-accent': 'bg-blue-50 border-l-4 border-l-blue-400 border-blue-200 text-blue-800 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-200',
      'top-accent': 'bg-blue-50 border-t-4 border-t-blue-400 border-blue-200 text-blue-800 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-200',
    },
    warning: {
      subtle: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-200',
      solid: 'bg-yellow-500 border-yellow-500 text-white',
      'left-accent': 'bg-yellow-50 border-l-4 border-l-yellow-400 border-yellow-200 text-yellow-800 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-200',
      'top-accent': 'bg-yellow-50 border-t-4 border-t-yellow-400 border-yellow-200 text-yellow-800 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-200',
    },
    success: {
      subtle: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/50 dark:border-green-800 dark:text-green-200',
      solid: 'bg-green-500 border-green-500 text-white',
      'left-accent': 'bg-green-50 border-l-4 border-l-green-400 border-green-200 text-green-800 dark:bg-green-950/50 dark:border-green-800 dark:text-green-200',
      'top-accent': 'bg-green-50 border-t-4 border-t-green-400 border-green-200 text-green-800 dark:bg-green-950/50 dark:border-green-800 dark:text-green-200',
    },
    error: {
      subtle: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-200',
      solid: 'bg-red-500 border-red-500 text-white',
      'left-accent': 'bg-red-50 border-l-4 border-l-red-400 border-red-200 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-200',
      'top-accent': 'bg-red-50 border-t-4 border-t-red-400 border-red-200 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-200',
    },
  };

  return statusColors[status as keyof typeof statusColors]?.[variant as keyof typeof statusColors.info] || statusColors.info.subtle;
};

const getStatusIcon = (status: string) => {
  const icons = {
    info: '💬',
    warning: '⚠️', 
    success: '✅',
    error: '❌',
  };
  return icons[status as keyof typeof icons] || icons.info;
};

export const Alert: React.FC<AlertProps> = ({
  status = 'info',
  variant = 'subtle',
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex p-4 rounded-md border',
        getAlertClasses(status, variant),
        className
      )}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertIcon: React.FC<AlertIconProps> = ({ className }) => {
  return (
    <span className={cn('mr-3 text-lg', className)}>
      {/* Icon will be determined by parent Alert status */}
    </span>
  );
};

export const AlertTitle: React.FC<AlertTitleProps> = ({ children, className }) => {
  return (
    <h4 className={cn('font-semibold mb-1', className)}>
      {children}
    </h4>
  );
};

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, className }) => {
  return (
    <div className={cn('text-sm', className)}>
      {children}
    </div>
  );
};