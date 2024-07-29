/* eslint-disable no-unsafe-optional-chaining */
import { App, Col, Row, Spin } from 'antd';
import { Button } from 'components/atom/Button';
import { TextDark } from 'components/atom/Text';
import React, { useEffect, useState } from 'react';
import Barcode from 'react-barcode';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ORDER_DETAIL } from 'graphql/orders/orderDetail';
import { CURRENTCY } from 'constants/currency';
import {
    ButtonContainer,
    Container,
    DividedDashed,
    RowStyled,
    text24,
    BarCodeContainer,
    text16,
    text16W,
    BoldText,
} from './styled';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { usePrinter } from 'context/printerContext';
import { PrinterContextType } from 'context/printerType';
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
export default function index() {
    const [getOrderDetail, { data, loading }] = useLazyQuery(GET_ORDER_DETAIL, {
        fetchPolicy: 'cache-and-network',
    });
    const [onGetInvoices, { data: dataSplitBill }] = useLazyQuery(GET_INVOICES);
    const [searchParams] = useSearchParams();
    const [showPendingPayment, setShowPendingPayment] = React.useState(false);
    const orderId = searchParams.get('orderId');
    const order_ID = searchParams.get('order_id');
    const [onSendBillToEmail, { loading: sendLoading1 }] = useMutation(
        SEND_RECEIPT_TO_EMAIL,
    );
    const [onSendBillToPhone, { loading: sendLoading2 }] = useMutation(
        SEND_RECEIPT_TO_PHONENUMBER,
    );
    useEffect(() => {
        if (orderId !== null && orderId !== 'undefined') {
            getOrderDetail({ variables: { id: atob(orderId) } }).then((res) => {
                onGetInvoices({
                    variables: {
                        OrderNumber: res.data?.orderDetail?.order_number,
                    },
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
            dataSplitBill &&
            data?.orderDetail?.payment_method_code === 'splitbill' &&
            data?.orderDetail?.status !== 'complete'
        ) {
            localStorage.setItem(
                'split_bill_data',
                JSON.stringify(dataSplitBill?.merchantGetOrderInvoices),
            );
            navigation(BASE_ROUTER.TABLE_BILL_CHECKOUT);
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
                    invoiceNumber: `+84${invoiceNumber}`,
                    phoneNumber: value,
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
    const { print, connectionStatus }: PrinterContextType = usePrinter();
    const PrintBill = () => {
        if (connectionStatus === 'Connected') {
            print();
            modal.success({
                title: 'Print bill Success',
                content: 'Please go to printer to take the bill!',
                centered: true,
                onOk: () => {
                    navigation(BASE_ROUTER.HOME);
                },
            });
        } else {
            modal.error({
                title: 'Print bill Failed',
                content: 'Please set up printer then try again!',
                centered: true,
                onOk: () => {
                    navigation(BASE_ROUTER.SETTINGS_PRINTER);
                },
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
    } = useTableBill(false);
    const modalConfirm = (paymentMethod = 'cashondelivery') => {
        modal.confirm({
            title: `Are you sure repayment with ${
                paymentMethod === 'cashondelivery' ? 'Cash' : 'Online Payment'
            } ?`,
            centered: true,
            onOk: () => {
                if (paymentMethod === 'pos') {
                    setVisibleMoalPos(true);
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
                        dataSplitBill?.merchantGetOrderInvoices?.invoice[0]
                            ?.number,
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
                        dataSplitBill?.merchantGetOrderInvoices?.invoice[0]
                            ?.number,
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
                    onPressOK={(pos_id: number) => {
                        handlePOSPayment(pos_id, {
                            order_number: data?.orderDetail?.order_number,
                            order_id: orderId ? orderId : btoa(order_ID || ''),
                        });
                    }}
                />
                <LoadingModalPayment
                    showLoading={pos_Loading}
                    title="POS Payment Processing ..."
                />
                <LoadingModal showLoading={sendLoading1 || sendLoading2} />
                <LazyLoadedScripts />
                <ModalPaymentPending
                    showLoading={showPendingPayment}
                    data={data?.orderDetail}
                    onSkip={() => setShowPendingPayment(false)}
                    onCard={() => modalConfirm('lvc_appota')}
                    onCash={() => modalConfirm('cashondelivery')}
                    onPOS={() => modalConfirm('pos')}
                />
                {!loading && (
                    <>
                        <RenderBill data={data?.orderDetail} />
                        <ButtonContainer>
                            <ButtonBill title="Print" onPress={PrintBill} />
                            <ButtonBill
                                title="Send mail"
                                onPress={() => setModalInputEmail(true)}
                            />
                            <ButtonBill
                                title="Sms"
                                onPress={() => setModalInputPhone(true)}
                            />
                            <Button
                                style={{
                                    height: 56,
                                    width: 160,
                                    display: 'flex',
                                    border: `2px solid ${theme.pRIMARY6Primary}`,
                                }}
                                onClick={() => navigation(-1)}
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
                    </>
                )}
            </Container>
        </div>
    );
}

const ButtonBill = ({
    title,
    onPress,
}: {
    title: string;
    onPress: () => void;
}) => {
    const { theme } = useTheme();
    return (
        <Button
            style={{
                height: 56,
                width: 160,
                display: 'flex',
                border: '0px',
            }}
            onClick={onPress}
            background={theme.pRIMARY6Primary}
        >
            <TextDark
                style={{
                    color: theme.pRIMARY1,
                    fontWeight: '600',
                }}
            >
                {title}
            </TextDark>
        </Button>
    );
};

const RenderBill = ({ data }: { data: any }) => {
    const totalDiscount =
        data?.discount?.length > 0
            ? data?.discount?.reduce((total: number, discount: any) => {
                  total += discount.amount.value;
                  return total;
              }, 0)
            : 0;
    return (
        <div
            style={{
                width: '320px',
                borderRadius: 8,
                background: 'white',
                paddingTop: 20,
                paddingInline: 16,
                overflow: 'auto',
            }}
        >
            <div id="billHeader">
                <TextDark style={{ ...text24, fontWeight: '600' }}>
                    {data?.firstname}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 16 }}>
                    {data?.address}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 8 }}>
                    Hotline: {data?.phone}
                </TextDark>

                <DividedDashed />
                <TextDark
                    style={{
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    RECEIPT
                </TextDark>

                <RowStyled>
                    <TextDark>
                        <BoldText>Date: </BoldText>
                        {data?.created_at && data?.created_at.split(' ')[0]}
                    </TextDark>
                    <TextDark>
                        <BoldText>Time: </BoldText>
                        {data?.created_at && data?.created_at.split(' ')[1]}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark>{data?.order_type}</TextDark>
                    <TextDark>
                        <BoldText>Bill: </BoldText>
                        {data?.order_number}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark>
                        <BoldText>Table: </BoldText>
                        {data?.table_name}
                    </TextDark>
                    <TextDark>
                        <BoldText>Server: </BoldText>
                        {data?.server_name}
                    </TextDark>
                </RowStyled>
                <DividedDashed />
            </div>
            <div id="billContent">
                {data?.items?.map((item: any, index: number) => {
                    return (
                        <>
                            <RowStyled key={index}>
                                <Col style={{ textAlign: 'left', width: 30 }}>
                                    <span>{item?.qty}</span>
                                </Col>
                                <Col style={{ flex: 1 }}> {item?.name}</Col>
                                <Col style={{ textAlign: 'end', width: 50 }}>
                                    {CURRENTCY}
                                    {item?.price.toFixed(2)}
                                </Col>
                            </RowStyled>
                            {item?.options?.map((option: any, idx: number) => {
                                return (
                                    <RowStyled
                                        key={`${index}-${idx}`}
                                        style={{ paddingLeft: 20 }}
                                    >
                                        <TextDark style={text16}>
                                            • {option?.name}
                                        </TextDark>
                                    </RowStyled>
                                );
                            })}
                        </>
                    );
                })}
            </div>
            <div id="billFooter">
                <DividedDashed />

                <RowStyled>
                    <TextDark style={text16}>Subtotal:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {(data?.sub_total
                            ? data?.sub_total
                            : data?.grand_total + totalDiscount
                        ).toFixed(2)}{' '}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark style={text16}>Discount:</TextDark>
                    <TextDark>
                        - {CURRENTCY} {totalDiscount.toFixed(2)}
                    </TextDark>
                </RowStyled>
                {data?.discount?.length > 0 &&
                    data?.discount?.map((discount: any, index: number) => {
                        return (
                            <Row justify={'end'} key={`Discount-${index}`}>
                                <TextDark style={{ fontSize: 14 }}>
                                    {discount?.label} -{' '}
                                    {discount?.amount?.value.toFixed(2)}
                                </TextDark>
                            </Row>
                        );
                    })}
                {data?.tax_amount && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            Tax {`(${data?.tax || 8}%):`}
                        </TextDark>
                        <TextDark>
                            {CURRENTCY} {data?.tax_amount?.toFixed(2)}
                        </TextDark>
                    </RowStyled>
                )}

                {data?.service_charge_amount && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>
                            Service Charge {`(${data?.service_charge || 10}%):`}
                        </TextDark>
                        <TextDark>
                            {CURRENTCY}{' '}
                            {data?.service_charge_amount?.toFixed(2)}
                        </TextDark>
                    </RowStyled>
                )}
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Total:</TextDark>
                    <TextDark>
                        {CURRENTCY}{' '}
                        {data?.total
                            ? data?.total.toFixed(2)
                            : (
                                  data?.grand_total - data?.tip_amount?.value
                              ).toFixed(2)}
                    </TextDark>
                </RowStyled>
                <DividedDashed />
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Tip:</TextDark>
                    <TextDark>
                        {CURRENTCY} {data?.tip_amount?.value?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Grand Total:</TextDark>
                    <TextDark>
                        {CURRENTCY} {data?.grand_total?.toFixed(2)}
                    </TextDark>
                </RowStyled>
                <DividedDashed />
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Payment Method:</TextDark>
                    <TextDark>{data?.payment_method}</TextDark>
                </RowStyled>

                {data?.cart_type && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Cart Type:</TextDark>
                        <TextDark>{data?.cart_type}</TextDark>
                    </RowStyled>
                )}
                {data?.last_digits && (
                    <RowStyled align={'middle'}>
                        <TextDark style={text16}>Last 4 Digits:</TextDark>
                        <TextDark>{data?.last_digits}</TextDark>
                    </RowStyled>
                )}
                <DividedDashed />
                <TextDark>
                    <TextDark style={text16}>
                        Signature:_________________________
                    </TextDark>
                </TextDark>
                <DividedDashed />
                <TextDark
                    style={{
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    Customer Copy
                </TextDark>
                <TextDark style={{ marginTop: 10 }}>
                    Thank you for dining with us!
                </TextDark>
                <TextDark style={{ marginTop: 10 }}>
                    Feedback/Contact us: {data?.feedbackUrl}
                </TextDark>

                <BarCodeContainer>
                    <Barcode value={data?.order_number} />
                </BarCodeContainer>
            </div>
        </div>
    );
};
