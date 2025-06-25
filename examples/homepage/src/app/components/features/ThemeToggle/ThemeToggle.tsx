'use client';

import { useColorMode } from '../../../../hooks/useColorMode';
import { cn } from '../../../../utils/cn';

export function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div>
            <button 
                onClick={toggleColorMode}
                className={cn(
                    "btn-primary",
                    "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
                    "bg-vechain-600 hover:bg-vechain-700 text-white"
                )}
            >
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
}
