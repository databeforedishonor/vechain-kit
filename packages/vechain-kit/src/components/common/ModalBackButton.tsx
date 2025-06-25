import { IoChevronBack } from 'react-icons/io5';

interface BackButtonProps {
    onClick: () => void;
} & Partial<buttonProps>;

export const ModalBackButton = ({ onClick, ...props }: BackButtonProps) => {
    return (
        <button
            aria-label="Back"
            icon={<IoChevronBack />}
            size="sm"
            variant="ghost"
            _hover={{ bg: 'blackAlpha.100' }}
            _dark={{ _hover: { bg: 'whiteAlpha.100' } }}
            position="absolute"
            borderRadius={'50%'}
            left="10px"
            top="10px"
            onClick={onClick}
            {...props}
        />
    );
};
