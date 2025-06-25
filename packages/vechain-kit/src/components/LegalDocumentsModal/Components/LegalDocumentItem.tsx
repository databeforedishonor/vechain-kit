import { useVeChainKitConfig } from '@/providers';
import { EnrichedLegalDocument } from '@/types';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

type Props = {
    document: EnrichedLegalDocument;
    register: UseFormRegister<any>;
    isText?: boolean;
}

export const LegalDocumentItem = ({
    document,
    register,
    isText = false,
}: Props) => {
    const { t } = useTranslation();
    const { darkMode: isDark } = useVeChainKitConfig();
    const documentName = document.displayName ?? t('Policy');

    const borderColor = isDark ? 'whiteAlpha.400' : 'blackAlpha.400';

    const linkColor = isDark ? 'blue.300' : 'blue.500';
    const linkHoverColor = isDark ? 'blue.200' : 'blue.700';

    // Get document type display text
    const getDocumentTypeDisplay = (): string => {
        if (!document.documentType) return documentName;

        switch (document.documentType) {
            case 'terms':
                return document.displayName || 'Terms of Service';
            case 'privacy':
                return document.displayName || 'Privacy Policy';
            case 'cookies':
                return document.displayName || 'Cookie Policy';
            default:
                return document.displayName || 'Legal Document';
        }
    };

    const displayName = getDocumentTypeDisplay();

    if (isText) {
        return (
            <a
                key={document.id}
                href={document.url}
                isExternal
                textDecoration="underline"
                _hover={{
                    color: 'blue.300',
                    textDecoration: 'underline',
                }}
                alignItems="center"
            >
                <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    {...register(document.id, {
                        required: document.required,
                    })}
                    type="checkbox"
                    hidden />
                {displayName}
                <FaExternalLinkAlt className="w-3 h-3" ml={1}  />
            </a>
        );
    }

    return (
        <div className="flex items-center"
            widt
            transition="all 0.2s"
            key={document.id}
        >
            <div className="flex items-center" widt>
                <Checkbox
                    mt="2px"
                    size="md"
                    colorScheme="blue"
                    borderColor={borderColor}
                    {...register(document.id, {
                        required: document.required,
                    })}
                    data-testid="tnc-checkbox"
                />

                <span>
                    {t('I have read and agree to ')}
                    <a
                        href={document.url}
                        isExternal
                        textDecoration="underline"
                        _hover={{
                            color: linkHoverColor,
                            textDecoration: 'underline',
                        }}
                        alignItems="center"
                    >
                        {displayName}
                        <FiExternalLink ml={1}  />
                    </a>
                    {document.required && (
                        <span as="span">
                            *
                        </span>
                    )}
                </span>
            </div>
        </div>
    );
};
