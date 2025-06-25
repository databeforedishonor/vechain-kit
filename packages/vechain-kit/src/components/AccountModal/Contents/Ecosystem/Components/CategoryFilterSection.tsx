import React from 'react';
import { Box, Tag, Text, Wrap, WrapItem } from '@/components/ui';
import { useTranslation } from 'react-i18next';
import { CategoryLabel, AllowedCategories } from './CategoryLabel';

export type CategoryFilter = string | null;

type CategoryFilterSectionProps = {
    selectedCategory: CategoryFilter;
    onCategoryChange: (category: CategoryFilter) => void;
    categories: AllowedCategories[];
    darkMode: boolean;
};

export const CategoryFilterSection = ({
    selectedCategory,
    onCategoryChange,
    categories,
    darkMode,
}: CategoryFilterSectionProps) => {
    const { t } = useTranslation();

    return (
        <Box className="w-full mb-4">
            <Text className="text-sm font-medium mb-2">
                {t('Filter by category')}
            </Text>
            <Wrap spacing={2}>
                <WrapItem>
                    <Tag
                        size="md"
                        variant={selectedCategory === null ? 'solid' : 'outline'}
                        colorScheme={darkMode ? 'gray' : 'gray'}
                        className="rounded-full cursor-pointer"
                        onClick={() => onCategoryChange(null)}
                    >
                        {t('All')}
                    </Tag>
                </WrapItem>

                {categories.map((category) => (
                    <WrapItem key={category}>
                        <CategoryLabel
                            category={category}
                            size="md"
                            variant={selectedCategory === category ? 'solid' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => onCategoryChange(category)}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </Box>
    );
};
