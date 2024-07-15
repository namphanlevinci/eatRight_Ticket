import { Layout } from 'antd';
import React from 'react';
import { RenderHeader } from './components/header';
import CartInfo from './components/cartInfo';
import styled from 'styled-components';
import PaymentOptions from './components/paymentOptions';

export default function TableSplitBillCheckOut() {
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
                <ColumnGuestList>Guest List</ColumnGuestList>
                <ColumnCart>
                    Cart
                    <PaymentOptions />
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
