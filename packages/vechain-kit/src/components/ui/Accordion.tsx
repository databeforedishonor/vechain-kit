import React, { useState, createContext, useContext } from 'react';
import { cn } from '@/utils/tailwind';

export interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  allowToggle?: boolean;
  defaultIndex?: number | number[];
  className?: string;
}

export interface AccordionItemProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: string;
}

export interface AccordionButtonProps {
  children: React.ReactNode;
  className?: string;
}

export interface AccordionPanelProps {
  children: React.ReactNode;
  className?: string;
}

export interface AccordionIconProps {
  className?: string;
}

interface AccordionContextType {
  expandedItems: Set<number>;
  toggleItem: (index: number) => void;
  allowMultiple: boolean;
}

interface AccordionItemContextType {
  isExpanded: boolean;
  toggle: () => void;
  isDisabled: boolean;
  index: number;
}

const AccordionContext = createContext<AccordionContextType | null>(null);
const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  allowToggle = true,
  defaultIndex,
  className,
  ...props
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(() => {
    const initialSet = new Set<number>();
    if (defaultIndex !== undefined) {
      if (Array.isArray(defaultIndex)) {
        defaultIndex.forEach(index => initialSet.add(index));
      } else {
        initialSet.add(defaultIndex);
      }
    }
    return initialSet;
  });

  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(index)) {
        if (allowToggle) {
          newSet.delete(index);
        }
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(index);
      }
      
      return newSet;
    });
  };

  const contextValue: AccordionContextType = {
    expandedItems,
    toggleItem,
    allowMultiple,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn('border border-gray-200 dark:border-gray-700 rounded-md', className)} {...props}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...child.props, index });
          }
          return child;
        })}
      </div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem: React.FC<AccordionItemProps & { index?: number }> = ({
  children,
  isDisabled = false,
  className,
  index = 0,
  ...props
}) => {
  const accordionContext = useContext(AccordionContext);
  
  if (!accordionContext) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const { expandedItems, toggleItem } = accordionContext;
  const isExpanded = expandedItems.has(index);

  const toggle = () => {
    if (!isDisabled) {
      toggleItem(index);
    }
  };

  const contextValue: AccordionItemContextType = {
    isExpanded,
    toggle,
    isDisabled,
    index,
  };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <div 
        className={cn(
          'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
          className
        )} 
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionButton: React.FC<AccordionButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const itemContext = useContext(AccordionItemContext);
  
  if (!itemContext) {
    throw new Error('AccordionButton must be used within an AccordionItem');
  }

  const { toggle, isDisabled, isExpanded } = itemContext;

  return (
    <button
      type="button"
      className={cn(
        'w-full flex items-center justify-between p-4 text-left',
        'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
        isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        className
      )}
      onClick={toggle}
      disabled={isDisabled}
      aria-expanded={isExpanded}
      {...props}
    >
      {children}
    </button>
  );
};

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  children,
  className,
  ...props
}) => {
  const itemContext = useContext(AccordionItemContext);
  
  if (!itemContext) {
    throw new Error('AccordionPanel must be used within an AccordionItem');
  }

  const { isExpanded } = itemContext;

  if (!isExpanded) return null;

  return (
    <div 
      className={cn('p-4 pt-0', className)} 
      {...props}
    >
      {children}
    </div>
  );
};

export const AccordionIcon: React.FC<AccordionIconProps> = ({
  className,
  ...props
}) => {
  const itemContext = useContext(AccordionItemContext);
  
  if (!itemContext) {
    throw new Error('AccordionIcon must be used within an AccordionItem');
  }

  const { isExpanded } = itemContext;

  return (
    <svg
      className={cn(
        'w-5 h-5 transition-transform duration-200',
        isExpanded ? 'transform rotate-180' : '',
        className
      )}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
};