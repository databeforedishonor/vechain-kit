import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  height?: string | number;
  width?: string | number;
  isLoaded?: boolean;
  children?: React.ReactNode;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, height, width, isLoaded, children, style, ...props }, ref) => {
    if (isLoaded && children) {
      return <>{children}</>;
    }

    const skeletonStyle = {
      height,
      width,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
          className
        )}
        style={skeletonStyle}
        aria-label="Loading..."
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';