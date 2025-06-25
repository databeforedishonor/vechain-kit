import { IoCloseCircle } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { Notification } from '@/hooks/notifications/types';
import { Analytics } from '@/utils/mixpanelClientInstance';

type Props = {
    notification: Notification;
    isArchiveView: boolean;
    onMarkAsRead: (id: string) => void;
}

export const NotificationItem = ({
    notification,
    isArchiveView,
    onMarkAsRead,
}: Props) => {
    const { t } = useTranslation();

    const handleDismiss = () => {
        Analytics.notifications.dismissed(notification.status);
        onMarkAsRead(notification.id);
    };

    if (notification.isRead && !isArchiveView) {
        return null;
    }

    return (
        <div
            key={notification.id}
            status={notification.status}
            opacity={notification.isRead ? 0.7 : 1}
            cursor="pointer"
            _hover={{ opacity: 0.8 }}
            data-testid="notification-item"
        >
            <divIcon />
            <div>
                <divTitle data-testid="notification-title">
                    {/* @ts-ignore */}
                    {t(notification.title)}
                </AlertTitle>
                <divDescription lineHeight={'1.2'} data-testid="notification-text">
                    {/* @ts-ignore */}
                    {t(notification.description)}
                </AlertDescription>
            </div>
            {!isArchiveView && !notification.isRead && (
                <button
                    right={1}
                    to
                    icon={<IoCloseCircle />}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss();
                    }}
                    aria-label="Mark as read and archive"
                    data-testid="remove-notification-button"
                />
            )}
        </div>
    );
};
