import React from 'react';
import { Alert, AlertIcon, Text, VStack, HStack } from '@/components/ui';

export interface ExchangeWarningAlertProps {
  message?: string;
  className?: string;
}

export const ExchangeWarningAlert: React.FC<ExchangeWarningAlertProps> = ({
  message = "This wallet address may be associated with an exchange. Please ensure you control this address.",
  className,
  ...props
}) => {
  return (
    <Alert status="warning" variant="left-accent" className={className} {...props}>
      <HStack spacing={3} className="w-full">
        <AlertIcon />
        <VStack spacing={1} className="flex-1">
          <Text className="text-sm font-medium">Exchange Warning</Text>
          <Text className="text-xs">{message}</Text>
        </VStack>
      </HStack>
    </Alert>
  );
};
