import React from 'react';
import { HStack, Circle } from '@/components/ui';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface SocialIconsProps {
  icons?: React.ReactNode[];
  size?: string;
  spacing?: number;
  className?: string;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
  icons = [],
  size = '32px',
  spacing = 2,
  className,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (icons.length === 0) return null;

  return (
    <HStack spacing={spacing} className={className} {...props}>
      {icons.map((icon, index) => (
        <Circle 
          key={index} 
          size={isMobile ? '28px' : size} 
          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        >
          {icon}
        </Circle>
      ))}
    </HStack>
  );
};
