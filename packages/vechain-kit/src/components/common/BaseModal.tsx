import { VechainKitThemeProvider } from '@/providers';
import { Modal } from '@/components/ui';
import { ReactNode } from 'react';
import { useVeChainKitConfig } from '@/providers';

type BaseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
    isCentered?: boolean;
    motionPreset?: 'slideInBottom' | 'none'; // Keep for compatibility but not used
    trapFocus?: boolean; // Keep for compatibility but not used
    closeOnOverlayClick?: boolean;
    blockScrollOnMount?: boolean;
    autoFocus?: boolean; // Keep for compatibility but not used
    initialFocusRef?: React.RefObject<HTMLElement>; // Keep for compatibility but not used
    allowExternalFocus?: boolean; // Keep for compatibility but not used
    backdropFilter?: string;
    isCloseable?: boolean;
};

export const BaseModal = ({
    isOpen,
    onClose,
    children,
    size = 'sm',
    isCentered = true,
    closeOnOverlayClick = true,
    blockScrollOnMount = true,
    backdropFilter,
    isCloseable = true,
}: BaseModalProps) => {
    const { darkMode } = useVeChainKitConfig();

    const handleClose = () => {
        if (isCloseable) {
            onClose();
        }
    };

    return (
        <VechainKitThemeProvider darkMode={darkMode}>
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                size={size}
                isCentered={isCentered}
                closeOnOverlayClick={closeOnOverlayClick && isCloseable}
                preventScrolling={blockScrollOnMount}
                className="z-50"
            >
                <div
                    className="w-full max-h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden"
                    style={{ backdropFilter }}
                >
                    {children}
                </div>
            </Modal>
        </VechainKitThemeProvider>
    );
};
