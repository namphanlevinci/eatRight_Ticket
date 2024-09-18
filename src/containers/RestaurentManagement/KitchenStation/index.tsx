import RestaurentManagementLayout from 'layouts/StoreManagementLayout';
import KitchenStationPage from 'pages/RestaurentManagement/KitchenStation/KitchenStationPage';

export const KitchenStationContainer = () => {
    return (
        <RestaurentManagementLayout>
            <KitchenStationPage />
        </RestaurentManagementLayout>
    );
};

export default KitchenStationContainer;
