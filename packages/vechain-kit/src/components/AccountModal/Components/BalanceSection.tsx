import { useRefreshBalances, useWallet, useTotalBalance } from '@/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VscRefresh } from 'react-icons/vsc';
import { AssetIcons } from '@/components/WalletButton/AssetIcons';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { useVeChainKitConfig } from '@/providers';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { cn } from '@/utils/cn';

export const BalanceSection = ({
    mb,
    mt,
    onAssetsClick,
}: {
    mb?: number;
    mt?: number;
    onAssetsClick?: () => void;
}) => {
    const { darkMode: isDark } = useVeChainKitConfig();
    const { t } = useTranslation();
    const { account } = useWallet();
    const { formattedBalance, isLoading } = useTotalBalance({
        address: account?.address ?? '',
    });

    const { refresh } = useRefreshBalances();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        Analytics.wallet.balanceRefreshed();
        setIsRefreshing(true);
        await refresh();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1500);
    };

    return (
        <div 
            className={cn("w-full flex flex-col justify-start space-y-2")}
            style={{ 
                marginTop: mt ? `${mt * 0.25}rem` : undefined,
                marginBottom: mb ? `${mb * 0.25}rem` : undefined
            }}
        >
            <h3 className="text-xs font-medium w-full opacity-50">
                {t('Balance')}
            </h3>
            <div className="w-full flex justify-between items-baseline group">
                <h2 className="text-3xl font-bold">
                    {formattedBalance}
                </h2>

                <div className="flex items-center justify-center w-8 h-8">
                    <button
                        aria-label="Refresh balances"
                        className={cn(
                            "p-2 rounded-md bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700",
                            "opacity-50 hover:opacity-80 transition-opacity relative",
                            "disabled:opacity-30 disabled:cursor-not-allowed"
                        )}
                        onClick={handleRefresh}
                        disabled={isLoading || isRefreshing}
                    >
                        <VscRefresh 
                            className={cn(
                                "w-4 h-4",
                                (isLoading || isRefreshing) && "animate-spin"
                            )} 
                        />
                    </button>
                </div>
            </div>
            <div className="w-full flex justify-start" data-testid="all-assets-button">
                <AssetIcons
                    onClick={onAssetsClick}
                    maxIcons={10}
                    iconSize={26}
                    iconsGap={3}
                    address={account?.address ?? ''}
                    showNoAssetsWarning={true}
                    rightIcon={
                        <MdOutlineNavigateNext className="w-5 h-5 opacity-50 ml-2" />
                    }
                    style={{
                        width: '100%',
                        marginTop: '0.5rem',
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '0.75rem',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        justifyContent: 'space-between',
                        transition: 'background-color 0.2s ease',
                    }}
                />
            </div>
        </div>
    );
};
