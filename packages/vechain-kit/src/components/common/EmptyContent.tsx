import { useVeChainKitConfig } from '@/providers';
import { ElementType } from 'react';
import { cn } from '../../utils/tailwind';

type Props = {
    title: string;
    description?: string;
    icon: ElementType;
};

export const EmptyContent = ({ title, description, icon: IconComponent }: Props) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <div className="flex flex-col items-center space-y-6 py-8">
            <IconComponent
                className={cn(
                    'w-16 h-16 opacity-50',
                    isDark ? 'text-white/80' : 'text-gray-600'
                )}
            />
            <div className="flex flex-col items-center space-y-2">
                <p className="text-lg font-medium text-center">
                    {title}
                </p>
                {description && (
                    <p className="text-base opacity-70 text-center px-4">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};
