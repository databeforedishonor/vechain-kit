import { AccountAvatar, AddressDisplay } from '@/components/common';
import { useWallet, useWalletMetadata } from '@/hooks';
import { FaEdit, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { getPicassoImage } from '@/utils';
import { useVeChainKitConfig } from '@/providers';
import { cn } from '@/utils/cn';

export interface ProfileCardProps {
    address: string;
    onEditClick?: () => void;
    onLogout?: () => void;
    showHeader?: boolean;
    showLinks?: boolean;
    showDescription?: boolean;
    showDisplayName?: boolean;
    showEdit?: boolean;
    style?: {
        card?: React.CSSProperties;
        body?: React.CSSProperties;
        footer?: React.CSSProperties;
    };
}

export const ProfileCard = ({
    onEditClick,
    address,
    showHeader = true,
    onLogout,
    showLinks = true,
    showDescription = true,
    showDisplayName = true,
    showEdit = true,
    style,
}: ProfileCardProps) => {
    const { t } = useTranslation();
    const { account } = useWallet();
    const { network } = useVeChainKitConfig();

    const metadata = useWalletMetadata(address, network.type);

    const headerImageSvg = getPicassoImage(address);

    const isConnectedAccount = address === account?.address;

    const hasLinks =
        metadata?.records?.url ||
        metadata?.records?.['com.x'] ||
        metadata?.records?.email;

    return (
        <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            style={style?.card}
        >
            <div
                className="p-0 relative h-20 w-full rounded-t-lg"
                style={{
                    backgroundSize: '100% !important',
                    backgroundPosition: 'center',
                    background: showHeader ? `no-repeat url('${headerImageSvg}')` : 'none'
                }}
            />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2">
                <AccountAvatar
                    wallet={{
                        address,
                        domain: metadata?.domain,
                        image: metadata?.image,
                        isLoadingMetadata: metadata?.isLoading,
                        metadata: metadata?.records,
                    }}
                    props={{
                        width: '120px',
                        height: '120px',
                    }}
                />
            </div>
            <div 
                className="mt-15 p-6 bg-transparent border-none"
                style={style?.body}
            >
                <div className="w-full flex flex-col space-y-2">
                    {showDisplayName && metadata?.records?.display && (
                        <h2
                            className="text-xl font-bold w-full text-center mt-2"
                            data-testid="display-name-val"
                        >
                            {metadata?.records?.display}
                        </h2>
                    )}

                    {showDescription && metadata?.records?.description && (
                        <p
                            className="text-sm opacity-70 w-full text-center"
                            data-testid="description-val"
                        >
                            {metadata?.records?.description}
                        </p>
                    )}

                    {showLinks && hasLinks && (
                        <div className="w-full flex justify-center space-x-5 mt-4">
                            {metadata?.records?.email && (
                                <a
                                    href={`mailto:${metadata?.records?.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="mail-link"
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                >
                                    <FaEnvelope />
                                </a>
                            )}
                            {metadata?.records?.url && (
                                <a
                                    href={metadata?.records?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="website-link"
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                >
                                    <FaGlobe />
                                </a>
                            )}
                            {metadata?.records?.['com.x'] && (
                                <a
                                    href={`https://x.com/${metadata?.records?.['com.x']}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="twitter-link"
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                >
                                    <FaXTwitter />
                                </a>
                            )}
                        </div>
                    )}

                    <AddressDisplay
                        wallet={{
                            address,
                            domain: metadata?.domain,
                            image: metadata?.image,
                            isLoadingMetadata: metadata?.isLoading,
                            metadata: metadata?.records,
                        }}
                        className="mt-4"
                        fromScreen="profile"
                    />
                </div>
            </div>
            {isConnectedAccount && showEdit && (
                <div 
                    className="flex justify-between p-6"
                    style={style?.footer}
                >
                    <div className="w-full flex flex-col justify-between space-y-4">
                        <hr className="border-gray-200 dark:border-gray-600" />
                        <div className="w-full flex justify-between space-x-4">
                            <button
                                className={cn(
                                    "md h-10 w-full px-4 py-2 rounded-md",
                                    "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700",
                                    "text-gray-700 dark:text-gray-300",
                                    "flex items-center justify-center space-x-2 transition-colors"
                                )}
                                onClick={onEditClick ?? (() => {})}
                                data-testid="customize-button"
                            >
                                <FaEdit />
                                <span>{t('Customize')}</span>
                            </button>
                            <button
                                className={cn(
                                    "md h-10 w-full px-4 py-2 rounded-md",
                                    "bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20",
                                    "text-red-600 dark:text-red-400",
                                    "flex items-center justify-center space-x-2 transition-colors"
                                )}
                                onClick={onLogout}
                                data-testid="logout-button"
                            >
                                <RiLogoutBoxLine />
                                <span>{t('Logout')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
