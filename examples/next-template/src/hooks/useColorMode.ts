import { useState, useEffect } from 'react';

export type ColorMode = 'light' | 'dark';

export function useColorMode() {
    const [colorMode, setColorMode] = useState<ColorMode>('light');

    useEffect(() => {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme') as ColorMode;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const initialMode = savedTheme || (prefersDark ? 'dark' : 'light');
        setColorMode(initialMode);
        
        if (initialMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleColorMode = () => {
        const newMode = colorMode === 'light' ? 'dark' : 'light';
        setColorMode(newMode);
        localStorage.setItem('theme', newMode);
        
        if (newMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return {
        colorMode,
        toggleColorMode,
        setColorMode: (mode: ColorMode) => {
            setColorMode(mode);
            localStorage.setItem('theme', mode);
            
            if (mode === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
    };
}