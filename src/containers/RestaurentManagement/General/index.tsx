import RestaurentManagementLayout from 'layouts/StoreManagementLayout';
import RestaurentGeneralPage from 'pages/RestaurentManagement/General/GeneralPage';

export const RestaurentGeneralContainer = () => {
    return (
        <RestaurentManagementLayout>
            <RestaurentGeneralPage />
        </RestaurentManagementLayout>
    );
};

export default RestaurentGeneralContainer;
