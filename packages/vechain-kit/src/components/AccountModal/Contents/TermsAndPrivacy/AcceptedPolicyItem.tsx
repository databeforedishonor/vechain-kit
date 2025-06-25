import {
    LegalDocumentAgreement,
    LegalDocumentSource,
    LegalDocumentType,
} from '@/types';
import { formatDate } from '@/utils/dateUtils';
import { useTranslation } from 'react-i18next';

export const AcceptedPolicyItem = ({
    document,
}: {
    document: LegalDocumentAgreement;
}) => {
    const { t } = useTranslation();
    const isVechainKitTerms =
        document.documentSource === LegalDocumentSource.VECHAIN_KIT &&
        document.documentType === LegalDocumentType.TERMS;
    return (
        <div className="flex items-center">
            <span>
                v{document.version}
            </span>
            <span
                cursor="pointer"
                onClick={() => {
                    window.open(document.url, '_blank');
                }}
                _hover={{
                    textDecoration: 'underline',
                }}
            >
                {isVechainKitTerms
                    ? t("'{{policyName}}' on connect", {
                          policyName:
                              document.displayName ?? t('Vechain Kit Policy'),
                      })
                    : t("'{{policyName}}' on {{date}}", {
                          policyName: document.displayName ?? t('Policy'),
                          date: formatDate(document.timestamp),
                      })}
            </span>
        </div>
    );
};
