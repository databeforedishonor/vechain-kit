import { useVeChainKitConfig } from '@/providers';
import { cn } from '../../utils/tailwind';

type Props = {
    children: React.ReactNode;
};

export const StickyFooterContainer = ({ children }: Props) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <div
            className={cn(
                'sticky bottom-0 left-0 right-0 z-[1000] p-4 shadow-[0px_-1px_6px_-3px_rgba(0,0,0,0.56)] transition-shadow duration-200 ease-in-out',
                isDark ? 'bg-neutral-800' : 'bg-white'
            )}
        >
            {children}
        </div>
    );
};
