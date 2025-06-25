import { useTranslation } from 'react-i18next';

export const DomainRequiredAlert = () => {
    const { t } = useTranslation();

    return (
        <div status="warning">
            <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                    <divIcon />
                    <span>
                        {t(
                            'A .vet domain is required to customize your profile. Choose an account name to get started.',
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};
