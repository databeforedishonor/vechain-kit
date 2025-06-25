import { CiSearch } from 'react-icons/ci';
import { FiSlash } from 'react-icons/fi';
import { ModalBackButton, StickyHeaderContainer } from '@/components/common';
import { AccountModalContentTypes, AssetButton } from '@/components';
import { useWallet, useTokensWithValues, TokenWithValue } from '@/hooks';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { useCurrency } from '@/hooks';
import { SupportedCurrency } from '@/utils/currencyUtils';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
    onSelectToken: (token: TokenWithValue) => void;
    onBack: () => void;
}

export const SelectTokenContent = ({ onSelectToken, onBack }: Props) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();
    const { currentCurrency } = useCurrency();
    const { account } = useWallet();
    const { tokensWithBalance } = useTokensWithValues({
        address: account?.address ?? '',
    });
    const [searchQuery, setSearchQuery] = useState('');

    // Filter tokens
    const filteredTokens = tokensWithBalance.filter(({ symbol }) =>
        symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    useEffect(() => {
        if (searchQuery) {
            Analytics.send.tokenSearchPerformed(searchQuery);
        }
    }, [searchQuery, filteredTokens.length]);

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Select Token')}</ModalHeader>
                <ModalBackButton onClick={onBack} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <Container h={['540px', 'auto']} p={0}>
                <ModalBody>
                    <div className="flex flex-col space-y-4">
                        <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"Group>
                            <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search token"
                                height="56px"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                data-testid="search-token-input"
                            />
                            <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"LeftElement>
                                <CiSearch
                                    color={
                                        isDark ? 'whiteAlpha.400' : 'gray.400'
                                    }
                                />
                            </div>
                        </div>

                        <span
                        >
                            {t('Your tokens')}
                        </span>

                        {filteredTokens.length === 0 ? (
                            <div className="flex flex-col space-y-2"
                            >
                                <FiSlash className="w-12 h-12" opacity={0.5}  />
                                <span>
                                    {t('No tokens found')}
                                </span>
                                <span>
                                    {t('Try searching with a different term')}
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                {filteredTokens.map((token) => (
                                    <AssetButton
                                        key={token.address}
                                        symbol={token.symbol}
                                        amount={Number(token.balance)}
                                        currencyValue={token.valueInCurrency}
                                        currentCurrency={
                                            currentCurrency as SupportedCurrency
                                        }
                                        onClick={() => onSelectToken(token)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </ModalBody>
            </Container>
            <ModalFooter pt={0} />
        </>
    );
};
