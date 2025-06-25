'use client';

import { useWallet, useGetB3trBalance } from '@vechain/vechain-kit';

export function AccountInfo() {
    const { smartAccount, connectedWallet } = useWallet();
    const { data: b3trBalance, isLoading: b3trBalanceLoading } =
        useGetB3trBalance(smartAccount.address ?? undefined);

    return (
        <div className="space-y-6">
            {smartAccount.address && (
                <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold mb-4">
                        <b>Smart Account</b>
                    </h3>
                    <p className="text-sm text-gray-700 mb-2" data-testid="smart-account-address">
                        Smart Account: {smartAccount.address}
                    </p>
                    <p className="text-sm text-gray-700 mb-2" data-testid="is-sa-deployed">
                        Deployed: {smartAccount.isDeployed.toString()}
                    </p>
                    {b3trBalanceLoading ? (
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    ) : (
                        <p className="text-sm text-gray-700" data-testid="b3tr-balance">
                            B3TR Balance: {b3trBalance?.formatted}
                        </p>
                    )}
                </div>
            )}

            <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                    <b>Wallet</b>
                </h3>
                <p className="text-sm text-gray-700" data-testid="connected-wallet-address">
                    Address: {connectedWallet?.address}
                </p>
            </div>
        </div>
    );
}
