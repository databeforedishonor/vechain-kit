import React, { forwardRef } from 'react';
import { cn } from '@/utils/tailwind';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  isExternal = false,
  className,
  children,
  ...props
}, ref) => {
  const externalProps = isExternal ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  return (
    <a
      ref={ref}
      className={cn(
        'text-blue-600 dark:text-blue-400',
        'hover:text-blue-800 dark:hover:text-blue-300',
        'transition-colors duration-200',
        'underline decoration-blue-600/30 hover:decoration-blue-600',
        'dark:decoration-blue-400/30 dark:hover:decoration-blue-400',
        className
      )}
      {...externalProps}
      {...props}
    >
      {children}
      {isExternal && (
        <svg 
          className="inline-block w-3 h-3 ml-1" 
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
});

Link.displayName = 'Link';