import React, { useState, forwardRef } from 'react';
import { cn } from '@/utils/tailwind';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
  fallbackSrc?: string;
  loading?: 'eager' | 'lazy';
  ignoreFallback?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({
  fallback,
  fallbackSrc,
  loading = 'lazy',
  ignoreFallback = false,
  className,
  onLoad,
  onError,
  ...props
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Show fallback if there's an error and we have a fallback
  if (hasError && !ignoreFallback) {
    if (fallbackSrc) {
      return (
        <img
          ref={ref}
          {...props}
          src={fallbackSrc}
          className={cn('object-cover', className)}
          loading={loading}
        />
      );
    }
    if (fallback) {
      return <>{fallback}</>;
    }
  }

  return (
    <>
      <img
        ref={ref}
        {...props}
        className={cn(
          'object-cover transition-opacity duration-300',
          !isLoaded && !ignoreFallback ? 'opacity-0' : 'opacity-100',
          className
        )}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
      {!isLoaded && !hasError && !ignoreFallback && (
        <div className={cn(
          'absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse',
          'flex items-center justify-center',
          className
        )}>
          <div className="w-6 h-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        </div>
      )}
    </>
  );
});

Image.displayName = 'Image';