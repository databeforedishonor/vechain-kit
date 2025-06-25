import { MdEmail } from 'react-icons/md';
import { BaseModal, StickyHeaderContainer } from '../common';
import { useEffect, useState } from 'react';
import { useCreateWallet, useLoginWithEmail } from '@privy-io/react-auth';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';

type Props = {
    email: string;
    onResend: () => void;
    isLoading: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export const EmailCodeVerificationModal = ({
    email,
    onResend,
    isLoading,
    isOpen,
    onClose,
}: Props) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { createWallet } = useCreateWallet();
    const { loginWithCode } = useLoginWithEmail({
        onComplete: async ({ isNewUser }) => {
            // When using initOAuth Privy does not create an embedded wallet automatically.
            // So we need to create a wallet manually.
            if (isNewUser) {
                await createWallet();
            }
        },
    });

    useEffect(() => {
        if (code.length === 6) {
            loginWithCode({ code })
                .then(() => {
                    onClose();
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    }, [code]);

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} trapFocus={false}>
            <StickyHeaderContainer>
                <ModalHeader alignItems={'center'} display={'flex'} gap={2}>
                    {t('Enter confirmation code')}
                </ModalHeader>
                <ModalCloseButton />
            </StickyHeaderContainer>

            <Container maxW={'container.lg'}>
                <ModalBody>
                    <div className="flex flex-col space-y-2">
                        <MdEmail
                            w="48px"
                            h="48px"
                            color={isDark ? 'whiteAlpha.700' : 'gray.600'}
                         />

                        <span
                        >
                            {t(
                                'Please check {{email}} for an email from privy.io and enter your code below.',
                                {
                                    email,
                                },
                            )}
                        </span>
                        <div className="flex items-center space-x-2">
                            <PinInput
                                value={code}
                                onChange={setCode}
                                otp
                                size="lg"
                                isInvalid={!!error}
                                errorBorderColor="#ef4444"
                            >
                                <PinInputField
                                    borderRadius="12px"
                                    border={`1px solid ${
                                        isDark ? '#ffffff29' : '#ebebeb'
                                    }`}
                                    _hover={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff40' : '#e0e0e0'
                                        }`,
                                    }}
                                    _focus={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff60' : '#d0d0d0'
                                        }`,
                                        boxShadow: 'none',
                                    }}
                                    backgroundColor={
                                        isDark ? 'transparent' : '#ffffff'
                                    }
                                />
                                <PinInputField
                                    borderRadius="12px"
                                    border={`1px solid ${
                                        isDark ? '#ffffff29' : '#ebebeb'
                                    }`}
                                    _hover={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff40' : '#e0e0e0'
                                        }`,
                                    }}
                                    _focus={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff60' : '#d0d0d0'
                                        }`,
                                        boxShadow: 'none',
                                    }}
                                    backgroundColor={
                                        isDark ? 'transparent' : '#ffffff'
                                    }
                                />
                                <PinInputField
                                    borderRadius="12px"
                                    border={`1px solid ${
                                        isDark ? '#ffffff29' : '#ebebeb'
                                    }`}
                                    _hover={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff40' : '#e0e0e0'
                                        }`,
                                    }}
                                    _focus={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff60' : '#d0d0d0'
                                        }`,
                                        boxShadow: 'none',
                                    }}
                                    backgroundColor={
                                        isDark ? 'transparent' : '#ffffff'
                                    }
                                />
                                <PinInputField
                                    borderRadius="12px"
                                    border={`1px solid ${
                                        isDark ? '#ffffff29' : '#ebebeb'
                                    }`}
                                    _hover={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff40' : '#e0e0e0'
                                        }`,
                                    }}
                                    _focus={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff60' : '#d0d0d0'
                                        }`,
                                        boxShadow: 'none',
                                    }}
                                    backgroundColor={
                                        isDark ? 'transparent' : '#ffffff'
                                    }
                                />
                                <PinInputField
                                    borderRadius="12px"
                                    border={`1px solid ${
                                        isDark ? '#ffffff29' : '#ebebeb'
                                    }`}
                                    _hover={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff40' : '#e0e0e0'
                                        }`,
                                    }}
                                    _focus={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff60' : '#d0d0d0'
                                        }`,
                                        boxShadow: 'none',
                                    }}
                                    backgroundColor={
                                        isDark ? 'transparent' : '#ffffff'
                                    }
                                />
                                <PinInputField
                                    borderRadius="12px"
                                    border={`1px solid ${
                                        isDark ? '#ffffff29' : '#ebebeb'
                                    }`}
                                    _hover={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff40' : '#e0e0e0'
                                        }`,
                                    }}
                                    _focus={{
                                        border: `1px solid ${
                                            isDark ? '#ffffff60' : '#d0d0d0'
                                        }`,
                                        boxShadow: 'none',
                                    }}
                                    backgroundColor={
                                        isDark ? 'transparent' : '#ffffff'
                                    }
                                />
                            </PinInput>
                        </div>
                        {error && (
                            <span>
                                {error}
                            </span>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <span
                    >
                        {t("Didn't get an email?")}{' '}
                        <button className="px-4 py-2 rounded-md transition-colors"
                            onClick={onResend}
                            isLoading={isLoading}
                        >
                            {t('Resend code')}
                        </button>
                    </span>
                </ModalFooter>
            </Container>
        </BaseModal>
    );
};
