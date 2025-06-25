import { useLoginWithEmail } from '@privy-io/react-auth';
import { useState } from 'react';
import { LuMail } from 'react-icons/lu';
import { EmailCodeVerificationModal } from '../../EmailCodeVerificationModal/EmailCodeVerificationModal';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { VeLoginMethod } from '@/types/mixPanel';

export const EmailLoginButton = () => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();

    // Email login
    const [email, setEmail] = useState('');

    const { sendCode, state: emailState } = useLoginWithEmail({});

    const emailCodeVerificationModal = useDisclosure();

    const handleSendCode = async () => {
        Analytics.auth.flowStarted(VeLoginMethod.EMAIL);
        Analytics.auth.methodSelected(VeLoginMethod.EMAIL);
        await sendCode({ email });
        // onClose();
        emailCodeVerificationModal.onOpen();
    };

    return (
        <>
            <divItem colSpan={4}>
                <div className="flex flex-col">
                    <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"Group>
                        <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"LeftElement
                            pointerEvents="none"
                            height="100%"
                        >
                            <LuMail
                                color={
                                    isDark ? 'whiteAlpha.600' : 'blackAlpha.700'
                                }
                                w={'20px'}
                                h={'20px'}
                             />
                        </div>
                        <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t('your@email.com')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant={'loginIn'}
                            fontSize={'16px'}
                            fontWeight={'400'}
                            backgroundColor={isDark ? 'transparent' : '#ffffff'}
                            border={`1px solid ${
                                isDark ? '#ffffff0a' : '#ebebeb'
                            }`}
                            p={6}
                            borderRadius={16}
                            w={'full'}
                            pl={12}
                        />
                        <button className="px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
                            aria-label="Send code"
                            right={2}
                            to
                            transfor
                            zIndex={2}
                            isLoading={emailState.status === 'sending-code'}
                            onClick={handleSendCode}
                        >
                            {t('Submit')}
                        </button>
                    </div>
                </div>
            </div>

            <EmailCodeVerificationModal
                isOpen={emailCodeVerificationModal.isOpen}
                onClose={emailCodeVerificationModal.onClose}
                onResend={() => sendCode({ email })}
                email={email}
                isLoading={emailState.status === 'sending-code'}
            />
        </>
    );
};
