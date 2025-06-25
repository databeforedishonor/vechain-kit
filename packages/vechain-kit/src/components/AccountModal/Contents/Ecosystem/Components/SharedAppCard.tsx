import { notFoundImage } from '@/utils';
import { CategoryLabel, AllowedCategories } from './CategoryLabel';

export interface SharedAppCardProps {
    name?: string;
    imageUrl: string;
    linkUrl: string;
    category?: AllowedCategories;
    logoComponent?: JSX.Element;
    onClick: () => void;
    size?: 'sm' | 'md';
}

export const SharedAppCard = ({
    name,
    imageUrl,
    logoComponent,
    category,
    onClick,
    size = 'md',
}: SharedAppCardProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            _hover={{ opacity: 0.8 }}
            cursor="pointer"
            onClick={onClick}
        >
            {category && (
                <div to right="2" zIndex="1">
                    <CategoryLabel category={category} />
                </div>
            )}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"Body alignItems="center">
                <div className="flex flex-col space-y-2" justifyContent="space-between">
                    {logoComponent
                        ? logoComponent
                        : imageUrl && (
                              <img
                                  src={imageUrl}
                                  fallbackSrc={notFoundImage}
                                  alt={name}
                                  height="90px"
                                  objectFit="contain"
                                  rounded="full" />
                          )}
                    {name && (
                        <span
                            wordBreak="break-word"
                            noOfLines={1}
                        >
                            {name}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
