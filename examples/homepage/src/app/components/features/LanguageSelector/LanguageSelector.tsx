'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useTranslation } from 'react-i18next';
import { languageNames, supportedLanguages } from '../../../../../i18n';

export function LanguageSelector() {
    const { t, i18n } = useTranslation();

    return (
        <div
            p={6}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.100"
            _hover={{ borderColor: 'blue.500', cursor: 'pointer' }}
            transition="all 0.2s"
        >
            <h2 size={'md'}>
                <b>Multilanguage</b>
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
                    onClick={(e) => e.stopPropagation()}
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
