import { useEcosystemShortcuts } from '@/hooks';
import { AccountModalContentTypes } from '@/components/AccountModal/Types';
import { useTranslation } from 'react-i18next';
import { notFoundImage } from '@/utils';

type Props = {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
}

export const ShortcutsSection = ({}: Props) => {
    const { t } = useTranslation();
    const { shortcuts } = useEcosystemShortcuts();

    if (shortcuts.length === 0) return null;

    return (
        <div className="flex flex-col space-y-2">
            <span>
                {t('Shortcuts')}
            </span>
            <div templateColumns="repeat(4, 1fr)" ga>
                {shortcuts.map((shortcut) => (
                    <divItem key={shortcut.url}>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                            _hover={{ opacity: 0.8 }}
                            cursor="pointer"
                            onClick={() => window.open(shortcut.url, '_blank')}
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"Body alignItems="center">
                                <img
                                    src={shortcut.image}
                                    fallbackSrc={notFoundImage}
                                    alt={shortcut.name}
                                    objectFit="contain"
                                    rounded="full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
