import { useVeChainKitConfig } from '@/providers';
import { Box } from '../ui';
import { useEffect, useState, useRef } from 'react';

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
            <Box
                className={`sticky top-0 left-0 w-full rounded-t-[24px] z-[1000] transition-shadow duration-200 ease-in-out ${
                    isDark ? 'bg-[rgb(31_31_30_/_90%)]' : 'bg-[rgb(255_255_255_/_69%)]'
                }`}
                style={{ 
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: hasContentBelow
                        ? '0px 2px 4px 1px rgb(0 0 0 / 10%)'
                        : 'none'
                }}
            >
                {children}
            </Box>
            <div
                ref={observerRef}
                style={{ position: 'absolute', top: '25px' }}
            />
        </>
    );
};
