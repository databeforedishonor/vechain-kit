'use client';

import { ReactElement, useCallback } from 'react';
import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import {
    useWallet,
    useSignMessage,
    useSignTypedData,
    WalletButton,
} from '@vechain/vechain-kit';

// Example EIP-712 typed data
const exampleTypedData = {
    domain: {
        name: 'VeChain Example',
        version: '1',
        chainId: 1,
    },
    types: {
        Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' },
        ],
    },
    message: {
        name: 'Alice',
        wallet: '0x0000000000000000000000000000000000000000',
    },
    primaryType: 'Person',
};

export function SigningExample(): ReactElement {
    const { connection, account } = useWallet();
    const toast = useToast();

    const {
        signMessage,
        isSigningPending: isMessageSignPending,
        signature: messageSignature,
    } = useSignMessage();

    const {
        signTypedData,
        isSigningPending: isTypedDataSignPending,
        signature: typedDataSignature,
    } = useSignTypedData();

    const handleSignMessage = useCallback(async () => {
        try {
            const signature = await signMessage('Hello VeChain!');
            toast({
                title: 'Message signed!',
                description: `Signature: ${signature.slice(0, 20)}...`,
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Signing failed',
                description:
                    error instanceof Error ? error.message : String(error),
                status: 'error',
                duration: 1000,
                isClosable: true,
            });
        }
    }, [signMessage, toast]);

    const handleSignTypedData = useCallback(async () => {
        try {
            const signature = await signTypedData(exampleTypedData, {
                signer: account?.address,
            });
            toast({
                title: 'Typed data signed!',
                description: `Signature: ${signature.slice(0, 20)}...`,
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Signing failed',
                description:
                    error instanceof Error ? error.message : String(error),
                status: 'error',
                duration: 1000,
                isClosable: true,
            });
        }
    }, [signTypedData, toast, account]);

    if (!connection.isConnected) {
        return (
            <div className="flex flex-col space-y-4" >
                <p>Connect your wallet to start signing messages</p>
                <WalletButton />
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-6"  align="stretch">
            <div className="flex flex-col space-y-4" align="stretch" >
                <h2 size="md">Sign Message</h2>
                <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    onClick={handleSignMessage}
                    isLoading={isMessageSignPending}
                    data-testid="sign-message-button"
                >
                    Sign "Hello VeChain!"
                </button>
                {messageSignature && (
                    <Code p={2} borderRadius="md">
                        {messageSignature}
                    </Code>
                )}
            </div>

            <div className="flex flex-col space-y-4" align="stretch" >
                <h2 size="md">Sign Typed Data</h2>
                <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    onClick={handleSignTypedData}
                    isLoading={isTypedDataSignPending}
                    data-testid="sign-typed-data-button"
                >
                    Sign Typed Data
                </button>
                {typedDataSignature && (
                    <Code p={2} borderRadius="md">
                        {typedDataSignature}
                    </Code>
                )}
            </div>
        </div>
    );
}
