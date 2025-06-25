import { useVeChainKitConfig } from '@/providers';
import { ModalFAQButton, StickyHeaderContainer } from '@/components/common';
import { ConnectModalContentsTypes } from '../ConnectModal';
import React, { useEffect } from 'react';
import { useWallet, useFetchAppInfo } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { ConnectionOptionsStack } from '../Components/ConnectionOptionsStack';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { EcosystemButton } from '../Components/EcosystemButton';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<ConnectModalContentsTypes>
    >;
    onClose: () => void;
}

export const MainContent = ({ setCurrentContent, onClose }: Props) => {
    const { t } = useTranslation();

    const { darkMode: isDark } = useVeChainKitConfig();
    const { connection } = useWallet();
    const { loginModalUI } = useVeChainKitConfig();
    const { loginMethods, privyEcosystemAppIDS } = useVeChainKitConfig();
    const { data: appsInfo, isLoading: isEcosystemAppsLoading } =
        useFetchAppInfo(privyEcosystemAppIDS);

    const handleFAQClick = () => {
        Analytics.help.faqViewed();
        setCurrentContent('faq');
    };

    useEffect(() => {
        if (connection.isConnected) {
            onClose();
        }
    }, [connection.isConnected, onClose]);

    const showEcosystemButton = loginMethods?.some(
        ({ method }) => method === 'ecosystem',
    );

    return (
        <>
            <StickyHeaderContainer>
                <ModalFAQButton onClick={handleFAQClick} />
                <ModalHeader>{t('Log in or sign up')}</ModalHeader>
                <ModalCloseButton />
            </StickyHeaderContainer>

            {loginModalUI?.logo && (
                <div className="flex items-center">
                    <img
                        src={loginModalUI.logo || '/images/favicon.png'}
                        alt="logo" />
                </div>
            )}

            <ModalBody>
                {loginModalUI?.description && (
                    <div className="flex items-center space-x-4"
                    >
                        <span
                        >
                            {loginModalUI?.description}
                        </span>
                    </div>
                )}
                <ConnectionOptionsStack />
            </ModalBody>

            {showEcosystemButton ? (
                <ModalFooter>
                    <div className="flex items-center">
                        <EcosystemButton
                            isDark={isDark}
                            appsInfo={Object.values(appsInfo || {})}
                            isLoading={isEcosystemAppsLoading}
                        />
                    </div>
                </ModalFooter>
            ) : (
                <ModalFooter pt={0} pb={'5px'} />
            )}
        </>
    );
};
