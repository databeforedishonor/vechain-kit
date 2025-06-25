'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { WalletButton } from '@vechain/vechain-kit';

export function WelcomeSection() {
    return (
        <div className="max-w-4xl mx-auto px-4" alignItems={'center'} justifyContent={'center'}>
            <div className="flex flex-col space-y-10" >
                <p className="text-center">
                    Hi! I'm VeChain Kit, a new way to access applications on
                    VeChain, and I'm here to show you my capabilities.
                </p>
                <WalletButton
                    mobileVariant="iconDomainAndAssets"
                    desktopVariant="iconDomainAndAssets"
                />
            </div>
        </div>
    );
}
