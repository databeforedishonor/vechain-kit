import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { BaseModal, StickyHeaderContainer, ModalBackButton } from '../common';
import { useMediaQuery } from '@/hooks';

export type Step<T extends string> = {
    key: T;
    content: ReactNode;
    title?: string;
    description?: string;
};

export type StepModalProps<T extends string> = {
    isOpen: boolean;
    onClose: () => void;
    steps: Step<T>[];
    goToPrevious: () => void;
    goToNext?: () => void;
    setActiveStep: (step: number) => void;
    activeStep: number;
    disableBackButton?: boolean;
    disableCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    isCloseable?: boolean;
};

export const StepModal = <T extends string>({
    isOpen,
    onClose,
    steps,
    activeStep,
    goToPrevious,
    setActiveStep,
    disableBackButton,
    disableCloseButton,
    closeOnOverlayClick = true,
    isCloseable = true,
}: StepModalProps<T>) => {
    const handleClose = () => {
        // reset the active step to 0
        setActiveStep(0);
        // close the modal
        onClose();
    };
    const isDesktop = useMediaQuery('(min-width: 1060px)');

    const currentStepContent = steps[activeStep];

    const isFirstStep = activeStep === 0;

    const showHeader =
        (!isFirstStep && !disableBackButton) ||
        currentStepContent?.title ||
        (isDesktop && !disableCloseButton);

    if (!currentStepContent) {
        return null;
    }

    const ModalCloseButton = ({ onClick }: { onClick: () => void }) => (
        <button 
            onClick={onClick}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    );

    const ModalHeader = ({ children }: { children: ReactNode }) => (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            {children}
        </div>
    );

    return (
        <BaseModal
            closeOnOverlayClick={closeOnOverlayClick}
            isOpen={isOpen}
            onClose={handleClose}
            isCloseable={isCloseable}
            blockScrollOnMount={true}
        >
            <div className="p-0 bg-transparent">
                <div className="p-0">
                    {showHeader ? (
                        <StickyHeaderContainer>
                            {currentStepContent?.title ? (
                                <ModalHeader>
                                    {currentStepContent.title}
                                </ModalHeader>
                            ) : null}

                            {!isFirstStep && !disableBackButton ? (
                                <ModalBackButton onClick={goToPrevious} />
                            ) : null}

                            {isDesktop && !disableCloseButton ? (
                                <ModalCloseButton onClick={onClose} />
                            ) : null}
                        </StickyHeaderContainer>
                    ) : null}
                    {currentStepContent?.description ? (
                        <div
                            className="text-sm md:text-base font-normal px-4"
                        >
                            {currentStepContent?.description}
                        </div>
                    ) : null}

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        key={currentStepContent.key}
                        style={{ width: '100%' }}
                    >
                        {currentStepContent.content}
                    </motion.div>
                </div>
            </div>
        </BaseModal>
    );
};
