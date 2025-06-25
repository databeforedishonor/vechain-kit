import { ModalBackButton, StickyHeaderContainer } from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { VechainEnergy } from '@/assets';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const BridgeContent = ({ setCurrentContent }: Props) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();

    const handleLaunchVeChainEnergy = () => {
        Analytics.bridge.launchVeChainEnergy();
        window.open('https://swap.vechain.energy/', '_blank');
    };

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Bridge')}</ModalHeader>
                <ModalBackButton onClick={() => setCurrentContent('main')} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <Container maxW={'container.lg'}>
                <ModalBody>
                    <div className="flex flex-col space-y-6">
                        <VechainEnergy isDark={isDark} borderRadius={'xl'} />

                        <span>
                            {t(
                                'Exchange your digital assets between VeChain and other blockchain networks easily and securely. Swaps are executed through partners that leverage both decentralized and centralized exchanges to convert tokens.',
                            )}
                        </span>
                    </div>
                </ModalBody>
            </Container>

            <ModalFooter>
                <button className="px-4 py-2 rounded-md transition-colors"
                    onClick={handleLaunchVeChainEnergy}
                >
                    {t('Launch vechain.energy')}
                    <FaExternalLinkAlt ml={2}  />
                </button>
            </ModalFooter>
        </>
    );
};
