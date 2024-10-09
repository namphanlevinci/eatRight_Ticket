import { DarkLayout } from 'layouts/DarkLayout';
import ReceiptsPage from 'pages/Receipts/index';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const ReceiptsContainer = () => {
    const { isMerchant } = useSelector((state: RootState) => state.auth);
    return (
        <DarkLayout isNotShowHeader={isMerchant}>
            <ReceiptsPage />;
        </DarkLayout>
    );
};

export default ReceiptsContainer;
