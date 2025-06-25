import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { ModalBackButton, StickyHeaderContainer } from '@/components';
import { AccountModalContentTypes } from '../../Types';
import { FiArrowDown } from 'react-icons/fi';
import { SelectTokenContent } from './SelectTokenContent';
import { parseEther } from 'ethers';
import { TOKEN_LOGOS, TOKEN_LOGO_COMPONENTS } from '@/utils';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { useForm } from 'react-hook-form';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { useVechainDomain, TokenWithValue } from '@/hooks';
import { useCurrency, useTokenPrices } from '@/hooks';
import {
    formatCompactCurrency,
    SupportedCurrency,
    convertToSelectedCurrency
} from '@/utils/currencyUtils';
import { ens_normalize } from '@adraffy/ens-normalize';

export interface SendTokenContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
    isNavigatingFromMain?: boolean;
    preselectedToken?: TokenWithValue;
    onBack?: () => void;
};

// Add form values type
type FormValues = {
    amount: string;
    toAddressOrDomain: string;
}

export const SendTokenContent = ({
    setCurrentContent,
    isNavigatingFromMain = true,
    preselectedToken,
    onBack: parentOnBack = () => setCurrentContent('main'),
}: SendTokenContentProps) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();
    const { currentCurrency } = useCurrency();
    const { exchangeRates } = useTokenPrices();
    const [selectedToken, setSelectedToken] = useState<TokenWithValue | null>(
        preselectedToken ?? null,
    );
    const [isSelectingToken, setIsSelectingToken] = useState(
        isNavigatingFromMain && !preselectedToken,
    );
    const [isInitialTokenSelection, setIsInitialTokenSelection] =
        useState(isNavigatingFromMain);

    // Form setup with validation rules
    const {
        register,
        watch,
        setValue,
        setError,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<FormValues>({
        defaultValues: {
            amount: '',
            toAddressOrDomain: '',
        },
        mode: 'onChange',
    });

    // Watch form values
    const { toAddressOrDomain, amount } = watch();

    const formattedValue = useMemo(() => {
        if (selectedToken) {
            return formatCompactCurrency(
                convertToSelectedCurrency(
                    Number(amount) * selectedToken.priceUsd,
                    currentCurrency as SupportedCurrency,
                    exchangeRates,
                ),
                { currency: currentCurrency as SupportedCurrency },
            );
        }
        return '';
    }, [amount, selectedToken, currentCurrency, exchangeRates]);

    useEffect(() => {
        if (selectedToken && amount) {
            Analytics.send.flow('amount', {
                tokenSymbol: selectedToken.symbol,
                amount,
            });
        }
    }, [amount, selectedToken]);

    useEffect(() => {
        if (selectedToken && toAddressOrDomain) {
            Analytics.send.flow('recipient', {
                tokenSymbol: selectedToken.symbol,
                recipientAddress: toAddressOrDomain,
                recipientType: toAddressOrDomain.includes('.')
                    ? 'domain'
                    : 'address',
            });
        }
    }, [toAddressOrDomain, selectedToken]);

    const { data: resolvedDomainData, isLoading } =
        useVechainDomain(toAddressOrDomain);

    const handleSetMaxAmount = () => {
        if (selectedToken) {
            setValue('amount', selectedToken.balance);
            Analytics.send.flow('amount', {
                tokenSymbol: selectedToken.symbol,
                amount: selectedToken.balance,
            });
        }
    };

    const handleBack = () => {
        if (selectedToken) {
            Analytics.send.flow('review', {
                tokenSymbol: selectedToken.symbol,
                amount: amount || undefined,
                recipientAddress: toAddressOrDomain || undefined,
                error: 'back_button',
                isError: false,
            });
        }
        parentOnBack();
    };

    const handleClose = () => {
        if (selectedToken) {
            Analytics.send.flow('review', {
                tokenSymbol: selectedToken.symbol,
                amount: amount || undefined,
                recipientAddress: toAddressOrDomain || undefined,
                error: 'modal_closed',
                isError: false,
            });
        }
    };

    const onSubmit = async (data: FormValues) => {
        if (!selectedToken) return;

        // Validation:
        // - Address is valid
        // - There is no domain attached to the address or (if it is attached) the returned domain is the primary domain
        const isValidReceiver =
            resolvedDomainData?.isValidAddressOrDomain &&
            (!resolvedDomainData?.domain ||
                (resolvedDomainData?.domain &&
                    resolvedDomainData?.isPrimaryDomain));

        if (!isValidReceiver) {
            setError('toAddressOrDomain', {
                type: 'manual',
                message: t('Invalid address or domain'),
            });
            Analytics.send.flow('review', {
                tokenSymbol: selectedToken.symbol,
                error: 'Invalid address or domain',
            });
            return;
        }

        // Validate amount
        if (selectedToken) {
            const numericAmount = parseEther(data.amount);
            if (numericAmount > parseEther(selectedToken.balance)) {
                setError('amount', {
                    type: 'manual',
                    message: t(`Insufficient {{symbol}} balance`, {
                        symbol: selectedToken.symbol,
                    }),
                });
                Analytics.send.flow('review', {
                    tokenSymbol: selectedToken.symbol,
                    error: 'Insufficient balance',
                });
                return;
            }
        }

        Analytics.send.flow('review', {
            tokenSymbol: selectedToken.symbol,
            amount: data.amount,
            recipientAddress:
                resolvedDomainData?.address || data.toAddressOrDomain,
            recipientType: resolvedDomainData?.domain ? 'domain' : 'address',
        });

        setCurrentContent({
            type: 'send-token-summary',
            props: {
                toAddressOrDomain: data.toAddressOrDomain,
                resolvedDomain: resolvedDomainData?.domain,
                resolvedAddress: resolvedDomainData?.address,
                amount: data.amount,
                selectedToken,
                formattedTotalAmount: formattedValue,
                setCurrentContent,
            },
        });
    };

    if (isSelectingToken) {
        return (
            <SelectTokenContent
                setCurrentContent={setCurrentContent}
                onSelectToken={(token) => {
                    Analytics.send.tokenPageViewed(token.symbol);
                    setSelectedToken(token);
                    setIsSelectingToken(false);
                    setIsInitialTokenSelection(false);
                }}
                onBack={() => {
                    if (isInitialTokenSelection) {
                        if (selectedToken) {
                            Analytics.send.flow('token_select', {
                                tokenSymbol: selectedToken.symbol,
                                error: 'User cancelled - back to main',
                            });
                        }
                        setCurrentContent('main');
                    } else {
                        if (selectedToken) {
                            Analytics.send.flow('token_select', {
                                tokenSymbol: selectedToken.symbol,
                                error: 'User cancelled - back to form',
                            });
                        }
                        setIsSelectingToken(false);
                    }
                }}
            />
        );
    }

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Send')}</ModalHeader>
                <ModalBackButton onClick={handleBack} />
                <ModalCloseButton onClick={handleClose} />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col">
                    <div
                    >
                        <div className="flex flex-col space-y-2">
                            <div isInvalid={!!errors.amount}>
                                <div className="flex items-center">
                                    <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        {...register('amount', {
                                            required: t('Amount is required'),
                                            pattern: {
                                                value: /^\d*\.?\d*$/,
                                                message: t(
                                                    'Please enter a valid number',
                                                ),
                                            },
                                            validate: (value) => {
                                                if (!value) return true;
                                                const numericValue =
                                                    parseFloat(value);
                                                return (
                                                    !isNaN(numericValue) ||
                                                    t(
                                                        'Please enter a valid number',
                                                    )
                                                );
                                            },
                                        })}
                                        onChange={(e) => {
                                            const trimmed =
                                                e.target.value.trim();
                                            e.target.value = trimmed;
                                            setValue('amount', trimmed, {
                                                shouldValidate: true,
                                            });
                                        }}
                                        placeholder="0"
                                        variant="unstyled"
                                        fontSize="4xl"
                                        fontWeight="bold"
                                        data-testid="tx-amount-input"
                                        type="number"
                                        inputMode="decimal"
                                    />

                                    {selectedToken ? (
                                        <button className="px-4 py-2 rounded-md transition-colors border border-gray-300 hover:bg-gray-50"
                                            borderColor={
                                                isDark
                                                    ? 'whiteAlpha.700'
                                                    : 'blackAlpha.700'
                                            }
                                            _hover={{
                                                bg: isDark
                                                    ? 'whiteAlpha.300'
                                                    : 'blackAlpha.300',
                                            }}
                                            onClick={() =>
                                                setIsSelectingToken(true)
                                            }
                                            leftIcon={
                                                TOKEN_LOGO_COMPONENTS[
                                                    selectedToken.symbol
                                                ] ? (
                                                    React.cloneElement(
                                                        TOKEN_LOGO_COMPONENTS[
                                                            selectedToken.symbol
                                                        ],
                                                        {
                                                            boxSize: '20px',
                                                            borderRadius:
                                                                'full',
                                                        },
                                                    )
                                                ) : (
                                                    <img
                                                        src={
                                                            TOKEN_LOGOS[
                                                                selectedToken
                                                                    .symbol
                                                            ]
                                                        }
                                                        alt={`${selectedToken.symbol} logo`}
                                                        fallback={
                                                            <div
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                <span
                                                                >
                                                                    {selectedToken.symbol.slice(
                                                                        0,
                                                                        3,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        }
                                                    />
                                                )
                                            }
                                        >
                                            {selectedToken.symbol}
                                        </button>
                                    ) : (
                                        <button className="px-4 py-2 rounded-md transition-colors border border-gray-300 hover:bg-gray-50"
                                            borderColor={
                                                isDark
                                                    ? 'whiteAlpha.700'
                                                    : 'blackAlpha.700'
                                            }
                                            _hover={{
                                                bg: isDark
                                                    ? 'whiteAlpha.300'
                                                    : 'blackAlpha.300',
                                                color: isDark
                                                    ? 'whiteAlpha.700'
                                                    : 'blackAlpha.700',
                                            }}
                                            onClick={() =>
                                                setIsSelectingToken(true)
                                            }
                                        >
                                            {t('Select token')}
                                        </button>
                                    )}
                                </div>
                                {selectedToken && (
                                    <div className="flex items-center"
                                        justifyContent={'space-between'}
                                    >
                                        <span opacity={0.5}>
                                            ≈{' '}
                                            {formattedValue}
                                        </span>
                                        <span
                                            cursor="pointer"
                                            _hover={{
                                                color: isDark
                                                    ? 'blue.300'
                                                    : 'blue.500',
                                                textDecoration: 'underline',
                                            }}
                                            onClick={handleSetMaxAmount}
                                            noOfLines={1}
                                            overflo
                                            textOverflo
                                        >
                                            {t('Send all')}
                                        </span>
                                    </div>
                                )}
                                {errors.amount && (
                                    <span
                                        data-testid="amount-error-msg"
                                    >
                                        {errors.amount.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Arrow Icon */}
                    <div
                        marginTo
                        marginBotto
                        marginX="auto"
                        zIndex={2}
                    >
                        <FiArrowDown className="w-5 h-5"
                            opacity={0.5}
                            color={isDark ? 'whiteAlpha.700' : 'gray.600'}
                         />
                    </div>

                    <div
                    >
                        <div className="flex flex-col space-y-2" widt>
                            <div isInvalid={!!errors.toAddressOrDomain}>
                                <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...register('toAddressOrDomain', {
                                        required: t('Address is required'),
                                    })}
                                    onChange={(e) => {
                                        const trimmed = e.target.value.trim();
                                        // If the input contains a dot, treat it as a domain name and normalize it
                                        const normalizedValue =
                                            trimmed.includes('.')
                                                ? ens_normalize(trimmed)
                                                : trimmed;
                                        e.target.value = normalizedValue;
                                        setValue(
                                            'toAddressOrDomain',
                                            normalizedValue,
                                            {
                                                shouldValidate: true,
                                            },
                                        );
                                    }}
                                    placeholder={t(
                                        'Type the receiver address or domain',
                                    )}
                                    _placeholder={{
                                        fontSize: 'md',
                                        fontWeight: 'normal',
                                    }}
                                    fontSize="lg"
                                    fontWeight="bold"
                                    variant="unstyled"
                                    data-testid="tx-address-input"
                                />
                                {errors.toAddressOrDomain && (
                                    <span
                                        data-testid="address-error-msg"
                                    >
                                        {errors.toAddressOrDomain.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>

            <ModalFooter>
                <button className="px-4 py-2 rounded-md transition-colors"
                    isDisabled={!selectedToken || !isValid}
                    isLoading={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    data-testid="send-button"
                >
                    {selectedToken ? t('Send') : t('Select Token')}
                </button>
            </ModalFooter>
        </>
    );
};
