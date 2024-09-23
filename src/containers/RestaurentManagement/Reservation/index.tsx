import RestaurentManagementLayout from 'layouts/StoreManagementLayout';
import ReservationPage from 'pages/RestaurentManagement/Reservation/ReservationPage';

export const RestaurentGeneralContainer = () => {
    return (
        <RestaurentManagementLayout>
            <ReservationPage />
        </RestaurentManagementLayout>
    );
};

export default RestaurentGeneralContainer;
