import { useVeChainKitConfig } from '@/providers';
import { Box } from '../ui';

type Props = {
    children: React.ReactNode;
};

export const StickyFooterContainer = ({ children }: Props) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <Box
            className={`sticky bottom-0 left-0 right-0 z-[1000] p-4 transition-shadow duration-200 ease-in-out ${
                isDark ? 'bg-[#1f1f1e]' : 'bg-white'
            }`}
            style={{ 
                boxShadow: '0px -1px 6px -3px rgb(0 0 0 / 56%)'
            }}
        >
            {children}
        </Box>
    );
};
