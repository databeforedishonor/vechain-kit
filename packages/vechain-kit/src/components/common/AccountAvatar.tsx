import { Wallet } from '@/types';
import { Image, Skeleton } from '@/components/ui';
import { useRef, useEffect } from 'react';

interface AccountAvatarProps {
    wallet?: Wallet;
    props?: {
        src?: string;
        alt?: string;
        width?: string | number;
        height?: string | number;
        minWidth?: string | number;
        className?: string;
        boxShadow?: string;
        [key: string]: any; // Allow additional properties
    };
}

export const AccountAvatar = ({ wallet, props }: AccountAvatarProps) => {
    // Store the previous image URL to maintain during loading
    const previousImageRef = useRef<string | undefined>(wallet?.image);

    // Update the ref when we have a valid image and it's not loading
    useEffect(() => {
        if (wallet?.image && !wallet.isLoadingMetadata) {
            previousImageRef.current = wallet.image;
        }
    }, [wallet?.image, wallet?.isLoadingMetadata]);

    if (
        (!props?.src && !wallet?.image && !previousImageRef.current) ||
        wallet?.isLoadingMetadata
    ) {
        return (
            <Skeleton
                borderRadius="9999px"
                width={props?.width}
                height={props?.height}
                className={props?.className}
            />
        );
    }

    const { src, alt, width, height, minWidth, className, boxShadow, ...otherProps } = props || {};

    return (
        <Image
            src={src || wallet?.image || previousImageRef.current}
            alt={alt || wallet?.domain}
            className={`object-cover rounded-full ${className || ''}`}
            style={{
                width,
                height,
                minWidth,
                boxShadow,
                ...otherProps,
            }}
        />
    );
};
