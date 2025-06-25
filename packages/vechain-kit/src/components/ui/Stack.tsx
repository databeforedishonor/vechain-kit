import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps, FlexProps } from './types';

export interface StackProps extends HTMLAttributes<HTMLDivElement>, BaseProps, FlexProps {
  spacing?: number | string;
}

const getSpacingClass = (spacing?: number | string) => {
  if (!spacing) return '';
  if (typeof spacing === 'number') {
    const spacingMap: Record<number, string> = {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
    };
    return spacingMap[spacing] || `gap-${spacing}`;
  }
  return `gap-${spacing}`;
};

const getDirectionClass = (direction?: 'row' | 'column') => {
  return direction === 'column' ? 'flex-col' : 'flex-row';
};

const getAlignClass = (align?: 'start' | 'center' | 'end' | 'stretch') => {
  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  return align ? alignMap[align] : '';
};

const getJustifyClass = (justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly') => {
  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };
  return justify ? justifyMap[justify] : '';
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, className, direction = 'column', align, justify, spacing, wrap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          getDirectionClass(direction),
          getAlignClass(align),
          getJustifyClass(justify),
          getSpacingClass(spacing),
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

// Vertical Stack
export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        direction="column"
        className={className}
        {...props}
      >
        {children}
      </Stack>
    );
  }
);

VStack.displayName = 'VStack';

// Horizontal Stack
export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        direction="row"
        className={className}
        {...props}
      >
        {children}
      </Stack>
    );
  }
);

HStack.displayName = 'HStack';