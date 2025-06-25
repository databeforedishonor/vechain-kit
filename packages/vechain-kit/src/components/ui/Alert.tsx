import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  status?: 'success' | 'error' | 'warning' | 'info';
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent';
}

const getStatusClass = (status?: 'success' | 'error' | 'warning' | 'info', variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent') => {
  const statusMap = {
    success: {
      subtle: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      solid: 'bg-green-600 border-green-600 text-white',
      'left-accent': 'bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      'top-accent': 'bg-green-50 dark:bg-green-900/20 border-t-4 border-t-green-500 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    },
    error: {
      subtle: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
      solid: 'bg-red-600 border-red-600 text-white',
      'left-accent': 'bg-red-50 dark:bg-red-900/20 border-l-4 border-l-red-500 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
      'top-accent': 'bg-red-50 dark:bg-red-900/20 border-t-4 border-t-red-500 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    },
    warning: {
      subtle: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
      solid: 'bg-yellow-600 border-yellow-600 text-white',
      'left-accent': 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-l-yellow-500 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
      'top-accent': 'bg-yellow-50 dark:bg-yellow-900/20 border-t-4 border-t-yellow-500 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    },
    info: {
      subtle: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
      solid: 'bg-blue-600 border-blue-600 text-white',
      'left-accent': 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
      'top-accent': 'bg-blue-50 dark:bg-blue-900/20 border-t-4 border-t-blue-500 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    },
  };
  
  const currentStatus = status || 'info';
  const currentVariant = variant || 'subtle';
  return statusMap[currentStatus][currentVariant];
};

const getIconForStatus = (status?: 'success' | 'error' | 'warning' | 'info') => {
  const iconMap = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };
  
  return iconMap[status || 'info'];
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ children, className, status = 'info', variant = 'subtle', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-4 rounded-md border flex items-start space-x-3',
          getStatusClass(status, variant),
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex-shrink-0">
          {getIconForStatus(status)}
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// AlertIcon component for backward compatibility
export const AlertIcon = ({ className }: { className?: string }) => {
  return <span className={cn('inline-block', className)} />;
};