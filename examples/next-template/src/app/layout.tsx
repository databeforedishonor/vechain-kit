'use client';

import './globals.css';
import dynamic from 'next/dynamic';

const VechainKitProviderWrapper = dynamic(
    async () =>
        (await import('./providers/VechainKitProviderWrapper'))
            .VechainKitProviderWrapper,
    {
        ssr: false,
    },
);

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </head>
            <body className="bg-gray-900 text-white">
                <VechainKitProviderWrapper>
                    {children}
                </VechainKitProviderWrapper>
            </body>
        </html>
    );
}
