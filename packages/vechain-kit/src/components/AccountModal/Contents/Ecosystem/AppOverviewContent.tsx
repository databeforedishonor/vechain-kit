import { ModalBackButton, StickyHeaderContainer } from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { ShortcutButton } from './Components/ShortcutButton';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { CategoryLabel, AllowedCategories } from './Components/CategoryLabel';
import { CategoryFilter } from './Components/CategoryFilterSection';

export interface AppOverviewContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
    name: string;
    image: string;
    url: string;
    description: string;
    category?: AllowedCategories;
    selectedCategory?: CategoryFilter;
    logoComponent?: JSX.Element;
}

export const AppOverviewContent = ({
    setCurrentContent,
    name,
    image,
    url,
    description,
    category,
    selectedCategory,
    logoComponent,
}: AppOverviewContentProps) => {
    const { t } = useTranslation();

    const handleLaunchApp = () => {
        Analytics.ecosystem.launchApp(name);
        window.open(url, '_blank');
    };

    const handleBackClick = () => {
        if (selectedCategory) {
            setCurrentContent({
                type: 'ecosystem-with-category',
                props: {
                    selectedCategory,
                    setCurrentContent,
                },
            });
        } else {
            setCurrentContent('ecosystem');
        }
    };

    return (
        <div>
            <StickyHeaderContainer>
                <ModalHeader>{name}</ModalHeader>
                <ModalBackButton onClick={handleBackClick} />
                <ModalCloseButton />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col space-y-6">
                    <div>
                        {logoComponent ? (
                            logoComponent
                        ) : (
                            <img
                                src={image}
                                alt={name}
                                objectFit="contain" />
                        )}

                        {category && (
                            <div className="flex items-center">
                                <CategoryLabel category={category} />
                            </div>
                        )}
                    </div>

                    <span>
                        {description}
                    </span>

                    <span>
                        {t(
                            'Click below to access {{ name }} and explore its features.',
                            { name },
                        )}
                    </span>
                </div>
            </ModalBody>

            <ModalFooter>
                <div className="flex flex-col space-y-4">
                    <button className="px-4 py-2 rounded-md transition-colors"
                        onClick={handleLaunchApp}
                    >
                        {t('Launch {{name}}', { name })}
                        <FaExternalLinkAlt ml={2}  />
                    </button>

                    <ShortcutButton
                        name={name}
                        image={image}
                        url={url}
                        description={description}
                    />
                </div>
            </ModalFooter>
        </div>
    );
};
