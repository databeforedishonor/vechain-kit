import { ModalBackButton, StickyHeaderContainer } from '@/components/common';
import { AccountModalContentTypes } from '../../Types';
import { useState, useEffect } from 'react';
import {
    useEnsRecordExists,
    useWallet,
    useVechainDomain,
    useIsDomainProtected,
    useGetDomainsOfAddress,
} from '@/hooks';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { ExistingDomainsList } from './Components/ExistingDomainsList';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { ens_normalize } from '@adraffy/ens-normalize';

export interface ChooseNameSearchContentProps {
    name: string;
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
    initialContentSource?: AccountModalContentTypes;
}

export const ChooseNameSearchContent = ({
    name: initialName,
    setCurrentContent,
    initialContentSource = 'settings',
}: ChooseNameSearchContentProps) => {
    const { t } = useTranslation();
    const { account } = useWallet();
    const { darkMode: isDark } = useVeChainKitConfig();
    const [name, setName] = useState(ens_normalize(initialName));
    const [error, setError] = useState<string | null>(null);
    const [isOwnDomain, setIsOwnDomain] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const { data: ensRecordExists, isLoading: isEnsCheckLoading } =
        useEnsRecordExists(name);
    const { data: domainInfo, isLoading: isDomainInfoLoading } =
        useVechainDomain(`${name}.veworld.vet`);
    const { data: isProtected, isLoading: isProtectedLoading } =
        useIsDomainProtected(name);

    const {
        data: vetDomainsOfAddress,
        isLoading: isVetDomainsOfAddressLoading,
    } = useGetDomainsOfAddress(account?.address, '');

    const isFetchingDomainInfo =
        isEnsCheckLoading || isDomainInfoLoading || isProtectedLoading;

    useEffect(() => {
        if (!hasInteracted) return;

        // Add validation for special characters, spaces, and periods
        const hasSpecialChars = /[^a-zA-Z0-9-]|\s/.test(name);

        if (name.length < 3) {
            setError(t('Name must be at least 3 characters long'));
            setIsAvailable(false);
            setIsOwnDomain(false);
        } else if (hasSpecialChars) {
            setError(t('Only letters, numbers, and hyphens are allowed'));
            setIsAvailable(false);
            setIsOwnDomain(false);
        } else if (isProtected) {
            setError(t('This domain is protected'));
            setIsAvailable(false);
            setIsOwnDomain(false);
        } else if (ensRecordExists) {
            // Check if the domain belongs to the current user
            const isOwnDomain =
                domainInfo?.address?.toLowerCase() ===
                account?.address?.toLowerCase();

            if (isOwnDomain) {
                setError(null);
                setIsAvailable(true);
                setIsOwnDomain(true);
            } else {
                setError(t('This domain is already taken'));
                setIsAvailable(false);
                setIsOwnDomain(false);
            }
        } else if (!isEnsCheckLoading) {
            setError(null);
            setIsAvailable(true);
            setIsOwnDomain(false);
        }

        if (name.length >= 3 && !isFetchingDomainInfo) {
            Analytics.nameSelection.searched(name, isAvailable);
        }
    }, [
        name,
        hasInteracted,
        ensRecordExists,
        isEnsCheckLoading,
        domainInfo,
        account?.address,
        isProtected,
        isAvailable,
        isFetchingDomainInfo,
    ]);

    const handleContinue = () => {
        if (isAvailable && !error) {
            setCurrentContent({
                type: 'choose-name-summary',
                props: {
                    fullDomain: name + '.veworld.vet',
                    isOwnDomain,
                    setCurrentContent,
                    initialContentSource,
                },
            });
        }
    };

    const handleDomainSelect = (selectedDomain: string) => {
        // Extract the domain type and base name
        const parts = selectedDomain.split('.');
        const domainType = parts.length > 2 ? `${parts[1]}.${parts[2]}` : 'vet';

        setCurrentContent({
            type: 'choose-name-summary',
            props: {
                fullDomain: selectedDomain,
                domainType: domainType,
                isOwnDomain: true,
                setCurrentContent,
                initialContentSource,
            },
        });
    };

    const handleUnsetDomain = () => {
        setCurrentContent({
            type: 'choose-name-summary',
            props: {
                fullDomain: '',
                domainType: '',
                isOwnDomain: false,
                isUnsetting: true,
                setCurrentContent,
                initialContentSource,
            },
        });
    };

    const handleClose = () => {
        Analytics.nameSelection.dropOff('search', {
            isError: false,
            name,
            error: 'modal_closed',
        });
    };

    const handleBack = () => {
        Analytics.nameSelection.dropOff('search', {
            isError: false,
            name,
            reason: 'back_button',
        });
        setCurrentContent(initialContentSource);
    };

    return (
        <>
            <StickyHeaderContainer>
                <ModalHeader data-testid="modal-title">
                    {t('Choose Name')}
                </ModalHeader>
                <ModalBackButton onClick={handleBack} />
                <ModalCloseButton onClick={handleClose} />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="flex flex-col space-y-4">
                    <ExistingDomainsList
                        domains={vetDomainsOfAddress?.domains || []}
                        onDomainSelect={handleDomainSelect}
                        onUnsetDomain={handleUnsetDomain}
                        isLoading={isVetDomainsOfAddressLoading}
                    />

                    <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"Group>
                        <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={t('Enter your name')}
                            value={name}
                            onChange={(e) => {
                                setName(ens_normalize(e.target.value));
                                if (!hasInteracted) setHasInteracted(true);
                            }}
                            paddingRight="120px"
                            fontSize="lg"
                            height="60px"
                            bg={isDark ? '#00000038' : 'white'}
                            border={`1px solid ${
                                isDark ? '#ffffff29' : '#ebebeb'
                            }`}
                            _hover={{
                                border: `1px solid ${
                                    isDark ? '#ffffff40' : '#e0e0e0'
                                }`,
                            }}
                            _focus={{
                                border: `1px solid ${
                                    isDark ? '#ffffff60' : '#d0d0d0'
                                }`,
                                boxShadow: 'none',
                            }}
                            isInvalid={!!error}
                            data-testid="domain-input"
                        />
                        <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"RightElement
                            widt
                            paddingRight="12px"
                        >
                            <div
                            >
                                .veworld.vet
                            </div>
                        </div>
                    </div>

                    {error && hasInteracted && (
                        <span
                            data-testid="domain-availability-status"
                        >
                            {error}
                        </span>
                    )}

                    {!error && hasInteracted && name.length >= 3 && (
                        <span
                            data-testid="domain-availability-status"
                        >
                            {isOwnDomain
                                ? t('YOU OWN THIS')
                                : isAvailable
                                ? t('AVAILABLE')
                                : t('UNAVAILABLE')}
                        </span>
                    )}
                </div>
            </ModalBody>

            <ModalFooter>
                <button className="px-4 py-2 rounded-md transition-colors"
                    isDisabled={
                        !isAvailable ||
                        !!error ||
                        isProtected ||
                        isFetchingDomainInfo
                    }
                    onClick={handleContinue}
                    data-testid="continue-button"
                >
                    {t('Continue')}
                </button>
            </ModalFooter>
        </>
    );
};
