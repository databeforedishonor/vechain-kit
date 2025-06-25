import { VechainLogo } from '../../assets';
import packageJson from '../../../package.json';
import { useVeChainKitConfig } from '@/providers';

type Props = {} & Omit<divProps, 'dangerouslySetInnerHTML'>;

export const VersionFooter = ({ ...props }: Props) => {
    const { darkMode: isDark } = useVeChainKitConfig();

    return (
        <div className="flex items-center"
            justifyContent={'center'}
            alignItems={'center'}
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
            <a
                opacity={0.4}
                href={`https://github.com/vechain/vechain-kit/releases/tag/${packageJson.version}`}
                isExternal
            >
                v{packageJson.version}
            </a>
        </div>
    );
};
