import { useWallet } from '@/hooks';
import { humanAddress, humanDomain } from '@/utils';
import { AssetIcons } from './AssetIcons';
import { WalletDisplayVariant } from './types';

interface WalletDisplayProps {
    variant: WalletDisplayVariant;
}

export const WalletDisplay = ({ variant }: WalletDisplayProps) => {
    const { account } = useWallet();

    if (!account) return <div />;

    if (variant === 'icon') {
        return null;
    }

    if (variant === 'iconAndDomain') {
        return account.domain ? (
            <span>
                {humanDomain(account?.domain ?? '', 16, 0)}
            </span>
        ) : (
            <span>
                {humanAddress(account.address ?? '', 6, 4)}
            </span>
        );
    }

    if (variant === 'iconDomainAndAssets') {
        return (
            <div className="flex items-center space-x-4">
                <div className="flex flex-col" alignItems="flex-start">
                    {account.domain && (
                        <span>
                            {humanDomain(account?.domain ?? '', 16, 0)}
                        </span>
                    )}
                    <span
                        opacity={account.domain ? 0.5 : 1}
                        data-testid="trimmed-address"
                    >
                        {humanAddress(account.address ?? '', 4, 4)}
                    </span>
                </div>
                <AssetIcons address={account.address ?? ''} maxIcons={3} />
            </div>
        );
    }

    return (
        <div className="flex flex-col" alignItems="flex-start">
            {account.domain && (
                <span>
                    {humanDomain(account?.domain ?? '', 16, 0)}
                </span>
            )}
            <span
                opacity={account.domain ? 0.5 : 1}
            >
                {humanAddress(account.address ?? '', 4, 4)}
            </span>
        </div>
    );
};
