import { ReactNode } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface SizeVariant {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface ColorVariant {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost' | 'link';
}

export interface LoadingState {
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface FlexProps {
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: number | string;
  wrap?: boolean;
}