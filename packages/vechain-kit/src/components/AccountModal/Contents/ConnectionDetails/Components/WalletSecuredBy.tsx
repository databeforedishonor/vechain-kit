import { PrivyLogo, VechainLogo } from '@/assets';
import { useCrossAppConnectionCache, useWallet } from '@/hooks';
import { useVeChainKitConfig } from '@/providers';
import { useTranslation } from 'react-i18next';
import { PiLineVertical } from 'react-icons/pi';

export const WalletSecuredBy = () => {
    const { connection } = useWallet();
    const { t } = useTranslation();
    const { darkMode: isDark, privy } = useVeChainKitConfig();
    const { getConnectionCache } = useCrossAppConnectionCache();

    const connectionCache = getConnectionCache();

    return (
        <div className="flex flex-col"
            shado
        >
            <span>
                {t('Wallet secured by')}
            </span>
            <div className="flex items-center">
                <PrivyLogo isDark={isDark} w={'50px'} />
                <PiLineVertical ml={3}  />

                {connection.isConnectedWithVeChain ? (
                    <VechainLogo
                        isDark={isDark}
                        w={'80px'}
                        h={'auto'}
                        mb={'3px'}
                    />
                ) : (
                    connection.isConnectedWithCrossApp &&
                    connectionCache && (
                        <img
                            src={connectionCache.ecosystemApp.logoUrl}
                            alt={connectionCache.ecosystemApp.name} />
                    )
                )}

                {connection.isConnectedWithSocialLogin &&
                    !connection.isConnectedWithVeChain && (
                        <img
                            src={privy?.appearance.logo}
                            alt={privy?.appearance.logo} />
                    )}
            </div>
        </div>
    );
};
