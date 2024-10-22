/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef, useState, useEffect } from 'react';
import ButtonTime from '../components/Button/ButtonTime';
import './index.scss';
import moment from 'moment';
import { Draggable } from '@hello-pangea/dnd';
const statusConvertData = {
    pending: '1',
    received: '2',
    cooking: '3',
    ready_to_ship: '4',
    shipping: '5',
    arrived: '5',
    bom: '5',
};
function getLastFourChars(str) {
    if (str?.length <= 4) {
        return str; // Trả về chuỗi gốc nếu chuỗi có độ dài nhỏ hơn hoặc bằng 4
    }
    return str?.slice(-4);
}
function Order(props) {
    const [countdownDate, setCountdownDate] = useState(new Date());
    const [isNotResponse, setNotResponse] = useState(false);

    const {
        order,
        openModal,
        id,
        playSound = () => {},
        saveOrderListNotResponse = () => {},
        orderListNotResponse = [],
        playOrderNOtResponseAgain = () => {},
        turnOffAppSound,
        isCompletedOrder = false,
    } = props;

    const findOrderOffSound = orderListNotResponse.find(
        (obj) => obj?.id == order?.id,
    );
    const isOffSound =
        findOrderOffSound && findOrderOffSound?.isOffSound ? true : false;
    const timePause =
        findOrderOffSound && findOrderOffSound?.timePause
            ? findOrderOffSound?.timePause
            : null;

    const { status, notification_status } = order;

    const showDetail = useRef(true);

    const handleClickOrder = () => {
        // callApiGetTurnOffAppSound();
        if (showDetail.current) {
            openModal(order?.status, order);
        } else {
            showDetail.current = true;
        }
    };

    useEffect(() => {
        let countDownInterVal = setInterval(
            () => setCountdownDate(new Date()),
            1000,
        );
        return () => clearInterval(countDownInterVal);
    }, []);

    const timeOver = moment
        .utc(order?.created_at, 'MM-DD-YYYY hh:mm:ss')
        .local()
        .add(order?.notification_time, 'minutes')
        .format('YYYY-MM-DD  hh:mm:ss A');

    const timePauseOrder = timePause
        ? timePause + parseInt(turnOffAppSound) * 60000
        : 0;

    let distanceToTimePause =
        timePauseOrder - Date.parse(new Date(countdownDate));

    const checkNotResponseVolume = () => {
        const tmpOrder = orderListNotResponse.find(
            (obj) => obj?.id == order?.id,
        );
        if (!tmpOrder) {
            playSound();
        } else if (!tmpOrder?.isOffSound) {
            playSound();
        }
        saveOrderListNotResponse({ type: 'add', order });
        setNotResponse(true);
    };

    useEffect(() => {
        if (distanceToTimePause < 0 && isOffSound) {
            playOrderNOtResponseAgain({ order });
        }
    }, [distanceToTimePause]);

    useEffect(() => {
        if (
            status == 'received' ||
            status == 'cooking' ||
            status == 'ready_to_ship'
        ) {
            if (
                moment(timeOver).isBefore(moment(countdownDate)) &&
                parseInt(statusConvertData[status]) <=
                    parseInt(notification_status)
            ) {
                if (status !== 'pending') {
                    checkNotResponseVolume();
                }
            } else {
                saveOrderListNotResponse({ type: 'remove', order });
            }
        }
    }, [countdownDate]);
    const Text = ({ children }) => {
        return (
            <span
                style={{
                    fontFamily: 'Montserrat',
                    fontWeight: '400',
                    fontSize: 16,
                }}
            >
                {children}
            </span>
        );
    };

    function generateRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const randomInteger = generateRandomInteger(100, 1000);

    if (order) {
        return (
            <Draggable
                draggableId={order?.id}
                key={id}
                index={order?.sortId ?? randomInteger}
            >
                {(provided, snapshot) => (
                    <div
                        // draggableId={order?.order_number?.toString()}
                        key={id}
                        // index={order?.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <span key={id} onClick={handleClickOrder}>
                            <div
                                className={`order-item ${
                                    isNotResponse && !isOffSound
                                        ? 'notResponse'
                                        : ''
                                }`}
                            >
                                <div
                                    className="row"
                                    style={{ justifyContent: 'flex-end' }}
                                >
                                    <div
                                        style={{
                                            height: 36,
                                            width: 90,
                                            borderRadius: 99,
                                            border: '1.2px solid var(--text-primary)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {order?.order_source === 'DELIVERY' ? (
                                            <Text> Delivery </Text>
                                        ) : order?.order_source === 'DINING' ? (
                                            <Text> Dine in </Text>
                                        ) : order?.order_source === 'PICKUP' ? (
                                            <Text> Pick up </Text>
                                        ) : (
                                            <Text> Dine in </Text>
                                        )}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        background: 'var(--neutral-sec-bg)',
                                        height: 1,
                                        width: '100%',
                                    }}
                                />
                                <div className="row">
                                    <span
                                        className="text-16"
                                        style={{ fontWeight: '600' }}
                                    >
                                        {order?.total_quantity} items
                                    </span>
                                    {order?.order_source &&
                                        order?.order_source !== 'DINING' && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    gap: 4,
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <ButtonTime dataOrder={order} />
                                            </div>
                                        )}
                                </div>
                                <div className="row">
                                    <span className="text-primary">
                                        $
                                        {order?.type === 'dining-orders' ||
                                        isCompletedOrder === true
                                            ? (
                                                  order?.total?.grand_total
                                                      ?.value -
                                                  (order?.total
                                                      ?.cancel_item_total
                                                      ?.value || 0)
                                              )?.toFixed(2)
                                            : (
                                                  order?.prices?.grand_total
                                                      ?.value -
                                                  (order?.total
                                                      ?.cancel_item_total
                                                      ?.value || 0)
                                              )?.toFixed(2)}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        background: 'var(--neutral-sec-bg)',
                                        height: 1,
                                        width: '100%',
                                    }}
                                />
                                <div className="row">
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: 4,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span className="text-bold-16">
                                            {order?.table
                                                ? order.table
                                                      .toLowerCase()
                                                      .includes('counter')
                                                    ? `QO - `
                                                    : `${order.table} - `
                                                : `${getLastFourChars(order?.order_number?.toString())} - `}
                                            {order?.first_name}
                                        </span>
                                    </div>
                                    <span className="text-light-14">
                                        {moment(
                                            order?.created_at,
                                            'MM-DD-YYYY hh:mm:ss',
                                        ).format('hh:mm A')}
                                    </span>
                                </div>
                            </div>
                        </span>
                    </div>
                )}
            </Draggable>
        );
    }
    return <div />;
}

export default Order;
