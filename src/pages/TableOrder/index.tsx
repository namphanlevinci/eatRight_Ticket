import { Layout, Row } from 'antd';
import ArrowLeftIcon from 'assets/icons/arrowLeft';
import { Text } from 'components/atom/Text';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTableBill } from 'pages/TableBill/useTableBill';
import ListOrder from './listOrder';
import { useCartTable } from 'pages/Table/Cart/useGetCart';
import LoadingModal from 'components/modal/loadingModal';
import OrderFooter from './footer';
import { useTheme } from 'context/themeContext';
export default function TableBill() {
    const { loading, removeItemOnCartServer, updateStatusItemServer } =
        useCartTable(false);
    const {
        cart,
        count,
        total,
        loading: loadingTable,
        contextHolder,
    } = useTableBill();
    const tables = JSON.parse(localStorage.getItem('tableData') || '[]');
    const [searchParams] = useSearchParams();
    const tableId = searchParams.get('tableId');
    const { Header } = Layout;
    const navigation = useNavigate();
    const { theme } = useTheme();
    const RenderHeader = () => {
        return (
            <Header
                style={{
                    background: theme.nEUTRALPrimary,
                    height: '56',
                    display: 'flex ',
                    alignItems: 'center',
                    paddingInline: 20,
                }}
            >
                <div
                    onClick={() => navigation(-1)}
                    style={{
                        display: 'flex ',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <ArrowLeftIcon />
                </div>
                <Text
                    style={{ fontSize: 20, fontWeight: '600', marginLeft: 20 }}
                >
                    Table {tables?.find((item: any) => item.id == tableId).name}
                </Text>
            </Header>
        );
    };
    return (
        <Layout
            style={{
                minHeight: '100vh',
                width: '100vw',
                background: theme.nEUTRALPrimary,
            }}
        >
            <LoadingModal showLoading={loading} />
            <RenderHeader />
            <div style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '400' }}>
                    Order summary
                </Text>
                <Row style={{ height: '95%', marginTop: 16 }}>
                    <ListOrder
                        cart={cart}
                        count={count}
                        removeItemOnCartServer={removeItemOnCartServer}
                        updateStatusItemServer={updateStatusItemServer}
                    />
                </Row>
                <OrderFooter
                    total={total}
                    cart={cart}
                    loading={loadingTable}
                    contextHolder={contextHolder}
                />
            </div>
        </Layout>
    );
}
