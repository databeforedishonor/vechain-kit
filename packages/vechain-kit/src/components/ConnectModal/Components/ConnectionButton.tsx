import { ReactElement } from 'react';
import { IconType } from 'react-icons';

interface ConnectionButtonProps {
    isDark: boolean;
    onClick: () => void;
    text?: string;
    icon?: IconType;
    customIcon?: ReactElement;
    rightIcon?: ReactElement;
    style?: ButtonProps;
    variant?: string;
    iconWidth?: string;
}

export const ConnectionButton = ({
    onClick,
    text,
    icon,
    customIcon,
    rightIcon,
    style,
    variant = 'loginIn',
    iconWidth = '25px',
}: ConnectionButtonProps) => {
    // If text not provided we just show a button with an icon
    if (!text) {
        return (
            <button className="px-4 py-2 rounded-md transition-colors" {...style} onClick={onClick}>
                {customIcon ? (
                    customIcon
                ) : (
                    <icon w={'20px'} h={'20px'}  />
                )}
            </button>
        );
    }

    if (text) {
        return (
            <button className="px-4 py-2 rounded-md transition-colors" {...style} onClick={onClick}>
                <div className="flex items-center" ga>
                    {customIcon ? (
                        customIcon
                    ) : (
                        <icon w={iconWidth} h={iconWidth}  />
                    )}
                    <span opacity={0.9}>{text}</span>
                </div>
                {rightIcon}
            </button>
        );
    }

    return null;
};
