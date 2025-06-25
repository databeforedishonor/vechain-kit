import { Box } from '@/components/ui';
import { TransactionStatus, TransactionStatusErrorType } from '@/types';
import { useVeChainKitConfig, VechainKitThemeProvider } from '@/providers';
import { TransactionToastContent } from './TransactionToastContent';
import { TransactionReceipt } from '@vechain/sdk-network';

export type TransactionToastProps = {
    isOpen: boolean;
    onClose: () => void;
    status: TransactionStatus;
    txReceipt: TransactionReceipt | null;
    onTryAgain: () => void;
    txError?: Error | TransactionStatusErrorType;
    description?: string;
};

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
            <Box
                className={`
                    fixed bottom-5 left-5 z-[11111] 
                    ${isDark ? 'bg-[#1f1f1e]' : 'bg-white'} 
                    rounded-md p-5 shadow-lg 
                    max-w-sm min-w-[300px]
                `}
            >
                <TransactionToastContent
                    status={status}
                    txReceipt={txReceipt}
                    txError={txError}
                    onTryAgain={onTryAgain}
                    description={description}
                    onClose={onClose}
                />
            </Box>
        </VechainKitThemeProvider>
    );
};
