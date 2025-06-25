import {
    AddressDisplay,
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { useCrossAppConnectionCache, useWallet } from '@/hooks';
import { getPicassoImage } from '@/utils';
import { useTranslation } from 'react-i18next';
import { AccountModalContentTypes } from '../../Types';
import { IoOpenOutline } from 'react-icons/io5';
import { WalletSecuredBy } from '../ConnectionDetails/Components';
import { useVeChainKitConfig } from '@/providers';

type Props = {
    setCurrentContent: (content: AccountModalContentTypes) => void;
}

export const EmbeddedWalletContent = ({ setCurrentContent }: Props) => {
    const { t } = useTranslation();
    const { connectedWallet, connection } = useWallet();
    const walletImage = getPicassoImage(connectedWallet?.address ?? '');
    const { getConnectionCache } = useCrossAppConnectionCache();
    const connectionCache = getConnectionCache();
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('Embedded wallet')}</ModalHeader>

                <ModalBackButton
                    onClick={() => setCurrentContent('access-and-security')}
                />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody w={'full'}>
                <div className="flex flex-col"
                >
                    <div className="flex flex-col">
                        <img
                            src={walletImage} />
                        <AddressDisplay
                            wallet={connectedWallet}
                            style={{ mt: 2 }}
                            showHumanAddress={false}
                            fromScreen="account"
                        />
                    </div>

                    {connection.isConnectedWithCrossApp && (
                        <>
                            <span opacity={0.5}>
                                {t(
                                    'This is your main wallet, created by {{element}} and secured by Privy.',
                                    {
                                        element:
                                            connectionCache?.ecosystemApp?.name,
                                    },
                                )}
                            </span>

                            <span opacity={0.5}>
                                {t(
                                    'This wallet is the owner of your smart account, which is used as your identity and as a gateway for your blockchain interactions.',
                                )}
                            </span>
                            <span opacity={0.5}>
                                {t(
                                    'Please be sure to keep this wallet safe and backed up.',
                                )}
                            </span>
                        </>
                    )}

                    {connection.isConnectedWithSocialLogin && (
                        <>
                            <span opacity={0.5}>
                                {t(
                                    'You are using an Embedded Wallet secured by your social login method, ensuring a seamless VeChain experience.',
                                )}
                            </span>

                            <span opacity={0.5}>
                                {t(
                                    'This wallet is the owner of your smart account, which is used as your identity and as a gateway for your blockchain interactions.',
                                )}
                            </span>
                            <span opacity={0.5}>
                                {t(
                                    'We highly recommend exporting your private key to back up your wallet. This ensures you can restore it if needed or transfer it to self-custody using',
                                )}
                                <a
                                    href="https://www.veworld.net/"
                                    isExternal
                                    textDecoration={'underline'}
                                >
                                    {' '}
                                    {t('VeWorld Wallet')}
                                    <Icon ml={1} as={IoOpenOutline} />
                                </a>
                                .
                            </span>
                            <span opacity={0.5}>
                                {t('Click')}{' '}
                                <a
                                    href="https://docs.vechainkit.vechain.org/vechain-kit/embedded-wallets"
                                    isExternal
                                    textDecoration={'underline'}
                                >
                                    {t('here')}
                                </a>{' '}
                                {t('to learn more about embedded wallets.')}
                            </span>
                        </>
                    )}
                </div>
            </ModalBody>
            <ModalFooter w={'full'}>
                <div className="flex flex-col">
                    <hr />
                    {connection.isConnectedWithPrivy && <WalletSecuredBy />}
                </div>
            </ModalFooter>
        </ScrollToTopWrapper>
    );
};
