import { MdSwapHoriz } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';
import { AccountModalContentTypes } from '../Types';
import { useUpgradeRequired, useWallet, useTotalBalance } from '@/hooks';
import { IoMdApps, IoMdSettings } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { LuArrowDownToLine } from 'react-icons/lu';
import { RiSwap3Line } from 'react-icons/ri';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { useEffect, useState } from 'react';

type Props = {
    mt?: number;
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
};

type QuickAction = {
    icon: React.ElementType;
    label: string;
    onClick: (setCurrentContent: Props['setCurrentContent']) => void;
    isDisabled?: (hasAnyBalance: boolean) => boolean;
};

const QUICK_ACTIONS: QuickAction[] = [
    {
        icon: MdSwapHoriz,
        label: 'Swap',
        onClick: (setCurrentContent) => {
            Analytics.swap.opened();
            setCurrentContent('swap-token');
        },
    },
    {
        icon: LuArrowDownToLine,
        label: 'Receive',
        onClick: (setCurrentContent) => {
            Analytics.wallet.trackWallet('receive_qr_generated');
            setCurrentContent('receive-token');
        },
    },
    {
        icon: FiSend,
        label: 'Send',
        onClick: (setCurrentContent) =>
            setCurrentContent({
                type: 'send-token',
                props: {
                    setCurrentContent,
                    isNavigatingFromMain: true,
                },
            }),
        isDisabled: (hasAnyBalance) => !hasAnyBalance,
    },
    {
        icon: RiSwap3Line,
        label: 'Bridge',
        onClick: (setCurrentContent) => {
            Analytics.bridge.opened();
            setCurrentContent('bridge');
        },
    },
    {
        icon: IoMdApps,
        label: 'Ecosystem',
        onClick: (setCurrentContent) => {
            Analytics.ecosystem.opened();
            setCurrentContent('ecosystem');
        },
    },
    {
        icon: IoMdSettings,
        label: 'Settings',
        onClick: (setCurrentContent) => {
            Analytics.settings.opened('general');
            setCurrentContent('settings');
        },
    },
];

const QuickActionButton = ({
    icon,
    label,
    onClick,
    isDisabled,
    showRedDot,
}: {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    isDisabled?: boolean;
    showRedDot?: boolean;
}) => {
    const { t } = useTranslation();

    return (
        <button
            aria-label={label}
            isDisabled={isDisabled}
            icon={
                <div className="flex flex-col space-y-4">
                    <icon className="w-5 h-5" opacity={0.9}  />

                    <div className="flex items-center" alignItems={'baseline'}>
                        <span
                            data-testid={`${label.toLowerCase()}-button-label`}
                        >
                            {t(label, label)}
                        </span>
                        {showRedDot && (
                            <div
                                minWidt
                                height="8px"
                                alignItems="center"
                                justifyContent="center" />
                        )}
                    </div>
                </div>
            }
            onClick={onClick}
        />
    );
}

export const QuickActionsSection = ({ mt, setCurrentContent }: Props) => {
    const { account, smartAccount, connectedWallet, connection } = useWallet();
    const { hasAnyBalance } = useTotalBalance({
        address: account?.address ?? '',
    });
    const { t } = useTranslation();
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem('app-first-visit');
        setIsFirstVisit(!hasVisited);
    }, []);

    const { data: upgradeRequired } = useUpgradeRequired(
        smartAccount?.address ?? '',
        connectedWallet?.address ?? '',
        3,
    );

    const showRedDot =
        (connection.isConnectedWithPrivy && upgradeRequired) || isFirstVisit;

    return (
        <div className="flex flex-col space-y-4">
            <h2 opacity={0.5}>
                {t('Tools')}
            </h2>
            <div templateColumns="repeat(3, 1fr)" ga>
                {QUICK_ACTIONS.map((action) => (
                    <QuickActionButton
                        key={action.label}
                        icon={action.icon}
                        label={action.label}
                        onClick={() => {
                            if (isFirstVisit) {
                                localStorage.setItem('app-first-visit', 'true');
                                setIsFirstVisit(false);
                            }
                            action.onClick(setCurrentContent);
                        }}
                        isDisabled={action.isDisabled?.(hasAnyBalance)}
                        showRedDot={showRedDot && action.label === 'Settings'}
                    />
                ))}
            </div>
        </div>
    );
};
