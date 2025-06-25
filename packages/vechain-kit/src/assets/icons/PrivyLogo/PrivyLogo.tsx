import React from 'react';

type Props = {
    isDark?: boolean;
} & Omit<imgProps, 'dangerouslySetInnerHTML'>;

export const PrivyLogo: React.FC<Props> = ({ isDark = false, ...props }) => {
    return (
        <img
            src={
                isDark
                    ? 'https://mintlify.s3.us-west-1.amazonaws.com/privy-c2af3412/logo/privy-logo-dark.png'
                    : 'https://mintlify.s3.us-west-1.amazonaws.com/privy-c2af3412/logo/privy-logo-light.png'
            }
            alt="Privy Logo"
            {...props} />
    );
};
