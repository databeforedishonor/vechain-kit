import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { BaseProps } from './types';

export interface GridProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  cols?: number | 'auto' | 'fit';
  gap?: number | string;
  rows?: number | 'auto' | 'fit';
}

export interface GridItemProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  colSpan?: number | 'full';
  rowSpan?: number | 'full';
}

const getColsClass = (cols?: number | 'auto' | 'fit') => {
  if (typeof cols === 'number') {
    const colsMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    };
    return colsMap[cols] || `grid-cols-${cols}`;
  }
  if (cols === 'auto') return 'grid-cols-auto';
  if (cols === 'fit') return 'grid-cols-fit';
  return '';
};

const getRowsClass = (rows?: number | 'auto' | 'fit') => {
  if (typeof rows === 'number') {
    const rowsMap: Record<number, string> = {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
    };
    return rowsMap[rows] || `grid-rows-${rows}`;
  }
  if (rows === 'auto') return 'grid-rows-auto';
  if (rows === 'fit') return 'grid-rows-fit';
  return '';
};

const getGapClass = (gap?: number | string) => {
  if (!gap) return '';
  if (typeof gap === 'number') {
    const gapMap: Record<number, string> = {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
    };
    return gapMap[gap] || `gap-${gap}`;
  }
  return `gap-${gap}`;
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, cols, rows, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          getColsClass(cols),
          getRowsClass(rows),
          getGapClass(gap),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

const getColSpanClass = (colSpan?: number | 'full') => {
  if (colSpan === 'full') return 'col-span-full';
  if (typeof colSpan === 'number') {
    const colSpanMap: Record<number, string> = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
      8: 'col-span-8',
      9: 'col-span-9',
      10: 'col-span-10',
      11: 'col-span-11',
      12: 'col-span-12',
    };
    return colSpanMap[colSpan] || `col-span-${colSpan}`;
  }
  return '';
};

const getRowSpanClass = (rowSpan?: number | 'full') => {
  if (rowSpan === 'full') return 'row-span-full';
  if (typeof rowSpan === 'number') {
    const rowSpanMap: Record<number, string> = {
      1: 'row-span-1',
      2: 'row-span-2',
      3: 'row-span-3',
      4: 'row-span-4',
      5: 'row-span-5',
      6: 'row-span-6',
    };
    return rowSpanMap[rowSpan] || `row-span-${rowSpan}`;
  }
  return '';
};

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ children, className, colSpan, rowSpan, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          getColSpanClass(colSpan),
          getRowSpanClass(rowSpan),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';