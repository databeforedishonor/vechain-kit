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
import { MdFingerprint } from 'react-icons/md';
import { CollapsibleCard } from '../../ui/CollapsibleCard';
import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { FaCode } from 'react-icons/fa';

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
            <CollapsibleCard title="Message Signing" icon={MdFingerprint}>
                <div className="flex flex-col space-y-4" >
                    <p>Connect your wallet to start signing messages</p>
                    <WalletButton />
                </div>
            </CollapsibleCard>
        );
    }

    return (
        <CollapsibleCard
            defaultIsOpen={false}
            title="Message Signing"
            icon={MdFingerprint}
        >
            <div className="flex flex-col space-y-6"  align="stretch">
                <p className="text-center">
                    VeChain Kit provides hooks for signing messages and typed
                    data. Try these examples to see signing in action.
                </p>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {/* Message Signing */}
                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <p className="font-bold">Sign Message</p>
                        <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            onClick={handleSignMessage}
                            isLoading={isMessageSignPending}
                            w="full"
                        >
                            Sign "Hello VeChain!"
                        </button>
                        {messageSignature && (
                            <Code
                                p={2}
                                borderRadius="md"
                                w="full"
                                fontSize="sm"
                            >
                                {messageSignature}
                            </Code>
                        )}
                    </div>

                    {/* Typed Data Signing */}
                    <div className="flex flex-col space-y-4"
                        
                        p={6}
                        borderRadius="md"
                        bg="whiteAlpha.50"
                    >
                        <p className="font-bold">Sign Typed Data</p>
                        <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            onClick={handleSignTypedData}
                            isLoading={isTypedDataSignPending}
                            w="full"
                        >
                            Sign Typed Data
                        </button>
                        {typedDataSignature && (
                            <Code
                                p={2}
                                borderRadius="md"
                                w="full"
                                fontSize="sm"
                            >
                                {typedDataSignature}
                            </Code>
                        )}
                    </div>
                </SimpleGrid>

                {/* Implementation Example */}
                <div className="flex flex-col space-y-4"  p={6} borderRadius="md" bg="whiteAlpha.50">
                    <p className="font-bold">Implementation</p>
                    <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        as={Link}
                        isExternal
                        href="https://github.com/vechain/vechain-kit/blob/main/examples/next-template/src/app/components/features/SigningExample/SigningExample.tsx"
                        w="full"
                        variant="outline"
                        rightIcon={<FaCode />}
                    >
                        View Code Example
                    </button>
                    <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        as={Link}
                        isExternal
                        href="https://docs.vechainkit.vechain.org/vechain-kit/sign-messages"
                        w="full"
                        variant="outline"
                        rightIcon={<MdFingerprint />}
                    >
                        Read Documentation
                    </button>
                </div>
            </div>
        </CollapsibleCard>
    );
}
