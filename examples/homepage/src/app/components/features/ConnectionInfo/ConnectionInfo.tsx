'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useWallet } from '@vechain/vechain-kit';
import { RiShieldUserLine } from 'react-icons/ri';
import { CollapsibleCard } from '../../ui/CollapsibleCard';

export function ConnectionInfo() {
    const { connection } = useWallet();

    const getConnectionDescription = () => {
        switch (connection.source.type) {
            case 'privy':
                return "You're connected using Privy authentication, which provides a dedicated user management system for this application.";
            case 'privy-cross-app':
                return "You're connected through the VeChain cross-app ecosystem, sharing authentication with other VeChain apps like Cleanify or Mugshot.";
            case 'wallet':
                return "You're connected directly through a Web3 wallet (VeWorld, Sync2, or WalletConnect).";
            default:
                return 'Connection type not recognized.';
        }
    };

    return (
        <CollapsibleCard title="Your Connection Source" icon={RiShieldUserLine}>
            <div className="flex flex-col space-y-4"  p={6} borderRadius="md" bg="whiteAlpha.50">
                <p>
                    <p as="span" className="font-bold">
                        Type:{' '}
                    </p>
                    {connection.source.type}
                </p>
                <p>
                    <p as="span" className="font-bold">
                        Network:{' '}
                    </p>
                    {connection.network}
                </p>
                <p className="text-center">{getConnectionDescription()}</p>
            </div>
        </CollapsibleCard>
    );
}
