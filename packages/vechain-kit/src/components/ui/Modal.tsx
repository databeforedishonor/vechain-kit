import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/tailwind';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  isCentered?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventScrolling?: boolean;
  className?: string;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
  onClick?: () => void;
  backdropFilter?: string;
  className?: string;
}

export interface ModalContentProps {
  children: React.ReactNode;
  size?: ModalProps['size'];
  className?: string;
}

const modalSizes = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  full: 'max-w-full',
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ 
  children, 
  onClick, 
  backdropFilter = 'blur(4px)',
  className 
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black/50',
        className
      )}
      style={{ backdropFilter }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const ModalContent: React.FC<ModalContentProps> = ({ 
  children, 
  size = 'md',
  className 
}) => {
  return (
    <div
      className={cn(
        'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl',
        'mx-4 my-8 w-full max-h-[calc(100vh-2rem)] overflow-hidden',
        modalSizes[size],
        'md:mx-0', // Remove horizontal margin on mobile
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  isCentered = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventScrolling = true,
  className,
}) => {
  const previousFocusRef = useRef<HTMLElement>();

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Prevent scrolling
      if (preventScrolling) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      // Restore scrolling
      if (preventScrolling) {
        document.body.style.overflow = '';
      }
      
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      if (preventScrolling) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, preventScrolling]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <ModalOverlay 
      onClick={closeOnOverlayClick ? onClose : undefined}
      className={cn(
        isCentered ? 'items-center' : 'items-start pt-20',
        className
      )}
    >
      <ModalContent size={size}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );

  // Render in portal
  const modalRoot = document.getElementById('modal-root') || document.body;
  return createPortal(modalContent, modalRoot);
};

// Header component for modals
export interface ModalHeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  onClose,
  showCloseButton = true,
  className,
}) => {
  return (
    <div className={cn(
      'flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700',
      className
    )}>
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        {children}
      </div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

// Body component for modals
export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  return (
    <div className={cn('p-6 overflow-y-auto', className)}>
      {children}
    </div>
  );
};

// Footer component for modals
export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700',
      className
    )}>
      {children}
    </div>
  );
};