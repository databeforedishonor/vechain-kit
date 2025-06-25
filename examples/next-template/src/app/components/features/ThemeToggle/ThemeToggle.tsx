'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
export function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div>
            <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                onClick={toggleColorMode}
                data-testid={`${colorMode === 'light' ? 'dark' : 'light'}-mode-button`}
            >
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
}
