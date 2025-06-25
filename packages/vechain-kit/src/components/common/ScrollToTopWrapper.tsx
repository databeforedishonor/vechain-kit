import { VStack } from '@/components/ui';
import { useScrollToTop } from '@/hooks/utils/useScrollToTop';

interface ScrollToTopWrapperProps {
    children: React.ReactNode;
    className?: string;
    spacing?: number;
}

export const ScrollToTopWrapper = ({ children, className, spacing, ...props }: ScrollToTopWrapperProps) => {
    useScrollToTop();

    return <VStack className={className} spacing={spacing} {...props}>{children}</VStack>;
};
