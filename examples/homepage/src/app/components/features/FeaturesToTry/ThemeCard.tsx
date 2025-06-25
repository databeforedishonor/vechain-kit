'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

export function ThemeCard() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { t } = useTranslation();

    return (
        <div
            p={4}
            borderRadius="md"
            backdropFilter="blur(10px)"
            bg={colorMode === 'light' ? 'gray.50' : 'whiteAlpha.50'}
            height="full"
        >
            <div className="flex flex-col space-y-3"  align="start">
                <Icon
                    as={colorMode === 'light' ? BsSun : BsMoon}
                    boxSize={6}
                    color={colorMode === 'light' ? 'orange.500' : 'purple.300'}
                />
                <p className="font-bold">{t('Theme switcher')}</p>
                <div className="flex flex-col space-y-2" align="start" >
                    <p
                        fontSize="sm"
                        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                    >
                        {t('Try switching between light and dark mode')}
                    </p>
                    <button className="btn-primary px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        size="sm"
                        variant="ghost"
                        colorScheme={
                            colorMode === 'light' ? 'orange' : 'purple'
                        }
                        leftIcon={
                            <Icon
                                as={colorMode === 'light' ? BsMoon : BsSun}
                                boxSize={4}
                            />
                        }
                        onClick={toggleColorMode}
                    >
                        {t('Switch to')}{' '}
                        {colorMode === 'light' ? t('dark') : t('light')}{' '}
                        {t('mode')}
                    </button>
                </div>
            </div>
        </div>
    );
}
