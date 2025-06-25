import React from 'react';
import { IconButton } from '@/components/ui';

export interface ModalFAQButtonProps {
  onClick: () => void;
  icon: React.ReactElement;
  'aria-label': string;
  className?: string;
  isDisabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
}

export const ModalFAQButton: React.FC<ModalFAQButtonProps> = ({
  onClick,
  icon,
  className,
  ...props
}) => {
  return (
    <IconButton
      icon={icon}
      size="sm"
      variant="ghost"
      isRound={true}
      className={`absolute left-2.5 bottom-2.5 hover:bg-black/10 dark:hover:bg-white/10 ${className || ''}`}
      onClick={onClick}
      {...props}
    />
  );
};
