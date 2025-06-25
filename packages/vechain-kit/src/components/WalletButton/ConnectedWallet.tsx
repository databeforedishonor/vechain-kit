import { useWallet } from '@/hooks';
import { AccountAvatar } from '../common';
import { WalletButtonProps } from './WalletButton';
import { WalletDisplay } from './WalletDisplay';

type ConnectedWalletProps = WalletButtonProps & {
    onOpen: () => void;
}

export const ConnectedWallet = ({
    mobileVariant = 'iconAndDomain',
    desktopVariant = 'iconAndDomain',
    onOpen,
    buttonStyle = {},
}: ConnectedWalletProps) => {
    const { account } = useWallet();
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <button className="px-4 py-2 rounded-md transition-colors"
            {...buttonStyle}
            onClick={onOpen}
            data-testid='wallet-button'
        >
            <div className="flex items-center">
                <AccountAvatar
                    wallet={account}
                    props={{
                        width: 30,
                        height: 30,
                        minWidth: 30,
                        minHeight: 30,
                    }}
                />

                <WalletDisplay
                    variant={isDesktop ? desktopVariant : mobileVariant}
                />
            </div>
        </button>
    );
};
