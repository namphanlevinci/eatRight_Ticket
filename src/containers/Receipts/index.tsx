import { DarkLayout } from 'layouts/DarkLayout';
import ReceiptsPage from 'pages/Receipts/index';

export const ReceiptsContainer = () => (
    <DarkLayout isFooter={false}>
        <ReceiptsPage />
    </DarkLayout>
);

export default ReceiptsContainer;
