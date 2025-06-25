import { IoWalletOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

type Props = {
    onOpenReceiveModal: () => void;
}

export const NFTsTabPanel = ({ onOpenReceiveModal }: Props) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col space-y-4">
            <IoWalletOutline className="w-12 h-12"
                opacity={0.5}
                p={2}
                bg="whiteAlpha.100"
                borderRadius="xl"
             />
            <div className="flex flex-col">
                <span>
                    {t('Coming soon')}
                </span>
                <span opacity={0.5}>
                    {t('Stay tuned for our upcoming NFT feature')}
                </span>
                <button className="px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
                    onClick={onOpenReceiveModal}
                >
                    {t('Receive tokens')}
                </button>
            </div>
        </div>
    );
};
