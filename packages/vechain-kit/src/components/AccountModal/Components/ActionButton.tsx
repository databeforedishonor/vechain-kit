import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';

interface ActionButtonProps {
    title: string;
    description?: string;
    onClick: () => void;
    leftIcon?: IconType;
    rightIcon?: IconType;
    leftImage?: string;
    backgroundColor?: string;
    border?: string;
    hide?: boolean;
    _hover?: object;
    showComingSoon?: boolean;
    isDisabled?: boolean;
    stacked?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    style?: ButtonProps;
    extraContent?: React.ReactNode;
    dataTestId?: string;
    variant?: string;
}

export const ActionButton = ({
    leftIcon,
    rightIcon,
    title,
    onClick,
    leftImage,
    hide = false,
    showComingSoon = false,
    backgroundColor,
    _hover,
    isDisabled = false,
    stacked = false,
    isLoading,
    loadingText,
    style,
    extraContent,
    dataTestId,
    variant = 'actionButton',
}: ActionButtonProps) => {
    const { t } = useTranslation();
    return (
        <button className="px-4 py-2 rounded-md transition-colors"
            onClick={onClick}
            isDisabled={showComingSoon || isDisabled}
            isLoading={isLoading}
            loadingText={loadingText}
            bgColor={backgroundColor}
            _hover={_hover}
            data-testid={dataTestId}
            {...style}
        >
            <div className="flex items-center" alignItems={'center'}>
                <div>
                    {leftImage ? (
                        <img
                            src={leftImage}
                            alt="left-image"
                            alignSelf={'end'}
                            objectFit="cover" />
                    ) : (
                        <leftIcon
                            fontSize={'20px'}
                            h={'full'}
                            alignContent={'center'}
                         />
                    )}
                </div>
                <div className="flex flex-col"
                    flex={1}
                    justifyContent={'flex-start'}
                    alignItems={'flex-start'}
                >
                    <div className="flex items-center" alignItems={'baseline'}>
                        <span>
                            {title}
                        </span>
                        {showComingSoon && (
                            <span>
                                {t('Coming Soon!')}
                            </span>
                        )}
                        {extraContent}
                    </div>

                    {/* <span
                        opacity={0.5}
                        overflowWra
                        wordBreak={'break-word'}
                        whiteSpace={'normal'}
                    >
                        {description}
                    </span> */}
                </div>

                {rightIcon && (
                    <div className="flex flex-col" justifyContent={'flex-end'}>
                        <rightIcon fontSize={'20px'} opacity={0.5}  />
                    </div>
                )}
            </div>
        </button>
    );
};
