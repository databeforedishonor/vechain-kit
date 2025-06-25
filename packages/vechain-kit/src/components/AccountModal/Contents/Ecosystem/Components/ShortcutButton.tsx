import { useTranslation } from 'react-i18next';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useEcosystemShortcuts } from '@/hooks';
import { Analytics } from '@/utils/mixpanelClientInstance';

type Props = {
    name: string;
    image: string;
    url: string;
    description?: string;
}

export const ShortcutButton = ({ name, image, url, description }: Props) => {
    const { t } = useTranslation();
    const { isShortcut, addShortcut, removeShortcut } = useEcosystemShortcuts();
    const hasShortcut = isShortcut(url);

    const handleShortcutClick = () => {
        if (hasShortcut) {
            removeShortcut(url);
        } else {
            Analytics.ecosystem.addAppToShortcuts(name);
            addShortcut({ name, image, url, description });
        }
    };

    return (
        <button className="px-4 py-2 rounded-md transition-colors"
            widt
            height="45px"
            onClick={handleShortcutClick}
            leftIcon={<hasShortcut ? BsBookmarkFill : BsBookmark  />}
        >
            {hasShortcut ? t('Remove from shortcuts') : t('Add to shortcuts')}
        </button>
    );
};
