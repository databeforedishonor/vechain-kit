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
    return (
        <html lang="en" suppressHydrationWarning={true} className="scroll-smooth">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </head>
            <body className="w-full h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <ThemeProvider>
                    <VechainKitProviderWrapper>
                        {children}
                    </VechainKitProviderWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}
