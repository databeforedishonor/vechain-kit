'use client';

import { useWallet } from '@vechain/vechain-kit';
import { RiWalletLine } from 'react-icons/ri';
import { MdAccountBalanceWallet } from 'react-icons/md';

export function AccountInfo() {
    const { smartAccount, connectedWallet, connection } = useWallet();

    return (
        <div className="p-8 rounded-lg shadow-xl bg-white/10 backdrop-blur-md">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-left">
                    Your Account Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {smartAccount.address && (
                        <div className="flex flex-col items-center space-y-4 p-6 rounded-md bg-white/5">
                            <MdAccountBalanceWallet size={32} />
                            <p className="font-bold">Smart Account</p>
                            <div className="space-y-3 text-left w-full">
                                <p>
                                    <span className="font-bold">Address: </span>
                                    {smartAccount.address}
                                </p>
                                <p>
                                    <span className="font-bold">Deployed: </span>
                                    {smartAccount.isDeployed.toString()}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col items-center space-y-4 p-6 rounded-md bg-white/5">
                        <RiWalletLine size={32} />
                        <p className="font-bold">
                            {connection.isConnectedWithPrivy
                                ? 'Embedded Wallet'
                                : 'Wallet'}
                        </p>
                        <p>
                            <span className="font-bold">Address: </span>
                            {connectedWallet?.address}
                        </p>
                    </div>
                </div>

                <div className="flex items-start p-4 rounded-md bg-blue-500/20 border border-blue-500/30">
                    <div className="flex-shrink-0 mr-3">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="text-xs text-blue-100">
                        Smart accounts are not immediately deployed on login but
                        only after first action done by the user, avoiding
                        unnecessary money spent on gas.
                    </p>
                </div>
            </div>
        </div>
    );
}
