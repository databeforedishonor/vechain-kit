import {
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { useTranslation } from 'react-i18next';

export interface DisconnectConfirmContentProps {
    onDisconnect: () => void;
    onBack: () => void;
    onClose?: () => void;
    text?: string;
    showCloseButton?: boolean;
}

export const DisconnectConfirmContent = ({
    onDisconnect,
    onBack,
    onClose,
    showCloseButton = true,
    text,
}: DisconnectConfirmContentProps) => {
    const { t } = useTranslation();
    const textTitle =
        text ?? t('Are you sure you want to disconnect your wallet?');
    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('Logout')}</ModalHeader>
                <ModalBackButton onClick={onBack} />
                {showCloseButton ? (
                    <ModalCloseButton onClick={onClose} />
                ) : null}
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col space-y-6">
                    <span>
                        {textTitle}
                    </span>
                </div>
            </ModalBody>
            <ModalFooter w="full">
                <div className="flex flex-col">
                    <button className="px-4 py-2 rounded-md transition-colors"
                        height="60px"
                        onClick={onDisconnect}
                        data-testid="disconnect-button"
                    >
                        {t('Confirm')}
                    </button>
                    <button className="px-4 py-2 rounded-md transition-colors"
                        onClick={onBack}
                        data-testid="cancel-logout-button"
                    >
                        {t('Cancel')}
                    </button>
                </div>
            </ModalFooter>
        </ScrollToTopWrapper>
    );
};
