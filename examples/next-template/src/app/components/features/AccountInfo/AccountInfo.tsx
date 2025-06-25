'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useWallet, useGetB3trBalance } from '@vechain/vechain-kit';

export function AccountInfo() {
    const { smartAccount, connectedWallet } = useWallet();
    const { data: b3trBalance, isLoading: b3trBalanceLoading } =
        useGetB3trBalance(smartAccount.address ?? undefined);

    return (
        <>
            {smartAccount.address && (
                <div>
                    <h2 size={'md'}>
                        <b>Smart Account</b>
                    </h2>
                    <p data-testid="smart-account-address">
                        Smart Account: {smartAccount.address}
                    </p>
                    <p data-testid="is-sa-deployed">
                        Deployed: {smartAccount.isDeployed.toString()}
                    </p>
                    {b3trBalanceLoading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    ) : (
                        <p data-testid="b3tr-balance">
                            B3TR Balance: {b3trBalance?.formatted}
                        </p>
                    )}
                </div>
            )}

            <div>
                <h2 size={'md'}>
                    <b>Wallet</b>
                </h2>
                <p data-testid="connected-wallet-address">
                    Address: {connectedWallet?.address}
                </p>
            </div>
        </>
    );
}
