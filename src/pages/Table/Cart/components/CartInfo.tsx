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
import { useMediaQuery } from 'react-responsive';

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
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    return (
        <StyledCartBorder
            style={{
                height: isMobile ? 'auto' : 56,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
                marginBottom: 16,
                borderTopLeftRadius: 0,
                paddingBlock: isMobile ? 16 : 0,
                overflowX: 'auto',
                backgroundColor: theme.nEUTRALLine,
                border: 0,
                flexWrap: 'wrap',
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
                    minWidth: isMobile ? '100%' : 300,
                }}
            >
                <Row
                    onClick={() => {
                        setShowModal(true);
                    }}
                    justify={'space-between'}
                    align={'middle'}
                >
                    <Text>Name</Text>
                    <Row
                        align={'middle'}
                        style={{
                            borderBottom: `1px solid #${theme.nEUTRALLine}`,
                            padding: 5,
                            width: '70%',
                        }}
                        justify={'end'}
                    >
                        <Text>{customerName}</Text>
                        <ArrowRightIcon />
                    </Row>
                </Row>
            </Col>
            <Col
                style={{
                    minWidth: isMobile ? '100%' : 300,
                }}
            >
                <Row
                    onClick={() => {
                        setShowModal(true);
                    }}
                    justify={'space-between'}
                    align={'middle'}
                >
                    <Text>Customers </Text>
                    <Row
                        align={'middle'}
                        style={{
                            borderBottom: `1px solid #${theme.nEUTRALLine}`,
                            padding: 5,
                            width: '70%',
                        }}
                        justify={'end'}
                    >
                        <Text>{numberOfCustomer}</Text>
                        <ArrowRightIcon />
                    </Row>
                </Row>
            </Col>
        </StyledCartBorder>
    );
}
