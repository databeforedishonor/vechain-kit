import { useTranslation } from 'react-i18next';
import {
    StickyHeaderContainer,
    TransactionButtonAndStatus,
} from '@/components/common';
import { useUpgradeRequired, useUpgradeSmartAccount, useWallet } from '@/hooks';
import {
    UpgradeSmartAccountModalContentsTypes,
    UpgradeSmartAccountModalStyle,
} from '../UpgradeSmartAccountModal';
import { FaArrowRight } from 'react-icons/fa';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<UpgradeSmartAccountModalContentsTypes>
    >;
    handleClose: () => void;
    style?: UpgradeSmartAccountModalStyle;
}

export const UpgradeSmartAccountContent = ({
    setCurrentContent,
    handleClose,
    style,
}: Props) => {
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
                        handleClose();
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
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col" justifyContent="center">
                    <span>
                        {t(
                            'To continue interacting with VeChain blockchain and complete your operation, your smart account needs to be upgraded to the latest version (v3).',
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
                        style={style}
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
                </div>
            </ModalFooter>
        </>
    );
};
