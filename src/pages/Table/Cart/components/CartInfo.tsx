import { StyledCartBorder } from '../styled';
import { Col, Row } from 'antd';
import { Text } from 'components/atom/Text';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import { useCart } from 'context/cartContext';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER } from 'graphql/cart/updateCustomer';
import { useTheme } from 'context/themeContext';
import InfoCartModal from 'components/modal/infoCartModal';
import { isCartIdFromLocal } from 'utils/isNumericId';

export default function CartInfo({ table }: { table?: any }) {
    const { setCustomerName, cartItems, indexTable } = useCart();
    const [customerName, setName] = React.useState<any>();
    const [numberOfCustomer, setNoC] = React.useState<number>(1);
    const [searchParams] = useSearchParams();
    const selectedCart = parseInt(searchParams.get('cartIndex') || '0');
    const [onUpdateCustomerInfo] = useMutation(UPDATE_CUSTOMER);
    useEffect(() => {
        if (cartItems.length > 0) {
            setName(cartItems[indexTable]?.carts[selectedCart]?.firstname);
            setNoC(
                cartItems[indexTable]?.carts[selectedCart]?.numberOfCustomer,
            );
        }
    }, [selectedCart, cartItems, indexTable]);
    const updateCustomerInfo = ({
        name,
        number,
    }: {
        name?: string;
        number?: number;
    }) => {
        if (!isCartIdFromLocal(cartItems[indexTable]?.carts[selectedCart].id)) {
            onUpdateCustomerInfo({
                variables: {
                    cart_id: cartItems[indexTable]?.carts[selectedCart].id,
                    firstname: name ? name : customerName,
                    numberOfCustomer: number ? number : numberOfCustomer,
                },
            }).catch((e) => console.log(e));
        }
    };
    const { theme } = useTheme();
    const [showModal, setShowModal] = useState(false);
    return (
        <StyledCartBorder
            style={{
                height: 56,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                marginBottom: 16,
                borderTopLeftRadius: 0,
                paddingBlock: 0,
                overflowX: 'auto',
                backgroundColor: theme.nEUTRALLine,
                border: 0,
            }}
        >
            <InfoCartModal
                isModalOpen={showModal}
                onCancel={() => setShowModal(false)}
                onSubmit={(e: {
                    username: string;
                    numberOfCustomer: number;
                }) => {
                    setName(e.username);
                    setNoC(e.numberOfCustomer);
                    setCustomerName(e.username, selectedCart, indexTable);
                    setShowModal(false);
                    updateCustomerInfo({
                        name: e.username,
                        number: e.numberOfCustomer,
                    });
                }}
                table={table}
                value={{
                    name: customerName,
                    number: numberOfCustomer,
                }}
            />
            <Col
                style={{
                    minWidth: 200,
                }}
            >
                <Row
                    onClick={() => {
                        setShowModal(true);
                    }}
                    justify={'space-between'}
                    style={{ borderBottom: '1px solid #666', padding: 5 }}
                >
                    <Text>Name</Text>
                    <Row align={'middle'}>
                        <Text>{customerName}</Text>
                        <ArrowRightIcon />
                    </Row>
                </Row>
            </Col>
            <Col
                style={{
                    minWidth: 200,
                }}
            >
                <Row
                    onClick={() => {
                        setShowModal(true);
                    }}
                    justify={'space-between'}
                    style={{ borderBottom: '1px solid #666', padding: 5 }}
                >
                    <Text>Customers </Text>
                    <Row align={'middle'}>
                        <Text>{numberOfCustomer}</Text>
                        <ArrowRightIcon />
                    </Row>
                </Row>
            </Col>
        </StyledCartBorder>
    );
}
