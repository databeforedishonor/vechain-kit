import { humanAddress } from '@/utils';
import { useVeChainKitConfig } from '@/providers';
import { useTotalBalance, useTokensWithValues } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { cn } from '@/utils/cn';

interface AddressDisplayCardProps {
    label: string;
    address: string;
    domain?: string;
    imageSrc: string;
    imageAlt?: string;
    hideAddress?: boolean;
    balance?: number;
    tokenAddress?: string;
}

export const AddressDisplayCard = ({
    label,
    address,
    domain,
    imageSrc,
    imageAlt = 'Account',
    hideAddress = false,
    balance,
    tokenAddress,
}: AddressDisplayCardProps) => {
    const { darkMode: isDark } = useVeChainKitConfig();
    const { t } = useTranslation();

    const { isLoading: totalBalanceLoading } = useTotalBalance({
        address,
    });

    const { tokens, isLoading: tokensLoading } = useTokensWithValues({
        address,
    });

    // Find token by address if specified
    const tokenData = useMemo(() => {
        if (!tokenAddress) return null;
        return tokens.find((token) => token.address === tokenAddress);
    }, [tokens, tokenAddress]);

    // Determine what balance to display
    const displayBalance = useMemo(() => {
        // If balance is explicitly provided, always use that
        if (balance !== undefined) return balance;

        // Otherwise, find the actual token balance, not its currency value
        if (tokenData) {
            return Number(tokenData.balance);
        }
        return 0;
    }, [balance, tokenData]);

    const displaySymbol = tokenData?.symbol || '';
    const isLoading = totalBalanceLoading || tokensLoading;

    return (
        <div
            className={cn(
                "w-full p-2 rounded-lg break-words",
                isDark ? "bg-black/20" : "bg-gray-50"
            )}
        >
            <div className="text-sm font-bold mb-2">
                {label}
            </div>
            <div className="min-h-[50px] flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div className="flex flex-col justify-start space-y-0">
                        {domain ? (
                            <>
                                <div
                                    className="font-medium text-sm"
                                    data-testid={`${label.toLowerCase()}-domain`}
                                >
                                    {domain}
                                </div>
                                {!hideAddress && (
                                    <div
                                        className="text-xs opacity-50"
                                        data-testid={`${label.toLowerCase()}-address`}
                                    >
                                        {humanAddress(address, 6, 4)}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div
                                className="font-medium text-sm"
                                data-testid={`${label.toLowerCase()}-address`}
                            >
                                {humanAddress(address, 6, 4)}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col justify-start items-end space-y-0 mr-2">
                    <div className="text-sm font-medium">
                        {t('Balance')}
                    </div>
                    <div className={cn(
                        "text-xs opacity-50",
                        isLoading && "animate-pulse bg-gray-300 dark:bg-gray-600 rounded h-4 w-16"
                    )}>
                        {!isLoading && (
                            <>
                                {displayBalance.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}
                                {displaySymbol && ` ${displaySymbol}`}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
