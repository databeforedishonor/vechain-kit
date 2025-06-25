import {
    usePrivy,
    useWallet,
    useMfaEnrollment,
    useUpgradeRequired,
    useSetWalletRecovery,
} from '@/hooks';
import {
    ModalBackButton,
    ScrollToTopWrapper,
    StickyHeaderContainer,
} from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../../Components';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';
import { IoCogSharp } from 'react-icons/io5';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { HiOutlineShieldCheck, HiOutlineWallet } from 'react-icons/hi2';
import { GiHouseKeys } from 'react-icons/gi';
import { CrossAppConnectionSecurityCard } from '../../Components/CrossAppConnectionSecurityCard';
import { Analytics } from '@/utils/mixpanelClientInstance';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const AccessAndSecurityContent = ({ setCurrentContent }: Props) => {
    const { t } = useTranslation();

    const { exportWallet } = usePrivy();
    const { showMfaEnrollmentModal } = useMfaEnrollment();
    const { setWalletRecovery } = useSetWalletRecovery();
    const { connection, smartAccount, connectedWallet } = useWallet();

    const { data: upgradeRequired } = useUpgradeRequired(
        smartAccount?.address ?? '',
        connectedWallet?.address ?? '',
        3,
    );

    const handleUpgradeSmartAccountClick = () => {
        setCurrentContent({
            type: 'upgrade-smart-account',
            props: {
                setCurrentContent,
                initialContent: 'access-and-security',
            },
        });
    };

    return (
        <ScrollToTopWrapper>
            <StickyHeaderContainer>
                <ModalHeader>{t('Access and security')}</ModalHeader>

                <ModalBackButton
                    onClick={() => setCurrentContent('settings')}
                />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody w={'full'}>
                <div className="flex flex-col"
                >
                    <div className="flex flex-col" justifyContent="center">
                        <span
                            opacity={0.5}
                        >
                            {t(
                                'Manage your embedded wallet security settings: handle your login methods, add a passkey or back up your wallet to never lose access to your assets.',
                            )}
                        </span>
                    </div>

                    {upgradeRequired && (
                        <ActionButton
                            title={t('Upgrade Smart Account to V3')}
                            description={t(
                                'A new version is available for your account',
                            )}
                            onClick={handleUpgradeSmartAccountClick}
                            leftIcon={IoCogSharp}
                            extraContent={
                                <div
                                    minWidt
                                    height="8px"
                                    alignItems="center"
                                    justifyContent="center" />
                            }
                        />
                    )}

                    <ActionButton
                        title={t('Your embedded wallet')}
                        onClick={() => {
                            Analytics.settings.embeddedWalletViewed();
                            setCurrentContent('embedded-wallet');
                        }}
                        leftIcon={HiOutlineWallet}
                        rightIcon={MdOutlineNavigateNext}
                    />

                    {connection.isConnectedWithSocialLogin ? (
                        <div className="flex flex-col" justifyContent="center">
                            <ActionButton
                                title={t('Login methods and Passkeys')}
                                style={{
                                    borderBottomRadius: '0px',
                                }}
                                onClick={() => {
                                    setCurrentContent('privy-linked-accounts');
                                }}
                                leftIcon={GrUserAdmin}
                                rightIcon={MdOutlineNavigateNext}
                            />

                            <ActionButton
                                title={t('Backup your wallet')}
                                style={{
                                    borderTopRadius: '0px',
                                    borderBottomRadius: '0px',
                                }}
                                onClick={() => {
                                    exportWallet();
                                }}
                                leftIcon={GiHouseKeys}
                            />

                            <ActionButton
                                title={t('Manage MFA')}
                                style={{
                                    borderTopRadius: '0px',
                                    borderBottomRadius: '0px',
                                }}
                                onClick={() => {
                                    showMfaEnrollmentModal();
                                }}
                                leftIcon={HiOutlineShieldCheck}
                            />

                            <ActionButton
                                title={t('Manage Recovery')}
                                style={{
                                    borderTopRadius: '0px',
                                }}
                                onClick={() => {
                                    setWalletRecovery();
                                }}
                                leftIcon={MdOutlineSettingsBackupRestore}
                            />
                        </div>
                    ) : (
                        <CrossAppConnectionSecurityCard />
                    )}
                </div>
            </ModalBody>
            <ModalFooter pt={0} />
        </ScrollToTopWrapper>
    );
};
