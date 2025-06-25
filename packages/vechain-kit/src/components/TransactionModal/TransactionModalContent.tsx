import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { getConfig } from '@/config';
import { GoLinkExternal } from 'react-icons/go';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineErrorOutline, MdOutlineRefresh } from 'react-icons/md';
import { ShareButtons } from './Components/ShareButtons';
import { StickyHeaderContainer } from '../common';
import { TransactionModalProps } from './TransactionModal';

type StatusConfig = {
    title: ReactNode;
    icon: ReactNode;
    description: string;
}

export const TransactionModalContent = ({
    status,
    uiConfig,
    onTryAgain,
    txReceipt,
    txError,
    onClose,
}: Omit<TransactionModalProps, 'isOpen'>) => {
    const { t } = useTranslation();
    const { network } = useVeChainKitConfig();

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
                    title:
                        uiConfig?.title ??
                        (isSendingTransaction
                            ? t('Sending Transaction...')
                            : t('Waiting for confirmation')),
                    icon: uiConfig?.loadingIcon ?? <div data-testid="pending-spinner-modal" />,
                    description: isSendingTransaction
                        ? t(
                              'Transaction is being processed, it can take up to 15 seconds.',
                          )
                        : uiConfig?.description ??
                          t('Please confirm the transaction in your wallet.'),
                };
            case 'error':
                return {
                    title: t('Something went wrong'),
                    icon: uiConfig?.errorIcon ?? (
                        <MdOutlineErrorOutline
                            color="#ef4444"
                            fontSize="100px"
                            data-testid="error-icon-modal"
                         />
                    ),
                    description:
                        errorMessage ?? t('An unexpected error occurred.'),
                };
            case 'success':
                return {
                    title: t('Transaction successful!'),
                    icon: uiConfig?.successIcon ?? (
                        <IoIosCheckmarkCircleOutline
                            color="#22c55e"
                            fontSize="100px"
                            data-testid="success-icon-modal"
                         />
                    ),
                    description: '',
                };
            case 'ready':
                return {
                    title: uiConfig?.title ?? t('Confirm transaction'),
                    icon: null,
                    description:
                        uiConfig?.description ??
                        t(
                            'Confirm the transaction in your wallet to complete it.',
                        ),
                };
            default:
                return {
                    title: '',
                    icon: null,
                    description: '',
                };
        }
    };

    const statusConfig = getStatusConfig();
    const socialDescription = `${getConfig(network.type).explorerUrl}/${
        txReceipt?.meta.txID
    }`;

    return (
        <div>
            <StickyHeaderContainer>
                <ModalHeader>{statusConfig.title}</ModalHeader>
                <ModalCloseButton
                    isDisabled={status === 'pending' && !uiConfig?.isClosable}
                />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col">
                    {statusConfig.icon}

                    {status === 'success' && uiConfig?.showShareOnSocials && (
                        <div className="flex flex-col">
                            <span
                                opacity={0.5}
                            >
                                {t('Share on')}
                            </span>
                            <ShareButtons
                                descriptionEncoded={socialDescription}
                            />
                        </div>
                    )}

                    {statusConfig.description && (
                        <span
                            style={{
                                lineBreak: 'anywhere',
                            }}
                        >
                            {statusConfig.description}
                        </span>
                    )}
                </div>
            </ModalBody>

            <ModalFooter justifyContent="center">
                <div className="flex flex-col space-y-4" widt>
                    {status === 'error' && !!onTryAgain && (
                        <button className="px-4 py-2 rounded-md transition-colors"
                            onClick={onTryAgain}
                            widt
                        >
                            <Icon mr={2} as={MdOutlineRefresh} />
                            {t('Try again')}
                        </button>
                    )}

                    {status === 'ready' && (
                        <button className="px-4 py-2 rounded-md transition-colors"
                            onClick={onTryAgain}
                            widt
                        >
                            {t('Confirm')}
                        </button>
                    )}

                    {(status === 'success' ||
                        status === 'error' ||
                        status === 'ready') && (
                        <button className="px-4 py-2 rounded-md transition-colors"
                            onClick={onClose}
                            widt
                        >
                            {t('Close')}
                        </button>
                    )}

                    {uiConfig?.showExplorerButton && txReceipt?.meta.txID && (
                        <a
                            href={`${getConfig(network.type).explorerUrl}/${
                                txReceipt?.meta.txID
                            }`}
                            isExternal
                            opacity={0.5}
                            textDecoration="underline"
                        >
                            <div className="flex items-center"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <span>
                                    {t('View transaction on the explorer')}
                                </span>
                                <Icon size="sm" as={GoLinkExternal} />
                            </div>
                        </a>
                    )}
                </div>
            </ModalFooter>
        </div>
    );
};
