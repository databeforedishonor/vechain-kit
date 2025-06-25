import {
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { CURRENCY, CURRENCY_SYMBOLS } from '@/types';
import { useCurrency } from '@/hooks';
import { BsCheck } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export interface ChangeCurrencyContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const ChangeCurrencyContent = ({
    setCurrentContent,
}: ChangeCurrencyContentProps) => {
    const { t } = useTranslation();
    const { currentCurrency, changeCurrency, allCurrencies } = useCurrency();

    useEffect(() => {
        // Ensure we mark the currency settings as visited when this component mounts
        localStorage.setItem('settings-currency-visited', 'true');
    }, []);

    const renderCurrencyButton = (currency: CURRENCY) => (
        <button className="px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
            key={currency}
            justifyContent="space-between"
            onClick={() => changeCurrency(currency)}
            py={6}
            px={4}
            _hover={{ bg: 'whiteAlpha.100' }}
        >
            <div className="flex items-center">
                <span>{CURRENCY_SYMBOLS[currency]}</span>
                <span>{currency.toUpperCase()}</span>
            </div>
            {currentCurrency === currency && (
                <BsCheck className="w-5 h-5" color="blue.500"  />
            )}
        </button>
    );

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('Select currency')}</ModalHeader>
                <ModalBackButton
                    onClick={() => setCurrentContent('general-settings')}
                />
                <ModalCloseButton />
            </StickyHeaderContainer>
            <ModalBody w={'full'}>
                <div className="flex flex-col"
                >
                    {allCurrencies.map((cur) => renderCurrencyButton(cur))}
                </div>
            </ModalBody>
            <ModalFooter pt={0} />
        </ScrollToTopWrapper>
    );
};
