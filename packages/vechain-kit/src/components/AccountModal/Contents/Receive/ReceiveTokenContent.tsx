import { QRCode } from 'react-qrcode-logo';
import {
    ModalBackButton,
    StickyHeaderContainer,
    AddressDisplay,
} from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { useWallet } from '@/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const ReceiveTokenContent = ({ setCurrentContent }: Props) => {
    const { t } = useTranslation();
    const { account } = useWallet();

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader>{t('Receive')}</ModalHeader>
                <ModalBackButton onClick={() => setCurrentContent('main')} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <Container maxW={'container.lg'}>
                <ModalBody>
                    <div className="flex flex-col space-y-6">
                        <QRCode
                            value={account?.address ?? ''}
                            size={200}
                            removeQrCodeBehindLogo={true}
                            eyeRadius={4}
                            logoPaddingStyle={'circle'}
                            style={{
                                borderRadius: '16px',
                            }}
                        />

                        <AddressDisplay
                            wallet={account}
                            style={{ w: '85%' }}
                            fromScreen="receive"
                        />

                        <span>
                            {t('Copy your address or scan this QR code')}
                        </span>

                        <span opacity={0.5}>
                            {t('This address only supports VeChain assets.')}
                        </span>
                    </div>
                </ModalBody>
                <ModalFooter pt={0} />
            </Container>
        </>
    );
};
