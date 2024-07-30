import { StyledCartBorder } from '../styled';
import { Col, Row } from 'antd';
import { Text } from 'components/atom/Text';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import { useCart } from 'context/cartContext';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCouponCart } from '../useCouponCart';
import LoadingModal from 'components/modal/loadingModal';
import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER } from 'graphql/cart/updateCustomer';
import { useTheme } from 'context/themeContext';

export default function CartInfo() {
    const { setCustomerName, cartItems, indexTable } = useCart();
    const [promo, setPromo] = React.useState<any>();
    const [customerName, setName] = React.useState<any>();
    const [numberOfCustomer, setNoC] = React.useState<number>(1);
    const [searchParams] = useSearchParams();
    const selectedCart = parseInt(searchParams.get('cartIndex') || '0');
    const [onUpdateCustomerInfo] = useMutation(UPDATE_CUSTOMER);
    const { handleAddCoupon, loading } = useCouponCart();
    useEffect(() => {
        if (cartItems.length > 0) {
            setPromo(
                cartItems[indexTable]?.carts[selectedCart]?.applied_coupons,
            );
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
        if (cartItems[indexTable]?.carts[selectedCart].id !== '1') {
            onUpdateCustomerInfo({
                variables: {
                    cart_id: cartItems[indexTable]?.carts[selectedCart].id,
                    firstname: name ? name : customerName,
                    numberOfCustomer: number ? number : numberOfCustomer,
                },
            });
        }
    };
    const { theme } = useTheme();
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
            <LoadingModal showLoading={loading} />
            <Col
                style={{
                    minWidth: 200,
                }}
            >
                <Row
                    onClick={() => {
                        let text = prompt('Input customer name', customerName);
                        if (text && text !== customerName) {
                            setCustomerName(`${text}`);
                            updateCustomerInfo({ name: text });
                        }
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
                        let text = prompt(
                            'Number of Customer',
                            `${numberOfCustomer}`,
                        );

                        if (text && parseInt(text) !== numberOfCustomer) {
                            setNoC(parseInt(text));
                            updateCustomerInfo({ number: parseInt(text) });
                        }
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
            <Col
                style={{
                    minWidth: 200,
                }}
            >
                <Row
                    onClick={async () => {
                        let text = prompt('Input promotion code');
                        // setPromo(text || '');
                        if (text) {
                            handleAddCoupon(
                                cartItems[indexTable]?.carts[selectedCart].id,
                                text,
                            );
                        }
                    }}
                    justify={'space-between'}
                    style={{ borderBottom: '1px solid #666', padding: 5 }}
                >
                    <Text>Promo</Text>
                    <Row align={'middle'}>
                        <Text>{promo ? promo[0].code : ''}</Text>
                        <ArrowRightIcon />
                    </Row>
                </Row>
            </Col>
        </StyledCartBorder>
    );
}
