import {
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { useTranslation } from 'react-i18next';
import { languageNames, supportedLanguages } from '../../../../../i18n';
import { BsCheck } from 'react-icons/bs';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const LanguageSettingsContent = ({ setCurrentContent }: Props) => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const renderLanguageButton = (lang: string) => (
        <button className="px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
            key={lang}
            justifyContent="space-between"
            onClick={() => handleLanguageChange(lang)}
            py={6}
            px={4}
            _hover={{ bg: 'whiteAlpha.100' }}
        >
            <span>{languageNames[lang as keyof typeof languageNames]}</span>
            {i18n.language === lang && (
                <BsCheck className="w-5 h-5" color="blue.500"  />
            )}
        </button>
    );

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('Select language')}</ModalHeader>

                <ModalBackButton
                    onClick={() => setCurrentContent('general-settings')}
                />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody w={'full'}>
                <div className="flex flex-col"
                >
                    {supportedLanguages.map((lang: string) =>
                        renderLanguageButton(lang),
                    )}
                </div>
            </ModalBody>
            <ModalFooter pt={0} />
        </ScrollToTopWrapper>
    );
};
