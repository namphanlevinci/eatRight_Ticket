import { Layout } from 'antd';
import ReceiptBillIcon from 'assets/icons/receiptBill';
import { Text } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import { useNavigate } from 'react-router';

export const RenderHeader = () => {
    const { Header } = Layout;
    const navigation = useNavigate();
    return (
        <Header
            style={{
                height: '56',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                justifyContent: 'flex-start',
                paddingInline: 0,
            }}
        >
            <div
                onClick={() => navigation(BASE_ROUTER.BILL)}
                style={{ display: 'flex ', alignItems: 'center' }}
            >
                <ReceiptBillIcon />
            </div>
            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 20 }}>
                Payment
            </Text>
        </Header>
    );
};
