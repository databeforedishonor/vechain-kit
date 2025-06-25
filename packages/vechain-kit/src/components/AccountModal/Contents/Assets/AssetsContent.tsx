import { useWallet, useTokensWithValues, TokenWithValue } from '@/hooks';
import {
    AssetButton,
    ModalBackButton,
    StickyHeaderContainer,
} from '@/components/common';
import { useVeChainKitConfig } from '@/providers';
import { useTranslation } from 'react-i18next';
import { RiEdit2Line } from 'react-icons/ri';
import { AccountModalContentTypes } from '../../Types';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';
import { useCurrency } from '@/hooks';
import { SupportedCurrency } from '@/utils/currencyUtils';

export interface AssetsContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const AssetsContent = ({ setCurrentContent }: AssetsContentProps) => {
    const { account } = useWallet();
    const { sortedTokens } = useTokensWithValues({ address: account?.address });
    const { allowCustomTokens, darkMode } = useVeChainKitConfig();
    const { currentCurrency } = useCurrency();
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');

    const handleTokenSelect = (token: TokenWithValue) => {
        setCurrentContent({
            type: 'send-token',
            props: {
                setCurrentContent,
                isNavigatingFromMain: false,
                preselectedToken: token,
                onBack: () => setCurrentContent('assets'),
            },
        });
    };

    // Filter tokens by search query
    const filteredTokens = sortedTokens.filter(({ symbol }) =>
        symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Assets')}</ModalHeader>
                <ModalBackButton onClick={() => setCurrentContent('main')} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <Container h={['540px', 'auto']} p={0}>
                <ModalBody>
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
                                color={darkMode ? 'whiteAlpha.400' : 'gray.400'}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {filteredTokens.map((token) => {
                            const hasBalance = Number(token.balance) > 0;

                            return (
                                <AssetButton
                                    key={token.address}
                                    symbol={token.symbol}
                                    amount={Number(token.balance)}
                                    currencyValue={token.valueInCurrency}
                                    currentCurrency={
                                        currentCurrency as SupportedCurrency
                                    }
                                    onClick={() => handleTokenSelect(token)}
                                    isDisabled={!hasBalance}
                                />
                            );
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {allowCustomTokens && (
                        <button className="px-4 py-2 rounded-md transition-colors"
                            leftIcon={<RiEdit2Line  />}
                            onClick={() =>
                                setCurrentContent('add-custom-token')
                            }
                        >
                            {t('Manage Custom Tokens')}
                        </button>
                    )}
                </ModalFooter>
            </Container>
        </>
    );
};
