import { useVeChainKitConfig } from '@/providers';
type Props = {
    children: React.ReactNode;
}

export const StickyFooterContainer = ({ children }: Props) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <div
            botto
            left="0"
            right="0"
            zIndex="1000"
            boxShado
            transition="box-shadow 0.2s ease-in-out"
        >
            {children}
        </div>
    );
};
