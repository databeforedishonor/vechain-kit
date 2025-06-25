'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { BsGlobe } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { languageNames, supportedLanguages } from '../../../../../i18n';
import { useAccountModal } from '@vechain/vechain-kit';

export function LanguageCard() {
    const { colorMode } = useColorMode();
    const { t, i18n } = useTranslation();
    const { open: openAccountModal } = useAccountModal();
    return (
        <div
            p={4}
            backdropFilter="blur(10px)"
            borderRadius="md"
            bg={colorMode === 'light' ? 'gray.50' : 'whiteAlpha.50'}
            height="full"
        >
            <div className="flex flex-col space-y-3"  align="start">
                <Icon
                    as={BsGlobe}
                    boxSize={6}
                    color={colorMode === 'light' ? 'blue.500' : 'blue.300'}
                />
                <p className="font-bold">Multilanguage support</p>
                <div className="flex flex-col space-y-2" align="start" >
                    <p
                        fontSize="sm"
                        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                    >
                        {t('Demo text to be translated')}
                    </p>
                    <select
                        borderRadius={'md'}
                        size="sm"
                        width="auto"
                        value={i18n.language}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                    >
                        {supportedLanguages.map((lang) => (
                            <option key={lang} value={lang}>
                                {
                                    languageNames[
                                        lang as keyof typeof languageNames
                                    ]
                                }
                            </option>
                        ))}
                    </select>
                    <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => openAccountModal()}
                    >
                        {t('Check language in account modal')}
                    </button>
                </div>
            </div>
        </div>
    );
}
