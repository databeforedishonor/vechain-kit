import React from 'react';
import { cn } from '@/utils/tailwind';

export interface GridProps {
  children: React.ReactNode;
  templateColumns?: string;
  templateRows?: string;
  gap?: number | string;
  className?: string;
}

export interface GridItemProps {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  templateColumns,
  templateRows,
  gap = '1rem',
  className,
  ...props
}) => {
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;

  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        gap: gapValue,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan,
  rowSpan,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        colSpan && `col-span-${colSpan}`,
        rowSpan && `row-span-${rowSpan}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};