import React from 'react';
import { cn } from '@/utils/tailwind';

export interface WrapProps {
  children: React.ReactNode;
  spacing?: number | string;
  spacingX?: number | string;
  spacingY?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  className?: string;
}

export interface WrapItemProps {
  children: React.ReactNode;
  className?: string;
}

const getSpacingClass = (spacing: number | string | undefined) => {
  if (spacing === undefined) return '';
  
  if (typeof spacing === 'number') {
    // Convert number to rem spacing (assuming 1 = 0.25rem like Tailwind)
    const spacingMap: Record<number, string> = {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2', 
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    };
    return spacingMap[spacing] || 'gap-4';
  }
  
  // Handle string values
  return `gap-[${spacing}]`;
};

const getAlignClass = (align: string) => {
  const alignMap = {
    start: 'items-start',
    center: 'items-center', 
    end: 'items-end',
    stretch: 'items-stretch',
  };
  return alignMap[align as keyof typeof alignMap] || '';
};

const getJustifyClass = (justify: string) => {
  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end', 
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  };
  return justifyMap[justify as keyof typeof justifyMap] || '';
};

export const Wrap: React.FC<WrapProps> = ({
  children,
  spacing = 2,
  spacingX,
  spacingY,
  align = 'start',
  justify = 'start',
  className,
  ...props
}) => {
  // Use spacingX/spacingY if provided, otherwise fall back to spacing
  const gapX = spacingX !== undefined ? getSpacingClass(spacingX).replace('gap-', 'gap-x-') : '';
  const gapY = spacingY !== undefined ? getSpacingClass(spacingY).replace('gap-', 'gap-y-') : '';
  const gap = (spacingX === undefined && spacingY === undefined) ? getSpacingClass(spacing) : '';

  return (
    <div
      className={cn(
        'flex flex-wrap',
        gap,
        gapX,
        gapY,
        getAlignClass(align),
        getJustifyClass(justify),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const WrapItem: React.FC<WrapItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex-shrink-0', className)} {...props}>
      {children}
    </div>
  );
};