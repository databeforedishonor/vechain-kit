import { ElementType } from 'react';
import { humanAddress, humanDomain } from '@/utils';
import { useTranslation } from 'react-i18next';
import { Wallet } from '@/types';
import { useVeChainKitConfig } from '@/providers';
import { cn } from '@/utils/cn';

interface AccountDetailsButtonProps {
    title: string;
    wallet: Wallet;
    onClick: () => void;
    leftIcon?: ElementType;
    rightIcon?: ElementType;
    leftImage?: string;
    backgroundColor?: string;
    border?: string;
    isActive?: boolean;
}

export const AccountDetailsButton = ({
    leftIcon,
    rightIcon,
    title,
    wallet,
    onClick,
    leftImage,
    isActive = false,
}: AccountDetailsButtonProps) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();

    const LeftIcon = leftIcon;
    const RightIcon = rightIcon;

    return (
        <button
            className={cn(
                "w-full min-h-[70px] h-fit py-4 px-4 rounded-md border transition-colors",
                "flex items-center justify-between",
                "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
                isDark ? "border-white/20" : "border-gray-200"
            )}
            onClick={onClick}
        >
            <div className="w-full flex justify-between items-center">
                <div className="min-w-[40px] flex justify-center">
                    {leftImage ? (
                        <img
                            src={leftImage}
                            className="w-7 h-7"
                            alt="left-image"
                        />
                    ) : (
                        LeftIcon && <LeftIcon className="text-[28px]" />
                    )}
                </div>
                <div className="flex flex-col w-full flex-1 text-left ml-3">
                    <div className="w-full flex items-center justify-start space-x-2">
                        <span className="text-sm font-normal">
                            {title}
                        </span>
                    </div>
                    <span className="text-sm font-medium opacity-50 break-words whitespace-normal w-full text-left">
                        {wallet?.domain
                            ? humanDomain(wallet?.domain ?? '', 18, 0)
                            : humanAddress(wallet?.address ?? '', 6, 4)}
                    </span>
                </div>
                <div className="min-w-[40px] flex flex-col justify-end">
                    <div className="flex justify-end items-center min-w-[40px] space-x-2">
                        {isActive && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-md">
                                {t('Active')}
                            </span>
                        )}
                        {RightIcon && <RightIcon className="text-xl opacity-50" />}
                    </div>
                </div>
            </div>
        </button>
    );
};
