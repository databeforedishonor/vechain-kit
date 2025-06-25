import { useScrollToTop } from '@/hooks/utils/useScrollToTop';

export const ScrollToTopWrapper = ({ children, ...props }: StackProps) => {
    useScrollToTop();

    return <div className="flex flex-col" {...props}>{children}</div>;
};
