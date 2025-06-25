import { FaExternalLinkAlt } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { HiOutlineShieldCheck } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import { useCrossAppConnectionCache } from '@/hooks';
import { Analytics } from '@/utils/mixpanelClientInstance';

export const CrossAppConnectionSecurityCard = () => {
    const { t } = useTranslation();

    const { getConnectionCache } = useCrossAppConnectionCache();

    const connectionCache = getConnectionCache();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"Header borderBottomWidt>
                <span opacity={0.8}>
                    {t('Security preferences')}
                </span>

                <span opacity={0.7}>
                    {t(
                        'For security reasons, you can manage your embedded wallet settings only on the {{appName}} platform.',
                        {
                            appName:
                                connectionCache?.ecosystemApp.name ??
                                'origin app',
                        },
                    )}
                </span>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"Body>
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <div
                            _dark={{ bg: 'blackAlpha.100' }}
                            flexShrink={0}
                        >
                            <GrUserAdmin  />
                        </div>
                        <div flex={1}>
                            <span
                                lineHeight="shorter"
                            >
                                {t('Login methods')}
                            </span>
                            <span
                                opacity={0.7}
                                lineHeight="shorter"
                            >
                                {t('Manage your login methods and passkeys')}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div
                            _dark={{ bg: 'blackAlpha.100' }}
                            flexShrink={0}
                        >
                            <HiOutlineShieldCheck  />
                        </div>
                        <div flex={1}>
                            <span
                                lineHeight="shorter"
                            >
                                {t('Security settings')}
                            </span>
                            <span
                                opacity={0.7}
                                lineHeight="shorter"
                            >
                                {t(
                                    'Backup your wallet, configure MFA and set recovery options',
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"Footer>
                <button className="px-4 py-2 rounded-md transition-colors"
                    onClick={() => {
                        Analytics.settings.manageSecuritySettings();
                        window.open(
                            connectionCache?.ecosystemApp.website ??
                                'https://governance.vebetterdao.org/',
                            '_blank',
                        );
                    }}
                >
                    {t('Manage on {{appName}}', {
                        appName:
                            connectionCache?.ecosystemApp.name ?? 'origin app',
                    })}
                    <FaExternalLinkAlt ml={2}  />
                </button>
            </div>
        </div>
    );
};
