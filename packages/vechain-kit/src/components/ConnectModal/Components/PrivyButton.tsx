import { CiCircleMore } from 'react-icons/ci';
import { ConnectionButton } from '@/components';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from 'react-icons/io';

interface Props {
    isDark: boolean;
    onViewMoreLogin: () => void;
    gridColumn?: number;
}

export const PrivyButton = ({ isDark, onViewMoreLogin, gridColumn }: Props) => {
    const { t } = useTranslation();
    return (
        <div className="w-full" style={{ gridColumn: `span ${gridColumn || 1}` }}>
            <ConnectionButton
                isDark={isDark}
                onClick={onViewMoreLogin}
                icon={CiCircleMore}
                text={gridColumn && gridColumn >= 2 ? t('More') : undefined}
                rightIcon={<IoIosArrowForward />}
            />
        </div>
    );
};
