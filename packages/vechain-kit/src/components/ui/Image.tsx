import { ImgHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, BaseProps {
  fallback?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const getObjectFitClass = (objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down') => {
  const objectFitMap = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };
  return objectFit ? objectFitMap[objectFit] : '';
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, objectFit, fallback, onError, ...props }, ref) => {
    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (fallback) {
        e.currentTarget.src = fallback;
      }
      onError?.(e);
    };

    return (
      <img
        ref={ref}
        className={cn(
          'max-w-full h-auto',
          getObjectFitClass(objectFit),
          className
        )}
        onError={handleError}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';