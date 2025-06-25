import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes efficiently
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Common Tailwind CSS class combinations used throughout the kit
 */
export const tailwindClasses = {
  // Layout & Containers
  container: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
  card: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
  modal: 'bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700',
  
  // Flex & Grid
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexStart: 'flex items-center justify-start',
  stackVertical: 'flex flex-col',
  stackHorizontal: 'flex flex-row items-center',
  
  // Buttons
  button: {
    base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    size: {
      sm: 'h-8 px-3 py-1 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 py-3',
    }
  },
  
  // Text
  text: {
    heading: 'font-semibold text-gray-900 dark:text-gray-100',
    body: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    error: 'text-red-600 dark:text-red-400',
    success: 'text-green-600 dark:text-green-400',
  },
  
  // Inputs
  input: 'flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  
  // Animations
  animation: {
    fadeIn: 'animate-in fade-in-0 duration-200',
    slideIn: 'animate-in slide-in-from-bottom-4 duration-200',
    slideOut: 'animate-out slide-out-to-bottom-4 duration-150',
  },
  
  // States
  loading: 'opacity-50 pointer-events-none',
  disabled: 'opacity-50 cursor-not-allowed',
  
  // Spacing
  spacing: {
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  }
} as const;

/**
 * Responsive breakpoints for consistent usage
 */
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)', 
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const;

/**
 * VeChain brand colors as Tailwind classes
 */
export const vechainColors = {
  primary: 'text-blue-600 dark:text-blue-400',
  primaryBg: 'bg-blue-600 dark:bg-blue-500',
  primaryHover: 'hover:bg-blue-700 dark:hover:bg-blue-600',
  secondary: 'text-gray-600 dark:text-gray-400',
  secondaryBg: 'bg-gray-100 dark:bg-gray-800',
  accent: 'text-emerald-600 dark:text-emerald-400',
  accentBg: 'bg-emerald-100 dark:bg-emerald-900/20',
} as const;