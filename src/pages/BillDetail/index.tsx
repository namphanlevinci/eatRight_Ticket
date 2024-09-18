/* eslint-disable no-unsafe-optional-chaining */
import { App, Row, Spin } from 'antd';
import { Button } from 'components/atom/Button';
import { TextDark } from 'components/atom/Text';
import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ORDER_DETAIL } from 'graphql/orders/orderDetail';
import { ButtonContainer, ButtonLeftContainer, Container } from './styled';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import ModalPaymentPending from 'components/modal/ModalPaymentPending';
import { GET_RE_PAYMENT_URL } from 'graphql/orders/repayment';
import LazyLoadedScripts from 'LazyLoadedScripts';
import { useTableBill } from 'pages/TableBill/useTableBill';
import ModalPosDevices from 'pages/TableBill/components/ModalPosDevices';
import LoadingModalPayment from 'components/modal/loadingModalPayment';
import { emitter } from 'graphql/client';
import { useTheme } from 'context/themeContext';
import BreadCrum from 'components/atom/BreadCrum/BreadCrum';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import { GET_INVOICES } from 'graphql/cart/splitBill';
import ModalInput from 'components/modal/ModalInput';
import {
    SEND_RECEIPT_TO_EMAIL,
    SEND_RECEIPT_TO_PHONENUMBER,
} from 'graphql/orders/printBill';
import LoadingModal from 'components/modal/loadingModal';
import { RenderBill } from './components/RenderBill';
import { ButtonBill } from './components/ButtonBill';
import { ButtonSelectBill } from './components/ButtonSelectBill';
import { useMediaQuery } from 'react-responsive';
import ModalPosDevicesDJV from 'pages/TableBill/components/ModalPosDevicesDJV';
import { PRINT_BILL } from 'graphql/printer';
export default function index() {
    const [getOrderDetail, { data, loading, refetch }] = useLazyQuery(
        GET_ORDER_DETAIL,
        {
            fetchPolicy: 'cache-and-network',
        },
    );
    const [onGetInvoices, { data: dataSplitBill }] = useLazyQuery(GET_INVOICES);
    const [searchParams] = useSearchParams();
    const [showPendingPayment, setShowPendingPayment] = React.useState(false);
    const orderId = searchParams.get('orderId');
    const order_ID = searchParams.get('order_id');
    const [loadingPosResult, setLoadingPosResult] = useState(false);
    let intervalId: any = null;
    useEffect(() => {
        if (loadingPosResult) {
            intervalId = setInterval(refetch, 30000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [loadingPosResult, intervalId]);
    const [onSendBillToEmail, { loading: sendLoading1 }] = useMutation(
        SEND_RECEIPT_TO_EMAIL,
    );
    const [onSendBillToPhone, { loading: sendLoading2 }] = useMutation(
        SEND_RECEIPT_TO_PHONENUMBER,
    );
    useEffect(() => {
        if (data?.orderDetail.payment_method_code === 'pos') {
            if (data?.orderDetail.status === 'pending_payment') {
                setLoadingPosResult(true);
            } else {
                setLoadingPosResult(false);
            }
        }
        emitter.on('arise_result', (msg: any) => {
            if (
                data?.orderDetail?.order_number ===
                msg?.additional_data.order_number
            ) {
                if (msg?.additional_data?.payment_status === 'success') {
                    showModalSuccess(`${btoa(data?.orderDetail?.id)}`);
                    setLoadingPosResult(false);
                } else {
                    showError(msg?.message, `${btoa(data?.orderDetail?.id)}`);
                }
            }
        });
        return () => {
            emitter.off('arise_result');
        };
    }, [data?.orderDetail]);
    useEffect(() => {
        if (orderId !== null && orderId !== 'undefined') {
            getOrderDetail({ variables: { id: atob(orderId) } }).then((res) => {
                onGetInvoices({
                    variables: {
                        OrderNumber: res.data?.orderDetail?.order_number,
                    },
                    fetchPolicy: 'no-cache',
                });
            });
        }
    }, [orderId]);
    useEffect(() => {
        if (order_ID !== null && order_ID !== 'undefined') {
            getOrderDetail({ variables: { id: order_ID } }).then((res) => {
                onGetInvoices({
                    variables: {
                        OrderNumber: res.data?.orderDetail?.order_number,
                    },
                });
            });
        }
    }, [order_ID]);
    useEffect(() => {
        if (
            dataSplitBill?.merchantGetOrderInvoices &&
            data?.orderDetail?.payment_method_code === 'splitbill'
        ) {
            if (dataSplitBill?.merchantGetOrderInvoices?.invoice.length > 0) {
                const isNotPaid =
                    dataSplitBill?.merchantGetOrderInvoices?.invoice?.find(
                        (item: any) => item.state !== 'PAID',
                    );
                if (isNotPaid) {
                    localStorage.setItem(
                        'split_bill_data',
                        JSON.stringify(dataSplitBill?.merchantGetOrderInvoices),
                    );
                    navigation(BASE_ROUTER.TABLE_BILL_CHECKOUT);
                }
            }
        }
    }, [dataSplitBill]);
    const handleSendBill = (
        type: string,
        value: string,
        invoiceNumber: string,
    ) => {
        if (!invoiceNumber) {
            return;
        }
        if (type === 'email') {
            onSendBillToEmail({
                variables: {
                    invoiceNumber: invoiceNumber,
                    email: value,
                },
            })
                .then(() => {
                    showSuccess({
                        title: 'Success',
                        content: `Send to ${value} success.`,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            onSendBillToPhone({
                variables: {
                    invoiceNumber: `${invoiceNumber}`,
                    phoneNumber: value,
                    region_code: '+1',
                },
            })
                .then(() => {
                    showSuccess({
                        title: 'Success',
                        content: `Send to ${value} success.`,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const navigation = useNavigate();
    const { modal } = App.useApp();
    // const { print, connectionStatus }: PrinterContextType = usePrinter();
    // const PrintBill = () => {
    //     if (connectionStatus === 'Connected') {
    //         print();
    //         modal.success({
    //             title: 'Print bill Success',
    //             content: 'Please go to printer to take the bill!',
    //             centered: true,
    //             onOk: () => {
    //                 navigation(BASE_ROUTER.HOME);
    //             },
    //         });
    //     } else {
    //         modal.error({
    //             title: 'Print bill Failed',
    //             content: 'Please set up printer then try again!',
    //             centered: true,
    //             onOk: () => {
    //                 navigation(BASE_ROUTER.SETTINGS_PRINTER);
    //             },
    //         });
    //     }
    // };
    const [onPrintBill] = useMutation(PRINT_BILL);
    const PrintBillApi = () => {
        if (childBill.length) {
            onPrintBill({
                variables: {
                    invoice_number: selectDataShowbill.number,
                },
            })
                .then(() => {
                    modal.success({
                        title: 'Print bill Success',
                        content: 'Please go to printer to take the bill!',
                        centered: true,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            onPrintBill({
                variables: {
                    invoice_number:
                        dataSplitBill?.merchantGetOrderInvoices?.invoice[0]
                            ?.number,
                },
            })
                .then(() => {
                    modal.success({
                        title: 'Print bill Success',
                        content: 'Please go to printer to take the bill!',
                        centered: true,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };
    const showSuccess = ({
        title,
        content,
    }: {
        title: string;
        content: string;
    }) => {
        modal.success({
            title: title,
            content: content,
            centered: true,
        });
    };
    useEffect(() => {
        if (
            data?.orderDetail?.status === 'payment_failed' ||
            data?.orderDetail?.status === 'pending_payment'
        ) {
            setShowPendingPayment(true);
        }
    }, [data]);
    const [handleRePayment] = useMutation(GET_RE_PAYMENT_URL);
    const {
        handlePOSPayment,
        isVisibleModalPos,
        setVisibleMoalPos,
        pos_Loading,
        contextHolder,
        isVisibleModalPosDJV,
        setVisibleMoalPosDJV,
        handlePOSPaymentWithDJV,
        setPos_Loading,
        showModalSuccess,
        showError,
        showModalErrorPayment,
    } = useTableBill(false);
    const modalConfirm = (paymentMethod = 'cashondelivery') => {
        modal.confirm({
            title: `Are you sure repayment with ${
                paymentMethod === 'cashondelivery'
                    ? 'Cash'
                    : paymentMethod === 'pos'
                      ? 'POS Arise'
                      : 'Pos DJV'
            } ?`,
            centered: true,
            onOk: () => {
                if (paymentMethod === 'pos') {
                    setVisibleMoalPos(true);
                } else if (paymentMethod === 'pos_djv') {
                    setVisibleMoalPosDJV(true);
                } else {
                    handleCheckOut(paymentMethod);
                }
            },
        });
    };
    const handleCheckOut = async (paymentMethod = 'cashondelivery') => {
        handleRePayment({
            variables: {
                orderId: orderId ? atob(orderId) : order_ID,
                paymentMethod: paymentMethod,
            },
        })
            .then((res) => {
                if (paymentMethod === 'cashondelivery') {
                    modal.success({
                        title: 'Repayment Success',
                        centered: true,
                        onOk: () => {
                            setShowPendingPayment(false);
                        },
                    });
                } else {
                    window.location.href =
                        res.data.retryPurchaseAppotaPayOrder.pay_url;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        emitter.on('REPAYMENT_SUCCESS', () => {
            setShowPendingPayment(false);
        });
    }, []);
    const { theme } = useTheme();
    const [modalInputEmail, setModalInputEmail] = useState(false);
    const [modalInputPhone, setModalInputPhone] = useState(false);
    const [childBill, setChildBill] = useState([]);
    const [selectDataShowbill, setSelectDataShowbill] = useState<any>();
    useEffect(() => {
        if (dataSplitBill?.merchantGetOrderInvoices) {
            const dataBill = dataSplitBill?.merchantGetOrderInvoices;
            if (dataBill?.invoice?.length > 1) {
                setChildBill(dataBill?.invoice);
            }
        }
    }, [dataSplitBill]);
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    return (
        <div>
            {' '}
            <ModalInput
                isModalOpen={modalInputEmail}
                title="Input customer e-mail"
                onSubmit={(value: string) => {
                    handleSendBill(
                        'email',
                        value,
                        selectDataShowbill
                            ? selectDataShowbill?.number
                            : dataSplitBill?.merchantGetOrderInvoices
                                  ?.invoice[0]?.number,
                    );
                    setModalInputEmail(false);
                }}
                onCancel={() => {
                    setModalInputEmail(false);
                }}
                type="email"
            />
            <ModalInput
                isModalOpen={modalInputPhone}
                title="Input customer PhoneNumber"
                onSubmit={(value: string) => {
                    handleSendBill(
                        'tel',
                        value,
                        selectDataShowbill
                            ? selectDataShowbill?.number
                            : dataSplitBill?.merchantGetOrderInvoices
                                  ?.invoice[0]?.number,
                    );
                    setModalInputPhone(false);
                }}
                onCancel={() => {
                    setModalInputPhone(false);
                }}
                type="tel"
            />
            <Row
                style={{ marginBlock: 10, position: 'relative' }}
                align={'middle'}
            >
                <Link to={BASE_ROUTER.HOME}>
                    <BreadCrum>Home</BreadCrum>
                </Link>
                <ArrowRightIcon />
                <Link to={BASE_ROUTER.BILL}>
                    <BreadCrum>Bill</BreadCrum>
                </Link>
                <ArrowRightIcon />
                <BreadCrum isSelected>
                    Order {data?.orderDetail?.order_number}
                </BreadCrum>
            </Row>
            <Container
                style={{
                    background: theme.pRIMARY1,
                    paddingTop: 16,
                    paddingBottom: 16,
                }}
            >
                <div
                    style={{
                        position: 'fixed',
                        height: '100vh',
                        width: '100vw',
                        zIndex: -1,
                        background: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {loading && <Spin size="large" tip="Loading..." />}
                </div>
                {contextHolder}
                <ModalPosDevices
                    isVisibleModalPos={isVisibleModalPos}
                    setVisibleMoalPos={setVisibleMoalPos}
                    onPressOK={(pos_id: string) => {
                        handlePOSPayment(pos_id, {
                            order_number: data?.orderDetail?.order_number,
                            order_id: orderId ? orderId : btoa(order_ID || ''),
                        });
                    }}
                />
                <ModalPosDevicesDJV
                    isVisibleModalPos={isVisibleModalPosDJV}
                    setVisibleMoalPos={setVisibleMoalPosDJV}
                    onPressOK={(pos_id: number) => {
                        handlePOSPaymentWithDJV(
                            pos_id,
                            {
                                order_number: data?.orderDetail?.order_number,
                                order_id: orderId
                                    ? orderId
                                    : btoa(order_ID || ''),
                            },
                            false,
                        );
                    }}
                    onCancel={() => {
                        showModalErrorPayment(data?.orderDetail?.order_number);
                    }}
                />
                <LoadingModalPayment
                    showLoading={pos_Loading}
                    title="POS Payment Processing ..."
                    onClose={() => setPos_Loading(false)}
                />
                <LoadingModal showLoading={sendLoading1 || sendLoading2} />
                <LazyLoadedScripts />
                <ModalPaymentPending
                    title="Payment in progress"
                    showLoading={showPendingPayment}
                    data={data?.orderDetail}
                    onSkip={() => setShowPendingPayment(false)}
                    onPOS_DJV={() => modalConfirm('pos_djv')}
                    onCash={() => modalConfirm('cashondelivery')}
                    onPOS={() => modalConfirm('pos')}
                />
                {!loading && (
                    <>
                        <RenderBill
                            data={data?.orderDetail}
                            selectDataShowbill={selectDataShowbill}
                        />

                        <ButtonContainer>
                            {(childBill.length === 0 || selectDataShowbill) && (
                                <>
                                    <ButtonBill
                                        title="Print"
                                        onPress={PrintBillApi}
                                    />
                                    <ButtonBill
                                        title="Email"
                                        onPress={() => setModalInputEmail(true)}
                                    />
                                    <ButtonBill
                                        title="Sms"
                                        onPress={() => setModalInputPhone(true)}
                                    />
                                </>
                            )}
                            <Button
                                style={{
                                    height: 56,
                                    width: isMobile ? 'auto' : 160,
                                    display: 'flex',
                                    border: `2px solid ${theme.pRIMARY6Primary}`,
                                    padding: '0 16px',
                                }}
                                onClick={() => navigation(BASE_ROUTER.BILL)}
                                background={theme.nEUTRALPrimary}
                            >
                                <TextDark
                                    style={{
                                        color: theme.pRIMARY6Primary,
                                        fontWeight: '600',
                                    }}
                                >
                                    No receipt
                                </TextDark>
                            </Button>
                        </ButtonContainer>

                        {childBill.length > 1 && (
                            <ButtonLeftContainer>
                                <ButtonSelectBill
                                    onPress={() =>
                                        setSelectDataShowbill(undefined)
                                    }
                                    isSelected={!selectDataShowbill}
                                />
                                {childBill.map((item: any, index: number) => (
                                    <ButtonSelectBill
                                        key={index}
                                        title={`${index + 1}`}
                                        onPress={() => {
                                            setSelectDataShowbill(item);
                                        }}
                                        isSelected={selectDataShowbill === item}
                                    />
                                ))}
                            </ButtonLeftContainer>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}
