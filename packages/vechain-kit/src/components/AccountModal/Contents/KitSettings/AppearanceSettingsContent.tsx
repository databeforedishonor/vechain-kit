import {
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { useTranslation } from 'react-i18next';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const AppearanceSettingsContent = ({ setCurrentContent }: Props) => {
    const { t } = useTranslation();

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('General')}</ModalHeader>

                <ModalBackButton
                    onClick={() => setCurrentContent('general-settings')}
                />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody w={'full'}>
                <div className="flex flex-col"
                >
                    <div className="flex flex-col" justifyContent="center">
                        <span
                            opacity={0.5}
                        >
                            {t('Customize the appearance of your wallet.')}
                        </span>
                    </div>

                    <div className="flex flex-col" justifyContent="center">
                        {/* Add appearance settings buttons here */}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter pt={0} />
        </ScrollToTopWrapper>
    );
};
