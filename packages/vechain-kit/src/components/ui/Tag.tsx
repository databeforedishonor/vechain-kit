import React from 'react';
import { cn } from '@/utils/tailwind';

export interface TagProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'subtle' | 'outline';
  colorScheme?: 'blue' | 'green' | 'red' | 'gray' | 'yellow' | 'purple';
  className?: string;
  children: React.ReactNode;
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
      outline: 'border border-gray-400 text-gray-600 dark:text-gray-400 bg-transparent',
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

  return colorMap[colorScheme as keyof typeof colorMap]?.[variant as keyof typeof colorMap['blue']] || '';
};

export const Tag: React.FC<TagProps> = ({
  size = 'md',
  variant = 'subtle',
  colorScheme = 'gray',
  className,
  children,
}) => {
  const variantClasses = getTagClasses(variant, colorScheme);

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium',
        tagSizes[size],
        variantClasses,
        className
      )}
    >
      {children}
    </span>
  );
};