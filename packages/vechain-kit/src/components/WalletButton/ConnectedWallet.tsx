import { useWallet } from '@/hooks';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import { AccountAvatar } from '../common';
import { WalletButtonProps } from './WalletButton';
import { WalletDisplay } from './WalletDisplay';

type ConnectedWalletProps = WalletButtonProps & {
    onOpen: () => void;
};

export const ConnectedWallet = ({
    mobileVariant = 'iconAndDomain',
    desktopVariant = 'iconAndDomain',
    onOpen,
    buttonStyle = {},
}: ConnectedWalletProps) => {
    const { account } = useWallet();
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <button
            onClick={onOpen}
            className="w-full min-h-[45px] max-w-fit-content inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            data-testid='wallet-button'
            style={buttonStyle}
        >
            <div className="flex items-center w-full min-w-fit-content space-x-2">
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
