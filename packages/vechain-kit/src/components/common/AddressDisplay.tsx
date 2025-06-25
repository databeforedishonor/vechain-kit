'use client';

import { useState } from 'react';
import { IoCopyOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { humanAddress } from '@/utils';
import { Wallet } from '@/types';
import { FaRegAddressCard } from 'react-icons/fa';
import { HiOutlineWallet } from 'react-icons/hi2';
import { Analytics } from '@/utils/mixpanelClientInstance';
import { cn } from '@/utils/cn';

interface Props {
    wallet: Wallet;
    label?: string;
    className?: string;
    showHumanAddress?: boolean;
    fromScreen?: string;
}

export const AddressDisplay = ({
    wallet,
    label,
    className,
    showHumanAddress = true,
    fromScreen,
}: Props) => {
    const [copied, setCopied] = useState(false);
    const [copiedDomain, setCopiedDomain] = useState(false);

    const copyToClipboard = async (
        textToCopy: string,
        setCopied: (value: boolean) => void,
    ) => {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
        Analytics.user.profile.addressCopied(fromScreen);
    };

    return (
        <div className={cn("w-full flex flex-col items-center justify-center", className)}>
            <div className="w-full flex flex-col space-y-4">
                {label && (
                    <span className="text-sm opacity-70 text-center">
                        {label}
                    </span>
                )}
                {wallet?.domain ? (
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaRegAddressCard className="opacity-50" />
                            </div>
                            <input
                                className="w-full pl-10 pr-10 py-2 text-sm font-bold bg-transparent border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={wallet.domain}
                                readOnly
                                onClick={() =>
                                    copyToClipboard(
                                        wallet.domain || '',
                                        setCopiedDomain,
                                    )
                                }
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
                                    onClick={() =>
                                        copyToClipboard(
                                            wallet.domain || '',
                                            setCopiedDomain,
                                        )
                                    }
                                >
                                    {copiedDomain ? (
                                        <IoCheckmarkOutline />
                                    ) : (
                                        <IoCopyOutline />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiOutlineWallet className="opacity-50" />
                            </div>
                            <input
                                className="w-full pl-10 pr-10 py-2 text-sm font-bold bg-transparent border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={
                                    showHumanAddress
                                        ? humanAddress(
                                              wallet.address ?? '',
                                              8,
                                              7,
                                          )
                                        : wallet.address
                                }
                                readOnly
                                onClick={() =>
                                    copyToClipboard(
                                        wallet.address ?? '',
                                        setCopied,
                                    )
                                }
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
                                    onClick={() =>
                                        copyToClipboard(
                                            wallet.address ?? '',
                                            setCopied,
                                        )
                                    }
                                >
                                    {copied ? (
                                        <IoCheckmarkOutline />
                                    ) : (
                                        <IoCopyOutline />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineWallet className="opacity-50" />
                        </div>
                        <input
                            className="w-full pl-10 pr-10 py-2 text-sm font-bold bg-transparent border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={
                                showHumanAddress
                                    ? humanAddress(wallet?.address ?? '', 6, 4)
                                    : wallet?.address
                            }
                            readOnly
                            onClick={() =>
                                copyToClipboard(
                                    wallet?.address ?? '',
                                    setCopied,
                                )
                            }
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                                type="button"
                                className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
                                onClick={() =>
                                    copyToClipboard(
                                        wallet?.address ?? '',
                                        setCopied,
                                    )
                                }
                            >
                                {copied ? (
                                    <IoCheckmarkOutline />
                                ) : (
                                    <IoCopyOutline />
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
