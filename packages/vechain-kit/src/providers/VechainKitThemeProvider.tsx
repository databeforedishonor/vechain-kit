import { ReactNode, useEffect } from 'react';

type Props = {
    children: ReactNode;
    darkMode?: boolean;
};

export const VechainKitThemeProvider = ({
    children,
    darkMode = false,
}: Props) => {
    // Apply dark mode class to the vechain-kit root
    useEffect(() => {
        const root = document.querySelector('.vechain-kit-root');
        if (root) {
            if (darkMode) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    }, [darkMode]);

    return (
        <div className="vechain-kit-root">
            {children}
            {/* Toast container placeholder - can be replaced with a Tailwind-compatible toast system */}
            <div id="vechain-kit-toast-container" />
        </div>
    );
};
