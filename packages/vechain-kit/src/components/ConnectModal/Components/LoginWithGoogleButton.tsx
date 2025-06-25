import { FcGoogle } from 'react-icons/fc';
import { ConnectionButton } from '@/components';
import { useTranslation } from 'react-i18next';
import { useLoginWithOAuth } from '@/hooks';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { VeLoginMethod } from '@/types/mixPanel';

type Props = {
    isDark: boolean;
    gridColumn?: number;
}

export const LoginWithGoogleButton = ({ isDark, gridColumn }: Props) => {
    const { t } = useTranslation();
    const { initOAuth } = useLoginWithOAuth();

    return (
        <divItem colSpan={gridColumn ?? 4}>
            <ConnectionButton
                isDark={isDark}
                onClick={async () => {
                    Analytics.auth.flowStarted(VeLoginMethod.GOOGLE);
                    Analytics.auth.methodSelected(VeLoginMethod.GOOGLE);
                    await initOAuth({
                        provider: 'google',
                    });
                }}
                icon={FcGoogle}
                text={t('Continue with Google')}
            />
        </div>
    );
};
