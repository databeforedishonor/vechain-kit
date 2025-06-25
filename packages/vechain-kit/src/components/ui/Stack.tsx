import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/tailwind';

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  spacing?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

// VStack - Vertical Stack
const VStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = 4, align = 'stretch', justify = 'start', wrap = false, ...props }, ref) => {
    const alignClasses = {
      start: 'items-start',
      center: 'items-center', 
      end: 'items-end',
      stretch: 'items-stretch',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const spacingClass = typeof spacing === 'number' ? `space-y-${spacing}` : spacing;

    return (
      <div
        className={cn(
          'flex flex-col',
          alignClasses[align],
          justifyClasses[justify],
          spacingClass,
          wrap && 'flex-wrap',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

// HStack - Horizontal Stack  
const HStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = 4, align = 'center', justify = 'start', wrap = false, ...props }, ref) => {
    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end', 
      stretch: 'items-stretch',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const spacingClass = typeof spacing === 'number' ? `space-x-${spacing}` : spacing;

    return (
      <div
        className={cn(
          'flex flex-row',
          alignClasses[align],
          justifyClasses[justify],
          spacingClass,
          wrap && 'flex-wrap',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

// Generic Stack component
const Stack = VStack;

VStack.displayName = 'VStack';
HStack.displayName = 'HStack';
Stack.displayName = 'Stack';

export { VStack, HStack, Stack };