'use client';

import { humanAddress, humanDomain } from '../../../utils';
import { Wallet } from '@/types';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { AccountAvatar } from '@/components/common';
import { useState } from 'react';
import { IoCheckmarkOutline, IoCopyOutline } from 'react-icons/io5';

type Props = {
    wallet: Wallet;
    size?: string;
    onClick?: () => void;
    mt?: number;
    style?: StackProps;
}

export const AccountSelector = ({
    wallet,
    size = 'md',
    onClick,
    mt,
    style,
}: Props) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(
            wallet?.domain ?? wallet?.address ?? '',
        );
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    return (
        <div className="flex items-center"
            {...style}
            justifyContent={'flex-start'}
            alignItems={'center'}
        >
            <button className="px-4 py-2 rounded-md transition-colors"
                aria-label="Wallet"
                onClick={onClick}
                data-testid="profile-button"
            >
                <div className="flex items-center space-x-2"
                    justifyContent={'space-between'}
                >
                    <div className="flex items-center space-x-2" justifyContent={'flex-start'}>
                        <AccountAvatar
                            wallet={wallet}
                            props={{ width: 7, height: 7 }}
                        />
                        <span>
                            {humanDomain(wallet?.domain ?? '', 22, 0) ||
                                humanAddress(wallet?.address ?? '', 6, 4)}
                        </span>
                    </div>

                    <Icon
                        boxSize={5}
                        as={MdOutlineNavigateNext}
                        cursor="pointer"
                        opacity={0.5}
                    />
                </div>
            </button>

            <button
                aria-label="Copy address"
                icon={<copied ? IoCheckmarkOutline : IoCopyOutline  />}
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                opacity={0.5}
                _hover={{ opacity: 0.8 }}
            />
        </div>
    );
};
