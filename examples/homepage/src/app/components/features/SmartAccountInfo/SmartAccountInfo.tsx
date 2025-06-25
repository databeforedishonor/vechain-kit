'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { RiShieldKeyholeLine, RiLockPasswordLine } from 'react-icons/ri';
import { MdSecurity } from 'react-icons/md';
import { CollapsibleCard } from '../../ui/CollapsibleCard';

export function SmartAccountInfo() {
    return (
        <CollapsibleCard
            title="Smart Account Explained"
            icon={RiShieldKeyholeLine}
        >
            <div className="flex flex-col space-y-6"  align="stretch">
                <p className="text-center">
                    When using Privy authentication (direct or cross-app), a
                    Smart Account is automatically created and linked to your
                    wallet. This account becomes your primary identity on
                    VeChain, offering enhanced security and flexibility.
                </p>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <Icon as={RiShieldKeyholeLine} boxSize={8} />
                        <p className="font-bold">Secure Ownership</p>
                        <p fontSize="sm" className="text-center">
                            Exclusively controlled by your Privy-secured wallet
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <Icon as={RiLockPasswordLine} boxSize={8} />
                        <p className="font-bold">Transferable</p>
                        <p fontSize="sm" className="text-center">
                            Transfer ownership to another wallet anytime
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <Icon as={MdSecurity} boxSize={8} />
                        <p className="font-bold">Recovery</p>
                        <p fontSize="sm" className="text-center">
                            Secure backup and recovery through Privy
                        </p>
                    </div>
                </SimpleGrid>
            </div>
        </CollapsibleCard>
    );
}
