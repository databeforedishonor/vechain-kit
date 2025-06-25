'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

interface CollapsibleCardProps {
    title: string;
    icon?: React.ElementType;
    children: React.ReactNode;
    defaultIsOpen?: boolean;
    style?: BoxProps;
}

export function CollapsibleCard({
    title,
    icon,
    children,
    defaultIsOpen = false,
    style,
}: CollapsibleCardProps) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);

    return (
        <div
            p={4}
            borderRadius="lg"
            boxShadow="xl"
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            w="full"
            {...style}
        >
            <div className="flex flex-col space-y-6"  align="stretch" justifyContent={'center'}>
                <div className="flex flex-row items-center"
                    justify="space-between"
                    align="center"
                    cursor={'pointer'}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex flex-row items-center space-x-2" >
                        {icon && <Icon as={icon} boxSize={6} />}
                        <h2 size="sm" className="text-center">
                            {title}
                        </h2>
                    </div>
                    <IconButton
                        aria-label={isOpen ? 'Collapse' : 'Expand'}
                        icon={isOpen ? <MdExpandLess /> : <MdExpandMore />}
                        variant="ghost"
                        size="sm"
                    />
                </div>
                <Collapse in={isOpen} animateOpacity>
                    {children}
                </Collapse>
            </div>
        </div>
    );
}
