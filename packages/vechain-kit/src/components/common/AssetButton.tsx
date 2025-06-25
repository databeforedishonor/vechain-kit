import { TOKEN_LOGOS, TOKEN_LOGO_COMPONENTS } from '@/utils';
import React from 'react';
import { useVeChainKitConfig } from '@/providers';
import { CURRENCY } from '@/types';
import {
    formatCompactCurrency,
    SupportedCurrency,
} from '@/utils/currencyUtils';

type AssetButtonProps = ButtonProps & {
    symbol: string;
    amount: number;
    currencyValue: number;
    currentCurrency: CURRENCY;
    isDisabled?: boolean;
    onClick?: () => void;
}

export const AssetButton = ({
    symbol,
    amount,
    currencyValue,
    currentCurrency,
    isDisabled,
    onClick,
    ...buttonProps
}: AssetButtonProps) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <button className="px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
            height="72px"
            justifyContent="space-between"
            isDisabled={isDisabled}
            _disabled={{
                cursor: 'not-allowed',
                opacity: 0.5,
            }}
            onClick={onClick}
            data-testid={`asset-${symbol}`}
            {...buttonProps}
        >
            <div className="flex items-center">
                {TOKEN_LOGO_COMPONENTS[symbol] ? (
                    React.cloneElement(TOKEN_LOGO_COMPONENTS[symbol], {
                        boxSize: '24px',
                        borderRadius: 'full',
                    })
                ) : (
                    <img
                        src={TOKEN_LOGOS[symbol]}
                        alt={`${symbol} logo`}
                        fallback={
                            <div
                                alignItems="center"
                                justifyContent="center"
                            >
                                <span>
                                    {symbol.slice(0, 3)}
                                </span>
                            </div>
                        }
                    />
                )}
                <span>{symbol}</span>
            </div>
            <div className="flex flex-col">
                <span>
                    {amount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                    })}{' '}</span>
                <span
                    data-testid={`${symbol}-balance`}
                >
                    {formatCompactCurrency(
                        currencyValue,
                        { currency: currentCurrency as SupportedCurrency },
                    )}
                </span>
            </div>
        </button>
    );
};
