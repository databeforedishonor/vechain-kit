import { FaExternalLinkAlt } from 'react-icons/fa';
import {
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { useVeChainKitConfig } from '@/providers';
import { FAQAccordion } from './FAQAccordion';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, languageNames } from '../../../../../i18n';
import { Analytics } from '@/utils/mixpanelClientInstance';

export interface FAQContentProps {
    onGoBack: () => void;
    showLanguageSelector?: boolean;
}

export const FAQContent = ({
    onGoBack,
    showLanguageSelector = true,
}: FAQContentProps) => {
    const { darkMode: isDark } = useVeChainKitConfig();
    const { i18n, t } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        Analytics.settings.language.changed(e.target.value, i18n.language);
        i18n.changeLanguage(e.target.value);
    };

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('Help')}</ModalHeader>
                <ModalBackButton onClick={onGoBack} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody w={'full'}>
                <div className="flex flex-col space-y-6">
                    {showLanguageSelector && (
                        <Select
                            borderRadius={'md'}
                            size="sm"
                            width="auto"
                            value={i18n.language}
                            onChange={handleLanguageChange}
                            bg={isDark ? 'whiteAlpha.200' : 'gray.100'}
                            borderColor={isDark ? 'whiteAlpha.300' : 'gray.200'}
                            _hover={{
                                borderColor: isDark
                                    ? 'whiteAlpha.400'
                                    : 'gray.300',
                            }}
                        >
                            {supportedLanguages.map((lang) => (
                                <option key={lang} value={lang}>
                                    {
                                        languageNames[
                                            lang as keyof typeof languageNames
                                        ]
                                    }
                                </option>
                            ))}
                        </Select>
                    )}

                    <button className="px-4 py-2 rounded-md transition-colors"
                        as={Link}
                        href="https://docs.vechainkit.vechain.org/"
                        isExternal
                        rightIcon={<FaExternalLinkAlt  />}
                    >
                        {t('For developers')}
                    </button>

                    <FAQAccordion />
                </div>
            </ModalBody>
            <ModalFooter pt={0} />
        </ScrollToTopWrapper>
    );
};
