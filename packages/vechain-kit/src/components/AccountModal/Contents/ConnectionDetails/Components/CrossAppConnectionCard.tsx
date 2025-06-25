import { useTranslation } from 'react-i18next';
import { CrossAppConnectionCache } from '@/types';
import { useVeChainKitConfig } from '@/providers';
import { NetworkInfo } from './NetworkInfo';

type Props = {
    connectionCache: CrossAppConnectionCache;
}

export const CrossAppConnectionCard = ({ connectionCache }: Props) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <>
            {connectionCache.ecosystemApp && (
                <div className="flex flex-col space-y-4"
                >
                    <div className="flex items-center" justifyContent="space-between">
                        <span
                        >
                            {t('Logged in with')}:
                        </span>
                        <span
                        >
                            {connectionCache.ecosystemApp.name}
                        </span>
                    </div>

                    <div className="flex items-center" justifyContent="space-between">
                        <span
                        >
                            {t('At')}:
                        </span>
                        <span
                        >
                            {new Date(
                                connectionCache.timestamp,
                            ).toLocaleString()}
                        </span>
                    </div>
                    <NetworkInfo />
                </div>
            )}
        </>
    );
};
