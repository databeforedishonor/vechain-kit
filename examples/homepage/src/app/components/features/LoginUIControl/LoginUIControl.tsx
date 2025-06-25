'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import {
    WalletButton,
    useConnectModal,
    useDAppKitWalletModal,
} from '@vechain/vechain-kit';
import { MdLogin } from 'react-icons/md';
import { CollapsibleCard } from '../../ui/CollapsibleCard';

export const LoginUIControl = () => {
    const { open } = useConnectModal();
    const { open: openWalletModal } = useDAppKitWalletModal();

    return (
        <CollapsibleCard
            title="Login UI Examples"
            icon={MdLogin}
            defaultIsOpen={true}
        >
            <div className="flex flex-col space-y-6"  align="stretch" w={'full'}>
                <p className="text-center">
                    VeChain Kit provides multiple ways to customize the login
                    button and how we show the login options. Here are some
                    examples of different login button variants.
                </p>

                <div className="flex flex-col space-y-6"
                    w={'full'}
                    
                    p={6}
                    borderRadius="md"
                    bg="whiteAlpha.50"
                >
                    <p className="font-bold">Login Button Variants</p>
                    <Grid
                        templateColumns={{
                            base: '1fr',
                            md: 'repeat(2, 1fr)',
                        }}
                        gap={8}
                        w="full"
                        justifyContent="space-between"
                    >
                        {/* First Column Items */}
                        <div className="flex flex-col space-y-8" alignItems="flex-start" >
                            <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                <div w={'fit-content'}>
                                    <WalletButton connectionVariant="modal" />
                                </div>
                                <p
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="blue.300"
                                    bg="whiteAlpha.100"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    variant: "modal"
                                </p>
                            </div>

                            <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                <div w={'fit-content'}>
                                    <WalletButton
                                        connectionVariant="modal"
                                        buttonStyle={{
                                            border: '2px solid #000000',
                                            boxShadow:
                                                '-2px 2px 3px 1px #00000038',
                                            background: '#f08098',
                                            color: 'white',
                                            _hover: {
                                                background: '#db607a',
                                                border: '1px solid #000000',
                                                boxShadow:
                                                    '-3px 2px 3px 1px #00000038',
                                            },
                                            transition: 'all 0.2s ease',
                                        }}
                                    />
                                </div>
                                <p
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="blue.300"
                                    bg="whiteAlpha.100"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    variant: "modal" (with custom styling)
                                </p>
                            </div>
                        </div>

                        {/* Second Column Items */}
                        <div className="flex flex-col space-y-8" alignItems="flex-start" >
                            <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                <div w={'fit-content'}>
                                    <WalletButton connectionVariant="popover" />
                                </div>
                                <p
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="blue.300"
                                    bg="whiteAlpha.100"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    variant: "popover" (desktop only)
                                </p>
                            </div>

                            <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                <div w={'fit-content'}>
                                    <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200" onClick={open}>
                                        Click me to login
                                    </button>
                                </div>
                                <p
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="blue.300"
                                    bg="whiteAlpha.100"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    custom button (with onClick)
                                </p>
                            </div>

                            <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                <div w={'fit-content'}>
                                    <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200" onClick={openWalletModal}>
                                        Open only "Connect Wallet"
                                    </button>
                                </div>
                                <p
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="blue.300"
                                    bg="whiteAlpha.100"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    aka: dapp-kit connect modal
                                </p>
                            </div>
                        </div>
                    </Grid>

                    <p fontSize="sm" fontWeight="medium" color="blue.300">
                        Note: The modal variant is the default login button
                        variant. You can pass an additional description and
                        Image to the modal when configuring you the
                        VeChainKitProvider.
                    </p>
                </div>
            </div>
        </CollapsibleCard>
    );
};
