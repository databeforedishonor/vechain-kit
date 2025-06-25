import { useTranslation } from 'react-i18next';
import { CategoryLabel, AllowedCategories } from './CategoryLabel';

export type CategoryFilter = string | null;

interface CategoryFilterSectionProps {
    selectedCategory: CategoryFilter;
    onCategoryChange: (category: CategoryFilter) => void;
    categories: AllowedCategories[];
    darkMode: boolean;
}

export const CategoryFilterSection = ({
    selectedCategory,
    onCategoryChange,
    categories,
    darkMode,
}: CategoryFilterSectionProps) => {
    const { t } = useTranslation();

    return (
        <div widt>
            <span>
                {t('Filter by category')}
            </span>
            <Wrap spacing={2}>
                <WrapItem>
                    <span
                        cursor="pointer"
                        onClick={() => onCategoryChange(null)}
                    >
                        {t('All')}
                    </span>
                </WrapItem>

                {categories.map((category) => (
                    <WrapItem key={category}>
                        <CategoryLabel
                            category={category}
                            size="md"
                            variant={
                                selectedCategory === category
                                    ? 'solid'
                                    : 'outline'
                            }
                            cursor="pointer"
                            onClick={() => onCategoryChange(category)}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </div>
    );
};
