'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
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
        <div>
            <h2 size={'md'}>VeBetterDAO</h2>
            <p data-testid="current-allocation-round-id">
                Current Allocations Round ID: {currentAllocationsRoundId}
            </p>
            <p data-testid="is-passport-valid">
                Is Passport Valid: {isValidPassport?.toString()}
            </p>
        </div>
    );
}
