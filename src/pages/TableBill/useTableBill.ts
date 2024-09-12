import { useLazyQuery, useMutation } from '@apollo/client';
import { Modal } from 'antd';
import { BASE_ROUTER } from 'constants/router';
import { useCart } from 'context/cartContext';
import { CartItemType, ItemType } from 'context/cartType';
import { GET_CART_BY_ID } from 'graphql/cart/getCart';
import { PLACE_ORDER, SET_TIPS } from 'graphql/cart/placeOrder';
import { SPLIT_BILL_BY_ITEM, SPLIT_BILL_EVENLY } from 'graphql/cart/splitBill';
import { emitter } from 'graphql/client';
import {
    GET_APPOTA_URL,
    POS_PAYMENT,
    POS_PAYMENT_WITH_DJV,
} from 'graphql/orders/paymentMethod';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useTableBill = (isGoBack = true) => {
    const [searchParams] = useSearchParams();
    const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
    const tableId = parseInt(searchParams.get('tableId') || '0');
    const [modal, contextHolder] = Modal.useModal();
    const { cartItems, indexTable, updateCartIndex } = useCart();
    const [onGetCart, { loading: loadingGetCart }] =
        useLazyQuery(GET_CART_BY_ID);
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

    const [isVisibleModalPos, setVisibleMoalPos] =
        React.useState<boolean>(false);
    const [isVisibleModalPosDJV, setVisibleMoalPosDJV] =
        React.useState<boolean>(false);
    const [orderInfo, setOrderInfo] = React.useState<{
        order_number?: number;
        order_id?: number;
    }>();

    const [onGetAppotaUrl] = useMutation(GET_APPOTA_URL);
    const [placeOrder, { loading }] = useMutation(PLACE_ORDER);
    const [onPosPayment] = useMutation(POS_PAYMENT);
    const [onPosDJV, { loading: djv_Loading }] =
        useMutation(POS_PAYMENT_WITH_DJV);
    const [onSetTips, { loading: tips_Loading }] = useMutation(SET_TIPS);
    const navigation = useNavigate();
    const [pos_Loading, setPos_Loading] = React.useState<boolean>(false);
    useEffect(() => {
        if (pos_Loading) {
            setTimeout(() => {
                onCloseProcessingPayment();
            }, 60000);
        }
    }, [pos_Loading]);
    useEffect(() => {
        emitter.on('arise_result', (msg: any) => {
            if (orderInfo?.order_number === msg?.additional_data.order_number) {
                setPos_Loading(false);
                if (msg?.additional_data?.payment_status === 'success') {
                    showModalSuccess(`${orderInfo?.order_id}`);
                } else {
                    showError(msg?.message, `${orderInfo?.order_id}`);
                }
            }
        });
        return () => {
            emitter.off('arise_result');
        };
    }, [orderInfo]);
    const showConfirm = () => {
        modal.confirm({
            title: 'Do you want to check out?',
            centered: true,
            onOk: () => {
                handleCheckOut();
            },
        });
    };
    const showError = (msg: string, order_id: string) => {
        modal.error({
            title: msg,
            centered: true,
            onOk: () => {
                navigation(`${BASE_ROUTER.BILL_DETAIL}?orderId=${order_id}`);
            },
        });
    };
    const onCloseProcessingPayment = () => {
        setPos_Loading(false);
        navigation(`${BASE_ROUTER.BILL_DETAIL}?orderId=${orderInfo?.order_id}`);
    };
    const showModalSuccess = (order_id: string) => {
        modal.success({
            title: 'Check Out Success',
            centered: true,
            onOk: () => {
                navigation(`${BASE_ROUTER.BILL_DETAIL}?orderId=${order_id}`);
                emitter.emit('REPAYMENT_SUCCESS');
            },
            onCancel: () => {
                goTable();
            },
            okCancel: true,

            cancelText: 'Go back to table',
            okText: 'Go bill',
        });
    };
    const showModalErrorPayment = (order_id?: string) => {
        modal.error({
            title: 'Check Out Failed',
            centered: true,
            onOk: () => {
                navigation(
                    `${BASE_ROUTER.BILL_DETAIL}?orderId=${
                        order_id ? order_id : orderInfo?.order_id
                    }`,
                );
            },
        });
    };
    const goTable = () => {
        navigation(`${BASE_ROUTER.TABLE}?tableId=${tableId}`);
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
                paymentMethod: paymentMethod.includes('pos')
                    ? 'pos'
                    : paymentMethod,
            },
        })
            .then((res) => {
                if (paymentMethod === 'cashondelivery') {
                    showModalSuccess(
                        res.data.createMerchantOrder.order.order_id,
                    );
                } else if (paymentMethod === 'pos') {
                    setVisibleMoalPos(true);
                    setOrderInfo(res.data.createMerchantOrder.order);
                } else if (paymentMethod === 'pos_djv') {
                    setVisibleMoalPosDJV(true);
                    setOrderInfo(res.data.createMerchantOrder.order);
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
    const handlePOSPaymentWithDJV = (
        posId: number,
        orderDetail?: {
            order_number: number;
            order_id: any;
        },
    ) => {
        onPosDJV({
            variables: {
                orderId: orderDetail?.order_number
                    ? orderDetail?.order_number
                    : orderInfo?.order_number,
                posId: posId,
            },
        })
            .then((res) => {
                if (res.data.posSaleForMarchant) {
                    showModalSuccess(
                        `${orderDetail?.order_id ? orderDetail?.order_id : orderInfo?.order_id}`,
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                showModalErrorPayment(
                    `${orderDetail?.order_id ? orderDetail?.order_id : orderInfo?.order_id}`,
                );
            });
    };
    const handlePOSPayment = (
        posId: string,
        orderDetail?: {
            order_number: number;
            order_id: any;
        },
    ) => {
        setPos_Loading(true);
        if (orderDetail) {
            setOrderInfo(orderDetail);
        }
        onPosPayment({
            variables: {
                orderId: orderDetail?.order_number
                    ? orderDetail?.order_number
                    : orderInfo?.order_number,
                posId: posId,
            },
        })
            .then((res) => {
                if (res.data.posSaleForMarchant) {
                    showModalSuccess(
                        `${orderDetail?.order_id ? orderDetail?.order_id : orderInfo?.order_id}`,
                    );
                }
            })
            .catch((err) => {
                console.log(err);
                showModalErrorPayment(
                    `${orderDetail?.order_id ? orderDetail?.order_id : orderInfo?.order_id}`,
                );
            });
    };
    useEffect(() => {
        if (isGoBack) {
            if (
                cartItems[indexTable]?.carts &&
                cartItems[indexTable]?.carts.length > 0
            ) {
                const tmp_cart = cartItems[indexTable].carts[cartIndex];
                setCart(tmp_cart);
                let tmp_total = 0;
                let tmp_count = 0;
                tmp_cart?.items.forEach((item) => {
                    tmp_total =
                        tmp_total + item.prices.price.value * item.quantity;
                    tmp_count = tmp_count + item.quantity;
                });
                setTotal(tmp_total);
                setCount(tmp_count);
            } else {
                navigation(BASE_ROUTER.HOME);
            }
        }
    }, [cartItems, isGoBack]);
    const [onSplitBillEvenly, { loading: split_even_loading }] =
        useMutation(SPLIT_BILL_EVENLY);
    const [onSplitBillByItem, { loading: split_items_loading }] =
        useMutation(SPLIT_BILL_BY_ITEM);
    const navigate = useNavigate();
    const handleSplitEven = (number: number) => {
        onSplitBillEvenly({
            variables: {
                cartId: cartItems[indexTable].carts[cartIndex].id,
                numbersOfCustomer: number,
            },
        })
            .then((res) => {
                localStorage.setItem(
                    'split_bill_data',
                    JSON.stringify(res.data.merchantCreateOrderWithSplitEvenly),
                );
                navigate(BASE_ROUTER.TABLE_BILL_CHECKOUT);
            })
            .catch(() => {
                console.log('eror');
            });
    };
    const handleSplitByItem = (items: any) => {
        onSplitBillByItem({
            variables: {
                cartId: cartItems[indexTable].carts[cartIndex].id,
                SplitItems: items,
            },
        })
            .then((res) => {
                localStorage.setItem(
                    'split_bill_data',
                    JSON.stringify(res.data.merchantCreateOrderWithSplitItems),
                );
                navigate(BASE_ROUTER.TABLE_BILL_CHECKOUT);
            })
            .catch(() => {
                console.log('eror');
            });
    };
    const handleSetTip = (tip: number) => {
        onSetTips({
            variables: {
                cartId: cartItems[indexTable].carts[cartIndex].id,
                tipAmount: tip,
            },
            fetchPolicy: 'no-cache',
        }).then(() => {
            if (cart) {
                onGetCart({
                    variables: {
                        cartId: cartItems[indexTable].carts[cartIndex].id,
                    },
                    fetchPolicy: 'no-cache',
                })
                    .then((res) => {
                        const itemsCanceled =
                            res.data.merchantCart.items.filter((item: any) => {
                                return item.status === 'cancel';
                            });
                        const Tax =
                            (res.data.merchantCart.prices?.applied_taxes?.[0]
                                ?.tax_percent || 10) / 100;
                        const newCart = {
                            ...res.data.merchantCart,
                            prices: {
                                ...res.data.merchantCart.prices,
                                total_canceled: {
                                    value:
                                        itemsCanceled.reduce(
                                            (total: any, item: any) => {
                                                return (
                                                    total +
                                                    (item.prices.price.value *
                                                        item.quantity -
                                                        (item.prices
                                                            ?.total_item_discount
                                                            ?.value || 0) *
                                                            item.quantity)
                                                );
                                            },
                                            0,
                                        ) *
                                        (Tax + 1),
                                },
                            },
                        };
                        updateCartIndex(newCart);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    };
    return {
        handleSplitEven,
        handleSplitByItem,
        cart,
        total,
        count,
        handleCheckOut: showConfirm,
        loading:
            loading ||
            split_even_loading ||
            split_items_loading ||
            tips_Loading ||
            loadingGetCart ||
            djv_Loading,
        pos_Loading,
        contextHolder,
        paymentMethod,
        setPaymentMethod,
        setListItems,
        listItems,
        numbersSplit,
        setNumbersSplit,
        setVisibleMoalPos,
        isVisibleModalPos,
        onPosPayment,
        handlePOSPayment,
        handleSetTip,
        setCart,
        handlePOSPaymentWithDJV,
        setVisibleMoalPosDJV,
        isVisibleModalPosDJV,
        onCloseProcessingPayment,
        setPos_Loading,
        showModalSuccess,
        showError,
        showModalErrorPayment,
    };
};
