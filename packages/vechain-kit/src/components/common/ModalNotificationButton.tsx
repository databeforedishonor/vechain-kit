import { BiBell } from 'react-icons/bi';

interface NotificationButtonProps {
    onClick: () => void;
    hasUnreadNotifications?: boolean;
} & Partial<buttonProps>;

export const ModalNotificationButton = ({
    onClick,
    hasUnreadNotifications,
    ...props
}: NotificationButtonProps) => {
    return (
        <button
            aria-label="Notifications"
            _hover={{ bg: 'blackAlpha.100' }}
            _dark={{ _hover: { bg: 'whiteAlpha.100' } }}
            left="10px"
            to
            onClick={onClick}
            icon={
                <div>
                    <BiBell fontSize={'20px'} />
                    {hasUnreadNotifications && (
                        <div
                            to
                            right="-1px"
                            minWidt
                            height="8px" />
                    )}
                </div>
            }
            {...props}
        />
    );
};
