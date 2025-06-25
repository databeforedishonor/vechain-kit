import { useTokensWithValues } from '@/hooks';
import { useVeChainKitConfig } from '@/providers';
import { TOKEN_LOGOS, TOKEN_LOGO_COMPONENTS } from '@/utils';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface AssetIconsProps {
    address: string;
    maxIcons?: number;
    iconSize?: number;
    ml?: number;
    style?: StackProps;
    iconsGap?: number;
    rightIcon?: React.ReactNode;
    showNoAssetsWarning?: boolean;
    onClick?: () => void;
}

export const AssetIcons = ({
    address,
    maxIcons = 3,
    iconSize = 20,
    ml = 0,
    style,
    iconsGap = 0,
    rightIcon,
    showNoAssetsWarning = false,
    onClick,
}: AssetIconsProps) => {
    const { t } = useTranslation();
    const { tokensWithBalance } = useTokensWithValues({ address });
    const { darkMode } = useVeChainKitConfig();
    const marginLeft = iconsGap < 1 ? `-${iconSize / 2}px` : `${iconsGap}px`;

    const tokensToShow = tokensWithBalance.slice(0, maxIcons);
    const remainingTokens = tokensWithBalance.length - maxIcons;

    if (!address) return null;
    if (tokensWithBalance.length === 0 && !showNoAssetsWarning) return null;

    return (
        <div className="flex items-center" {...style} onClick={onClick}>
            <div className="flex items-center">
                {tokensToShow.map((token, index) => (
                    <Circle
                        key={token.symbol}
                        ml={index > 0 ? marginLeft : '0'}
                        zIndex={index}
                        size={`${iconSize}px`}
                        borderRadius="full"
                        bg={darkMode ? 'gray.100' : 'gray.600'}
                        border="2px solid #00000024"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {TOKEN_LOGO_COMPONENTS[token.symbol] ? (
                            React.cloneElement(
                                TOKEN_LOGO_COMPONENTS[token.symbol],
                                {
                                    width: `${iconSize * 0.8}px`,
                                    height: `${iconSize * 0.8}px`,
                                    rounded: 'full',
                                },
                            )
                        ) : TOKEN_LOGOS[token.symbol] ? (
                            <img
                                src={TOKEN_LOGOS[token.symbol]}
                                alt={`${token.symbol} logo`}
                                widtpx`}
                                height={`${iconSize * 0.8}px`}
                                rounded="full" />
                        ) : (
                            <spanpx`}
                            >
                                {token.symbol.slice(0, 3)}
                            </span>
                        )}
                    </Circle>
                ))}
                {remainingTokens > 0 && (
                    <Circle
                        ml={marginLeft}
                        zIndex={tokensToShow.length}
                        size={`${iconSize}px`}
                        borderRadius="full"
                        bg={darkMode ? 'gray.100' : 'gray.700'}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px solid"
                    >
                        <spanpx`}
                        >
                            +{remainingTokens}
                        </span>
                    </Circle>
                )}

                {tokensWithBalance.length === 0 && showNoAssetsWarning && (
                    <span
                        opacity={0.9}
                    >
                        {t('No assets')}
                    </span>
                )}
            </div>

            {rightIcon}
        </div>
    );
};
