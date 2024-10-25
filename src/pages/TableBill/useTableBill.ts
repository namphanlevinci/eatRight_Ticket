import { useLazyQuery, useMutation } from '@apollo/client';
import { Modal, notification } from 'antd';
import { BASE_ROUTER } from 'constants/router';
import { useCart } from 'context/cartContext';
import { CartItemType, ItemType } from 'context/cartType';
import { GET_CART_BY_ID } from 'graphql/cart/getCart';
import { PLACE_ORDER, SET_TIPS } from 'graphql/cart/placeOrder';
import {
    GET_INVOICES,
    SPLIT_BILL_BY_ITEM,
    SPLIT_BILL_EVENLY,
} from 'graphql/cart/splitBill';
import { emitter } from 'graphql/client';
import { CANCEL_CHECKOUT } from 'graphql/orders/cancelCheckout';
import {
    GET_APPOTA_URL,
    POS_PAYMENT,
    POS_PAYMENT_WITH_DJV,
} from 'graphql/orders/paymentMethod';
import {
    GET_MERCHANT_RESTAURANT_CONFIG,
    GET_PRIMARY_TERMINAL_WAITER,
} from 'graphql/setups';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from 'store';

export const useTableBill = (isGoBack = true) => {
    const [searchParams] = useSearchParams();
    const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
    const tableId = parseInt(searchParams.get('tableId') || '0');
    const [modal, contextHolder] = Modal.useModal();
    const { cartItems, indexTable, updateCartIndex } = useCart();
    const [onGetCart, { loading: loadingGetCart }] =
        useLazyQuery(GET_CART_BY_ID);
    const { isMerchant } = useSelector((state: RootState) => state.auth);
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
    const [isModalPaySuccess, setModalPaySuccess] =
        React.useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] =
        React.useState<string>('cashondelivery');

    const [isVisibleModalPos, setVisibleMoalPos] =
        React.useState<boolean>(false);
    const [isVisibleModalPosDJV, setVisibleMoalPosDJV] =
        React.useState<boolean>(false);
    const [isVisibleModalOtherMethod, setVisibleModalOtherMethod] =
        React.useState<boolean>(false);
    const [modalChange, setModalChange] = React.useState(false);

    const [orderInfo, setOrderInfo] = React.useState<{
        order_number?: number;
        order_id?: number;
    }>();

    const [onGetAppotaUrl] = useMutation(GET_APPOTA_URL);
    const [placeOrder, { loading }] = useMutation(PLACE_ORDER);
    const [onPosPayment] = useMutation(POS_PAYMENT);
    const [onPosDJV, { loading: djv_Loading }] =
        useMutation(POS_PAYMENT_WITH_DJV);
    const [onSetTips, { data, loading: tips_Loading }] = useMutation(SET_TIPS);
    const navigation = useNavigate();
    const [pos_Loading, setPos_Loading] = React.useState<boolean>(false);
    const [onGetTerminalMerchant, { loading: merchant_Loading }] = useLazyQuery(
        GET_MERCHANT_RESTAURANT_CONFIG,
    );

    const [onGetTerminalWaiter, { loading: waiter_Loading }] = useLazyQuery(
        GET_PRIMARY_TERMINAL_WAITER,
    );
    // useEffect(() => {
    //     if (pos_Loading) {
    //         setTimeout(() => {
    //             onCloseProcessingPayment();
    //         }, 60000);
    //     }
    // }, [pos_Loading]);
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
    // const showConfirm = () => {
    //     modal.confirm({
    //         title: 'Do you want to check out?',
    //         centered: true,
    //         onOk: () => {
    //             handleCheckOut();
    //         },
    //     });
    // };
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
        goTable();
    };

    const showModalSuccess = (order_id: string, isGoToTable = true) => {
        modal.success({
            title: !isGoToTable ? 'Payment Success' : 'Check Out Success',
            centered: true,
            onOk: () => {
                navigation(`${BASE_ROUTER.BILL_DETAIL}?orderId=${order_id}`);
                emitter.emit('REPAYMENT_SUCCESS');
            },
            onCancel: () => {
                goTable();
            },
            okCancel: isGoToTable,

            cancelText: 'Go back to table',
            okText: isGoToTable ? 'Go bill' : 'Ok',
        });
    };
    const showModalErrorPayment = (order_id?: string) => {
        modal.error({
            title: 'Payment Failed',
            content: 'Please try again',
            centered: true,
            onOk: () => {
                // navigation(
                //     `${BASE_ROUTER.BILL_DETAIL}?orderId=${
                //         order_id ? order_id : orderInfo?.order_id
                //     }`,
                // );
                console.log('error payment', order_id);
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
            .catch(() => {
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
    const { isTerminalPrinter } = useSelector((state: RootState) => state.auth);
    const PrintMerchantCopy = (url: string, isOpenCashier = false) => {
        if (!isTerminalPrinter) {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'merchant',
                        imageUrl: url,
                        isOpenCashier: isOpenCashier,
                    }),
                );
            }
        }
    };

    const [onGetInvoices, { data: dataInvoices }] = useLazyQuery(GET_INVOICES);
    const onSelectTerminalPrimary = (terminalId: number, order: any) => {
        handlePOSPaymentWithDJV(
            terminalId,
            {
                cart_id: cart?.id,
                order_id: order?.order_id,
                order_number: order?.order_number,
            },
            true,
            true,
        );
    };
    const notiPleaseSelectAnotherTerminal = () => {
        notification.info({
            message: 'Please select terminal',
            placement: 'topRight',
            duration: 10,
        });
        setVisibleMoalPosDJV(true);
    };
    const [checkOutLoading, setCheckOutLoading] =
        React.useState<boolean>(false);
    const handleCheckOut = async (received_amount?: number) => {
        const variables = {
            cartId: cartItems[indexTable].carts[cartIndex].id,
            paymentMethod: paymentMethod.includes('pos')
                ? 'pos'
                : paymentMethod,
            ...(received_amount &&
                paymentMethod === 'cashondelivery' && {
                    received_amount: parseFloat(
                        received_amount?.toString?.(),
                    ).toFixed(2),
                }),
        };

        setCheckOutLoading(true);
        placeOrder({
            variables,
        })
            .then((res) => {
                setOrderInfo(res.data.createMerchantOrder.order);
                onGetInvoices({
                    variables: {
                        OrderNumber:
                            res.data.createMerchantOrder.order.order_number,
                    },
                })
                    .then((invoices) => {
                        if (paymentMethod === 'cashondelivery') {
                            setModalPaySuccess(true);

                            setModalChange(false);
                            PrintMerchantCopy(
                                invoices.data?.merchantGetOrderInvoices
                                    ?.invoice[0]?.invoice_image,
                                true,
                            );
                            emitter.emit('REPAYMENT_SUCCESS');
                        } else if (paymentMethod === 'pos') {
                            setVisibleMoalPos(true);
                        } else if (paymentMethod === 'pos_djv') {
                            const order = res.data.createMerchantOrder.order;

                            setCheckOutLoading(false);

                            if (!isTerminalPrinter) {
                                setVisibleMoalPosDJV(true);
                                return;
                            }
                            if (isMerchant) {
                                onGetTerminalMerchant({
                                    fetchPolicy: 'no-cache',
                                })
                                    .then((res) => {
                                        if (
                                            res?.data
                                                ?.merchantGetRestaurantConfig
                                                ?.primary_terminal_setting
                                        ) {
                                            onSelectTerminalPrimary(
                                                res?.data
                                                    ?.merchantGetRestaurantConfig
                                                    ?.primary_terminal_setting,
                                                order,
                                            );
                                        } else {
                                            notiPleaseSelectAnotherTerminal();
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        notiPleaseSelectAnotherTerminal();
                                    })
                                    .finally(() => {
                                        setCheckOutLoading(false);
                                    });
                            } else {
                                onGetTerminalWaiter({ fetchPolicy: 'no-cache' })
                                    .then((res) => {
                                        if (
                                            res?.data?.waiterPrimaryPosDevice
                                                ?.entity_id
                                        ) {
                                            onSelectTerminalPrimary(
                                                res?.data
                                                    ?.waiterPrimaryPosDevice
                                                    ?.entity_id,
                                                order,
                                            );
                                        } else {
                                            notiPleaseSelectAnotherTerminal();
                                        }
                                    })
                                    .catch(() => {
                                        notiPleaseSelectAnotherTerminal();
                                    })
                                    .finally(() => {
                                        setCheckOutLoading(false);
                                    });
                            }
                        } else {
                            showModalAlertPayment(
                                res.data.createMerchantOrder.order.order_id,
                            );
                        }
                    })
                    .catch(() => {
                        showModalErrorPayment(
                            res.data.createMerchantOrder.order.order_id,
                        );
                    });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setCheckOutLoading(false);
            });
    };
    const [onCancelCheckout] = useMutation(CANCEL_CHECKOUT);
    const [PosIdTmp, setPosIdTmp] = useState<any>('');

    const handlePOSPaymentWithDJV = (
        posId: number,
        orderDetail?: {
            order_number?: number;
            order_id?: any;
            cart_id?: any;
        },
        isGoToTable = true,
        isSelectAnotherPos = false,
    ) => {
        if (orderDetail) {
            setOrderInfo(orderDetail);
        }
        if (PosIdTmp === posId) {
            return;
        }
        setPos_Loading(true);
        setPosIdTmp(posId);
        onPosDJV({
            variables: {
                orderId: orderDetail?.order_number
                    ? orderDetail?.order_number
                    : orderInfo?.order_number,
                posId: posId,
            },
        })
            .then((res) => {
                console.log('res', res);
                if (res.data.posSaleForMarchant) {
                    setModalPaySuccess(true);
                    setModalChange(false);
                    emitter.emit('REPAYMENT_SUCCESS');

                    // showModalSuccess(
                    //     `${
                    //         orderDetail?.order_id
                    //             ? orderDetail?.order_id
                    //             : orderInfo?.order_id
                    //     }`,
                    //     isGoToTable,
                    // );
                }
            })
            .catch(() => {
                console.log('Erorr over thể modal');
                showModalErrorPayment(
                    `${
                        orderDetail?.order_id
                            ? orderDetail?.order_id
                            : orderInfo?.order_id
                    }`,
                );
                // if (isSelectAnotherPos) {
                setVisibleMoalPosDJV(true);
                // return;
                // }
            })
            .finally(() => {
                setPos_Loading(false);
            });
    };
    const ReGetInvoices = ({ orderNumber }: { orderNumber: string }) => {
        onGetInvoices({
            variables: {
                OrderNumber: orderNumber,
            },
            fetchPolicy: 'no-cache',
        })
            .then((invoices) => {
                if (
                    invoices.data?.merchantGetOrderInvoices?.invoice[0]
                        ?.invoice_image
                ) {
                    PrintMerchantCopy(
                        invoices.data?.merchantGetOrderInvoices?.invoice[0]
                            ?.invoice_image,
                    );
                }
            })
            .catch(() => {
                console.log('Erorr over thể modal');
                // ReGetInvoices({ orderNumber: orderNumber });
            });
    };
    const handlePOSPayment = (
        posId: string,
        orderDetail?: {
            order_number: number;
            order_id: any;
            cart_id: any;
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
                    setModalPaySuccess(true);
                    setModalChange(false);
                    emitter.emit('REPAYMENT_SUCCESS');
                }
            })
            .catch(() => {
                onCancelCheckout({
                    variables: {
                        cart_id: orderDetail?.cart_id,
                    },
                });
                showModalErrorPayment(
                    `${
                        orderDetail?.order_id
                            ? orderDetail?.order_id
                            : orderInfo?.order_id
                    }`,
                );
            })
            .finally(() => {
                setPos_Loading(false);
            });
    };

    const handleOtherPayment = (note: string) => {
        placeOrder({
            variables: {
                cartId: cartItems[indexTable].carts[cartIndex].id,
                paymentMethod: 'purchaseorder',
                po_number: note,
            },
        })
            .then((res) => {
                if (paymentMethod === 'other') {
                    setModalPaySuccess(true);
                    setOrderInfo(res?.data?.createMerchantOrder?.order);
                    ReGetInvoices({
                        orderNumber:
                            res?.data?.createMerchantOrder?.order?.order_number,
                    });
                    setModalChange(false);
                    emitter.emit('REPAYMENT_SUCCESS');
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
                navigation(
                    `${BASE_ROUTER.TABLE}?tableId=${tableId}&cartIndex=${cartIndex}`,
                );
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
                localStorage.setItem(
                    'split_bill_can_go_back',
                    `${cartItems[indexTable].carts[cartIndex].id}`,
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
                localStorage.setItem(
                    'split_bill_can_go_back',
                    `${cartItems[indexTable].carts[cartIndex].id}`,
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
                getCart(cartItems[indexTable].carts[cartIndex].id);
            }
        });
    };
    const getCart = (cartId: string) => {
        onGetCart({
            variables: {
                cartId: cartId,
            },
            fetchPolicy: 'no-cache',
        })
            .then((res) => {
                const itemsCanceled = res.data.merchantCart.items.filter(
                    (item: any) => {
                        return item.status === 'cancel';
                    },
                );
                const Tax =
                    (res.data.merchantCart.prices?.applied_taxes?.[0]
                        ?.tax_percent || 0) / 100;
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
    };
    return {
        handleSplitEven,
        handleSplitByItem,
        cart,
        total,
        count,
        handleCheckOut,
        loading:
            loading ||
            split_even_loading ||
            split_items_loading ||
            tips_Loading ||
            loadingGetCart ||
            djv_Loading ||
            merchant_Loading ||
            waiter_Loading ||
            checkOutLoading,
        pos_Loading,
        contextHolder,
        paymentMethod,
        cartItems,
        hasGivenTip: data?.setTipToCart?.success,
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
        isVisibleModalOtherMethod,
        setVisibleModalOtherMethod,
        handleOtherPayment,
        setOrderInfo,
        isModalPaySuccess,
        setModalPaySuccess,
        modalChange,
        setModalChange,
        orderInfo,
        onCancelCheckout,
        dataInvoices,
    };
};
