import { useVeChainKitConfig } from '@/providers';
import { useEffect, useState, useRef } from 'react';
import { cn } from '../../utils/tailwind';

type Props = {
    children: React.ReactNode;
};

export const StickyHeaderContainer = ({ children }: Props) => {
    const [hasContentBelow, setHasContentBelow] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null);
    const { darkMode: isDark } = useVeChainKitConfig();
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setHasContentBelow(!entry.isIntersecting);
            },
            { threshold: 0 },
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div
                className={cn(
                    'sticky top-0 left-0 w-full rounded-t-3xl backdrop-blur-3xl z-[1000] transition-shadow duration-200 ease-in-out',
                    isDark ? 'bg-neutral-800/90' : 'bg-white/70',
                    hasContentBelow ? 'shadow-md' : 'shadow-none'
                )}
                style={{ WebkitBackdropFilter: 'blur(12px)' }}
            >
                {children}
            </div>
            <div
                ref={observerRef}
                className="absolute top-[25px]"
            />
        </>
    );
};
