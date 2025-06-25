import { ModalBackButton, StickyHeaderContainer } from '@/components';
import { AccountModalContentTypes } from '../../Types';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { useForm } from 'react-hook-form';
import { useCustomTokens } from '@/hooks/api/wallet/useCustomTokens';
import { humanAddress, TOKEN_LOGOS } from '@/utils';
import { IoTrashBin } from 'react-icons/io5';

export interface ManageCustomTokenContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
};

// Add form values type
type FormValues = {
    newTokenAddress: string;
}

export const ManageCustomTokenContent = ({
    setCurrentContent,
}: ManageCustomTokenContentProps) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();
    const {
        addToken,
        removeToken,
        isTokenIncluded,
        isDefaultToken,
        customTokens,
    } = useCustomTokens();

    // Form setup with validation rules
    const {
        register,
        setError,
        setValue,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<FormValues>({
        defaultValues: {
            newTokenAddress: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: FormValues) => {
        if (!data.newTokenAddress) return;

        if (
            isTokenIncluded(data.newTokenAddress) ||
            isDefaultToken(data.newTokenAddress)
        ) {
            return setError('newTokenAddress', {
                type: 'manual',
                message: t('Token already added'),
            });
        }

        try {
            await addToken(data.newTokenAddress);
            setValue('newTokenAddress', ''); // Clear the input after successful addition
        } catch (error) {
            console.error('Error adding token 2:', error);
            setError('newTokenAddress', {
                type: 'manual',
                message: t('Invalid token address'),
            });
        }
    };

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Manage Custom Tokens')}</ModalHeader>
                <ModalBackButton onClick={() => setCurrentContent('assets')} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col space-y-4">
                    {/* Input Section */}
                    <div
                    >
                        <div className="flex flex-col space-y-2">
                            <div isInvalid={!!errors.newTokenAddress}>
                                <label>
                                    {t('Token Contract Address')}
                                </label>
                                <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...register('newTokenAddress', {
                                        required: t('Address is required'),
                                        pattern: {
                                            value: /^0x[a-fA-F0-9]{40}$/,
                                            message: t(
                                                'Please enter a valid contract address',
                                            ),
                                        },
                                        validate: (value) =>
                                            /^0x[a-fA-F0-9]{40}$/.test(value) ||
                                            t('Invalid contract address'),
                                    })}
                                    onChange={(e) => {
                                        const trimmed = e.target.value.trim();
                                        e.target.value = trimmed;
                                        setValue('newTokenAddress', trimmed, {
                                            shouldValidate: true,
                                        });
                                    }}
                                    placeholder="0x..."
                                    variant="outline"
                                    fontSize="md"
                                    fontWeight="medium"
                                />
                                {errors.newTokenAddress && (
                                    <span>
                                        {errors.newTokenAddress.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Existing Tokens List */}
                    {customTokens.length > 0 && (
                        <div
                        >
                            <span>
                                {t('Existing Custom Tokens')}
                            </span>
                            <div className="flex flex-col space-y-2">
                                {customTokens.map((token) => (
                                    <div className="flex items-center"
                                        key={token.address}
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={TOKEN_LOGOS[token?.symbol]}
                                                alt={`${token.symbol} logo`}
                                                fallback={
                                                    <div
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <span
                                                        >
                                                            {token.symbol?.slice(
                                                                0,
                                                                3,
                                                            )}
                                                        </span>
                                                    </div>
                                                }
                                            />
                                            <span>
                                                {token.symbol ?? 'Unknown'}
                                            </span>
                                        </div>
                                        <span opacity={0.7}>
                                            {humanAddress(
                                                token.address ?? '',
                                                4,
                                                4,
                                            )}
                                        </span>
                                        <button className="px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
                                            onClick={() =>
                                                removeToken(token.address)
                                            }
                                        >
                                            <IoTrashBin size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </ModalBody>

            <ModalFooter>
                <button className="px-4 py-2 rounded-md transition-colors"
                    isDisabled={!isValid}
                    onClick={handleSubmit(onSubmit)}
                >
                    {t('Add Token')}
                </button>
            </ModalFooter>
        </>
    );
};
