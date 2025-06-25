import {
    ModalBackButton,
    StickyFooterContainer,
    StickyHeaderContainer,
} from '@/components/common';
import { useTranslation } from 'react-i18next';
import { useVeChainKitConfig } from '@/providers';
import { useWallet } from '@/hooks';
import { MdOutlineNavigateNext, MdPhotoCamera } from 'react-icons/md';
import { ActionButton } from '../../../Components';
import { useSingleImageUpload } from '@/hooks/api/ipfs';
import { useRef, useState, useEffect, useMemo } from 'react';
import { uploadBlobToIPFS } from '@/utils/ipfs';
import { FaRegAddressCard, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { AccountAvatar } from '@/components/common';
import { DomainRequiredAlert } from '../../../Components/Alerts';
import { AccountModalContentTypes } from '../../../Types';
import { useForm } from 'react-hook-form';
import { FaXTwitter } from 'react-icons/fa6';
import { getPicassoImage } from '@/utils';
import { Analytics } from '@/utils/mixpanelClientInstance';

// Update FormValues type to include validation
type FormValues = {
    displayName: string;
    description: string;
    twitter: string;
    email: string;
    website: string;
}

export interface AccountCustomizationContentProps {
    setCurrentContent: React.Dispatch<
        React.SetStateAction<AccountModalContentTypes>
    >;
    initialContentSource?: AccountModalContentTypes;
}

export const CustomizationContent = ({
    setCurrentContent,
    initialContentSource = 'profile',
}: AccountCustomizationContentProps) => {
    const { t } = useTranslation();
    const { network } = useVeChainKitConfig();
    const { account } = useWallet();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { onUpload } = useSingleImageUpload({
        compressImage: true,
    });

    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
    const [avatarIpfsHash, setAvatarIpfsHash] = useState<string | null>(null);
    const hasDomain = !!account?.domain;

    // Add these state variables for initial values
    const [initialAvatarHash, setInitialAvatarHash] = useState<string | null>(
        null,
    );
    const [initialDisplayName, setInitialDisplayName] = useState('');
    const [initialDescription, setInitialDescription] = useState('');
    const [initialTwitter, setInitialTwitter] = useState('');
    const [initialWebsite, setInitialWebsite] = useState('');
    const [initialEmail, setInitialEmail] = useState('');

    // Update form initialization with validation rules
    const {
        register,
        watch,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        defaultValues: {
            displayName: account?.metadata?.display || '',
            description: account?.metadata?.description || '',
            twitter: account?.metadata?.['com.x'] || '',
            email: account?.metadata?.email || '',
            website: account?.metadata?.url || '',
        },
        mode: 'onChange',
    });

    // Update effect to reset image when domain changes
    useEffect(() => {
        if (account?.metadata) {
            const metadata = account.metadata;
            setInitialDisplayName(metadata.display || '');
            setInitialDescription(metadata.description || '');
            setInitialTwitter(metadata['com.x'] || '');
            setInitialEmail(metadata.email || '');
            setInitialWebsite(metadata.url || '');
            setInitialAvatarHash(
                account.image ? account.image.replace('ipfs://', '') : null,
            );

            // Only set the preview URL if it hasn't been set yet
            setPreviewImageUrl((prev) => prev ?? account.image ?? null);
        }
    }, [account, network.type]);

    // Watch all form values for changes
    const formValues = watch();

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);

            // Clear the previous preview URL first
            if (previewImageUrl) {
                URL.revokeObjectURL(previewImageUrl);
            }

            // Create temporary preview URL
            const newPreviewUrl = URL.createObjectURL(file);
            setPreviewImageUrl(newPreviewUrl);

            const uploadedImage = await onUpload(file);
            if (!uploadedImage) throw new Error('Failed to compress image');

            const ipfsHash = await uploadBlobToIPFS(
                uploadedImage.file,
                file.name,
                network.type,
            );
            setAvatarIpfsHash(ipfsHash);
            Analytics.customization.imageUploaded(true);
        } catch (error) {
            console.error('Error uploading image:', error);
            setPreviewImageUrl(null);
            Analytics.customization.imageUploaded(
                false,
                error instanceof Error ? error.message : 'Unknown error',
            );
        } finally {
            setIsUploading(false);
        }
    };

    // This cleanup effect is important for memory management in the browser. Here's why:
    // When you create a URL using URL.createObjectURL() (which happens in the handleImageUpload function),
    // the browser creates a unique URL that points to the file/blob in memory.
    // This URL remains valid and the object remains in memory until explicitly revoked.
    // If you don't revoke these URLs, you can create memory leaks,
    // especially if users upload multiple images or the component remounts frequently.
    useEffect(() => {
        return () => {
            if (previewImageUrl) {
                URL.revokeObjectURL(previewImageUrl);
            }
        };
    }, [previewImageUrl]);

    // Update getChangedValues to use form values
    const getChangedValues = () => {
        const changes: {
            avatarIpfsHash?: string;
            displayName?: string;
            description?: string;
            twitter?: string;
            website?: string;
            email?: string;
        } = {};

        if (avatarIpfsHash !== initialAvatarHash && avatarIpfsHash)
            changes.avatarIpfsHash = avatarIpfsHash;
        if (formValues.displayName !== initialDisplayName)
            changes.displayName = formValues.displayName;
        if (formValues.description !== initialDescription)
            changes.description = formValues.description;
        if (formValues.twitter !== initialTwitter)
            changes.twitter = formValues.twitter;
        if (formValues.website !== initialWebsite)
            changes.website = formValues.website;
        if (formValues.email !== initialEmail) changes.email = formValues.email;
        return changes;
    };

    // Add this function to check if there are any changes
    const hasChanges = useMemo(() => {
        const changes = getChangedValues();
        return Object.keys(changes).length > 0;
    }, [getChangedValues]);

    const handleSaveChanges = () => {
        setCurrentContent({
            type: 'account-customization-summary',
            props: {
                setCurrentContent,
                changes: getChangedValues(),
                onDoneRedirectContent: initialContentSource,
            },
        });
    };

    const handleClose = () => {
        if (isUploading) {
            Analytics.customization.dropOff({
                stage: 'avatar',
                reason: 'modal_closed_during_upload',
            });
        } else {
            Analytics.customization.dropOff({
                stage: 'form',
                reason: 'modal_closed',
            });
        }
    };

    const handleBack = () => {
        if (isUploading) {
            Analytics.customization.dropOff({
                stage: 'avatar',
                reason: 'back_button_during_upload',
            });
        } else {
            Analytics.customization.dropOff({
                stage: 'form',
                reason: 'back_button',
            });
        }
        setCurrentContent(initialContentSource);
    };

    return (
        <div>
            <StickyHeaderContainer>
                <ModalHeader data-testid='modal-title'>{t('Customization')}</ModalHeader>
                <ModalBackButton onClick={handleBack} />
                <ModalCloseButton onClick={handleClose} />
            </StickyHeaderContainer>

            <ModalBody>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    overflo
                >
                    <div
                        backgroundSize="100% !important"
                        backgroundPosition="center"
                        background={`no-repeat url('${getPicassoImage(
                            account?.address ?? '',
                        )}')`}
                    >
                        {/* For now we don't allow cover image upload */}
                        {/* {hasDomain && (
                            <button
                                aria-label="Update cover"
                                icon={<MdPhotoCamera />}
                                size="sm"
                                position="absolute"
                                right="2"
                                bottom="2"
                                onClick={() => coverInputRef.current?.click()}
                            />
                        )} */}
                    </div>
                    <div
                        to
                        left="50%"
                        transfor
                        cursor={hasDomain ? 'pointer' : 'default'}
                        onClick={() =>
                            hasDomain && fileInputRef.current?.click()
                        }
                    >
                        <AccountAvatar
                            wallet={account}
                            props={{
                                width: '100px',
                                height: '100px',
                                boxShadow: '0px 0px 3px 2px #00000024',
                                src: previewImageUrl ?? undefined,
                            }}
                        />
                        {hasDomain && (
                            <MdPhotoCamera
                                position="absolute"
                                right="2"
                                bottom="2"
                                bg="gray.700"
                                color="white"
                                p="1"
                                borderRadius="full"
                                boxSize="6"
                             />
                        )}
                        {isUploading && (
                            <div
                                to
                                left="0"
                                right="0"
                                botto
                                alignItems="center"
                                justifyContent="center"
                                backgroundColor="rgba(0, 0, 0, 0.5)"
                            >
                                <span>
                                    {isUploading
                                        ? 'Uploading...'
                                        : 'Processing...'}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"Body
                        backgroundColor={'none'}
                    >
                        <div className="flex flex-col space-y-6">
                            {!hasDomain && <DomainRequiredAlert />}

                            <ActionButton
                                title={
                                    account?.domain ?? t('Choose account name')
                                }
                                description={t(
                                    'Choose a unique .vet domain name for your account.',
                                )}
                                onClick={() => {
                                    Analytics.nameSelection.started(
                                        'account-customization',
                                    );
                                    if (account?.domain) {
                                        setCurrentContent({
                                            type: 'choose-name-search',
                                            props: {
                                                name: '',
                                                setCurrentContent,
                                                initialContentSource: {
                                                    type: 'account-customization',
                                                    props: {
                                                        setCurrentContent,
                                                    },
                                                },
                                            },
                                        });
                                    } else {
                                        setCurrentContent({
                                            type: 'choose-name',
                                            props: {
                                                setCurrentContent,
                                                initialContentSource: {
                                                    type: 'account-customization',
                                                    props: {
                                                        setCurrentContent,
                                                    },
                                                },
                                                onBack: () =>
                                                    setCurrentContent({
                                                        type: 'account-customization',
                                                        props: {
                                                            setCurrentContent,
                                                        },
                                                    }),
                                            },
                                        });
                                    }
                                }}
                                leftIcon={FaRegAddressCard}
                                rightIcon={MdOutlineNavigateNext}
                                dataTestId="set-domain-name-button"
                            />

                            <div
                                isDisabled={!hasDomain}
                                isInvalid={!!errors.displayName}
                            >
                                <label>Display Name</label>
                                <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    {...register('displayName', {
                                        maxLength: {
                                            value: 25,
                                            message: t(
                                                'Display name must be less than 25 characters',
                                            ),
                                        },
                                    })}
                                    placeholder={
                                        !hasDomain
                                            ? t('Set a domain first')
                                            : t('Enter your display name')
                                    }
                                    data-testid="display-name-input" />
                                {errors.displayName && (
                                    <span>
                                        {errors.displayName.message}
                                    </span>
                                )}
                            </div>

                            <div
                                isDisabled={!hasDomain}
                                isInvalid={!!errors.description}
                            >
                                <label>Description</label>
                                <spanarea
                                    {...register('description', {
                                        maxLength: {
                                            value: 100,
                                            message: t(
                                                'Description must be less than 100 characters',
                                            ),
                                        },
                                    })}
                                    placeholder={t('Eg: DevRel @ ENS Labs')}
                                    data-testid="description-input" />
                                {errors.description && (
                                    <span>
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>

                            <div isDisabled={!hasDomain}>
                                <label>Social Links</label>
                                <div className="flex flex-col">
                                    <div
                                        isInvalid={!!errors.twitter}
                                        isDisabled={!hasDomain}
                                    >
                                        <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"Group>
                                            <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"LeftElement>
                                                <FaXTwitter  />
                                            </div>
                                            <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                {...register('twitter', {
                                                    pattern: {
                                                        value: /^[A-Za-z0-9_]+$/,
                                                        message: t(
                                                            'Please enter a valid Twitter handle without @',
                                                        ),
                                                    },
                                                })}
                                                placeholder={t(
                                                    'Twitter username',
                                                )}
                                                data-testid='twitter-input' />
                                        </div>
                                        {errors.twitter && (
                                            <span
                                            >
                                                {errors.twitter.message}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        isInvalid={!!errors.website}
                                        isDisabled={!hasDomain}
                                    >
                                        <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"Group>
                                            <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"LeftElement>
                                                <FaGlobe  />
                                            </div>
                                            <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                {...register('website', {
                                                    pattern: {
                                                        value: /^https:\/\/.+/,
                                                        message: t(
                                                            'Website URL must start with https://',
                                                        ),
                                                    },
                                                })}
                                                placeholder={t('Website URL')}
                                                type="url"
                                                data-testid='website-input' />
                                        </div>
                                        {errors.website && (
                                            <span
                                            >
                                                {errors.website.message}
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        isInvalid={!!errors.email}
                                        isDisabled={!hasDomain}
                                    >
                                        <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"Group>
                                            <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"LeftElement>
                                                <FaEnvelope  />
                                            </div>
                                            <input className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                {...register('email', {
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: t(
                                                            'Please enter a valid email address',
                                                        ),
                                                    },
                                                })}
                                                placeholder={t('Email address')}
                                                type="email"
                                                data-testid='email-input' />
                                        </div>
                                        {errors.email && (
                                            <span
                                            >
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={async (event) => await handleImageUpload(event)}
                />
                <input
                    type="file"
                    ref={coverInputRef}
                    hidden
                    accept="image/*"
                    onChange={async (event) => {
                        /* Add cover upload handler */
                        event.preventDefault();
                    }}
                />
            </ModalBody>

            <StickyFooterContainer>
                <ModalFooter w="full" p={0}>
                    <button className="px-4 py-2 rounded-md transition-colors"
                        onClick={handleSaveChanges}
                        isDisabled={!hasDomain || !hasChanges || !isValid}
                        isLoading={isUploading}
                        loadingText={t('Preparing changes...')}
                        data-testid='save-changes-button'
                    >
                        {t('Save Changes')}
                    </button>
                </ModalFooter>
            </StickyFooterContainer>
        </div>
    );
};
