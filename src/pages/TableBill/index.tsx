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
import { useCartTable } from 'pages/Table/Cart/useGetCart';
import LoadingModal from 'components/modal/loadingModal';
import ModalPaySuccess from 'components/modal/ModalPaySuccess';
export default function TableBill() {
    const { loading } = useCartTable(false, false);
    const {
        cart,
        total,
        count,
        setListItems,
        setNumbersSplit,
        listItems,
        numbersSplit,
        setCart,
    } = useTableBill();
    const [splitBill, setSplitBill] = useState(false);
    const [openModalSplitBill, setOpenModalSplitBill] = useState(false);
    const [openModalConfirmCloseSplitBill, setCloseSplitBill] = useState(false);
    const navigation = useNavigate();
    const { theme } = useTheme();
    const RenderHeader = () => {
        return (
            <div
                style={{
                    background: theme.nEUTRALPrimary,
                    height: '48px',
                    display: 'flex ',
                    alignItems: 'center',
                    padding: '10px 12px',
                }}
            >
                <LoadingModal showLoading={loading} />
                <div
                    onClick={() => navigation(-1)}
                    style={{ display: 'flex ', alignItems: 'center' }}
                >
                    <ArrowLeftIcon />
                </div>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '400',
                        marginLeft: 4,
                        marginTop: 4,
                        color: theme.tEXTPrimary,
                    }}
                >
                    Bill Summary
                </Text>
            </div>
        );
    };
    const SplitBillButton = () => {
        return (
            <Row align={'middle'}>
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
                    style={{ marginBottom: 16 }}
                />
            </Row>
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
            <Row>
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
                    setCart={setCart}
                    SplitBillButton={SplitBillButton}
                />
            </Row>
            <ModalPaySuccess />
        </Layout>
    );
}
