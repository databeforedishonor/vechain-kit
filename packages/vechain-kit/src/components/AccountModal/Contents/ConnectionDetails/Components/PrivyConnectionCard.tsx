import { useFetchAppInfo } from '@/hooks';
import { useVeChainKitConfig } from '@/providers';
import { useTranslation } from 'react-i18next';
import { NetworkInfo } from './NetworkInfo';

export const PrivyConnectionCard = () => {
    const { t } = useTranslation();
    const { privy, darkMode: isDark } = useVeChainKitConfig();
    const { data: appInfo, isLoading } = useFetchAppInfo(privy?.appId ?? '');

    if (isLoading)
        return (
            <div className="flex flex-col">
                <div />
            </div>
        );

    return (
        <>
            {appInfo && (
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
                            {Object.values(appInfo)[0].name}
                        </span>
                    </div>
                    <NetworkInfo />
                </div>
            )}
        </>
    );
};
