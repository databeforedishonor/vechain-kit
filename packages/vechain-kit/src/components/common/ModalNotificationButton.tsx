import React from 'react';
import { IconButton, Box } from '@/components/ui';
import { BiBell } from 'react-icons/bi';

export interface ModalNotificationButtonProps {
    onClick: () => void;
    hasUnreadNotifications?: boolean;
    className?: string;
    isDisabled?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    variant?: 'solid' | 'outline' | 'ghost';
}

export const ModalNotificationButton: React.FC<ModalNotificationButtonProps> = ({
    onClick,
    hasUnreadNotifications,
    className,
    ...props
}) => {
    return (
        <Box className={`absolute right-2.5 top-2.5 ${className || ''}`}>
            <IconButton
                aria-label="Notifications"
                icon={
                    <Box className="relative">
                        <BiBell fontSize={'20px'} />
                        {hasUnreadNotifications && (
                            <Box className="absolute -top-px -right-px min-w-2 h-2 bg-red-500 rounded-full" />
                        )}
                    </Box>
                }
                size="sm"
                variant="ghost"
                isRound={true}
                className="hover:bg-black/10 dark:hover:bg-white/10"
                onClick={onClick}
                {...props}
            />
        </Box>
    );
};
