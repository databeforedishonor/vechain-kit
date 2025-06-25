'use client';

import { useWallet, WalletButton } from '@vechain/vechain-kit';
import { FaHandPointUp } from 'react-icons/fa';
import { useColorMode } from '../../../../hooks/useColorMode';
import { cn } from '../../../../utils/cn';

export function WelcomeSection() {
    const { connection } = useWallet();
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    return (
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-10">
                <h1
                    className={cn(
                        "text-center text-xl font-bold text-animation",
                        "bg-gradient-to-r bg-clip-text text-transparent",
                        isDarkMode 
                            ? "from-yellow-100 via-yellow-100 to-white" 
                            : "from-blue-600 via-blue-700 to-blue-500"
                    )}
                >
                    Hi! I'm VeChain Kit, a new way to access applications on
                    VeChain, and I'm here to show you my capabilities.
                </h1>
                
                {connection.isLoading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <WalletButton
                            mobileVariant="iconDomainAndAssets"
                            desktopVariant="iconDomainAndAssets"
                        />

                        <div 
                            className={cn(
                                "mt-4 flex flex-col items-center justify-center space-y-3",
                                "animate-bounce transform -rotate-12"
                            )}
                        >
                            <FaHandPointUp
                                size={24}
                                color={colorMode === 'light' ? '#4A5568' : '#A0AEC0'}
                            />

                            <p className={cn(
                                "text-sm",
                                colorMode === 'light' ? 'text-gray-600' : 'text-gray-400'
                            )}>
                                Click me!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
