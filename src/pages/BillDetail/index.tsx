import { App, Col, Row, Spin } from 'antd';
import { Button } from 'components/atom/Button';
import { TextDark } from 'components/atom/Text';
import React, { useEffect } from 'react';
import { Colors } from 'themes/colors';
import Barcode from 'react-barcode';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ORDER_DETAIL } from 'graphql/orders/orderDetail';
import { CURRENTCY } from 'constants/currency';
import {
    ButtonContainer,
    Container,
    DividedDashed,
    DividedSolid,
    RowStyled,
    text24,
    BarCodeContainer,
    text16,
    text16Bold,
    text16W,
} from './styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatNumberWithCommas } from 'utils/format';
import { BASE_ROUTER } from 'constants/router';
import { usePrinter } from 'context/printerContext';
import { PrinterContextType } from 'context/printerType';
import ModalPaymentPending from 'components/modal/ModalPaymentPending';
import { GET_RE_PAYMENT_URL } from 'graphql/orders/repayment';
import LazyLoadedScripts from 'LazyLoadedScripts';
export default function index() {
    const [getOrderDetail, { data, loading }] = useLazyQuery(GET_ORDER_DETAIL, {
        fetchPolicy: 'cache-and-network',
    });
    const [searchParams] = useSearchParams();
    const [showPendingPayment, setShowPendingPayment] = React.useState(false);
    const orderId = searchParams.get('orderId');
    const order_ID = searchParams.get('order_id');
    useEffect(() => {
        if (orderId !== null && orderId !== 'undefined') {
            getOrderDetail({ variables: { id: atob(orderId) } });
        }
    }, [orderId]);
    useEffect(() => {
        if (order_ID !== null && order_ID !== 'undefined') {
            getOrderDetail({ variables: { id: order_ID } });
        }
    }, [order_ID]);
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
    useEffect(() => {
        if (
            data?.orderDetail?.status === 'payment_failed' ||
            data?.orderDetail?.status === 'pending_payment'
        ) {
            setShowPendingPayment(true);
        }
    }, [data]);
    const [handleRePayment] = useMutation(GET_RE_PAYMENT_URL);
    const modalConfirm = (paymentMethod = 'cashondelivery') => {
        modal.confirm({
            title: `Are you sure repayment with ${
                paymentMethod === 'cashondelivery' ? 'Cash' : 'Online Payment'
            } ?`,
            centered: true,
            onOk: () => {
                handleCheckOut(paymentMethod);
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
    return (
        <Container>
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
            <LazyLoadedScripts />
            <ModalPaymentPending
                showLoading={showPendingPayment}
                data={data?.orderDetail}
                onSkip={() => setShowPendingPayment(false)}
                onCard={() => modalConfirm('lvc_appota')}
                onCash={() => modalConfirm('cashondelivery')}
            />
            {!loading && (
                <>
                    <ButtonContainer>
                        <Button
                            style={{
                                height: 56,
                                width: 116,
                                background: 'black',
                                border: `1px solid ${Colors.primary}`,
                                display: 'flex',
                            }}
                            onClick={() => navigation(BASE_ROUTER.BILL)}
                        >
                            <TextDark
                                style={{
                                    color: Colors.primary,
                                    fontWeight: '600',
                                }}
                            >
                                BILL
                            </TextDark>
                        </Button>
                    </ButtonContainer>
                    <RenderBill data={data?.orderDetail} />
                    <ButtonContainer isRight>
                        <Button
                            style={{
                                height: 56,
                                width: 116,
                                display: 'flex',
                            }}
                            onClick={PrintBill}
                        >
                            <TextDark
                                style={{
                                    color: Colors.black,
                                    fontWeight: '600',
                                }}
                            >
                                Print
                            </TextDark>
                        </Button>
                    </ButtonContainer>
                </>
            )}
        </Container>
    );
}

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
                <TextDark style={text24}>{data?.firstname}</TextDark>
                <TextDark style={{ ...text16W, marginTop: 16 }}>
                    {data?.address}
                </TextDark>
                <TextDark style={{ ...text16W, marginTop: 8 }}>
                    Hotline: {data?.phone}
                </TextDark>

                <DividedDashed />
                <RowStyled style={{ marginTop: 20 }}>
                    <TextDark>Order ID</TextDark>
                    <TextDark>{data?.order_number}</TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark>
                        {data?.created_at && data?.created_at.split(' ')[0]}
                    </TextDark>
                    <TextDark>
                        {data?.created_at && data?.created_at.split(' ')[1]}
                    </TextDark>
                </RowStyled>
                <DividedSolid />
                <TextDark style={{ ...text16Bold, marginTop: 12 }}>
                    Order summary
                </TextDark>
            </div>
            <div id="billContent">
                {data?.items?.map((item: any, index: number) => {
                    return (
                        <>
                            <RowStyled key={index}>
                                <Col span={16} style={{ textAlign: 'left' }}>
                                    <TextDark style={text16}>
                                        <span style={{ fontWeight: '600' }}>
                                            {' '}
                                            {item?.qty}x
                                        </span>{' '}
                                        {item?.name}
                                    </TextDark>
                                </Col>
                                <Col span={8} style={{ textAlign: 'end' }}>
                                    <TextDark>
                                        {formatNumberWithCommas(item?.price)}
                                        {CURRENTCY}
                                    </TextDark>
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
                <DividedSolid />
                <TextDark style={{ ...text16Bold, marginTop: 12 }}>
                    Payment detail
                </TextDark>
                <RowStyled>
                    <TextDark style={text16}>Subtotal</TextDark>
                    <TextDark>
                        {formatNumberWithCommas(
                            data?.grand_total + totalDiscount,
                        )}{' '}
                        {CURRENTCY}
                    </TextDark>
                </RowStyled>
                <RowStyled>
                    <TextDark style={text16}>Discounted</TextDark>
                    <TextDark>
                        - {formatNumberWithCommas(totalDiscount)} {CURRENTCY}
                    </TextDark>
                </RowStyled>
                {data?.discount?.length > 0 &&
                    data?.discount?.map((discount: any, index: number) => {
                        return (
                            <Row justify={'end'} key={`Discount-${index}`}>
                                <TextDark style={{ fontSize: 14 }}>
                                    {discount?.label} -{' '}
                                    {formatNumberWithCommas(
                                        discount?.amount?.value,
                                    )}
                                </TextDark>
                            </Row>
                        );
                    })}

                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Total paid</TextDark>
                    <TextDark style={{ fontWeight: '600', fontSize: 18 }}>
                        {formatNumberWithCommas(data?.grand_total)} {CURRENTCY}
                    </TextDark>
                </RowStyled>
                <RowStyled align={'middle'}>
                    <TextDark style={text16}>Method</TextDark>
                    <TextDark style={{ fontWeight: '600', fontSize: 18 }}>
                        {data?.payment_method}
                    </TextDark>
                </RowStyled>
                <BarCodeContainer>
                    <Barcode value={data?.order_number} />
                </BarCodeContainer>
            </div>
        </div>
    );
};
