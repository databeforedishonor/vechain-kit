import { ConnectionOptionsStack } from './Components/ConnectionOptionsStack';
import { useTranslation } from 'react-i18next';
import { FaChevronDown } from 'react-icons/fa';
import { EcosystemButton } from './Components';
import { useVeChainKitConfig } from '@/providers';
import { useFetchAppInfo } from '@/hooks';

interface ConnectPopoverProps {
    isLoading: boolean;
    buttonStyle?: ButtonProps;
}

export const ConnectPopover = ({
    isLoading,
    buttonStyle,
}: ConnectPopoverProps) => {
    const { t } = useTranslation();
    const {
        loginMethods,
        darkMode: isDark,
        privyEcosystemAppIDS,
    } = useVeChainKitConfig();
    const showEcosystemButton = loginMethods?.some(
        ({ method }) => method === 'ecosystem',
    );

    const { data: appsInfo, isLoading: isEcosystemAppsLoading } =
        useFetchAppInfo(privyEcosystemAppIDS);

    return (
        <Popover
            placement="bottom-start"
            size={'xl'}
            closeOnBlur={false}
            variant="vechainKitBase"
        >
            {({ isOpen }) => (
                <>
                    <PopoverTrigger>
                        <button className="px-4 py-2 rounded-md transition-colors"
                            isLoading={isLoading}
                            {...buttonStyle}
                            isActive={isOpen}
                        >
                            {t('Login')}
                            <Icon
                                ml={2}
                                as={FaChevronDown}
                                transform={
                                    isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                }
                                transition="transform 0.2s"
                            />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody>
                            <ConnectionOptionsStack />
                        </PopoverBody>
                        <PopoverFooter borderTop={'none'} pb={'15px'}>
                            {showEcosystemButton && (
                                <div className="flex items-center">
                                    <EcosystemButton
                                        isDark={isDark}
                                        appsInfo={Object.values(appsInfo || {})}
                                        isLoading={isEcosystemAppsLoading}
                                    />
                                </div>
                            )}
                        </PopoverFooter>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
};
