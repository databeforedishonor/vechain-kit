import {
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { useTranslation } from 'react-i18next';

import { TermsAndPrivacyAccordion } from './TermsAndPrivacyAccordion';

export interface TermsAndPrivacyContentProps {
    onGoBack: () => void;
}

export const TermsAndPrivacyContent = ({
    onGoBack,
}: TermsAndPrivacyContentProps) => {
    const { t } = useTranslation();

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('Terms and Policies')}</ModalHeader>
                <ModalBackButton onClick={onGoBack} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody w={'full'}>
                <div className="flex flex-col space-y-6">
                    <TermsAndPrivacyAccordion />
                </div>
            </ModalBody>
            <ModalFooter pt={0} />
        </ScrollToTopWrapper>
    );
};
