import { cn } from '../../utils/cn';

interface ButtonProps {
    children?: any;
    className?: string;
    variant?: 'solid' | 'outline' | 'ghost' | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    colorScheme?: 'blue' | 'gray' | 'red' | 'green' | 'yellow';
    isLoading?: boolean;
    loadingText?: string;
    leftIcon?: any;
    rightIcon?: any;
    isFullWidth?: boolean;
    disabled?: boolean;
    onClick?: (event: any) => void;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
    className,
    variant = 'solid',
    size = 'md',
    colorScheme = 'blue',
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    isFullWidth = false,
    disabled,
    onClick,
    type = 'button',
    ...props
}: ButtonProps) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const sizeClasses = {
        xs: 'h-6 px-2 text-xs rounded',
        sm: 'h-8 px-3 text-sm rounded',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-12 px-6 text-base rounded-md'
    };

    const variantClasses = {
        solid: {
            blue: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
            gray: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
            red: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
            green: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
            yellow: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500'
        },
        outline: {
            blue: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:hover:bg-blue-950',
            gray: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
            red: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500 dark:hover:bg-red-950',
            green: 'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500 dark:hover:bg-green-950',
            yellow: 'border border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500 dark:hover:bg-yellow-950'
        },
        ghost: {
            blue: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:hover:bg-blue-950',
            gray: 'text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
            red: 'text-red-600 hover:bg-red-50 focus:ring-red-500 dark:hover:bg-red-950',
            green: 'text-green-600 hover:bg-green-50 focus:ring-green-500 dark:hover:bg-green-950',
            yellow: 'text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500 dark:hover:bg-yellow-950'
        },
        link: {
            blue: 'text-blue-600 underline-offset-4 hover:underline focus:ring-blue-500',
            gray: 'text-gray-700 underline-offset-4 hover:underline focus:ring-gray-500 dark:text-gray-300',
            red: 'text-red-600 underline-offset-4 hover:underline focus:ring-red-500',
            green: 'text-green-600 underline-offset-4 hover:underline focus:ring-green-500',
            yellow: 'text-yellow-600 underline-offset-4 hover:underline focus:ring-yellow-500'
        }
    };

    const widthClass = isFullWidth ? 'w-full' : '';
    
    const isDisabled = disabled || isLoading;

    return (
        <button
            className={cn(
                baseClasses,
                sizeClasses[size],
                variantClasses[variant][colorScheme],
                widthClass,
                className
            )}
            disabled={isDisabled}
            onClick={onClick}
            type={type}
            {...props}
        >
            {isLoading && (
                <div className="mr-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                </div>
            )}
            {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
            {isLoading && loadingText ? loadingText : children}
            {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
};

export type { ButtonProps };