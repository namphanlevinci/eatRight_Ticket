import { Layout, Row, Switch } from 'antd';
import ArrowLeftIcon from 'assets/icons/arrowLeft';
import { Text } from 'components/atom/Text';
import ColRight from './colRight';
import ColLeft from './colLeft';
import { useTableBill } from './useTableBill';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SplitBillModal from 'components/modal/SplitBill/splitBillModal';
import { useTheme } from 'context/themeContext';
import ModalOffSplitBill from 'components/modal/ModalOffSplitBill';
export default function TableBill() {
    const {
        cart,
        total,
        count,
        setListItems,
        setNumbersSplit,
        listItems,
        numbersSplit,
    } = useTableBill();
    const { Header } = Layout;
    const [splitBill, setSplitBill] = useState(false);
    const [openModalSplitBill, setOpenModalSplitBill] = useState(false);
    const [openModalConfirmCloseSplitBill, setCloseSplitBill] = useState(false);
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
                    style={{ display: 'flex ', alignItems: 'center' }}
                >
                    <ArrowLeftIcon />
                </div>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '600',
                        marginLeft: 20,
                    }}
                >
                    <span style={{ color: theme.pRIMARY6Primary }}>
                        Order Id
                    </span>{' '}
                    / Bill Number
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
            {cart && (
                <SplitBillModal
                    visible={openModalSplitBill}
                    onClose={() => {
                        if (listItems.length < 1 && numbersSplit === 1) {
                            setSplitBill(false);
                        }
                        setOpenModalSplitBill(false);
                    }}
                    onSubmit={(list, numbers) => {
                        setListItems(list);

                        setNumbersSplit(numbers || 1);
                        setOpenModalSplitBill(false);
                    }}
                    items={cart?.items}
                    cart={cart}
                />
            )}
            <ModalOffSplitBill
                isModalOpen={openModalConfirmCloseSplitBill}
                onCancel={() => {
                    setCloseSplitBill(false);
                    setSplitBill(false);
                }}
                onSubmit={() => {
                    setCloseSplitBill(false);
                }}
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
                        <Switch
                            value={splitBill}
                            onChange={(value) => {
                                if (value) {
                                    setSplitBill(true);
                                    setOpenModalSplitBill(true);
                                } else {
                                    setCloseSplitBill(true);
                                }
                            }}
                        />
                    </Row>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <ColLeft
                        cart={cart}
                        count={count}
                        listItems={listItems}
                        isSplitBill={splitBill}
                        openModalSplitBill={() => setOpenModalSplitBill(true)}
                    />
                    <ColRight
                        cart={cart}
                        total={total}
                        listItems={listItems}
                        numbersSplit={numbersSplit}
                        isSplitBill={splitBill}
                        openModalSplitBill={() => setOpenModalSplitBill(true)}
                    />
                </Row>
            </div>
        </Layout>
    );
}
