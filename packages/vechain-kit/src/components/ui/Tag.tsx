import React from 'react';
import { cn } from '@/utils/tailwind';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'subtle' | 'outline';
  colorScheme?: 'blue' | 'green' | 'red' | 'gray' | 'yellow' | 'purple';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const tagSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

const getTagClasses = (variant: string, colorScheme: string) => {
  const colorMap = {
    blue: {
      solid: 'bg-blue-500 text-white',
      subtle: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      outline: 'border border-blue-500 text-blue-500 bg-transparent',
    },
    green: {
      solid: 'bg-green-500 text-white',
      subtle: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      outline: 'border border-green-500 text-green-500 bg-transparent',
    },
    red: {
      solid: 'bg-red-500 text-white',
      subtle: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
      outline: 'border border-red-500 text-red-500 bg-transparent',
    },
    gray: {
      solid: 'bg-gray-500 text-white',
      subtle: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      outline: 'border border-gray-500 text-gray-500 bg-transparent',
    },
    yellow: {
      solid: 'bg-yellow-500 text-white',
      subtle: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
      outline: 'border border-yellow-500 text-yellow-500 bg-transparent',
    },
    purple: {
      solid: 'bg-purple-500 text-white',
      subtle: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      outline: 'border border-purple-500 text-purple-500 bg-transparent',
    },
  };

  return colorMap[colorScheme as keyof typeof colorMap]?.[variant as keyof typeof colorMap.blue] || colorMap.gray.subtle;
};

export const Tag: React.FC<TagProps> = ({
  size = 'sm',
  variant = 'subtle',
  colorScheme = 'gray',
  className,
  children,
  onClick,
  ...props
}) => {
  const Component = onClick ? 'button' : 'span';
  
  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        tagSizes[size],
        getTagClasses(variant, colorScheme),
        onClick && 'cursor-pointer hover:opacity-80',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};