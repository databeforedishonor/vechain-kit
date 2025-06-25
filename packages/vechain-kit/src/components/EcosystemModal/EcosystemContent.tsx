import { StickyHeaderContainer } from '@/components/common';
import { useCrossAppConnectionCache, usePrivy } from '@/hooks';
import { usePrivyCrossAppSdk } from '@/providers/PrivyCrossAppProvider';
import { useState } from 'react';
import { LoginLoadingModal } from '../LoginLoadingModal';
import { useTranslation } from 'react-i18next';
import { PrivyAppInfo } from '@/types';
import { useVeChainKitConfig } from '@/providers';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { VeLoginMethod } from '@/types/mixPanel';
import { isRejectionError } from '@/utils/stringUtils';
type Props = {
    onClose: () => void;
    appsInfo: PrivyAppInfo[];
    isLoading: boolean;
}

export const EcosystemContent = ({ onClose, appsInfo, isLoading }: Props) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();

    const [loginError, setLoginError] = useState<string>();
    const [selectedApp, setSelectedApp] = useState<string>();
    const loginLoadingModal = useDisclosure();
    const { user } = usePrivy();

    const { setConnectionCache } = useCrossAppConnectionCache();

    // Login with Vechain - Cross app account login
    const { login: loginWithCrossApp } = usePrivyCrossAppSdk();

    const connectWithVebetterDaoApps = async (
        appId: string,
        appName: string,
    ) => {
        loginLoadingModal.onOpen();
        try {
            setLoginError(undefined);
            setSelectedApp(appName);
            try {
                await loginWithCrossApp(appId);
                Analytics.auth.trackAuth('connect_initiated', {
                    totalConnections: appsInfo.length,
                });
                loginLoadingModal.onClose();
                setConnectionCache({
                    name: appName,
                    logoUrl: appsInfo.find((app) => app.id === appId)?.logo_url,
                    appId: appId,
                    website: appsInfo.find((app) => app.id === appId)?.website,
                });
                Analytics.auth.completed({
                    userId: user?.id,
                    loginMethod: VeLoginMethod.ECOSYSTEM,
                });
                onClose();
            } catch (error) {
                const errorMsg = (error as { message?: string })?.message;

                // Handle user rejection or other errors
                if (errorMsg && isRejectionError(errorMsg)) {
                    Analytics.auth.dropOff('ecosystem-app-connect', {
                        ...(appName && { appName }),
                    });

                    return new Error('Login request was cancelled.');
                }

                // If it's an Error instance, return it, otherwise create new Error
                const errorToShow =
                    error instanceof Error
                        ? error
                        : new Error(
                              "'An unexpected issue occurred while logging in with this app. Please try again or contact support.',",
                          );

                setLoginError(errorToShow.message);
            }
        } catch (error) {
            console.error(t('Login failed:'), error);
            setLoginError(
                error instanceof Error
                    ? error.message
                    : t('Failed to connect with ecosystem app'),
            );
        }
    };

    const handleTryAgain = () => {
        if (selectedApp) {
            Analytics.auth.tryAgain(VeLoginMethod.ECOSYSTEM, selectedApp);
            const app = appsInfo.find((app) => app.name === selectedApp);
            if (app) {
                connectWithVebetterDaoApps(app.id, app.name);
            }
        }
    };

    const handleClose = () => {
        Analytics.auth.dropOff('ecosystem-view', {
            ...(selectedApp && { appName: selectedApp }),
        });
        onClose();
    };

    return (
        <div>
            <>
                <StickyHeaderContainer>
                    <ModalHeader>
                        {t('Already have an x2earn app wallet?')}
                        <ModalCloseButton onClick={handleClose} />
                    </ModalHeader>
                </StickyHeaderContainer>

                <ModalBody>
                    {isLoading && (
                        <div className="flex flex-col"
                            justifyContent={'center'}
                        >
                            <div />
                        </div>
                    )}

                    {!isLoading && appsInfo && (
                        <div className="flex flex-col space-y-4">
                            {appsInfo.map((appInfo) => (
                                <button className="px-4 py-2 rounded-md transition-colors"
                                    key={appInfo.id}
                                    backgroundColor={
                                        isDark ? 'transparent' : '#ffffff'
                                    }`}
                                    onClick={() => {
                                        connectWithVebetterDaoApps(
                                            appInfo.id,
                                            appInfo.name,
                                        );
                                    }}
                                    justifyContent={'flex-start'}
                                >
                                    <img
                                        src={appInfo.logo_url}
                                        alt={appInfo.name} />
                                    <span>{appInfo.name}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {!isLoading && !appsInfo && (
                        <span>
                            {t(
                                'No application from VeChain ecosystem is available to login.',
                            )}
                        </span>
                    )}
                </ModalBody>
                <ModalFooter pt={0} />
            </>

            <LoginLoadingModal
                isOpen={loginLoadingModal.isOpen}
                onClose={() => {
                    loginLoadingModal.onClose();
                }}
                error={loginError}
                title={`${t('Connecting with')} ${selectedApp}`}
                loadingText={t(
                    'Please approve the request in the connection request window...',
                )}
                onTryAgain={handleTryAgain}
            />
        </div>
    );
};
