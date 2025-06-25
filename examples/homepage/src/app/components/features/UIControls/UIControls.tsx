'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import {
    WalletButton,
    useAccountModal,
    ProfileCard,
    useWallet,
} from '@vechain/vechain-kit';
import { MdBrush } from 'react-icons/md';
import { CollapsibleCard } from '../../ui/CollapsibleCard';

export function UIControls() {
    const { open } = useAccountModal();
    const { account } = useWallet();
    const { colorMode } = useColorMode();

    return (
        <CollapsibleCard
            title="UI Customization Examples"
            icon={MdBrush}
            defaultIsOpen={false}
        >
            <div className="flex flex-col space-y-6"  align="stretch" w={'full'}>
                <p className="text-center">
                    VeChain Kit provides multiple ways to customize the UI
                    components. Here are some examples of different button
                    styles and variants.
                </p>

                <div className="flex flex-row items-center" w={'full'} justifyContent={'space-between'}>
                    {/* Mobile Variants */}
                    <div className="flex flex-row items-center" w={'full'} justifyContent={'center'}>
                        <div className="flex flex-col space-y-6"
                            w={'fit-content'}
                            
                            p={6}
                            borderRadius="md"
                            bg="whiteAlpha.50"
                        >
                            <p className="font-bold">
                                Account Button Variants
                            </p>
                            <p
                                fontSize="sm"
                                className="text-center"
                                color="gray.400"
                            >
                                Note: Some variants might look different based
                                on connection state and available data. Eg:
                                "iconDomainAndAssets" will show the assets only
                                if the user has assets. And same for domain
                                name.
                            </p>
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
                                            <WalletButton
                                                mobileVariant="icon"
                                                desktopVariant="icon"
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
                                            variant: "icon"
                                        </p>
                                    </div>

                                    <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                        <div w={'fit-content'}>
                                            <WalletButton
                                                mobileVariant="iconAndDomain"
                                                desktopVariant="iconAndDomain"
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
                                            variant: "iconAndDomain"
                                        </p>
                                    </div>

                                    <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                        <div w={'fit-content'}>
                                            <WalletButton
                                                mobileVariant="iconDomainAndAddress"
                                                desktopVariant="iconDomainAndAddress"
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
                                            variant: "iconDomainAndAddress"
                                        </p>
                                    </div>
                                </div>

                                {/* Second Column Items */}
                                <div className="flex flex-col space-y-8" alignItems={'flex-start'} >
                                    <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                        <div w={'fit-content'}>
                                            <WalletButton
                                                mobileVariant="iconDomainAndAssets"
                                                desktopVariant="iconDomainAndAssets"
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
                                            variant: "iconDomainAndAssets"
                                        </p>
                                    </div>

                                    <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                        <div w={'fit-content'}>
                                            <WalletButton
                                                mobileVariant="iconDomainAndAssets"
                                                desktopVariant="iconDomainAndAssets"
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
                                            variant: "iconDomainAndAssets"
                                            (styled)
                                        </p>
                                    </div>

                                    <div className="flex flex-col space-y-2" alignItems="flex-start" >
                                        <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200" onClick={open}>
                                            <p>This is a custom button</p>
                                        </button>
                                        <p
                                            fontSize="sm"
                                            fontWeight="medium"
                                            color="blue.300"
                                            bg="whiteAlpha.100"
                                            px={3}
                                            py={1}
                                            borderRadius="full"
                                        >
                                            no variant, custom button
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-6"
                    w={'full'}
                    justifyContent={'center'}
                    
                    p={6}
                    borderRadius="md"
                    bg="whiteAlpha.50"
                >
                    <p className="font-bold">Profile Cards</p>
                    <p fontSize="sm" className="text-center" color="gray.400">
                        Import the profile card component and use it in your
                        app. You can pass in an address and it will display all
                        the information set by the user. You can decide to hide
                        specific sections. (Customize your profile to see how
                        this card changes)
                    </p>
                    <Grid
                        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                        gap={4}
                        w="full"
                    >
                        <ProfileCard
                            address={account?.address ?? ''}
                            showEdit={false}
                            style={{
                                card: {
                                    backgroundColor:
                                        colorMode === 'dark'
                                            ? '#1c1c1b'
                                            : '#f5f5f5',
                                },
                            }}
                        />

                        <ProfileCard
                            address={
                                '0x73D1d7e67B9696Be68F53fb80C7e6e50b314a62f'
                            }
                            showEdit={false}
                            showHeader={false}
                        />
                    </Grid>
                </div>
            </div>
        </CollapsibleCard>
    );
}
