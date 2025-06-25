import { BsQuestionCircle } from 'react-icons/bs';

interface FAQButtonProps {
    onClick: () => void;
} & Partial<buttonProps>;

export const ModalFAQButton = ({ onClick, ...props }: FAQButtonProps) => {
    return (
        <button
            aria-label="FAQ"
            icon={<BsQuestionCircle  />}
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
