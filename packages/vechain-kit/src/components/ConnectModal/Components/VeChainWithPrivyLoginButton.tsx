import { VechainLogoDark, VechainLogoLight } from '@/assets';
import { ConnectionButton, SocialIcons } from '@/components';
import { usePrivy } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';

interface Props {
    isDark: boolean;
    gridColumn?: number;
}

/// This button is used to login with VeChain using Privy on
/// platforms like VeBetterDAO and VeChain Kit Homepage.
/// It is a very specific scenario.
export const VeChainWithPrivyLoginButton = ({ isDark, gridColumn }: Props) => {
    const { t } = useTranslation();
    const { login: viewMoreLogin } = usePrivy();

    return (
        <div className="w-full" style={{ gridColumn: `span ${gridColumn || 4}` }}>
            <ConnectionButton
                isDark={isDark}
                onClick={viewMoreLogin}
                icon={
                    isDark
                        ? (VechainLogoLight as IconType)
                        : (VechainLogoDark as IconType)
                }
                text={t('Use social login with VeChain')}
                variant={'loginWithVechain'}
                rightIcon={<SocialIcons />}
            />
        </div>
    );
};
