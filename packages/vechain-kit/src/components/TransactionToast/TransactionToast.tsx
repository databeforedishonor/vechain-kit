import { TransactionStatus, TransactionStatusErrorType } from '@/types';
import { useVeChainKitConfig, VechainKitThemeProvider } from '@/providers';
import { TransactionToastContent } from './TransactionToastContent';
import { TransactionReceipt } from '@vechain/sdk-network';

export interface TransactionToastProps {
    isOpen: boolean;
    onClose: () => void;
    status: TransactionStatus;
    txReceipt: TransactionReceipt | null;
    onTryAgain: () => void;
    txError?: Error | TransactionStatusErrorType;
    description?: string;
}

export const TransactionToast = ({
    isOpen,
    onClose,
    status,
    txReceipt,
    txError,
    onTryAgain,
    description,
}: TransactionToastProps) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    if (!isOpen) return null;

    return (
        <VechainKitThemeProvider darkMode={isDark}>
            <div
                botto
                left="5"
                zIndex="11111"
                boxShado
            >
                <TransactionToastContent
                    status={status}
                    txReceipt={txReceipt}
                    txError={txError}
                    onTryAgain={onTryAgain}
                    description={description}
                    onClose={onClose}
                />
            </div>
        </VechainKitThemeProvider>
    );
};
