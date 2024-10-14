import RestaurentManagementLayout from 'layouts/StoreManagementLayout';
import OrderingPage from 'pages/RestaurentManagement/Ordering';

export const RestaurentOrderingContainer = () => {
    return (
        <RestaurentManagementLayout>
            <OrderingPage />
        </RestaurentManagementLayout>
    );
};

export default RestaurentOrderingContainer;
