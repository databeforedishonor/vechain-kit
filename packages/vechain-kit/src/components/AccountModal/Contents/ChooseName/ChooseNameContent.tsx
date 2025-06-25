import { ModalBackButton, StickyHeaderContainer } from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { FaRegAddressCard } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { Analytics } from '@/utils/mixpanelClientInstance';

export interface ChooseNameContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
    onBack?: () => void;
    initialContentSource?: AccountModalContentTypes;
}

export const ChooseNameContent = ({
    setCurrentContent,
    onBack = () => setCurrentContent('settings'),
    initialContentSource = 'settings',
}: ChooseNameContentProps) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();

    const handleClose = () => {
        Analytics.nameSelection.dropOff('search', {
            isError: false,
            name: '',
            reason: 'modal_closed',
        });
    };

    const handleBack = () => {
        Analytics.nameSelection.dropOff('search', {
            isError: false,
            name: '',
            reason: 'back_button',
        });
        onBack();
    };

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader data-testid='modal-title'>{t('Choose your account name')}</ModalHeader>
                <ModalBackButton onClick={handleBack} />
                <ModalCloseButton onClick={handleClose} />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col space-y-6">
                    <FaRegAddressCard className="w-16 h-16"
                        opacity={0.5}
                        color={isDark ? 'whiteAlpha.800' : 'gray.600'}
                     />
                    <div className="flex flex-col space-y-2">
                        <span>
                            {t('Finally say goodbye to 0x addresses')}
                        </span>
                        <span
                            opacity={0.7}
                        >
                            {t(
                                'Name your account to make it easier to exchange assets',
                            )}
                        </span>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="px-4 py-2 rounded-md transition-colors"
                    onClick={() =>
                        setCurrentContent({
                            type: 'choose-name-search',
                            props: {
                                name: '',
                                setCurrentContent: setCurrentContent,
                                initialContentSource,
                            },
                        })
                    }
                    data-testid="choose-name-button"
                >
                    {t('Choose name')}
                </button>
            </ModalFooter>
        </>
    );
};
