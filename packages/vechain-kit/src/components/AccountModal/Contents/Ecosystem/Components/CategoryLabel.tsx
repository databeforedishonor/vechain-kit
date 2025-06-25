import React from 'react';
import { Tag, type TagProps } from '@/components/ui';
import { useTranslation } from 'react-i18next';

export type AllowedCategories =
    | 'defi'
    | 'games'
    | 'collectibles'
    | 'marketplaces'
    | 'utilities'
    | 'vebetter';

type CategoryProps = {
    category: AllowedCategories;
} & Omit<TagProps, 'children'>;

const getCategoryColor = (category: AllowedCategories): 'blue' | 'green' | 'red' | 'gray' | 'yellow' | 'purple' => {
    switch (category) {
        case 'defi':
            return 'blue';
        case 'games':
            return 'green';
        case 'collectibles':
            return 'purple';
        case 'marketplaces':
            return 'yellow';
        case 'utilities':
            return 'gray';
        case 'vebetter':
            return 'green';
        default:
            return 'gray';
    }
};

export const CategoryLabel: React.FC<CategoryProps> = ({ category, className, ...props }) => {
    const { t } = useTranslation();

    const categoryKey = category.toLowerCase() as AllowedCategories;
    const color = getCategoryColor(categoryKey);

    return (
        <Tag
            size="sm"
            colorScheme={color}
            className={`rounded-full px-2 ${className || ''}`}
            {...props}
        >
            {t(categoryKey)}
        </Tag>
    );
};
