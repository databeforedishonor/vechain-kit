import { useTranslation } from 'react-i18next';
import { IoChevronDown } from 'react-icons/io5';
import { IoChevronUp } from 'react-icons/io5';

import { EnrichedLegalDocument, LegalDocumentAgreement } from '@/types';
import { MdCheck } from 'react-icons/md';
import { formatDate } from '@/utils/dateUtils';
import { AcceptedPolicyItem } from './AcceptedPolicyItem';

interface PolicyAccordionProps {
    title: string;
    description: string;
    documents: LegalDocumentAgreement[];
    bg: string;
    hoverBg: string;
    currentPolicy?: EnrichedLegalDocument | undefined;
}

export const PolicyAccordion = ({
    title,
    description,
    documents,
    bg,
    hoverBg,
    currentPolicy,
}: PolicyAccordionProps) => {
    const { t } = useTranslation();
    const hasDocuments = documents?.length > 0;

    const currentPolicyAgreement = documents?.find(
        (document) => document.id === currentPolicy?.id,
    );

    if (!hasDocuments) return null;

    return (
        <divItem>
            {({ isExpanded }) => (
                <>
                    <divButton
                        _hover={{
                            bg: hoverBg,
                        }}
                    >
                        <div className="flex flex-col">
                            <span>{title}</span>
                            <span>
                                {description}
                            </span>
                        </div>
                        <isExpanded ? IoChevronUp : IoChevronDown
                            fontSize="20px"
                            opacity={0.7}
                         />
                    </button>
                    <divPanel>
                        <div className="flex flex-col space-y-4">
                            {currentPolicyAgreement?.id ? (
                                <div className="flex items-center">
                                    <MdCheck color="green.500"  />
                                    <span>
                                        {t(
                                            'You accepted current policy on {{date}}',
                                            {
                                                date: formatDate(
                                                    currentPolicyAgreement.timestamp,
                                                ),
                                            },
                                        )}
                                    </span>
                                </div>
                            ) : null}

                            <div className="flex items-center">
                                <span>
                                    {t('All policies you have accepted')}
                                </span>
                            </div>

                            <div className="flex items-center" ga>
                                <div className="flex flex-col space-y-2">
                                    {documents.map((document) => (
                                        <AcceptedPolicyItem
                                            key={document.id}
                                            document={document}
                                        />
                                    ))}
                                </div>
                            </div>

                            {currentPolicy && (
                                <button className="px-4 py-2 rounded-md transition-colors border border-gray-300 hover:bg-gray-50"
                                    alignSelf="flex-end"
                                    onClick={() => {
                                        window.open(
                                            currentPolicy.url,
                                            '_blank',
                                        );
                                    }}
                                >
                                    {t('View Current Policy')}
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
