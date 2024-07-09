import { Layout, Row } from 'antd';
import ArrowLeftIcon from 'assets/icons/arrowLeft';
import { Text } from 'components/atom/Text';
import { Colors } from 'themes/colors';
import ColRight from './colRight';
import ColLeft from './colLeft';
import { useTableBill } from './useTableBill';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SwitchStyled } from './styleds';
import SplitBillModal from 'components/modal/SplitBill/splitBillModal';
export default function TableBill() {
    const { cart, total, count } = useTableBill();
    const { Header } = Layout;
    const [openModalSplitBill, setOpenModalSplitBill] = useState(false);
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
            <SplitBillModal
                visible={openModalSplitBill}
                onClose={() => setOpenModalSplitBill(false)}
            />
            <RenderHeader />
            <div style={{ flex: 1, padding: 16 }}>
                <Row justify={'space-between'} align={'middle'}>
                    <Text style={{ fontSize: 20, fontWeight: '400' }}>
                        Order summary
                    </Text>
                    <Row align={'middle'} style={{ gap: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: '400' }}>
                            Split bill
                        </Text>
                        <SwitchStyled
                            value={openModalSplitBill}
                            onChange={() => {
                                console.log('change');
                                setOpenModalSplitBill(!openModalSplitBill);
                            }}
                            style={{
                                width: 96,
                                height: 52,
                                borderRadius: 4,
                                background: openModalSplitBill
                                    ? '#000'
                                    : 'rgba(245, 245, 245, 0.3)',
                                border: openModalSplitBill
                                    ? '1px solid #FF9D00'
                                    : '1px solid rgba(245, 245, 245, 0.3)',
                            }}
                        />
                    </Row>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <ColLeft cart={cart} count={count} />
                    <ColRight cart={cart} total={total} />
                </Row>
            </div>
        </Layout>
    );
}
