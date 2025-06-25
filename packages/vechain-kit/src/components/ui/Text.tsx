import { cn } from '../../utils/cn';

interface TextProps {
    children?: any;
    className?: string;
    as?: keyof HTMLElementTagNameMap;
    fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    onClick?: (event: any) => void;
    style?: any;
}

export const Text = ({
    children,
    className,
    as: Component = 'p',
    fontSize = 'md',
    fontWeight = 'normal',
    color,
    textAlign,
    onClick,
    style,
    ...props
}: TextProps) => {
    const sizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl'
    };

    const weightClasses = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold'
    };

    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };

    return (
        <Component
            className={cn(
                sizeClasses[fontSize],
                weightClasses[fontWeight],
                textAlign && alignClasses[textAlign],
                className
            )}
            onClick={onClick}
            style={{ color, ...style }}
            {...props}
        >
            {children}
        </Component>
    );
};

export type { TextProps };