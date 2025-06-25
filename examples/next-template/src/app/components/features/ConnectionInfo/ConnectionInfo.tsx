'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useWallet } from '@vechain/vechain-kit';

export function ConnectionInfo() {
    const { connection } = useWallet();

    return (
        <div>
            <h2 size={'md'}>
                <b>Connection</b>
            </h2>
            <p data-testid="connection-type">Type: {connection.source.type}</p>
            <p data-testid="network">Network: {connection.network}</p>
        </div>
    );
}
