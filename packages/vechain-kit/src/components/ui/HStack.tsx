import { cn } from '../../utils/cn';

interface HStackProps {
    children?: any;
    className?: string;
    spacing?: number | string;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    wrap?: boolean;
    onClick?: (event: any) => void;
    style?: any;
}

export const HStack = ({
    children,
    className,
    spacing = 2,
    align = 'center',
    justify = 'start',
    wrap = false,
    onClick,
    style,
    ...props
}: HStackProps) => {
    const spacingClass = typeof spacing === 'number' ? `space-x-${spacing}` : '';
    
    const alignClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch'
    };

    const justifyClasses = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
    };

    return (
        <div
            className={cn(
                'flex',
                alignClasses[align],
                justifyClasses[justify],
                wrap && 'flex-wrap',
                spacingClass,
                className
            )}
            onClick={onClick}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
};

interface VStackProps {
    children?: any;
    className?: string;
    spacing?: number | string;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    onClick?: (event: any) => void;
    style?: any;
}

export const VStack = ({
    children,
    className,
    spacing = 2,
    align = 'center',
    justify = 'start',
    onClick,
    style,
    ...props
}: VStackProps) => {
    const spacingClass = typeof spacing === 'number' ? `space-y-${spacing}` : '';
    
    const alignClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch'
    };

    const justifyClasses = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
    };

    return (
        <div
            className={cn(
                'flex flex-col',
                alignClasses[align],
                justifyClasses[justify],
                spacingClass,
                className
            )}
            onClick={onClick}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
};

export type { HStackProps, VStackProps };