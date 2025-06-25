'use client';

import { type ReactElement } from 'react';
import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useWallet, WalletButton } from '@vechain/vechain-kit';
import { AccountInfo } from '@/app/components/features/AccountInfo';
import { ConnectionInfo } from '@/app/components/features/ConnectionInfo';
import { DaoInfo } from '@/app/components/features/DaoInfo';
import { UIControls } from '@/app/components/features/UIControls';
import { LanguageSelector } from '@/app/components/features/LanguageSelector';
import { TransactionExamples } from '@/app/components/features/TransactionExamples';
import { SigningExample } from '@/app/components/features/SigningExample/SigningExample';
import { WelcomeSection } from '../components/features/WelcomeSection';
import mixpanelClient from '@/lib/mixpanelClient';

export default function Home(): ReactElement {
    const { account, connection } = useWallet();

    if (!account) {
        return <WelcomeSection />;
    }

    if (connection.isLoading) {
        return (
            <div className="flex flex-col" w="full" h="full" justify="center" align="center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    mixpanelClient.trackEvent('Home Page Viewed');

    return (
        <div className="max-w-4xl mx-auto px-4"
            height={'full'}
            maxW="container.md"
            justifyContent={'center'}
            wordBreak={'break-word'}
        >
            <div className="flex flex-col space-y-10"  mt={10} pb={10} alignItems="flex-start">
                <WalletButton
                    mobileVariant="iconDomainAndAssets"
                    desktopVariant="iconDomainAndAssets"
                />
                <AccountInfo />
                <ConnectionInfo />
                <DaoInfo />
                <UIControls />
                <LanguageSelector />
                <TransactionExamples />
                <SigningExample />
            </div>
        </div>
    );
}
