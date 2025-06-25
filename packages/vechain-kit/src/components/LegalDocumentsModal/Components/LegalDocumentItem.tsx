import React from 'react';
import { Checkbox, HStack, Input, Link, Text } from '@/components/ui';
import { EnrichedLegalDocument } from '@/types';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';

// New interface
export interface LegalDocumentItemProps {
  title: string;
  url: string;
  isAccepted: boolean;
  onChange: (isAccepted: boolean) => void;
  isRequired: boolean;
  index: number;
}

// Legacy interface for backward compatibility
interface LegacyLegalDocumentItemProps {
  document: EnrichedLegalDocument;
  register: UseFormRegister<any>;
  isText?: boolean;
}

type CombinedProps = LegalDocumentItemProps | LegacyLegalDocumentItemProps;

const isLegacyProps = (props: CombinedProps): props is LegacyLegalDocumentItemProps => {
  return 'document' in props;
};

export const LegalDocumentItem: React.FC<CombinedProps> = (props) => {
  const { t } = useTranslation();

  if (isLegacyProps(props)) {
    const { document, register, isText = false } = props;
    const documentName = document.displayName ?? t('Policy');

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
            <Link
                key={document.id}
                href={document.url}
                isExternal
                className="text-blue-500 underline hover:text-blue-300 font-medium inline-flex items-center"
            >
                <Input
                    {...register(document.id, {
                        required: document.required,
                    })}
                    type="checkbox"
                    className="hidden"
                />
                {displayName}
                <FaExternalLinkAlt className="ml-1 w-3 h-3" />
            </Link>
        );
    }

    return (
        <HStack spacing={3} className="w-full">
            <Checkbox
                {...register(document.id, {
                    required: document.required,
                })}
                colorScheme="blue"
                data-testid="tnc-checkbox"
            >
                <Text className="text-xs">
                    {t('I have read and agree to ')}{' '}
                    <Link
                        href={document.url}
                        isExternal
                        className="text-blue-500 underline hover:text-blue-300 font-medium inline-flex items-center"
                    >
                        {displayName}
                        <FaExternalLinkAlt className="ml-1 w-3 h-3" />
                    </Link>
                    {document.required && (
                        <Text as="span" className="text-red-500 font-bold">
                            *
                        </Text>
                    )}
                </Text>
            </Checkbox>
        </HStack>
    );
  }

  // New interface usage
  const { title, url, isAccepted, onChange, isRequired } = props;
  
  return (
    <HStack spacing={3} className="w-full">
      <Checkbox
        checked={isAccepted}
        onChange={(e) => onChange(e.target.checked)}
        colorScheme="blue"
      >
        <Text className="text-sm">
          {isRequired ? 'I accept ' : 'I agree to '}
          <Link href={url} isExternal className="underline">
            {title}
          </Link>
          {isRequired && ' (Required)'}
        </Text>
      </Checkbox>
    </HStack>
  );
};
