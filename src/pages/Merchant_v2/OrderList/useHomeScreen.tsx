import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_LIST_ORDER_DINING } from 'graphql/merchant/orderList';
import { getRandomInt, statusConvert } from './constant';
import { QuoteType, OrderType, RenderListType } from './IType';
import { message, Modal, notification } from 'antd';
import {
    MERCHANT_COMPLETE_ORDER,
    MERCHANT_RECEIVE_ORDER,
    SET_ALL_ITEM_COOKING,
} from 'graphql/merchant/status';
import io from 'socket.io-client';
import { SOCKET } from 'graphql/socket/connect';
import Notification from './components/Notification';
import { playNotiSound } from 'utils';
const SocketURL =
    process.env.REACT_APP_SOCKETURL || 'https://fnb-socket.test88.info';

function generateUniqueInteger() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

export const useHomeScreen = () => {
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [refundOrderList, setRefundOrderList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [apiGetListDining] = useLazyQuery(GET_LIST_ORDER_DINING);
    const [diningQuoteList, setDiningQuoteList] = useState<QuoteType[]>([]);
    const [diningOrderList, setDiningOrderList] = useState<OrderType[]>([]);
    const [renderList, setRenderList] = useState<RenderListType[]>([]);
    const [isShowModalPending, setShowModalPending] = useState(false);
    const [isShowModalCancel, setShowModalCancel] = useState(false);
    const [apiSetAllItemCooking] = useMutation(SET_ALL_ITEM_COOKING);
    const getOrderList = async () => {
        setIsLoadingApp(true);
        apiGetListDining({
            fetchPolicy: 'no-cache',
        }).then((res) => {
            if (res.data) {
                setDiningQuoteList(res?.data?.merchantOrderDashboard?.quotes);
                setDiningOrderList(res?.data?.merchantOrderDashboard?.orders);
            }
        });
        setIsLoadingApp(false);
    };
    const setReload = () => {
        getOrderList();
    };
    useEffect(() => {
        getOrderList();
    }, []);
    useEffect(() => {
        if (diningQuoteList || diningOrderList) {
            const listQuote = diningQuoteList.map(
                (obj) =>
                    obj && {
                        ...obj,
                        type: 'dining-quotes',
                        uniqueId: getRandomInt(1, 100000) + obj?.cart_id,
                        status: statusConvert[
                            obj?.serving_status as keyof typeof statusConvert
                        ],
                        id: obj?.cart_id,
                    },
            );
            try {
                const tableGroups: any = {};

                listQuote.forEach((order) => {
                    const tableName = order?.table || '1';
                    if (!tableGroups[tableName]) {
                        tableGroups[tableName] = [];
                    }
                    tableGroups[tableName].push(order);
                });

                Object.keys(tableGroups).length > 0 &&
                    Object.keys(tableGroups)?.forEach((tableName) => {
                        const orders = tableGroups[tableName];
                        if (orders.length > 1) {
                            orders.forEach((order: any, index: any) => {
                                if (order) {
                                    order.table = `${tableName}-${index + 1}`;
                                }
                            });
                        }
                    });
            } catch (error) {
                console.log(error);
            }

            const listOrders = diningOrderList.map((obj) => ({
                ...obj,
                type: 'dining-orders',
                uniqueId: getRandomInt(1, 100000) + parseInt(obj?.order_number),
                status:
                    obj?.order_source === 'DINING'
                        ? statusConvert[
                              obj?.serving_status as keyof typeof statusConvert
                          ]
                        : statusConvert[
                              obj?.status as keyof typeof statusConvert
                          ],
            }));

            const newList = [...listQuote, ...listOrders]
                .map((obj) => ({
                    ...obj,
                    sortId: generateUniqueInteger(),
                }))
                .sort(
                    (a, b) =>
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime(),
                );
            setRenderList(newList as never[]);
        }
    }, [diningQuoteList, diningOrderList]);
    const { info } = Modal;
    const [apiReciveOrder] = useMutation(MERCHANT_RECEIVE_ORDER);

    const handleSubmitRecievedOrder = async (id: string) => {
        const res = await apiReciveOrder({ variables: { id: id } });
        if (!res.errors && res.data) {
            setShowModalPending(false);
            setReload();
            return true;
        }
        info({
            icon: <></>,
            title: <span style={{ fontWeight: 'bold' }}>Thất bại</span>,
            content: res?.errors && res?.errors[0]?.message,
        });
        return false;
    };

    const handleSetAllItemCooking = async (item: any) => {
        // ($entity_id: Int!, $items_id: Int!, $entity_type: String!
        const res = await apiSetAllItemCooking({
            variables: {
                entity_id: item?.entity_id,
                items_id: item?.items_id,
                entity_type: item?.entity_type,
            },
        });
        if (!res.errors && res.data) {
            setShowModalPending(false);
            setReload();
            return true;
        }
        info({
            icon: <></>,
            title: <span style={{ fontWeight: 'bold' }}>Thất bại</span>,
            content: res?.errors && res?.errors[0]?.message,
        });
        return false;
    };

    const [apiCompleteOrder] = useMutation(MERCHANT_COMPLETE_ORDER);
    const handleSubmitCompletePickUp = (data: any) => {
        apiCompleteOrder({
            variables: {
                id: data?.id,
            },
        })
            .then((res) => {
                if (!res.errors && res.data) {
                    setReload();
                    notification.success({
                        message: 'success',
                        description: `Your order ${data?.order_number} have been successful`,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [dataOrderModal, setDataOrderModal] = useState();
    const [onSocket] = useMutation(SOCKET);
    const reloadOrderRef = React.useRef<any>();
    useEffect(() => {
        reloadOrderRef.current = setInterval(() => {
            setReload();
        }, 30000);

        return () => {
            clearInterval(reloadOrderRef.current);
        };
    }, []);
    useEffect(() => {
        // Kết nối tới máy chủ
        const socketInstance = io(SocketURL);

        // Thực hiện các xử lý khác khi kết nối thành công
        socketInstance.on('connect', () => {
            const socketId = socketInstance.id; //
            onSocket({
                variables: {
                    socketId,
                    type: 'merchant',
                },
            })
                .then((res) => {
                    if (res?.data?.receiveSocketId?.result) {
                        console.log(
                            'Kết nối thành công đến máy chủ socket với merchant role ',
                            socketId,
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        socketInstance.on('chat message', (msg) => {
            try {
                console.log(msg);
                setReload();
                if (msg?.message) {
                    pushNotificationLocal(null, msg?.message);
                } else {
                    if (
                        msg?.order?.status === 'received' ||
                        msg?.order?.status === 'complete'
                    ) {
                        console.log(
                            'Dont Show Notification',
                            msg?.order?.status,
                        );
                    } else {
                        pushNotificationLocal(msg?.order);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });

        return () => {
            // Ngắt kết nối khi component unmount
            if (socketInstance) {
                socketInstance.disconnect();
                socketInstance.off('client list');
            }
        };
    }, []);
    const pushNotificationLocal = (order: any, msg?: any) => {
        const content =
            order?.status == 'processing'
                ? `You have received a new order ${order?.order_number}`
                : `The order has just been updated to ${order?.status}`;
        message.success({
            className: 'notification-custom',
            content: (
                <Notification
                    title={'Notification'}
                    content={msg ? msg : content}
                />
            ),
            icon: <></>,
        });
        playNotiSound();
    };
    return {
        isLoadingApp,
        refundOrderList,
        searchValue,
        setSearchValue,
        setReload,
        setRefundOrderList,
        diningQuoteList,
        diningOrderList,
        renderList,
        isShowModalPending,
        handleSubmitRecievedOrder,
        setIsLoadingApp,
        setShowModalCancel,
        isShowModalCancel,
        setDataOrderModal,
        dataOrderModal,
        handleSubmitCompletePickUp,
        pushNotificationLocal,
        handleSetAllItemCooking,
    };
};
