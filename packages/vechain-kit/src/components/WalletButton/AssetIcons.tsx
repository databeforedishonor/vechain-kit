import React from 'react';
import { HStack, Text, Circle, Image } from '@/components/ui';

export interface AssetIconsProps {
  assets?: Array<{
    icon?: string;
    symbol?: string;
    name?: string;
  }>;
  maxDisplay?: number;
  size?: string;
  className?: string;
  
  address?: string;
  maxIcons?: number;
  iconSize?: number;
  ml?: number;
  iconsGap?: number;
  rightIcon?: React.ReactNode;
  showNoAssetsWarning?: boolean;
  onClick?: () => void;
  style?: any;
}

export const AssetIcons: React.FC<AssetIconsProps> = ({
  assets = [],
  maxDisplay,
  size = '24px',
  className,
  
  address,
  maxIcons,
  iconSize,
  rightIcon,
  showNoAssetsWarning = false,
  onClick,
  
  ...props
}) => {
  const effectiveMaxDisplay = maxDisplay || maxIcons || 3;
  const effectiveSize = iconSize ? `${iconSize}px` : size;
  
  const effectiveAssets = assets.length > 0 ? assets : address ? [
    { symbol: 'VET', name: 'VeChain' },
    { symbol: 'VTHO', name: 'VeThor Token' },
  ] : [];

  const displayAssets = effectiveAssets.slice(0, effectiveMaxDisplay);
  const remainingCount = effectiveAssets.length - effectiveMaxDisplay;

  if (effectiveAssets.length === 0 && showNoAssetsWarning) {
    return (
      <HStack spacing={1} className={className} {...props}>
        <Text className="text-sm font-bold opacity-90">
          No assets
        </Text>
        {rightIcon}
      </HStack>
    );
  }

  if (effectiveAssets.length === 0) return null;

  return (
    <HStack spacing={1} className={className} onClick={onClick} {...props}>
      <HStack spacing={0}>
        {displayAssets.map((asset, index) => (
          <Circle 
            key={index} 
            size={effectiveSize} 
            className={`bg-gray-100 dark:bg-gray-700 border-2 border-black/10 ${index > 0 ? '-ml-2' : ''}`}
            style={{ zIndex: displayAssets.length - index }}
          >
            {asset.icon ? (
              <Image
                src={asset.icon}
                alt={asset.name || asset.symbol || ''}
                style={{ width: `${parseInt(effectiveSize) * 0.8}px`, height: `${parseInt(effectiveSize) * 0.8}px` }}
                className="rounded-full"
              />
            ) : (
              <Text className="text-xs font-bold">
                {(asset.symbol || asset.name || '?').slice(0, 3)}
              </Text>
            )}
          </Circle>
        ))}
        
        {remainingCount > 0 && (
          <Circle 
            size={effectiveSize} 
            className="bg-gray-200 dark:bg-gray-600 border-2 border-black/10 -ml-2"
            style={{ zIndex: 0 }}
          >
            <Text className="text-xs font-bold">
              +{remainingCount}
            </Text>
          </Circle>
        )}
      </HStack>
      
      {rightIcon}
    </HStack>
  );
};
