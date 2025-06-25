import {
    StickyHeaderContainer,
    ScrollToTopWrapper,
    ModalNotificationButton,
} from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import {
    AccountSelector,
    BalanceSection,
    QuickActionsSection,
} from '@/components';
import { Wallet } from '@/types';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { useNotifications } from '@/hooks';
import { Analytics } from '@/utils/mixpanelClientInstance';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
    onClose: () => void;
    wallet: Wallet;
}

export const AccountMainContent = ({ setCurrentContent, wallet }: Props) => {
    const { t } = useTranslation();
    const { network } = useVeChainKitConfig();

    const { getNotifications } = useNotifications();
    const notifications = getNotifications();
    const hasUnreadNotifications = notifications.some((n) => !n.isRead);

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalNotificationButton
                    onClick={() => {
                        Analytics.notifications.viewed();
                        setCurrentContent('notifications');
                    }}
                    hasUnreadNotifications={hasUnreadNotifications}
                    data-testid="notifications-button"
                />
                <ModalHeader>
                    <div className="flex items-center space-x-2"
                        justifyContent={'center'}
                    >
                        <span
                            data-testid="modal-title"
                        >
                            {t('Wallet')}
                        </span>
                        {network?.type !== 'main' && (
                            <span
                                textTransfor
                            >
                                {`${network?.type}`}
                            </span>
                        )}
                    </div>
                </ModalHeader>

                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody w={'full'}>
                <div className="flex flex-col space-y-6"
                    overflo
                    justifyContent={'flex-start'}
                >
                    <AccountSelector
                        style={{ justifyContent: 'flex-start' }}
                        onClick={() => {
                            setCurrentContent('profile');
                        }}
                        wallet={wallet}
                    />

                    <BalanceSection
                        onAssetsClick={() => {
                            setCurrentContent('assets');
                        }}
                    />

                    <QuickActionsSection
                        setCurrentContent={setCurrentContent}
                    />
                </div>
            </ModalBody>
            <ModalFooter pt={0}></ModalFooter>
        </ScrollToTopWrapper>
    );
};
