'use client';

import { ReactElement } from 'react';
import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import {
    useWallet,
    useGetB3trBalance,
    useGetVot3Balance,
    useGetTokenUsdPrice,
    useCurrentAllocationsRound,
} from '@vechain/vechain-kit';
import { MdDataUsage } from 'react-icons/md';
import { CollapsibleCard } from '../../ui/CollapsibleCard';

export function DataReadingExample(): ReactElement {
    const { account } = useWallet();
    const address = account?.address || '';

    // Example hooks for reading data
    const { data: b3trBalance, isLoading: isLoadingB3tr } =
        useGetB3trBalance(address);
    const { data: vot3Balance, isLoading: isLoadingVot3 } =
        useGetVot3Balance(address);
    const { data: vetPrice, isLoading: isLoadingVetPrice } =
        useGetTokenUsdPrice('VET');
    const { data: vbdCurrentRound, isLoading: isLoadingVbdCurrentRound } =
        useCurrentAllocationsRound();

    return (
        <CollapsibleCard
            defaultIsOpen={false}
            title="Reading Blockchain Data"
            icon={MdDataUsage}
        >
            <div className="flex flex-col space-y-6"  align="stretch">
                <p className="text-center">
                    VeChain Kit provides hooks to easily read data from the
                    blockchain. Here are some examples using built-in hooks.
                </p>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {/* Live Data Display */}
                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <p className="font-bold">Live Blockchain Data</p>
                        <div className="flex flex-col space-y-3"  align="start" w="full">
                            <p>
                                <p as="span" className="font-bold">
                                    B3TR Balance:{' '}
                                </p>
                                {isLoadingB3tr
                                    ? 'Loading...'
                                    : b3trBalance?.formatted || '0'}
                            </p>
                            <p>
                                <p as="span" className="font-bold">
                                    VOT3 Balance:{' '}
                                </p>
                                {isLoadingVot3
                                    ? 'Loading...'
                                    : vot3Balance?.formatted || '0'}
                            </p>
                            <p>
                                <p as="span" className="font-bold">
                                    VET Price:{' '}
                                </p>
                                {isLoadingVetPrice
                                    ? 'Loading...'
                                    : `$${vetPrice?.toFixed(4) || '0'}`}
                            </p>
                            <div className="flex flex-col space-y-1" mt={4} align="start" >
                                <h2 size="sm">VeBetterDAO</h2>
                                <p className="font-bold">
                                    Current round: {vbdCurrentRound?.roundId}
                                </p>
                                <p className="font-bold">
                                    Next round starts on:{' '}
                                    {isLoadingVbdCurrentRound
                                        ? 'Loading...'
                                        : new Date(
                                              vbdCurrentRound?.voteEndTimestamp ??
                                                  0,
                                          ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Code Example */}
                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <p className="font-bold">Implementation Example</p>
                        <div
                            w="full"
                            p={3}
                            bg="blackAlpha.300"
                            borderRadius="md"
                        >
                            <Code
                                display="block"
                                whiteSpace="pre"
                                p={2}
                                overflowX="auto"
                            >
                                {`// Import hooks
import {
    useGetB3trBalance,
    useGetTokenUsdPrice,
} from '@vechain/vechain-kit';

// Use hooks in your component
const { data: b3trBalance } = 
    useGetB3trBalance(address);
const { data: vetPrice } = 
    useGetTokenUsdPrice('VET');`}
                            </Code>
                        </div>
                        <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            as={Link}
                            isExternal
                            href="https://docs.vechainkit.vechain.org/vechain-kit/hooks"
                            w="full"
                            variant="outline"
                            rightIcon={<MdDataUsage />}
                        >
                            View Full Documentation
                        </button>
                    </div>
                </SimpleGrid>

                <p fontSize="sm" className="text-center" color="gray.400">
                    Note: These hooks use react-query under the hood for
                    efficient data fetching and caching.
                </p>
            </div>
        </CollapsibleCard>
    );
}
