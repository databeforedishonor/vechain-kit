import {
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';
import {
    MdCurrencyExchange,
    MdOutlineNavigateNext,
    MdPrivacyTip,
} from 'react-icons/md';

import { ActionButton } from '../../Components';
import { AccountModalContentTypes } from '../../Types';
import { useEffect, useState } from 'react';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const GeneralSettingsContent = ({ setCurrentContent }: Props) => {
    const { t } = useTranslation();
    const [showCurrencyRedDot, setShowCurrencyRedDot] = useState(false);

    useEffect(() => {
        // Check if user has visited currency settings before
        const hasVisitedCurrency = localStorage.getItem(
            'settings-currency-visited',
        );
        setShowCurrencyRedDot(!hasVisitedCurrency);
    }, []);

    const handleCurrencyClick = () => {
        // Mark currency settings as visited
        localStorage.setItem('settings-currency-visited', 'true');
        setShowCurrencyRedDot(false);

        Analytics.settings.currencySettingsViewed();
        setCurrentContent('change-currency');
    };

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('General')}</ModalHeader>

                <ModalBackButton
                    onClick={() => setCurrentContent('settings')}
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
                            {t(
                                'Manage your preferences for currency, language, and appearance.',
                            )}
                        </span>
                    </div>

                    <div className="flex flex-col" justifyContent="center">
                        <ActionButton
                            title={t('Currency')}
                            style={{
                                borderBottomRadius: '0px',
                            }}
                            onClick={handleCurrencyClick}
                            leftIcon={MdCurrencyExchange}
                            rightIcon={MdOutlineNavigateNext}
                            extraContent={
                                showCurrencyRedDot && (
                                    <div
                                        minWidt
                                        height="8px"
                                        alignItems="center"
                                        justifyContent="center" />
                                )
                            }
                        />

                        <ActionButton
                            title={t('Language')}
                            style={{
                                borderTopRadius: '0px',
                            }}
                            onClick={() => {
                                Analytics.settings.languageSettingsViewed();
                                setCurrentContent('change-language');
                            }}
                            leftIcon={IoLanguage}
                            rightIcon={MdOutlineNavigateNext}
                        />
                    </div>
                    <ActionButton
                        title={t('Terms and Policies')}
                        onClick={() => {
                            Analytics.settings.termsAndPolicyViewed();
                            setCurrentContent({
                                type: 'terms-and-privacy',
                                props: {
                                    onGoBack: () =>
                                        setCurrentContent('settings'),
                                },
                            });
                        }}
                        leftIcon={MdPrivacyTip}
                        rightIcon={MdOutlineNavigateNext}
                    />
                </div>
            </ModalBody>
            <ModalFooter pt={0} />
        </ScrollToTopWrapper>
    );
};
