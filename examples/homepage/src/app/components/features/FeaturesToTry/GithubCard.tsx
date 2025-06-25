'use client';

import { cn } from '../../../../utils/cn';
import { useColorMode } from '../../../../hooks/useColorMode';
import { BsGithub } from 'react-icons/bs';

export function GithubCard() {
    const { colorMode } = useColorMode();

    return (
        <a
            href="https://github.com/vechain/vechain-kit/issues/new"
            isExternal
            _hover={{ textDecoration: 'none' }}
        >
            <div
                p={4}
                borderRadius="md"
                bg={colorMode === 'light' ? 'green.50' : 'green.900'}
                _hover={{
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s',
                    bg: colorMode === 'light' ? 'green.100' : 'green.800',
                }}
                cursor="pointer"
                height="full"
            >
                <div className="flex flex-col space-y-3"  align="start">
                    <Icon
                        as={BsGithub}
                        boxSize={6}
                        color={
                            colorMode === 'light' ? 'green.500' : 'green.300'
                        }
                    />
                    <p className="font-bold">Feature Request</p>
                    <p
                        fontSize="sm"
                        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                    >
                        Would you like to see something that is still missing?
                        Request the feature by opening an issue on our GitHub!
                    </p>
                </div>
            </div>
        </a>
    );
}
