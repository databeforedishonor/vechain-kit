import { SVGAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, SizeVariant } from './types';

export interface IconProps extends Omit<SVGAttributes<SVGElement>, 'children'>, BaseProps, SizeVariant {
  children?: ReactNode;
  as?: React.ComponentType<any>;
}

const getSizeClass = (size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };
  return size ? sizeMap[size] : sizeMap.md;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ children, className, size = 'md', as: Component, ...props }, ref) => {
    if (Component) {
      return (
        <Component
          ref={ref}
          className={cn(
            'inline-block',
            getSizeClass(size),
            className
          )}
          {...props}
        />
      );
    }

    return (
      <svg
        ref={ref}
        className={cn(
          'inline-block fill-current',
          getSizeClass(size),
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';