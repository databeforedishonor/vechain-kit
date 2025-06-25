import React from 'react';
import { vechainEnergySvg } from '../../svg';

type Props = {
    isDark?: boolean;
    boxSize?: string | number;
} & Omit<divProps, 'dangerouslySetInnerHTML'>;

export const VechainEnergy: React.FC<Props> = ({ isDark, ...props }) => {
    return (
        <div
            as="span"
            dangerouslySetInnerHTML={{
                __html: isDark ? vechainEnergySvg.dark : vechainEnergySvg.light,
            }}
            {...props} />
    );
};
