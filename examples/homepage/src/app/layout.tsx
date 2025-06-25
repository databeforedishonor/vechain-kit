'use client';

import './globals.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const VechainKitProviderWrapper = dynamic(
    async () =>
        (await import('./providers/VechainKitProviderWrapper'))
            .VechainKitProviderWrapper,
    {
        ssr: false,
    },
);

function AppContent({ children }: { children: React.ReactNode }) {
    return <VechainKitProviderWrapper>{children}</VechainKitProviderWrapper>;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <div className={isDark ? 'dark' : ''}>
            {children}
        </div>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const basePath = process.env.basePath ?? '';
    return (
        <html
            lang="en"
            suppressHydrationWarning={true}
            className="scroll-smooth"
        >
            <head>
                <title>VeChain Kit</title>
                <meta
                    name="description"
                    content="VeChain Kit - A powerful and intuitive toolkit for building and interacting with decentralized applications on VeChain blockchain."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" href={`${basePath}/images/logo.png`} type="image/png" />
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href={`${basePath}/images/favicon/apple-touch-icon.png`}
                />
                <meta
                    name="msapplication-TileImage"
                    content={`${basePath}/images/favicon/apple-touch-icon.png`}
                />

                {/* Open Graph Metadata */}
                <meta name="title" property="og:title" content="VeChain Kit" />
                <meta name="type" property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://vechainkit.vechain.org/"
                />
                <meta
                    property="og:description"
                    content="VeChain Kit - A powerful and intuitive toolkit for building and interacting with decentralized applications on VeChain blockchain."
                />
                <meta property="og:site_name" content="VeChain Kit" />
                <meta
                    property="og:image"
                    content={`${basePath}/images/vechain-kit-long.png`}
                />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="VeChain Kit" />

                {/* Twitter Metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="VeChain Kit" />
                <meta
                    name="twitter:description"
                    content="VeChain Kit - A powerful and intuitive toolkit for building and interacting with decentralized applications on VeChain blockchain."
                />
                <meta
                    name="twitter:image"
                    content={`${basePath}/images/vechain-kit-long.png`}
                />
                <meta name="twitter:image:alt" content="VeChain Kit" />
            </head>
            <body className="w-full h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <ThemeProvider>
                    <AppContent>{children}</AppContent>
                </ThemeProvider>
            </body>
        </html>
    );
}
