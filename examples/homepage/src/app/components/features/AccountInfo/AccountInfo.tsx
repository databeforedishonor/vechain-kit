'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useWallet } from '@vechain/vechain-kit';
import { RiWalletLine } from 'react-icons/ri';
import { MdAccountBalanceWallet } from 'react-icons/md';

export function AccountInfo() {
    const { smartAccount, connectedWallet, connection } = useWallet();

    return (
        <div
            p={8}
            borderRadius="lg"
            boxShadow="xl"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
        >
            <div className="flex flex-col space-y-6"  align="stretch">
                <h2 size="lg" textAlign="left">
                    Your Account Details
                </h2>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {smartAccount.address && (
                        <div className="flex flex-col space-y-4"
                            
                            p={6}
                            borderRadius="md"
                            bg="whiteAlpha.50"
                        >
                            <Icon as={MdAccountBalanceWallet} boxSize={8} />
                            <p className="font-bold">Smart Account</p>
                            <div className="flex flex-col space-y-3"  align="start">
                                <p>
                                    <p as="span" className="font-bold">
                                        Address:{' '}
                                    </p>
                                    {smartAccount.address}
                                </p>
                                <p>
                                    <p as="span" className="font-bold">
                                        Deployed:{' '}
                                    </p>
                                    {smartAccount.isDeployed.toString()}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <Icon as={RiWalletLine} boxSize={8} />
                        <p className="font-bold">
                            {connection.isConnectedWithPrivy
                                ? 'Embedded Wallet'
                                : 'Wallet'}
                        </p>
                        <p>
                            <p as="span" className="font-bold">
                                Address:{' '}
                            </p>
                            {connectedWallet?.address}
                        </p>
                    </div>
                </SimpleGrid>

                <Alert status="info" bg="whiteAlpha.200">
                    <AlertIcon />
                    <AlertDescription fontSize="xs">
                        Smart accounts are not immediately deployed on login but
                        only after first action done by the user, avoiding
                        unnecessary money spent on gas.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
