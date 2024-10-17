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
import {
    PAY_SPLIT_BILL_POS,
    PAY_SPLIT_BILL_POS_DJV,
    PAY_SPLITBILL,
} from 'graphql/cart/paySplitbill';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
import ModalPosDevices from 'pages/TableBill/components/ModalPosDevices';
import { emitter } from 'graphql/client';
import { GET_INVOICES } from 'graphql/cart/splitBill';
import LoadingModalPayment from 'components/modal/loadingModalPayment';
import ModalPosDevicesDJV from 'pages/TableBill/components/ModalPosDevicesDJV';
import { isEmpty } from 'lodash';
import ModalPaySuccess from 'components/modal/ModalPaySuccess';

export default function TableSplitBillCheckOut() {
    const dataStorage = localStorage.getItem('split_bill_data');
    const [onPaymentWithCash] = useMutation(PAY_SPLITBILL);
    const [onPaymentWithPOS] = useMutation(PAY_SPLIT_BILL_POS);
    const [onPaymentWithPOSDJV] = useMutation(PAY_SPLIT_BILL_POS_DJV);
    const [showPosModal, setShowPosModal] = useState(false);
    const [showPosModalDJV, setShowPosModalDJV] = useState(false);
    const [data, setData] = useState<MerchantSplitOrderOutput>(
        JSON.parse(dataStorage || '{}'),
    );
    const [loading, setLoading] = useState(false);
    const [selectGuest, setSelectGuest] = React.useState<InvoiceWithSplit>();
    const { theme } = useTheme();
    const [loadingPosResult, setLoadingPosResult] = useState(false);
    const [isModalPaySuccess, setModalPaySuccess] =
        React.useState<boolean>(false);

    useEffect(() => {
        const dataTmp = JSON.parse(dataStorage || '{}');
        const selectGuestIndex = dataTmp.invoice.findIndex(
            (value: InvoiceWithSplit) => value.state === 'UNPAID',
        );
        if (selectGuestIndex > -1) {
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
    }, [data]);
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
    const PrintMerchantCopy = (url: string, isOpenCashier = false) => {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'merchant',
                    isOpenCashier: isOpenCashier,
                    imageUrl: url,
                }),
            );
        }
    };

    const checkShowModalPaySuccess = () => {
        const allPaid = data?.invoice?.every(
            (invoice: any) => invoice?.state === 'PAID',
        );
        return allPaid;
    };
    const [dataPaymentSuccess, setDataPaymentSuccess] = useState({
        invoice_number: '',
    });
    const handlePayment = (
        paymentMethod: string,
        po_number?: string | undefined | null,
    ) => {
        if (paymentMethod === 'cash' || paymentMethod == 'other') {
            setLoading(true);
            onPaymentWithCash({
                variables: {
                    invoice_number: selectGuest?.number,
                    payment_method:
                        paymentMethod == 'other'
                            ? 'purchaseorder'
                            : paymentMethod,
                    po_number: po_number ?? '',
                    ...(!isEmpty(po_number) && { po_number }),
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
                        if (result?.invoice_image) {
                            PrintMerchantCopy(
                                result.invoice_image,
                                paymentMethod === 'cash' ? true : false,
                            );
                        }
                        setDataPaymentSuccess({
                            invoice_number: result.number,
                        });
                        setData(newData);
                        setModalPaySuccess(true);
                        localStorage.setItem(
                            'split_bill_data',
                            JSON.stringify(newData),
                        );
                        SkipSelectGuest({ newData });
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
                        SkipSelectGuest({ newData });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else if (paymentMethod === 'pos') {
            setShowPosModalDJV(true);
        }
    };
    const handlePaymentWithPOS = (id: string) => {
        setLoading(true);
        setLoadingPosResult(true);
        const invoice_number = selectGuest?.number || '';
        onPaymentWithPOS({
            variables: {
                invoice_number: selectGuest?.number,
                terminal_id: id,
            },
        })
            .then(() => {
                setDataPaymentSuccess({
                    invoice_number: invoice_number,
                });
                setLoading(false);
                setModalPaySuccess(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handlePaymentWithPOSDJV = (id: any) => {
        setLoading(true);
        setLoadingPosResult(true);
        onPaymentWithPOSDJV({
            variables: {
                invoice_number: selectGuest?.number,
                pos_id: id,
            },
        })
            .then(async () => {
                // showModalSuccess();
                ReloadInvoice({
                    isPayTerminal: true,
                });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setLoadingPosResult(false);
            });
    };
    const [onGetInvoices] = useLazyQuery(GET_INVOICES);
    useEffect(() => {
        emitter.on('arise_result', (msg: any) => {
            if (msg.additional_data?.invoice_number !== selectGuest?.number) {
                return;
            }
            if (msg?.additional_data?.payment_status === 'success') {
                // showModalSuccess();
                ReloadInvoice({});
            } else {
                setLoading(false);
                showError(msg?.message);
            }
            setLoadingPosResult(false);
        });
        return () => {
            emitter.off('arise_result');
        };
    }, [selectGuest]);
    const ReloadInvoice = ({
        printInVoice,
        isPayTerminal = false,
    }: {
        printInVoice?: string;
        isPayTerminal?: boolean;
    }) => {
        onGetInvoices({
            variables: {
                OrderNumber: data.order.order_number,
            },
            fetchPolicy: 'no-cache',
        })
            .then((res) => {
                const newData = res?.data?.merchantGetOrderInvoices;
                setData(newData);
                if (isPayTerminal) {
                    setLoading(false);
                    setModalPaySuccess(true);
                }
                if (printInVoice) {
                    const FindInvoice = newData.invoice.find(
                        (value: InvoiceWithSplit) =>
                            value.number === printInVoice,
                    );
                    if (FindInvoice) {
                        PrintMerchantCopy(FindInvoice.invoice_image);
                    }
                }

                localStorage.setItem(
                    'split_bill_data',
                    JSON.stringify(newData),
                );
                const selectGuestIndex = newData.invoice.findIndex(
                    (value: InvoiceWithSplit) => value.state === 'UNPAID',
                );
                if (
                    selectGuestIndex &&
                    newData.invoice[selectGuestIndex].state === 'PAID'
                ) {
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
    const SkipSelectGuest = ({ newData }: any) => {
        const selectGuestIndex = newData.invoice.findIndex(
            (value: InvoiceWithSplit) => value.state === 'UNPAID',
        );
        if (!selectGuestIndex) {
            return;
        }
        if (selectGuestIndex && selectGuestIndex !== selectGuest?.index) {
            setSelectGuest({
                ...newData.invoice[selectGuestIndex],
                index: selectGuestIndex,
            });
        }
    };
    const [modal, contextHolder] = Modal.useModal();
    const showError = (msg: string) => {
        modal.error({
            title: msg,
            centered: true,
        });
    };

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
            {showPosModalDJV && (
                <ModalPosDevicesDJV
                    isVisibleModalPos={showPosModalDJV}
                    setVisibleMoalPos={setShowPosModalDJV}
                    onPressOK={handlePaymentWithPOSDJV}
                    onCancel={() => setShowPosModalDJV(false)}
                />
            )}
            <RenderHeader
                isHavePaid={data.invoice.some((item) => item.state === 'PAID')}
            />
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
                    {!isMobile && (
                        <PaymentOptions
                            onPayment={handlePayment}
                            isPaid={selectGuest?.state === 'PAID'}
                            selectedGuest={selectGuest}
                        />
                    )}
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
                {isMobile && (
                    <PaymentOptions
                        onPayment={handlePayment}
                        isPaid={selectGuest?.state === 'PAID'}
                        selectedGuest={selectGuest}
                    />
                )}
                <ModalPaySuccess
                    isVisible={isModalPaySuccess}
                    onClose={() => {
                        setModalPaySuccess(false);
                    }}
                    order_id={data.order.order_id}
                    isBackHome={checkShowModalPaySuccess() ? true : false}
                    invoice_number={dataPaymentSuccess?.invoice_number}
                />
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
