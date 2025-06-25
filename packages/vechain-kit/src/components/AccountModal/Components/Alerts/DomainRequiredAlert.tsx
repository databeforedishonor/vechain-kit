import React from 'react';
import { Alert, AlertIcon, Text, VStack, HStack } from '@/components/ui';

export interface DomainRequiredAlertProps {
  message?: string;
  className?: string;
}

export const DomainRequiredAlert: React.FC<DomainRequiredAlertProps> = ({
  message = "A domain is required to continue. Please set up your domain first.",
  className,
  ...props
}) => {
  return (
    <Alert status="info" variant="left-accent" className={className} {...props}>
      <HStack spacing={3} className="w-full">
        <AlertIcon />
        <VStack spacing={1} className="flex-1">
          <Text className="text-sm font-medium">Domain Required</Text>
          <Text className="text-xs">{message}</Text>
        </VStack>
      </HStack>
    </Alert>
  );
};
