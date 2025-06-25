import React from 'react';
import { Card, CardBody, VStack, Skeleton } from '@/components/ui';

export interface SkeletonAppCardProps {
  className?: string;
}

export const SkeletonAppCard: React.FC<SkeletonAppCardProps> = ({ className }) => {
  return (
    <Card variant="outline" className={className}>
      <CardBody>
        <VStack spacing={3}>
          <Skeleton height="60px" width="60px" borderRadius="12px" />
          <VStack spacing={2} className="w-full">
            <Skeleton height="16px" width="80%" />
            <Skeleton height="12px" width="60%" />
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};
