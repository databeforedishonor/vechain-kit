import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/tailwind';

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    const Comp = Component as any;
    return (
      <Comp
        className={cn(className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Box.displayName = 'Box';

export { Box };