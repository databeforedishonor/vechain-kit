import { useTranslation } from 'react-i18next';
import { IoCloseCircle } from 'react-icons/io5';
import { useFeatureAnnouncement } from '@/hooks/utils/useFeatureAnnouncement';
import { AccountModalContentTypes } from '../../Types';

interface FeatureAnnouncementCardProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}
export const FeatureAnnouncementCard = ({
    setCurrentContent,
}: FeatureAnnouncementCardProps) => {
    const { t } = useTranslation();
    const { isVisible, closeAnnouncement } = useFeatureAnnouncement();

    const titleColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');
    const descriptionColor = useColorModeValue(
        'blackAlpha.700',
        'whiteAlpha.700',
    );

    const handleOnClick = () => {
        setCurrentContent({
            type: 'choose-name',
            props: {
                setCurrentContent,
                onBack: () => setCurrentContent('main'),
                initialContentSource: 'main',
            },
        });
        closeAnnouncement();
    };

    if (!isVisible) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            overflo
            onClick={handleOnClick}
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"Body>
                <div className="flex items-center">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <span
                            >
                                {t('Claim your vet domain!')}
                            </span>
                            <span>
                                {t('New')}
                            </span>
                        </div>
                        <span>
                            {t(
                                'Say goodbye to 0x addresses, claim your .veworld.vet subdomain now for free!',
                            )}
                        </span>
                    </div>
                    <button
                        icon={<IoCloseCircle />}
                        onClick={(e) => {
                            e.stopPropagation();
                            closeAnnouncement();
                        }}
                        aria-label={t('Close announcement')}
                    />
                </div>
            </div>
        </div>
    );
};
