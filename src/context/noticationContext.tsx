import { useMutation } from '@apollo/client';
import { App } from 'antd';
import { BASE_ROUTER } from 'constants/router';
import { emitter } from 'graphql/client';
import { SOCKET } from 'graphql/socket/connect';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { RootState } from 'store';
import { playNotiSound } from 'utils';
// Khởi tạo một context mới
const SocketContext = createContext<Socket | null>(null);
const SocketURL =
    process.env.REACT_APP_SOCKETURL || 'https://fnb-socket.test88.info';
// Tạo một custom hook để sử dụng context này
export const useSocket = () => useContext(SocketContext);

// Component provider cho context, trong đó bạn sẽ tạo và quản lý kết nối socket
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onSocket] = useMutation(SOCKET);
    const { isLogged, restaurant_id, isTableView } = useSelector(
        (state: RootState) => state.auth,
    );
    const [socketInitialized, setSocketInitialized] = useState(false);
    const navigation = useNavigate();
    const { notification } = App.useApp();
    const tableDataString = localStorage.getItem('tableData');
    const sendImageReactNative = ({
        url,
        printer,
    }: {
        url: string;
        printer: string;
    }) => {
        if (window.ReactNativeWebView) {
            let value: any = { type: 'kitchen', imageUrl: url };
            if (printer) {
                value = {
                    type: 'kitchen',
                    imageUrl: url,
                    printer: printer,
                };
            }
            window.ReactNativeWebView.postMessage(JSON.stringify(value));
        }
    };
    useEffect(() => {
        if (isLogged && !socketInitialized && restaurant_id && isTableView) {
            let tableData = JSON.parse(tableDataString || '{}');
            const socketInstance = io(SocketURL);

            setSocket(socketInstance);

            socketInstance.on('connect', () => {
                const socketId = socketInstance.id;
                onSocket({
                    variables: {
                        socketId,
                        type: 'waiter',
                    },
                })
                    .then((res) => {
                        if (res?.data?.receiveSocketId?.result) {
                            console.log(
                                'Kết nối thành công đến máy chủ socket.',
                                socketId,
                            );
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
            socketInstance.on('chat message', (msg) => {
                console.log('msg socket', msg);
                try {
                    if (msg['kitchen-receipt-image']) {
                        sendImageReactNative({
                            url: msg['kitchen-receipt-image'],
                            printer: msg?.printer,
                        });
                        return;
                    }
                } catch (error) {
                    console.log(error);
                }
                // Xử lý tin nhắn từ socket
                if (msg?.additional_data?.payment_method === 'arise_pos') {
                    emitter.emit('arise_result', msg);
                }
                if (
                    msg?.message
                        ?.toString?.()
                        ?.toLowerCase?.()
                        .includes?.('dish ready')
                ) {
                    playNotiSound();
                }
                if (msg?.item_type === 'QUOTE') {
                    notification.success({
                        message: `Table ${
                            tableData?.find(
                                (item: any) => item?.id == msg?.quote?.table_id,
                            )?.name
                        }`,
                        description: msg?.message,
                        onClick: () => {
                            if (msg?.quote?.table_id) {
                                navigation(
                                    `${BASE_ROUTER.TABLE}?tableId=${msg?.quote?.table_id}`,
                                );
                            }
                        },
                        duration: 2,
                    });
                    if (location.pathname.includes('table')) {
                        emitter.emit('updateStatusCart', msg?.quote?.table_id);
                    }
                }
                if (msg?.item_type === 'ORDER') {
                    notification.success({
                        message: `Table ${
                            tableData?.find(
                                (item: any) => item?.id == msg?.table_id,
                            )?.name
                        }`,
                        description: msg?.message,
                        onClick: () => {
                            if (msg?.quote?.table_id) {
                                navigation(
                                    `${BASE_ROUTER.TABLE}?tableId=${msg?.table_id}`,
                                );
                            }
                        },
                        duration: 2,
                    });
                    if (location.pathname.includes('table')) {
                        emitter.emit('updateStatusCart', msg?.table_id);
                    }
                }
                if (msg?.message?.includes('Table')) {
                    emitter.emit('updateTable');
                }
            });
            socketInstance.on('reconnect', (messages) => {
                console.log(messages);
            });
            socketInstance.on('client list', (data: any) => {
                console.log('client list', data);
            });
            setSocketInitialized(true);
            return () => {
                if (socketInstance) {
                    socketInstance.disconnect();
                    socketInstance.off('client list');
                }
            };
        }
        if (!isLogged) {
            // Đảm bảo ngắt kết nối khi người dùng đăng xuất
            if (socket) {
                socket.disconnect();
                setSocket(null);
                setSocketInitialized(false);
                console.log('Socket Disconnect to waiter');
            }
        }
    }, [isLogged, restaurant_id, isTableView]);

    // Truyền socket vào provider
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
