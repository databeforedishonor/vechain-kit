'use client';

import { type ReactElement, useEffect, useRef, useState } from 'react';
import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useWallet, WalletButton } from '@vechain/vechain-kit';
import { UIControls } from '@/app/components/features/UIControls';
import { TransactionExamples } from '@/app/components/features/TransactionExamples';
import { SigningExample } from '@/app/components/features/Signing/SigningExample';
import { Introduction } from '../components/features/Introduction';
import { FAQSection } from '../components/features/FAQSection';
import { IoMdMoon } from 'react-icons/io';
import { FaSun, FaHandPointLeft, FaChevronDown } from 'react-icons/fa';
import { FeaturesToTry } from '@/app/components/features/FeaturesToTry/FeaturesToTry';
import { DataReadingExample } from '../components/features/DataReading';
import { VechainLogo } from '@vechain/vechain-kit/assets';
import { LoginUIControl } from '../components/features/LoginUIControl/LoginUIControl';
import { LoginToContinueBox } from '../components/features/LoginToContinueBox';
import { trackEvent } from '@/app/lib/mixpanelClient';

export default function Home(): ReactElement {
    const { account } = useWallet();
    const { colorMode, toggleColorMode } = useColorMode();
    const featuresRef = useRef<HTMLDivElement>(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isDesktop] = useMediaQuery('(min-width: 768px)');

    const scrollToFeatures = () => {
        featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
        setHasScrolled(true);
    };

    useEffect(() => {
        trackEvent('Home Page Viewed');
    }, []);

    if (!account) {
        return (
            <div className="max-w-4xl mx-auto px-4"
                height={'full'}
                maxW="container.lg"
                justifyContent={'center'}
                wordBreak={'break-word'}
            >
                <div className="flex flex-col space-y-10"  mt={10} pb={10} alignItems="flex-start">
                    <div className="flex flex-row items-center" w={'full'} justifyContent={'space-between'}>
                        <div className="flex flex-row items-center space-x-2"  align="center">
                            <WalletButton
                                mobileVariant="iconDomainAndAssets"
                                desktopVariant="iconDomainAndAssets"
                            />
                            <div className="flex flex-row items-center space-x-2"
                                
                                animation="bounce-left 1s infinite"
                                transform="rotate(-10deg)"
                                sx={{
                                    '@keyframes bounce-left': {
                                        '0%, 100%': {
                                            transform:
                                                'rotate(0deg) translateX(0)',
                                        },
                                        '50%': {
                                            transform:
                                                'rotate(0deg) translateX(-5px)',
                                        },
                                    },
                                }}
                            >
                                <FaHandPointLeft
                                    size={24}
                                    color={
                                        colorMode === 'light'
                                            ? 'blackAlpha.600'
                                            : 'whiteAlpha.400'
                                    }
                                    style={{ marginLeft: '8px' }}
                                />
                                <p
                                    fontSize="sm"
                                    color={
                                        colorMode === 'light'
                                            ? 'blackAlpha.600'
                                            : 'whiteAlpha.400'
                                    }
                                >
                                    Click me!
                                </p>
                            </div>
                        </div>
                        <IconButton
                            onClick={toggleColorMode}
                            icon={
                                colorMode === 'light' ? <IoMdMoon /> : <FaSun />
                            }
                            aria-label="Toggle color mode"
                            borderRadius="xl"
                        />
                    </div>

                    <Introduction />

                    <LoginUIControl />

                    <FAQSection />

                    <LoginToContinueBox />

                    <Logo />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4"
            height={'full'}
            maxW="container.lg"
            justifyContent={'center'}
            wordBreak={'break-word'}
        >
            <div className="flex flex-col space-y-10"  mt={10} pb={10} alignItems="flex-start">
                <div className="flex flex-row items-center" w={'full'} justifyContent={'space-between'}>
                    <WalletButton
                        mobileVariant="iconDomainAndAssets"
                        desktopVariant="iconDomainAndAssets"
                    />

                    <IconButton
                        onClick={toggleColorMode}
                        icon={colorMode === 'light' ? <IoMdMoon /> : <FaSun />}
                        aria-label="Toggle color mode"
                        borderRadius="xl"
                    />
                </div>

                {account && !hasScrolled && !isDesktop && (
                    <div className="flex flex-col space-y-2"
                        w="full"
                        cursor="pointer"
                        onClick={scrollToFeatures}
                        
                        p={4}
                        bg="whiteAlpha.100"
                        rounded="md"
                    >
                        <p fontSize="sm" className="text-center">
                            Scroll down to explore available features
                        </p>
                        <FaChevronDown
                            size={20}
                            color={
                                colorMode === 'light'
                                    ? 'blackAlpha.400'
                                    : 'whiteAlpha.600'
                            }
                        />
                    </div>
                )}

                <Introduction />

                <div ref={featuresRef}>
                    <FeaturesToTry />
                </div>

                <UIControls />

                <TransactionExamples />
                <SigningExample />
                <DataReadingExample />
                <FAQSection />
                <p
                    fontSize="sm"
                    color="gray.600"
                    w="full"
                    className="text-center"
                    mt={4}
                >
                    Found a bug? Please open an issue on{' '}
                    <a
                        href="https://github.com/vechain/vechain-kit/issues"
                        color="blue.500"
                        isExternal
                    >
                        GitHub
                    </a>
                </p>

                <Logo />
            </div>
        </div>
    );
}

const Logo = () => {
    const { colorMode } = useColorMode();
    return (
        <div className="flex flex-row items-center"
            onClick={() => window.open('https://vechain.org', '_blank')}
            pt={10}
            justify={'center'}
            w={'full'}
            cursor={'pointer'}
            _hover={{
                opacity: 0.8,
                transition: 'opacity 0.2s ease-in-out',
            }}
        >
            <div className="flex"
                direction={{ base: 'column', md: 'row' }}
                align="center"
                wrap="wrap"
                justify="center"
                gap={2}
            >
                <p fontSize="md" className="font-bold">
                    Made by
                </p>
                <VechainLogo
                    maxW="200px"
                    isDark={colorMode === 'dark'}
                    w="200px"
                    h="auto"
                    ml={{ base: 0, sm: -6 }}
                    mt={{ base: -6, md: 0 }}
                />
            </div>
        </div>
    );
};
