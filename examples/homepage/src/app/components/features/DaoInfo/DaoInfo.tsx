'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { MdAccountBalance } from 'react-icons/md';
import { CollapsibleCard } from '../../ui/CollapsibleCard';
import {
    useWallet,
    useCurrentAllocationsRoundId,
    useIsPerson,
} from '@vechain/vechain-kit';

export function DaoInfo() {
    const { account } = useWallet();
    const { data: currentAllocationsRoundId } = useCurrentAllocationsRoundId();
    const { data: isValidPassport } = useIsPerson(account?.address);

    return (
        <CollapsibleCard title="Contract Interactions" icon={MdAccountBalance}>
            <div className="flex flex-col space-y-6"  align="stretch">
                <p className="text-center">
                    VeChain Kit provides hooks to easily interact with popular
                    VeChain contracts. Here's how to use them in your
                    application.
                </p>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {/* Current Implementation */}
                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <p className="font-bold">Live VeBetterDAO Data</p>
                        <div className="flex flex-col space-y-3"  align="start" w="full">
                            <p>
                                <p as="span" className="font-bold">
                                    Current Round ID:{' '}
                                </p>
                                {currentAllocationsRoundId}
                            </p>
                            <p>
                                <p as="span" className="font-bold">
                                    Valid Passport:{' '}
                                </p>
                                {isValidPassport?.toString()}
                            </p>
                        </div>
                    </div>
                </SimpleGrid>
            </div>
        </CollapsibleCard>
    );
}
