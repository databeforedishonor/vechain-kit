import { useTranslation } from 'react-i18next';
import { useWallet } from '@vechain/dapp-kit-react';
import { useVeChainKitConfig } from '@/providers';
import { NetworkInfo } from './NetworkInfo';

export const DappKitConnectionCard = () => {
    const { t } = useTranslation();
    const { source } = useWallet();
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <>
            {source && (
                <div className="flex flex-col space-y-4"
                    justifyContent="space-between"
                >
                    <div className="flex items-center" justifyContent="space-between">
                        <span
                        >
                            {t('Logged in with')}:
                        </span>

                        <span
                        >
                            {source}
                        </span>
                    </div>
                    <NetworkInfo />
                </div>
            )}
        </>
    );
};
