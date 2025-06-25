import { useTranslation } from 'react-i18next';
import { IoChevronDown, IoChevronUp, IoTrashOutline } from 'react-icons/io5';
import { useVeChainKitConfig } from '@/providers';
import { useWallet } from '@/hooks';
import { useWalletMetadata } from '@/hooks/api/wallet/useWalletMetadata';
import { AccountAvatar } from '@/components/common';
import { getPicassoImage, humanDomain } from '@/utils';

interface ExistingDomainsListProps {
    domains: { name: string }[];
    onDomainSelect: (domain: string) => void;
    onUnsetDomain: () => void;
    isLoading?: boolean;
};

const DomainListItem = ({
    domain,
    isCurrentDomain,
    onSelect,
}: {
    domain: { name: string };
    isCurrentDomain: boolean;
    onSelect: (name: string) => void;
}) => {
    const { darkMode: isDark } = useVeChainKitConfig();
    const { connection } = useWallet();
    const { t } = useTranslation();
    const metadata = useWalletMetadata(domain.name, connection.network);

    return (
        <ListItem
            key={domain.name}
            p={4}
            bg={isDark ? '#1f1f1e' : 'white'}
            borderRadius="xl"
            cursor={isCurrentDomain ? 'default' : 'pointer'}
            opacity={isCurrentDomain ? 0.7 : 1}
            border={`1px solid ${isDark ? '#2d2d2d' : '#eaeaea'}`}
            _hover={{
                bg: isCurrentDomain
                    ? isDark
                        ? '#1f1f1e'
                        : 'white'
                    : isDark
                    ? '#252525'
                    : 'gray.50',
                borderColor: isDark ? '#3d3d3d' : '#dedede',
            }}
            onClick={() => !isCurrentDomain && onSelect(domain.name)}
            transition="all 0.2s"
        >
            <div className="flex items-center">
                <AccountAvatar
                    props={{
                        width: '40px',
                        height: '40px',
                        src: metadata.image ?? getPicassoImage(domain.name),
                        alt: domain.name,
                    }}
                />

                <div className="flex flex-col" flex={1}>
                    <span
                    >
                        {humanDomain(domain.name, 24, 0)}
                    </span>
                    {isCurrentDomain && (
                        <span
                        >
                            {t('Current domain')}
                        </span>
                    )}
                </div>

                {isCurrentDomain && (
                    <span
                    >
                        {t('Current')}
                    </span>
                )}
            </div>
        </ListItem>
    );
};

const UnsetDomainListItem = ({ onUnset }: { onUnset: () => void }) => {
    const { darkMode: isDark } = useVeChainKitConfig();
    const { t } = useTranslation();

    return (
        <ListItem
            key={'unset-domain-list-item'}
            p={4}
            bg={isDark ? '#1f1f1e' : 'white'}
            borderRadius="xl"
            cursor={'pointer'}
            opacity={1}
            border={`1px solid ${isDark ? '#2d2d2d' : '#eaeaea'}`}
            _hover={{
                bg: isDark ? '#252525' : 'gray.50',
                borderColor: isDark ? '#3d3d3d' : '#dedede',
                color: 'red.400',
            }}
            onClick={onUnset}
            transition="all 0.2s"
            role="button"
            aria-label={t('Unset current domain')}
        >
            <div className="flex items-center">
                <div
                    widt
                    height="40px"
                    alignItems="center"
                    justifyContent="center"
                >
                    <IoTrashOutline
                        fontSize="18px"
                        color={isDark ? 'red.300' : 'red.500'}
                     />
                </div>
                <div className="flex flex-col" flex={1}>
                    <span
                    >
                        {t('Unset current domain')}
                    </span>
                    <span
                    >
                        {t('Remove your current domain name')}
                    </span>
                </div>
            </div>
        </ListItem>
    );
}

export const ExistingDomainsList = ({
    domains,
    onDomainSelect,
    onUnsetDomain,
    isLoading,
}: ExistingDomainsListProps) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();
    const { account } = useWallet();

    // avoid flickering after loading by returning null, so if no domains are found, it will not show the accordion
    if (domains.length === 0 || isLoading) {
        return null;
    }

    return (
        <div allowToggle>
            <divItem>
                {({ isExpanded }) => (
                    <>
                        <divButton
                            _hover={{
                                bg: isDark ? 'whiteAlpha.100' : 'gray.100',
                            }}
                            opacity={isLoading ? 0.7 : 1}
                            transition="all 0.2s"
                            disabled={isLoading}
                        >
                            <div flex="1">
                                <span>
                                    {isLoading
                                        ? t('Loading your domains...')
                                        : `${t('Your existing domains')} (${
                                              domains.length
                                          })`}
                                </span>
                            </div>
                            <isExpanded ? IoChevronUp : IoChevronDown
                                fontSize="20px"
                                opacity={0.5}
                             />
                        </button>
                        <divPanel>
                            <List spacing={2}>
                                {domains.map((domain) => (
                                    <DomainListItem
                                        key={domain.name}
                                        domain={domain}
                                        isCurrentDomain={
                                            domain.name === account?.domain
                                        }
                                        onSelect={onDomainSelect}
                                    />
                                ))}
                                {account?.domain && (
                                    <UnsetDomainListItem
                                        onUnset={onUnsetDomain}
                                    />
                                )}
                            </List>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
