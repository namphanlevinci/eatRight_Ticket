import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { RenderHeader } from './components/header';
import CartInfo from './components/cartInfo';
import styled from 'styled-components';
import PaymentOptions from './components/paymentOptions';
import { InvoiceWithSplit, MerchantSplitOrderOutput } from './IType';

import { RenderGuest } from './components/renderGuest';
import { RenderCart } from './components/renderCart';
import { useMutation } from '@apollo/client';
import { PAY_SPLITBILL } from 'graphql/cart/paySplitbill';
import { useNavigate } from 'react-router';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';

export default function TableSplitBillCheckOut() {
    const dataStorage = localStorage.getItem('split_bill_data');
    const [onPayment] = useMutation(PAY_SPLITBILL);
    const [data, setData] = useState<MerchantSplitOrderOutput>(
        JSON.parse(dataStorage || '{}'),
    );
    const [selectGuest, setSelectGuest] = React.useState<InvoiceWithSplit>();
    const { theme } = useTheme();
    useEffect(() => {
        const dataTmp = JSON.parse(dataStorage || '{}');
        if (dataTmp) {
            setSelectGuest({ ...dataTmp.invoice[0], index: 0 });
        }
    }, []);
    const handlePayment = (paymentMethod: string) => {
        onPayment({
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
                    err.graphQLErrors[0].message.includes('is already paid') &&
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
