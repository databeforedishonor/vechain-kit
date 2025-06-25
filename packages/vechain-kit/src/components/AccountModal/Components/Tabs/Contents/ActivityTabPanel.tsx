import { BiTransferAlt } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

export const ActivityTabPanel = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col space-y-4">
            <BiTransferAlt className="w-12 h-12"
                opacity={0.5}
                p={2}
                bg="whiteAlpha.100"
                borderRadius="xl"
             />
            <div className="flex flex-col">
                <span>
                    {t('Coming soon')}
                </span>
                <span opacity={0.5}>
                    {t('Stay tuned for our upcoming Activity feature')}
                </span>
            </div>
        </div>
    );
};
