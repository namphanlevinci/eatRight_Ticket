import { Layout, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { RenderHeader } from './components/header';
import CartInfo from './components/cartInfo';
import styled from 'styled-components';
import PaymentOptions from './components/paymentOptions';
import { InvoiceWithSplit, MerchantSplitOrderOutput } from './IType';

import { RenderGuest } from './components/renderGuest';
import { RenderCart } from './components/renderCart';
import { useLazyQuery, useMutation } from '@apollo/client';
import { PAY_SPLIT_BILL_POS, PAY_SPLITBILL } from 'graphql/cart/paySplitbill';
import { useNavigate } from 'react-router';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
import ModalPosDevices from 'pages/TableBill/components/ModalPosDevices';
import { emitter } from 'graphql/client';
import { GET_INVOICES } from 'graphql/cart/splitBill';
import LoadingModalPayment from 'components/modal/loadingModalPayment';

export default function TableSplitBillCheckOut() {
    const dataStorage = localStorage.getItem('split_bill_data');
    const [onPaymentWithCash] = useMutation(PAY_SPLITBILL);
    const [onPaymentWithPOS] = useMutation(PAY_SPLIT_BILL_POS);
    const [showPosModal, setShowPosModal] = useState(false);
    const [data, setData] = useState<MerchantSplitOrderOutput>(
        JSON.parse(dataStorage || '{}'),
    );
    const [loading, setLoading] = useState(false);
    const [selectGuest, setSelectGuest] = React.useState<InvoiceWithSplit>();
    const { theme } = useTheme();
    const [loadingPosResult, setLoadingPosResult] = useState(false);
    useEffect(() => {
        const dataTmp = JSON.parse(dataStorage || '{}');
        const selectGuestIndex = dataTmp.invoice.findIndex(
            (value: InvoiceWithSplit) => value.state === 'UNPAID',
        );
        if (selectGuestIndex) {
            setSelectGuest({
                ...dataTmp.invoice[selectGuestIndex],
                index: selectGuestIndex,
            });
        } else {
            setSelectGuest({
                ...dataTmp.invoice[0],
                index: 0,
            });
        }
    }, []);
    let intervalId: any = null;
    useEffect(() => {
        if (loadingPosResult) {
            intervalId = setInterval(ReloadInvoice, 30000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [loadingPosResult, intervalId]);
    const handlePayment = (paymentMethod: string) => {
        if (paymentMethod === 'cash') {
            onPaymentWithCash({
                variables: {
                    invoice_number: selectGuest?.number,
                    payment_method: paymentMethod,
                },
            })
                .then((res) => {
                    if (
                        res.data.merchantPayInvoice.invoice.number ===
                        selectGuest?.number
                    ) {
                        const result = res.data.merchantPayInvoice.invoice;
                        const newData: MerchantSplitOrderOutput = {
                            ...data,
                            invoice: data.invoice.map((value) => {
                                if (value.number === result.number) {
                                    return {
                                        ...value,
                                        state: result.state,
                                    };
                                }
                                return value;
                            }),
                        };
                        setData(newData);
                        localStorage.setItem(
                            'split_bill_data',
                            JSON.stringify(newData),
                        );
                    }
                })
                .catch((err) => {
                    if (
                        err.graphQLErrors[0].message.includes(
                            'is already paid',
                        ) &&
                        selectGuest
                    ) {
                        const newData: MerchantSplitOrderOutput = {
                            ...data,
                            invoice: data.invoice.map((value) => {
                                if (value.number === selectGuest.number) {
                                    return {
                                        ...value,
                                        state: 'PAID',
                                    };
                                }
                                return value;
                            }),
                        };
                        setData(newData);
                        localStorage.setItem(
                            'split_bill_data',
                            JSON.stringify(newData),
                        );
                    }
                });
        } else if (paymentMethod === 'pos') {
            setShowPosModal(true);
        }
    };
    const handlePaymentWithPOS = (id: string) => {
        setLoading(true);
        setLoadingPosResult(true);
        onPaymentWithPOS({
            variables: {
                invoice_number: selectGuest?.number,
                terminal_id: id,
            },
        });
    };
    const [onGetInvoices] = useLazyQuery(GET_INVOICES);
    useEffect(() => {
        emitter.on('arise_result', (msg: any) => {
            console.log(msg, selectGuest);
            if (msg.additional_data?.invoice_number !== selectGuest?.number) {
                return;
            }
            if (msg?.additional_data?.payment_status === 'success') {
                showModalSuccess();
                ReloadInvoice();
            } else {
                setLoading(false);
                showError(msg?.message);
            }
        });
        return () => {
            emitter.off('arise_result');
        };
    }, []);
    const ReloadInvoice = () => {
        onGetInvoices({
            variables: {
                OrderNumber: data.order.order_number,
            },
            fetchPolicy: 'no-cache',
        })
            .then((res) => {
                const newData = res?.data?.merchantGetOrderInvoices;
                setData(newData);
                localStorage.setItem(
                    'split_bill_data',
                    JSON.stringify(newData),
                );
                const selectGuestIndex = newData.invoice.findIndex(
                    (value: InvoiceWithSplit) => value.state === 'UNPAID',
                );
                if (newData.invoice[selectGuestIndex].state === 'PAID') {
                    setLoadingPosResult(false);
                    setLoading(false);
                }
                if (
                    selectGuestIndex &&
                    selectGuestIndex !== selectGuest?.index
                ) {
                    setSelectGuest({
                        ...newData.invoice[selectGuestIndex],
                        index: selectGuestIndex,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                // showError(msg?.message, `${orderInfo?.order_id}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const showModalSuccess = () => {
        modal.success({
            title: 'Payment Success',
            centered: true,
        });
    };
    const [modal, contextHolder] = Modal.useModal();
    const showError = (msg: string) => {
        modal.error({
            title: msg,
            centered: true,
        });
    };
    const navigation = useNavigate();
    useEffect(() => {
        if (data) {
            const isAllPay = data.invoice.find((item) => item.state !== 'PAID');
            if (!isAllPay) {
                navigation(
                    `${BASE_ROUTER.BILL_DETAIL}?orderId=${data.order.order_id}`,
                );
            }
        }
    }, [data]);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    return (
        <Layout
            style={{
                minHeight: '100vh',
                width: '100vw',
                background: theme.nEUTRALPrimary,
                padding: 16,
                overflow: 'auto',
                paddingTop: 0,
            }}
        >
            {contextHolder}
            <LoadingModalPayment
                showLoading={loading}
                onClose={() => setLoading(false)}
            />
            <ModalPosDevices
                isVisibleModalPos={showPosModal}
                setVisibleMoalPos={setShowPosModal}
                onPressOK={handlePaymentWithPOS}
            />
            <RenderHeader />
            <CartInfo data={data} />
            <div style={{ marginTop: 20 }} />
            <Container style={isMobile ? { flexWrap: 'wrap' } : {}}>
                <ColumnGuestList style={isMobile ? { width: '100%' } : {}}>
                    {data.invoice.map((item, index) => {
                        return (
                            (isMobile
                                ? selectGuest?.index !== undefined &&
                                  index <= selectGuest?.index
                                : true) && (
                                <RenderGuest
                                    key={index}
                                    title={`${index + 1}`}
                                    money={item.total.grand_total.value}
                                    isSelect={item.id === selectGuest?.id}
                                    onClick={() => {
                                        const itemIndex =
                                            data.invoice.findIndex(
                                                (value) => value.id === item.id,
                                            );

                                        setSelectGuest({
                                            ...item,
                                            index: itemIndex,
                                        });
                                    }}
                                    isPaid={item.state === 'PAID'}
                                />
                            )
                        );
                    })}
                </ColumnGuestList>
                <ColumnCart style={isMobile ? { marginLeft: 0 } : {}}>
                    {selectGuest && <RenderCart cart={selectGuest} />}
                    {!isMobile && <PaymentOptions onPayment={handlePayment} />}
                </ColumnCart>
                {isMobile && (
                    <ColumnGuestList style={isMobile ? { width: '100%' } : {}}>
                        {data.invoice.map((item, index) => {
                            return (
                                selectGuest?.index !== undefined &&
                                index > selectGuest?.index && (
                                    <RenderGuest
                                        key={index}
                                        title={`${index + 1}`}
                                        money={item.total.grand_total.value}
                                        isSelect={item.id === selectGuest?.id}
                                        onClick={() => {
                                            const itemIndex =
                                                data.invoice.findIndex(
                                                    (value) =>
                                                        value.id === item.id,
                                                );

                                            setSelectGuest({
                                                ...item,
                                                index: itemIndex,
                                            });
                                        }}
                                        isPaid={item.state === 'PAID'}
                                    />
                                )
                            );
                        })}
                    </ColumnGuestList>
                )}
                {isMobile && <PaymentOptions onPayment={handlePayment} />}
            </Container>
        </Layout>
    );
}

const Container = styled.div`
    display: flex;
    min-height: 80vh;
`;
const ColumnGuestList = styled.div`
    width: 264px;
`;

const ColumnCart = styled.div`
    flex: 1;
    margin-left: 20px;
`;
