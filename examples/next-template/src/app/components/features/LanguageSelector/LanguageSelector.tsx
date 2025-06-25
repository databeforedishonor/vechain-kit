'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useTranslation } from '../../../../../node_modules/react-i18next';
import { languageNames, supportedLanguages } from '../../../../../i18n';

export function LanguageSelector() {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <h2 size={'md'}>
                <b>Multilanguage</b> (currently disabled)
            </h2>
            <div className="flex flex-col space-y-4" mt={4}  alignItems="flex-start">
                <p>
                    {t('Demo text to be translated')} - (language should change
                    also in modal and toast)
                </p>
                <select
                    borderRadius={'md'}
                    size="sm"
                    width="auto"
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    data-testid="select-language"
                >
                    {supportedLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                            {languageNames[lang as keyof typeof languageNames]}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
