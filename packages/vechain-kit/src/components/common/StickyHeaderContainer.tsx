import { useVeChainKitConfig } from '@/providers';
import { useEffect, useState, useRef } from 'react';

type Props = {
    children: React.ReactNode;
}

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
                to
                left={'0'}
                backdropFilter={'blur(12px)'}
                style={{ WebkitBackdropFilter: 'blur(12px)' }}
                zIndex={1000}
                boxShado
                transition="box-shadow 0.2s ease-in-out"
            >
                {children}
            </div>
            <div
                ref={observerRef}
                style={{ position: 'absolute', top: '25px' }}
            />
        </>
    );
};
