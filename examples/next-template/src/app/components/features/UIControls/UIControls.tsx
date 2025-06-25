'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useAccountModal } from '@vechain/vechain-kit';

export function UIControls() {
    const { toggleColorMode, colorMode } = useColorMode();
    const { open: openAccountModal } = useAccountModal();

    return (
        <div>
            <h2 size={'md'}>
                <b>UI</b>
            </h2>
            <div className="flex flex-row items-center space-x-4" mt={4} >
                <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    colorScheme="primary"
                    onClick={toggleColorMode}
                    data-testid={`${colorMode === 'dark' ? 'light' : 'dark' }-mode-button`}
                >
                    {colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
                <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    onClick={openAccountModal}
                    data-testid="account-modal-button"
                >
                    Account Modal
                </button>
            </div>
        </div>
    );
}
