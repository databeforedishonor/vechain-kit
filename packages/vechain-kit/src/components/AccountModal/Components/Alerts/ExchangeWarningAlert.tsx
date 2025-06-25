import { useTranslation } from 'react-i18next';

export const ExchangeWarningAlert = () => {
    const { t } = useTranslation();

    return (
        <div status="warning">
            <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                    <divIcon />
                    <span>
                        {t(
                            'Sending to OceanX or other exchanges may result in loss of funds.',
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};
