'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useConnectModal } from '@vechain/vechain-kit';

export function LoginToContinueBox() {
    const { colorMode } = useColorMode();
    const { open } = useConnectModal();

    return (
        <div className="flex flex-col space-y-3"
            w="full"
            p={4}
            rounded="md"
            
            borderRadius="lg"
            boxShadow="xl"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            zIndex={2}
        >
            <p fontSize="lg" fontWeight="medium" className="text-center">
                Connect your wallet to explore all features
            </p>
            <p
                fontSize="sm"
                color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                className="text-center"
            >
                Sign in to access transaction examples, signing capabilities,
                profile customization and more.
            </p>
            <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200" width="full" onClick={open}>
                Click here to sign in!
            </button>
        </div>
    );
}
