import { Layout, Row } from 'antd';
import ArrowLeftIcon from 'assets/icons/arrowLeft';
import { Text } from 'components/atom/Text';
import { Colors } from 'themes/colors';
import ColRight from './colRight';
import ColLeft from './colLeft';
import { useTableBill } from './useTableBill';
import { useNavigate } from 'react-router-dom';
export default function TableBill() {
    const { cart, total, count } = useTableBill();
    const { Header } = Layout;

    const navigation = useNavigate();
    const RenderHeader = () => {
        return (
            <Header
                style={{
                    background: Colors.grey3,
                    height: '56',
                    display: 'flex ',
                    alignItems: 'center',
                    paddingInline: 20,
                }}
            >
                <div
                    onClick={() => navigation(-1)}
                    style={{ display: 'flex ', alignItems: 'center' }}
                >
                    <ArrowLeftIcon />
                </div>
                <Text
                    style={{ fontSize: 20, fontWeight: '600', marginLeft: 20 }}
                >
                    Order Id / Bill Number
                </Text>
            </Header>
        );
    };
    return (
        <Layout
            style={{ minHeight: '100vh', width: '100vw', background: 'black' }}
        >
            <RenderHeader />
            <div style={{ flex: 1, padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '400' }}>
                    Order summary
                </Text>
                <Row style={{ marginTop: 16 }}>
                    <ColLeft cart={cart} count={count} />
                    <ColRight cart={cart} total={total} />
                </Row>
            </div>
        </Layout>
    );
}
