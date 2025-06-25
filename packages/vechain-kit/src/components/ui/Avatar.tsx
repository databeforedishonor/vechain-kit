import { ImgHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, SizeVariant } from './types';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'>, BaseProps, SizeVariant {
  name?: string;
  showFallback?: boolean;
  fallbackSrc?: string;
}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const sizeMap = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };
  return size ? sizeMap[size] : sizeMap.md;
};

const getInitials = (name?: string) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ 
    className, 
    size = 'md',
    name,
    showFallback = true,
    fallbackSrc,
    src,
    alt,
    onError,
    ...props 
  }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [fallbackError, setFallbackError] = useState(false);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (!hasError && fallbackSrc) {
        setHasError(true);
        e.currentTarget.src = fallbackSrc;
      } else if (!fallbackError) {
        setFallbackError(true);
      }
      onError?.(e);
    };

    if ((hasError && fallbackError) || (!src && !fallbackSrc)) {
      return (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-gray-500 font-medium text-white',
            getSizeClass(size),
            className
          )}
        >
          {getInitials(name) || '?'}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        className={cn(
          'inline-block rounded-full object-cover',
          getSizeClass(size),
          className
        )}
        src={src}
        alt={alt || name || 'Avatar'}
        onError={handleError}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';