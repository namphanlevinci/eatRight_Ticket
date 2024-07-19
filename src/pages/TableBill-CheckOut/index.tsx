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

export default function TableSplitBillCheckOut() {
    const dataStorage = localStorage.getItem('split_bill_data');
    const [onPayment] = useMutation(PAY_SPLITBILL);
    const [data, setData] = useState<MerchantSplitOrderOutput>(
        JSON.parse(dataStorage || '{}'),
    );
    const [selectGuest, setSelectGuest] = React.useState<InvoiceWithSplit>();

    useEffect(() => {
        const dataTmp = JSON.parse(dataStorage || '{}');
        if (dataTmp) {
            setSelectGuest(dataTmp.invoice[0]);
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
    return (
        <Layout
            style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'black',
                padding: 16,
                overflow: 'auto',
            }}
        >
            <RenderHeader />
            <CartInfo />
            <div style={{ marginTop: 20 }} />
            <Container>
                <ColumnGuestList>
                    {data.invoice.map((item, index) => {
                        return (
                            <RenderGuest
                                key={index}
                                title={`${index + 1}`}
                                money={item.total.grand_total.value}
                                isSelect={item.id === selectGuest?.id}
                                onClick={() => setSelectGuest(item)}
                                isPaid={item.state === 'PAID'}
                            />
                        );
                    })}
                </ColumnGuestList>
                <ColumnCart>
                    {selectGuest && <RenderCart cart={selectGuest} />}
                    <PaymentOptions onPayment={handlePayment} />
                </ColumnCart>
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
