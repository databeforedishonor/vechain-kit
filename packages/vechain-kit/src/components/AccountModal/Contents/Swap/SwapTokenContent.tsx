import { ModalBackButton, StickyHeaderContainer } from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@/utils/mixpanelClientInstance';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const SwapTokenContent = ({ setCurrentContent }: Props) => {
    const { t } = useTranslation();

    const handleLaunchBetterSwap = () => {
        Analytics.swap.launchBetterSwap();
        window.open('https://swap.tbc.vet/', '_blank');
    };

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Swap')}</ModalHeader>
                <ModalBackButton onClick={() => setCurrentContent('main')} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <Container maxW={'container.lg'}>
                <ModalBody>
                    <div className="flex flex-col space-y-6">
                        <img
                            src={
                                'https://api.gateway-proxy.vechain.org/ipfs/bafybeidvm2qibth26fzp45llucfapshw2zycmfpkebejmecn4amhbqi5qy/media/logo.png'
                            }
                            alt="swap token" />

                        <span>
                            {t(
                                "BetterSwap is VeChain's trusted decentralized exchange (DEX) for seamless token swaps. Effortlessly trade VeChain assets in a secure, fast, and user-friendly environment. Click below to get started!",
                            )}
                        </span>
                    </div>
                </ModalBody>
            </Container>

            <ModalFooter>
                <button className="px-4 py-2 rounded-md transition-colors"
                    onClick={handleLaunchBetterSwap}
                >
                    {t('Launch BetterSwap')}
                    <FaExternalLinkAlt ml={2}  />
                </button>
            </ModalFooter>
        </>
    );
};
