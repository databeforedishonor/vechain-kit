import { useVeChainKitConfig } from '@/providers';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo } from 'react';
import { TransactionStatusErrorType } from '@/types';
import { getConfig } from '@/config';
import { TransactionReceipt } from '@vechain/sdk-network';

export interface TransactionButtonAndStatusProps {
    isSubmitting: boolean;
    isTxWaitingConfirmation: boolean;
    onConfirm: () => void;
    onRetry?: () => void;
    transactionPendingText: string;
    txReceipt: TransactionReceipt | null;
    transactionError?: Error | TransactionStatusErrorType | null;
    isSubmitForm?: boolean;
    buttonText: string;
    isDisabled?: boolean;
    style?: {
        accentColor?: string;
    };
    onError?: (error: string) => void;
}

export const TransactionButtonAndStatus = ({
    transactionError,
    isSubmitting,
    isTxWaitingConfirmation,
    onConfirm,
    onRetry,
    transactionPendingText,
    txReceipt,
    isSubmitForm = false,
    buttonText,
    isDisabled = false,
    style,
    onError,
}: TransactionButtonAndStatusProps) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();
    const { network } = useVeChainKitConfig();

    const errorMessage = useMemo(() => {
        if (!transactionError) return null;
        return (
            (transactionError as any).reason ||
            t('Something went wrong. Please try again.')
        );
    }, [transactionError, t]);

    useEffect(() => {
        if (errorMessage) {
            onError?.(errorMessage);
        }
    }, [errorMessage, onError]);

    const buttonBg = useMemo(() => {
        if (style?.accentColor) return `${style.accentColor} !important`;
        return undefined;
    }, [style?.accentColor]);

    return (
        <div className="flex flex-col space-y-4" widt>
            {errorMessage && (
                <span
                    widt
                    data-testid="tx-send-error-msg"
                >
                    {errorMessage}
                </span>
            )}
            <button className="px-4 py-2 rounded-md transition-colors"
                onClick={() =>
                    errorMessage && onRetry ? onRetry() : onConfirm()
                }
                type={isSubmitForm ? 'submit' : 'button'}
                isLoading={isSubmitting}
                isDisabled={isDisabled}
                loadingText={
                    isTxWaitingConfirmation
                        ? t('Waiting wallet confirmation...')
                        : transactionPendingText
                }
                data-testid="confirm-button"
            >
                {errorMessage
                    ? t('Retry')
                    : buttonText
                    ? buttonText
                    : t('Confirm')}
            </button>
            {errorMessage && txReceipt?.meta.txID && (
                <a
                    isExternal
                    widt
                    href={`${getConfig(network.type).explorerUrl}/${
                        txReceipt?.meta.txID
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('View transaction on the explorer')}
                </a>
            )}
        </div>
    );
};
