import { ReactNode, createContext, useContext } from 'react';

type Props = {
    children: ReactNode;
    darkMode?: boolean;
};

type ThemeContextType = {
    darkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType>({ darkMode: false });

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a VechainKitThemeProvider');
    }
    return context;
};

export const VechainKitThemeProvider = ({
    children,
    darkMode = false,
}: Props) => {
    return (
        <ThemeContext.Provider value={{ darkMode }}>
            <div 
                className={`vechain-kit-root ${darkMode ? 'dark' : ''}`}
                data-theme={darkMode ? 'dark' : 'light'}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
