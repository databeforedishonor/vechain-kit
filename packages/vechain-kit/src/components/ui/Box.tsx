import { cn } from '../../utils/cn';

interface BoxProps {
    children?: any;
    className?: string;
    as?: keyof HTMLElementTagNameMap;
    onClick?: (event: any) => void;
    style?: any;
}

export const Box = ({
    children,
    className,
    as: Component = 'div',
    onClick,
    style,
    ...props
}: BoxProps) => {
    return (
        <Component
            className={cn(className)}
            onClick={onClick}
            style={style}
            {...props}
        >
            {children}
        </Component>
    );
};

export type { BoxProps };