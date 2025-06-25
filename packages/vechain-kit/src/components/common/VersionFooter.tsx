import { HStack, Link } from '@/components/ui';
import { VechainLogo } from '../../assets';
import packageJson from '../../../package.json';
import { useVeChainKitConfig } from '@/providers';

interface VersionFooterProps {
    className?: string;
}

export const VersionFooter = ({ className, ...props }: VersionFooterProps) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <HStack
            className={`w-full justify-center items-center ${className || ''}`}
            spacing={0}
            {...props}
        >
            <VechainLogo
                isDark={isDark}
                w={'70px'}
                h={'auto'}
                opacity={0.4}
                mr={1}
                ml={'-16px'}
            />
            <Link
                href={`https://github.com/vechain/vechain-kit/releases/tag/${packageJson.version}`}
                isExternal
                className="text-xs font-medium opacity-40 text-left pt-px"
            >
                v{packageJson.version}
            </Link>
        </HStack>
    );
};
