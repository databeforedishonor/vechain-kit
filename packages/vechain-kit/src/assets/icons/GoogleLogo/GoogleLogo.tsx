import React from 'react';
import { googleSvg } from '../../svg';

type Props = {
    boxSize?: string | number;
} & Omit<divProps, 'dangerouslySetInnerHTML'>;

export const GoogleLogo: React.FC<Props> = ({ boxSize = '20px', ...props }) => {
    return (
        <div
            as="span"
            widt
            height={boxSize}
            dangerouslySetInnerHTML={{
                __html: googleSvg,
            }}
            {...props} />
    );
};
