import { useTranslation } from 'react-i18next';
import {
    ModalBackButton,
    StickyHeaderContainer,
    TransactionButtonAndStatus,
} from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { useUpgradeRequired, useUpgradeSmartAccount, useWallet } from '@/hooks';
import { FaArrowRight } from 'react-icons/fa';

export interface UpgradeSmartAccountContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
    handleClose?: () => void;
    initialContent?: AccountModalContentTypes;
}

export const UpgradeSmartAccountContent = ({
    setCurrentContent,
    handleClose,
    initialContent = 'access-and-security',
}: UpgradeSmartAccountContentProps) => {
    const { t } = useTranslation();
    const { smartAccount, connectedWallet } = useWallet();
    const { data: upgradeRequired } = useUpgradeRequired(
        smartAccount?.address ?? '',
        connectedWallet?.address ?? '',
        3,
    );

    // Set up the upgrade transaction
    const {
        sendTransaction: upgradeSmartAccount,
        isTransactionPending,
        isWaitingForWalletConfirmation,
        error: upgradeError,
        txReceipt,
    } = useUpgradeSmartAccount({
        smartAccountAddress: smartAccount?.address ?? '',
        targetVersion: 3,
        onSuccess: () => {
            setCurrentContent({
                type: 'successful-operation',
                props: {
                    setCurrentContent,
                    txId: txReceipt?.meta.txID,
                    title: t('Upgrade Successful!'),
                    description: t(
                        'Your account has been successfully upgraded to the latest version. You can now enjoy a better user experience, lower gas costs, and enhanced security.',
                    ),
                    onDone: () => {
                        if (handleClose) {
                            handleClose();
                        } else {
                            setCurrentContent(initialContent);
                        }
                    },
                    showSocialButtons: false,
                },
            });
        },
        onError: () => {
            console.error('Error upgrading Smart Account');
        },
    });

    // Handle the upgrade process
    const handleUpgrade = async () => {
        try {
            await upgradeSmartAccount();
        } catch (err) {
            console.error('Failed to upgrade Smart Account:', err);
        }
    };

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Account upgrade required')}</ModalHeader>
                <ModalBackButton
                    onClick={() => {
                        setCurrentContent(initialContent);
                    }}
                />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col">
                    <span>
                        {upgradeRequired
                            ? t(
                                  'Your smart account needs to be upgraded to the latest version (v3).',
                              )
                            : t(
                                  'Your smart account is already upgraded to this version.',
                              )}
                    </span>

                    <div className="flex items-center"
                        justifyContent="space-evenly"
                        rounded="md"
                    >
                        <div>
                            <Circle size="60px" bg="gray.200">
                                <img
                                    src={smartAccount?.image}
                                    alt={t('Profile Picture')}
                                    objectFit="cover" />
                            </Circle>

                            <h2
                                to
                                right="-5"
                            >
                                {`v1`}
                            </h2>
                        </div>

                        <FaArrowRight color="#3DBA67"  />

                        <div>
                            <Circle size="60px" bg="gray.200">
                                <img
                                    src={smartAccount?.image}
                                    alt={t('Profile Picture')}
                                    objectFit="cover" />
                            </Circle>
                            <h2
                                to
                                right="-5"
                            >
                                {`v3`}
                            </h2>
                        </div>
                    </div>

                    <div status="info">
                        <divIcon />
                        <div>
                            <divTitle>
                                {t('Benefits of this upgrade:')}
                            </AlertTitle>
                            <divDescription>
                                <div className="flex flex-col">
                                    <span lineHeight="1.2">
                                        • {t('Improved security features')}
                                    </span>
                                    <span>
                                        • {t('Better transaction handling')}
                                    </span>
                                    <span>
                                        •{' '}
                                        {t('Enhanced compatibility with dApps')}
                                    </span>
                                    <span>
                                        •{' '}
                                        {t('Reduced gas costs for operations')}
                                    </span>
                                </div>
                            </AlertDescription>
                        </div>
                    </div>
                </div>
            </ModalBody>

            <ModalFooter justifyContent="center">
                <div className="flex flex-col">
                    <TransactionButtonAndStatus
                        buttonText={
                            upgradeRequired
                                ? t('Upgrade account')
                                : t('Account already upgraded')
                        }
                        onConfirm={handleUpgrade}
                        isTxWaitingConfirmation={isWaitingForWalletConfirmation}
                        isSubmitting={isTransactionPending}
                        transactionPendingText={t('Upgrading...')}
                        txReceipt={txReceipt}
                        transactionError={upgradeError}
                        isDisabled={!upgradeRequired}
                    />

                    <button className="px-4 py-2 rounded-md transition-colors"
                        onClick={() => {
                            if (handleClose) {
                                handleClose();
                            } else {
                                setCurrentContent(initialContent);
                            }
                        }}
                        isDisabled={isTransactionPending}
                    >
                        {upgradeRequired
                            ? t('Close and do this later')
                            : t('Close')}
                    </button>
                </div>
            </ModalFooter>
        </>
    );
};
