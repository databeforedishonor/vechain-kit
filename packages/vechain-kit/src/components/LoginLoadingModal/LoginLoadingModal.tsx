import { BaseModal } from '../common/BaseModal';
import { StickyHeaderContainer } from '@/components/common';
import { MdOutlineErrorOutline, MdOutlineRefresh } from 'react-icons/md';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

interface LoginLoadingModalProps {
    isOpen: boolean;
    onClose: () => void;
    error?: string;
    title?: string;
    loadingText?: string;
    onTryAgain?: () => void;
}

export const LoginLoadingModal = ({
    isOpen,
    onClose,
    error,
    title,
    loadingText,
    onTryAgain = () => {},
}: LoginLoadingModalProps) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            trapFocus={false}
            autoFocus={false}
            backdropFilter={'blur(3px)'}
        >
            {error ? (
                <ErrorContent
                    error={error}
                    onClose={onClose}
                    onTryAgain={onTryAgain}
                />
            ) : (
                <LoadingContent
                    loadingText={loadingText}
                    title={title}
                    onTryAgain={onTryAgain}
                />
            )}
        </BaseModal>
    );
};

const LoadingContent = ({
    loadingText,
    title,
    onTryAgain,
}: {
    loadingText?: string;
    title?: string;
    onTryAgain?: () => void;
}) => {
    const { t } = useTranslation();
    const [showTimeout, setShowTimeout] = React.useState(false);

    React.useEffect(() => {
        // Keep the regular timeout for non-mobile browsers
        const timer = setTimeout(() => {
            setShowTimeout(true);
        }, 7000);

        return () => clearTimeout(timer);
    }, [isMobile]);

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{title ?? t('Connecting...')}</ModalHeader>
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col"
                    ga
                    justifyContent={'center'}
                >
                    <div />
                </div>
                {loadingText && !showTimeout && (
                    <span>
                        {loadingText}
                    </span>
                )}
                {showTimeout && (
                    <div className="flex flex-col space-y-2">
                        <span>
                            {t('This is taking longer than expected.')}
                        </span>
                        <span>
                            {t(
                                'You may want to try establishing the connection again.',
                            )}
                        </span>
                    </div>
                )}
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
                {showTimeout && (
                    <button className="px-4 py-2 rounded-md transition-colors" onClick={onTryAgain}>
                        <Icon mr={2} size={'sm'} as={MdOutlineRefresh} />
                        {t('Try again')}
                    </button>
                )}
            </ModalFooter>
        </>
    );
};

const ErrorContent = ({
    error,
    onClose,
    onTryAgain,
}: {
    error: string;
    onClose: () => void;
    onTryAgain: () => void;
}) => {
    const { t } = useTranslation();

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Connection Failed')}</ModalHeader>
                <ModalCloseButton
                    onClick={() => {
                        onClose();
                    }}
                />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col"
                    justifyContent={'center'}
                    ga
                >
                    <motion.div
                        transition={{
                            duration: 4,
                            ease: 'easeInOut',
                            repeat: Infinity,
                        }}
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                    >
                        <MdOutlineErrorOutline
                            color={'#ef4444'}
                            fontSize={'60px'}
                            opacity={0.5}
                         />
                    </motion.div>
                    <span>
                        {error}
                    </span>
                </div>
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
                <button className="px-4 py-2 rounded-md transition-colors" onClick={onTryAgain}>
                    <Icon mr={2} size={'sm'} as={MdOutlineRefresh} />
                    {t('Try again')}
                </button>
            </ModalFooter>
        </>
    );
};
