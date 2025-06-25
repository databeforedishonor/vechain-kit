import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, BaseProps {}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Box.displayName = 'Box';