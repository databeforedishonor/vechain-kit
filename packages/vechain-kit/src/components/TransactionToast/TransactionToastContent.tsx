import React, { useMemo } from 'react';
import { TransactionStatus, TransactionStatusErrorType } from '@/types';
import { FcCheckmark } from 'react-icons/fc';
import { IoCloseOutline, IoOpenOutline } from 'react-icons/io5';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useVeChainKitConfig } from '@/providers';
import { getConfig } from '@/config';
import { useTranslation } from 'react-i18next';
import { TransactionReceipt } from '@vechain/sdk-network';

interface TransactionToastContentProps {
    status: TransactionStatus;
    txReceipt: TransactionReceipt | null;
    onTryAgain: () => void;
    txError?: Error | TransactionStatusErrorType;
    description?: string;
    onClose: () => void;
};

type StatusConfig = {
    icon: React.ReactElement | null;
    title: string;
    closeDisabled: boolean;
    description?: string;
}

export const TransactionToastContent = ({
    status,
    txReceipt,
    txError,
    onTryAgain,
    description,
    onClose,
}: TransactionToastContentProps) => {
    const { t } = useTranslation();
    const { network } = useVeChainKitConfig();
    const explorerUrl = getConfig(network.type).explorerUrl;

    const errorMessage = useMemo(() => {
        if (!txError) return null;
        return (
            (txError as any).reason ||
            t('Something went wrong. Please try again.')
        );
    }, [txError, t]);

    const getStatusConfig = (): StatusConfig => {
        // overwrite status to avoid flickering
        const isSendingTransaction = status === 'waitingConfirmation';
        if (isSendingTransaction) {
            status = 'pending';
        }

        switch (status) {
            case 'pending':
                return {
                    icon: (
                        <div
                            data-testid="pending-spinner-toast" />
                    ),
                    title: isSendingTransaction
                        ? t('Processing transaction...')
                        : t('Waiting for confirmation...'),
                    closeDisabled: true,
                    description: isSendingTransaction
                        ? t(
                              'Transaction is being processed, it can take up to 15 seconds.',
                          )
                        : description ??
                          t('Please confirm the transaction in your wallet.'),
                };
            case 'error':
                return {
                    icon: (
                        <MdOutlineErrorOutline
                            color={'red.500'}
                            fontSize={'40px'}
                            data-testid="error-icon-toast"
                         />
                    ),
                    title: t('Transaction failed'),
                    closeDisabled: false,
                    description: errorMessage,
                };
            case 'success':
                return {
                    icon: (
                        <FcCheckmark
                            fontSize={'40px'}
                            data-testid="success-icon-toast"
                         />
                    ),
                    title: t('Transaction successful!'),
                    closeDisabled: false,
                    description: undefined,
                };
            case 'ready':
                return {
                    icon: null,
                    title: t('Confirm transaction'),
                    closeDisabled: false,
                    description:
                        description ??
                        t(
                            'Confirm the transaction in your wallet to complete it.',
                        ),
                };
            default:
                return {
                    icon: null,
                    title: '',
                    closeDisabled: false,
                    description: '',
                };
        }
    };

    const config = getStatusConfig();
    if (!config) return null;

    return (
        <div className="flex items-center" alignItems={'flex-start'}>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4"
                    justifyContent={'flex-start'}
                    alignItems={'flex-start'}
                >
                    {config.icon}

                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-col">
                            <h2>
                                {config.title}
                            </h2>
                            {config.description && (
                                <span>
                                    {config.description}
                                </span>
                            )}
                        </div>

                        {(status === 'error' || status === 'ready') && (
                            <button className="px-4 py-2 rounded-md transition-colors" onClick={onTryAgain}>
                                {status === 'error'
                                    ? t('Try again')
                                    : t('Confirm')}
                            </button>
                        )}

                        {txReceipt && status !== 'pending' && (
                            <a
                                isExternal
                                href={`${explorerUrl}/${txReceipt.meta.txID}`}
                            >
                                {t('View on explorer')}{' '}
                                <IoOpenOutline  />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {!config.closeDisabled && (
                <button
                    onClick={onClose}
                    aria-label="Close"
                    icon={<IoCloseOutline  />}
                />
            )}
        </div>
    );
};
