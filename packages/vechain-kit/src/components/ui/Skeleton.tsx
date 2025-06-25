import React from 'react';
import { cn } from '@/utils/tailwind';

export interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  isLoaded?: boolean;
  children?: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height = '20px',
  width = '100%',
  isLoaded = false,
  children,
  className,
  borderRadius = '4px',
  ...props
}) => {
  const heightValue = typeof height === 'number' ? `${height}px` : height;
  const widthValue = typeof width === 'number' ? `${width}px` : width;

  if (isLoaded && children) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        className
      )}
      style={{
        height: heightValue,
        width: widthValue,
        borderRadius,
      }}
      {...props}
    />
  );
};