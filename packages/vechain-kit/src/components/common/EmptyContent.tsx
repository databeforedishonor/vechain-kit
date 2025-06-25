import { useVeChainKitConfig } from '@/providers';
import { ElementType } from 'react';

type Props = {
    title: string;
    description?: string;
    icon: ElementType;
}

export const EmptyContent = ({ title, description, icon }: Props) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <div className="flex flex-col space-y-6">
            <icon className="w-16 h-16"
                opacity={0.5}
                color={isDark ? 'whiteAlpha.800' : 'gray.600'}
             />
            <div className="flex flex-col space-y-2">
                <span>
                    {title}
                </span>
                <span opacity={0.7}>
                    {description}
                </span>
            </div>
        </div>
    );
};
