'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useWallet } from '@vechain/vechain-kit';
import { FaGithub, FaDiscord, FaApple } from 'react-icons/fa';
import { IoDocumentText, IoWalletOutline } from 'react-icons/io5';
import { MdBrush, MdCode, MdEmail } from 'react-icons/md';
import { CiLogin } from 'react-icons/ci';
import { SiNpm, SiFarcaster } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { trackEvent } from '@/app/lib/mixpanelClient';
import { CollapsibleCard } from '@/app/components/ui/CollapsibleCard';

export function Introduction() {
    const { connection } = useWallet();

    const trackExternalLink = (destination: string) => {
        trackEvent('External Link Click', {
            destination,
            isConnected: connection.isConnected,
            source: 'Introduction',
        });
    };

    const basePath = process.env.basePath ?? '';
    return (
        <div
            p={8}
            borderRadius="lg"
            boxShadow="xl"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
        >
            <div className="flex flex-col space-y-6"  align="stretch">
                <h2 as="h1" size="lg" className="text-center">
                    Welcome to VeChain Kit!
                </h2>

                <p className="text-center">
                    VeChain Kit is a comprehensive library, for React and
                    NextJs, designed to make building VeChain applications fast
                    and straightforward. Learn how to integrate VeChain in your
                    dApp using our resources below.
                    {connection.isConnected
                        ? ''
                        : ' Login to view all available features.'}
                </p>

                <div
                    display="flex"
                    gap={4}
                    justifyContent="center"
                    flexWrap="wrap"
                >
                    <div className="flex flex-col space-y-4" >
                        <SimpleGrid
                            columns={{ base: 1, md: 1 }}
                            spacing={4}
                            width="100%"
                        >
                            <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                leftIcon={<IoDocumentText />}
                                as={Link}
                                href="https://docs.vechainkit.vechain.org/"
                                isExternal
                                rel="noopener noreferrer"
                                colorScheme="gray"
                                size="lg"
                                width="100%"
                                onClick={() =>
                                    trackExternalLink('documentation')
                                }
                            >
                                Get Started with our Docs
                            </button>
                        </SimpleGrid>
                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            spacing={4}
                            width="100%"
                        >
                            <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                leftIcon={<SiNpm />}
                                as="a"
                                href="https://www.npmjs.com/package/@vechain/vechain-kit"
                                target="_blank"
                                rel="noopener noreferrer"
                                colorScheme="red"
                                width="100%"
                                onClick={() => trackExternalLink('npm')}
                            >
                                View Package on NPM
                            </button>
                            <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                leftIcon={<FaGithub />}
                                as="a"
                                href="https://github.com/vechain/vechain-kit"
                                target="_blank"
                                rel="noopener noreferrer"
                                colorScheme="gray"
                                width="100%"
                                onClick={() => trackExternalLink('github')}
                            >
                                View GitHub Repository
                            </button>
                            <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                leftIcon={
                                    <img
                                        src="https://vechain.github.io/smart-accounts/assets/logo-DnOsqNR_.png"
                                        alt="Smart Account Factory"
                                        width={7}
                                        height={7}
                                    />
                                }
                                as="a"
                                href="https://vechain.github.io/smart-accounts/"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                width="100%"
                                onClick={() =>
                                    trackExternalLink('smart-accounts')
                                }
                            >
                                Learn about Smart Accounts
                            </button>
                        </SimpleGrid>
                    </div>
                </div>
            </div>

            <CollapsibleCard
                title="Learn More About VeChain Kit Features"
                icon={IoDocumentText}
                defaultIsOpen={!connection.isConnected}
                style={{ mt: 8, borderRadius: 'lg' }}
            >
                <div className="flex flex-col space-y-6"  align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <div p={4} borderRadius="md" borderWidth="1px">
                            <div className="flex flex-col space-y-3" align="start" >
                                <Icon
                                    as={CiLogin}
                                    boxSize={6}
                                    color="blue.400"
                                />
                                <p className="font-bold">
                                    Wallet Connection Integration
                                </p>
                                <p>
                                    Easily connect your users to your dApp with
                                    out of the box wallet connection options.
                                    Choose between:
                                </p>
                                <div className="flex flex-row items-center space-x-3"  wrap="wrap">
                                    <Icon as={FcGoogle} boxSize={6} />
                                    <Icon as={FaSquareXTwitter} boxSize={6} />
                                    <Icon as={MdEmail} boxSize={6} />
                                    <Icon as={FaDiscord} boxSize={6} />
                                    <Icon as={SiFarcaster} boxSize={6} />
                                    <Icon as={FaApple} boxSize={6} />
                                    <img
                                        src={`${basePath}/images/veworld-logo.png`}
                                        alt="VeWorld"
                                        height={6}
                                        width="auto"
                                        borderRadius="md"
                                    />
                                    <img
                                        src={`${basePath}/images/wallet-connect-logo.png`}
                                        alt="WalletConnect"
                                        height={6}
                                        width="auto"
                                        borderRadius="md"
                                    />
                                    <img
                                        src={`${basePath}/images/rabby-logo.png`}
                                        alt="Rabby Wallet"
                                        height={6}
                                        width="auto"
                                        borderRadius="md"
                                    />
                                    <img
                                        src={`${basePath}/images/metamask-logo.png`}
                                        alt="MetaMask"
                                        height={6}
                                        width="auto"
                                        borderRadius="md"
                                    />
                                    <img
                                        src={`${basePath}/images/coinbase-wallet-logo.webp`}
                                        alt="Coinbase Wallet"
                                        height={6}
                                        width="auto"
                                        borderRadius="md"
                                    />
                                    <img
                                        src={`${basePath}/images/rainbow-logo.webp`}
                                        alt="Rainbow"
                                        height={6}
                                        width="auto"
                                        borderRadius="md"
                                    />
                                    <p fontSize="sm" color="gray.400">
                                        and more...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div p={4} borderRadius="md" borderWidth="1px">
                            <div className="flex flex-col space-y-3" align="start" >
                                <Icon
                                    as={IoWalletOutline}
                                    boxSize={6}
                                    color="blue.400"
                                />
                                <p className="font-bold">
                                    Assets, Profile, and Wallet Management
                                </p>
                                <p>
                                    Use VeChain Kit to allow your users to have
                                    asset management, profile management, social
                                    login, wallet backup, mfa, and more. All out
                                    of the box, so you can focus on building
                                    your dApp.
                                </p>
                            </div>
                        </div>

                        <div p={4} borderRadius="md" borderWidth="1px">
                            <div className="flex flex-col space-y-3" align="start" >
                                <Icon
                                    as={MdCode}
                                    boxSize={6}
                                    color="green.400"
                                />
                                <p className="font-bold">
                                    Boosted development
                                </p>
                                <p>
                                    Use our hooks and components to speed up
                                    your development. No need to worry about the
                                    underlying VeChain infrastructure, we handle
                                    it for you.
                                </p>
                            </div>
                        </div>

                        <div p={4} borderRadius="md" borderWidth="1px">
                            <div className="flex flex-col space-y-3" align="start" >
                                <Icon
                                    as={MdBrush}
                                    boxSize={6}
                                    color="purple.400"
                                />
                                <p className="font-bold">
                                    Style customization
                                </p>
                                <p>
                                    The kit is designed to be customizable to
                                    your needs. Decide what features you want to
                                    use and which ones you don't. Add call to
                                    action buttons to your app to guide your
                                    users to the features they need.
                                </p>
                            </div>
                        </div>
                    </SimpleGrid>

                    <div className="flex flex-col space-y-4" mt={8}  align="stretch">
                        <h2 size="sm" className="text-center">
                            Explore some of the apps built with VeChain Kit
                        </h2>
                        <p className="text-center" fontSize="xs">
                            (This website is built with VeChain Kit as well!)
                        </p>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                            {[
                                {
                                    name: 'EatGreen',
                                    href: 'https://eatgreen.aworld.org/',
                                    logo: 'https://i.ibb.co/zVx7ncgq/download-2.png',
                                },
                                {
                                    name: 'ScoopUp',
                                    href: 'https://scoopup.vet/',
                                    logo: 'https://scoopup.vet/images/logo.webp',
                                },
                                {
                                    name: 'VeLottery',
                                    href: 'https://velottery.vet/',
                                    logo: 'https://velottery.vet/assets/logo.png',
                                },
                                {
                                    name: 'Betterswap',
                                    href: 'https://www.betterswap.io/',
                                    logo: 'https://api.gateway-proxy.vechain.org/ipfs/bafybeidvm2qibth26fzp45llucfapshw2zycmfpkebejmecn4amhbqi5qy/media/logo.png',
                                },
                                {
                                    name: 'Solarwise',
                                    href: 'https://app.solarwise.vet/',
                                    logo: 'https://app.solarwise.vet/pictogram.png',
                                },
                                {
                                    name: 'VeTrade',
                                    href: 'https://vetrade.vet/',
                                    logo: 'https://pbs.twimg.com/media/Gsf7GiRXQAAYUeM.png',
                                },
                            ].map((app) => (
                                <div
                                    key={app.name}
                                    p={3}
                                    borderRadius="md"
                                    borderWidth="1px"
                                    role="group"
                                    as={Link}
                                    href={app.href}
                                    isExternal
                                    onClick={() =>
                                        trackExternalLink(
                                            `example-app-${app.name.toLowerCase()}`,
                                        )
                                    }
                                >
                                    <div className="flex flex-row items-center space-x-2"
                                        align="start"
                                        
                                        alignItems={'center'}
                                    >
                                        <img
                                            src={app.logo}
                                            alt={app.name}
                                            width={'auto'}
                                            height={10}
                                            borderRadius="md"
                                        />
                                        <p className="font-bold" fontSize="sm">
                                            {app.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </SimpleGrid>
                    </div>
                </div>
            </CollapsibleCard>
        </div>
    );
}
