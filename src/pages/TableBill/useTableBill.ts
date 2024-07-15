import { useMutation } from '@apollo/client';
import { Modal } from 'antd';
import { BASE_ROUTER } from 'constants/router';
import { useCart } from 'context/cartContext';
import { CartItemType, ItemType } from 'context/cartType';
import { PLACE_ORDER } from 'graphql/cart/placeOrder';
import { GET_APPOTA_URL } from 'graphql/orders/getAppota';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useTableBill = () => {
    const [searchParams] = useSearchParams();
    const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
    const [modal, contextHolder] = Modal.useModal();
    const { cartItems, indexTable } = useCart();
    const [cart, setCart] = React.useState<CartItemType>();
    const [total, setTotal] = React.useState<number>(0);
    const [count, setCount] = React.useState<number>(0);
    const [listItems, setListItems] = React.useState<
        {
            guestId: string;
            items: ItemType[];
        }[]
    >([]);
    const [numbersSplit, setNumbersSplit] = React.useState<number>(1);
    const [paymentMethod, setPaymentMethod] =
        React.useState<string>('cashondelivery');
    const [onGetAppotaUrl] = useMutation(GET_APPOTA_URL);
    const [placeOrder, { loading }] = useMutation(PLACE_ORDER);
    const navigation = useNavigate();

    const showConfirm = () => {
        modal.confirm({
            title: 'Do you want to check out?',
            centered: true,
            onOk: () => {
                handleCheckOut();
            },
        });
    };
    const showModalSuccess = (order_id: string) => {
        modal.success({
            title: 'Check Out Success',
            centered: true,
            onOk: () => {
                navigation(`${BASE_ROUTER.BILL_DETAIL}?orderId=${order_id}`);
            },
        });
    };
    const showModalAlertPayment = (order_id: string) => {
        const order_id_b64 = atob(order_id);
        onGetAppotaUrl({
            variables: {
                orderId: order_id_b64,
            },
        })
            .then((res) => {
                if (res.data.getAppotaPayPaymentURL.pay_url) {
                    window.location.href =
                        res.data.getAppotaPayPaymentURL.pay_url;
                }
            })
            .catch((err) => {
                console.log(err);
                modal.error({
                    title: 'Get Link Payment Failed',
                    centered: true,
                    content: 'go to detail bill',
                    onOk: () => {
                        navigation(
                            `${BASE_ROUTER.BILL_DETAIL}?orderId=${order_id}`,
                        );
                    },
                });
            });
    };
    const handleCheckOut = async () => {
        placeOrder({
            variables: {
                cartId: cartItems[indexTable].carts[cartIndex].id,
                paymentMethod: paymentMethod,
            },
        })
            .then((res) => {
                if (paymentMethod === 'cashondelivery') {
                    showModalSuccess(
                        res.data.createMerchantOrder.order.order_id,
                    );
                } else {
                    showModalAlertPayment(
                        res.data.createMerchantOrder.order.order_id,
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (
            cartItems[indexTable]?.carts &&
            cartItems[indexTable]?.carts.length > 0
        ) {
            const tmp_cart = cartItems[indexTable].carts[cartIndex];
            setCart(tmp_cart);
            let tmp_total = 0;
            let tmp_count = 0;
            tmp_cart?.items.forEach((item) => {
                tmp_total = tmp_total + item.prices.price.value * item.quantity;
                tmp_count = tmp_count + item.quantity;
            });
            setTotal(tmp_total);
            setCount(tmp_count);
        } else {
            navigation(BASE_ROUTER.HOME);
        }
    }, [cartItems]);
    return {
        cart,
        total,
        count,
        handleCheckOut: showConfirm,
        loading,
        contextHolder,
        paymentMethod,
        setPaymentMethod,
        setListItems,
        listItems,
        numbersSplit,
        setNumbersSplit,
    };
};
