import React from 'react';
import { twitterSvg } from '../../svg';

type Props = {
    isDark?: boolean;
    boxSize?: string | number;
} & Omit<divProps, 'dangerouslySetInnerHTML'>;

export const TwitterLogo: React.FC<Props> = ({
    isDark,
    boxSize = '20px',
    ...props
}) => {
    return (
        <div
            as="span"
            widt
            height={boxSize}
            dangerouslySetInnerHTML={{
                __html: isDark ? twitterSvg.dark : twitterSvg.light,
            }}
            {...props} />
    );
};
