import { StickyHeaderContainer } from '@/components/common';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { motion } from 'framer-motion';
import { getConfig } from '@/config';
import { GoLinkExternal } from 'react-icons/go';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { ShareButtons } from '@/components/TransactionModal';
import { UpgradeSmartAccountModalContentsTypes } from '../UpgradeSmartAccountModal';

export interface SuccessfulOperationContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<UpgradeSmartAccountModalContentsTypes>
    >;
    txId?: string;
    title: string;
    description?: string;
    onDone: () => void;
    showSocialButtons?: boolean;
}

export const SuccessfulOperationContent = ({
    txId,
    title,
    description,
    onDone,
    showSocialButtons = false,
}: SuccessfulOperationContentProps) => {
    const { t } = useTranslation();
    const { network, darkMode } = useVeChainKitConfig();
    const explorerUrl = getConfig(network.type).explorerUrl;
    const socialDescription = `${explorerUrl}/${txId}`;

    return (
        <div>
            <StickyHeaderContainer>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col">
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
                        <IoIosCheckmarkCircleOutline
                            fontSize={'100px'}
                            color={darkMode ? '#00ff45de' : '#10ba3e'}
                         />
                    </motion.div>

                    {description && (
                        <span>
                            {description}
                        </span>
                    )}

                    {showSocialButtons && txId && (
                        <div className="flex flex-col">
                            <span>{t('Share on')}</span>
                            <ShareButtons
                                descriptionEncoded={socialDescription}
                            />
                        </div>
                    )}
                </div>
            </ModalBody>

            <ModalFooter justifyContent={'center'}>
                <div className="flex flex-col space-y-4" widt>
                    <button className="px-4 py-2 rounded-md transition-colors"
                        onClick={onDone}
                        widt
                    >
                        {t('Done')}
                    </button>

                    {txId && (
                        <a
                            href={`${explorerUrl}/${txId}`}
                            isExternal
                            opacity={0.5}
                            textDecoration={'underline'}
                        >
                            <div className="flex items-center"
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <span>
                                    {t('View transaction on the explorer')}
                                </span>
                                <Icon size={16} as={GoLinkExternal} />
                            </div>
                        </a>
                    )}
                </div>
            </ModalFooter>
        </div>
    );
};
