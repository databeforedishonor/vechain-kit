import { AnchorHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, BaseProps {
  variant?: 'default' | 'primary' | 'secondary' | 'muted';
  isExternal?: boolean;
  underline?: 'none' | 'hover' | 'always';
}

const getVariantClass = (variant?: 'default' | 'primary' | 'secondary' | 'muted') => {
  const variantMap = {
    default: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
    primary: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
    secondary: 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200',
    muted: 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
  };
  return variant ? variantMap[variant] : variantMap.default;
};

const getUnderlineClass = (underline?: 'none' | 'hover' | 'always') => {
  const underlineMap = {
    none: 'no-underline',
    hover: 'hover:underline',
    always: 'underline',
  };
  return underline ? underlineMap[underline] : underlineMap.hover;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    children, 
    className, 
    variant = 'default',
    isExternal,
    underline = 'hover',
    target,
    rel,
    ...props 
  }, ref) => {
    const linkTarget = isExternal ? '_blank' : target;
    const linkRel = isExternal ? 'noopener noreferrer' : rel;

    return (
      <a
        ref={ref}
        className={cn(
          'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded',
          getVariantClass(variant),
          getUnderlineClass(underline),
          className
        )}
        target={linkTarget}
        rel={linkRel}
        {...props}
      >
        {children}
        {isExternal && (
          <svg
            className="inline w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';