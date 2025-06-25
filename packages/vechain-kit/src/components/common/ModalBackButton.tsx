import { IconButton } from '@/components/ui';
import { IoChevronBack } from 'react-icons/io5';

interface BackButtonProps {
    onClick: () => void;
    className?: string;
    isDisabled?: boolean;
}

export const ModalBackButton = ({ onClick, className, isDisabled, ...props }: BackButtonProps) => {
    return (
        <IconButton
            aria-label="Back"
            icon={<IoChevronBack size={20} />}
            size="sm"
            variant="ghost"
            isRound={true}
            isDisabled={isDisabled}
            className={`absolute left-2.5 top-2.5 hover:bg-black/10 dark:hover:bg-white/10 ${className || ''}`}
            onClick={onClick}
            {...props}
        />
    );
};
