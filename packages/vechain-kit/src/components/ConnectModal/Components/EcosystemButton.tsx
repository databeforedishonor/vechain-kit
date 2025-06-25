import { EcosystemModal } from '@/components';
import { useTranslation } from 'react-i18next';
import { PrivyAppInfo } from '@/types';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { VeLoginMethod } from '@/types/mixPanel';

type Props = {
    isDark: boolean;
    appsInfo: PrivyAppInfo[];
    isLoading: boolean;
    gridColumn?: number;
}

export const EcosystemButton = ({ appsInfo, isLoading }: Props) => {
    const { t } = useTranslation();
    const ecosystemModal = useDisclosure();

    const handleEcosystemClick = () => {
        Analytics.auth.flowStarted(VeLoginMethod.ECOSYSTEM);
        Analytics.auth.methodSelected(VeLoginMethod.ECOSYSTEM);
        ecosystemModal.onOpen();
    };

    return (
        <>
            {/* <divItem colSpan={gridColumn}> */}
            {/* <ConnectionButton
                isDark={isDark}
                onClick={handleEcosystemClick}
                icon={AiOutlineUser}
                text={
                    gridColumn && gridColumn >= 2
                        ? t('Other options')
                        : undefined
                }
                rightIcon={<IoIosArrowForward  />}
            /> */}
            {/* </div> */}

            <button className="px-4 py-2 rounded-md transition-colors"
                onClick={handleEcosystemClick}
            >
                {t('Already have an x2earn app wallet?')}
            </button>

            <EcosystemModal
                isOpen={ecosystemModal.isOpen}
                onClose={ecosystemModal.onClose}
                appsInfo={appsInfo}
                isLoading={isLoading}
            />
        </>
    );
};
