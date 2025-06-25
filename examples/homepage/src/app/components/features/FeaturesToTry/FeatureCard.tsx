'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { IconType } from 'react-icons';
import { FaHandPointLeft } from 'react-icons/fa';

interface FeatureCardProps {
    title: string;
    description: React.ReactNode;
    icon: IconType;
    highlight?: boolean;
    content: () => void;
    disabled?: boolean;
    showHint?: boolean;
}

export function FeatureCard({
    title,
    description,
    icon,
    highlight,
    content,
    disabled = false,
    showHint = false,
}: FeatureCardProps) {
    const { colorMode } = useColorMode();

    return (
        <div
            onClick={(e) => {
                if (disabled) {
                    e.preventDefault();
                    return;
                }
                content();
            }}
            p={4}
            borderRadius="md"
            borderWidth="1px"
            backdropFilter="blur(10px)"
            borderColor={highlight ? 'blue.500' : 'transparent'}
            bg={colorMode === 'light' ? 'gray.50' : 'whiteAlpha.50'}
            _hover={{
                transform: disabled ? 'translateY(0)' : 'translateY(-2px)',
                transition: 'transform 0.2s',
                bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.100',
            }}
            cursor={disabled ? 'not-allowed' : 'pointer'}
            height="full"
        >
            <div className="flex flex-col space-y-3"  align="start">
                <div className="flex flex-row items-center">
                    <Icon
                        as={icon}
                        boxSize={6}
                        color={colorMode === 'light' ? 'blue.500' : 'blue.300'}
                    />
                    {showHint && (
                        <div className="flex flex-row items-center space-x-3"
                            
                            animation="bounce-left 1s infinite"
                            justifyContent="center"
                            alignItems="center"
                            transform="rotate(-10deg)"
                            sx={{
                                '@keyframes bounce-left': {
                                    '0%, 100%': {
                                        transform: 'rotate(0deg) translateX(0)',
                                    },
                                    '50%': {
                                        transform:
                                            'rotate(0deg) translateX(-5px)',
                                    },
                                },
                            }}
                        >
                            <FaHandPointLeft
                                size={24}
                                rotate={10}
                                color={
                                    colorMode === 'light'
                                        ? '#4A5568'
                                        : '#A0AEC0'
                                }
                                style={{ marginLeft: '8px' }}
                            />

                            <p
                                fontSize="sm"
                                color={
                                    colorMode === 'light'
                                        ? 'gray.600'
                                        : 'gray.400'
                                }
                            >
                                Click me!
                            </p>
                        </div>
                    )}
                </div>
                <p className="font-bold">{title}</p>
                <p
                    fontSize="sm"
                    color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                >
                    {description}
                </p>
                {disabled && (
                    <p fontSize="xs" opacity={0.5}>
                        Only available for social login users.
                    </p>
                )}
            </div>
        </div>
    );
}
