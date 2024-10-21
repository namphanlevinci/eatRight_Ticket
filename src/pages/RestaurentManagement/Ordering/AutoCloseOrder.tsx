import React, { useEffect, useState } from 'react';
import { Button, notification, Row, Switch, Tooltip } from 'antd';
import { Text } from 'components/atom/Text';
import { InfoIcon } from '../TerminalSetting/icons/infoIcon';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_MERCHANT_RESTAURANT_CONFIG,
    SET_MERCHANT_RESTAURANT_CONFIG_AUTO_CLOSE_ORDER,
} from 'graphql/setups';
import LoadingModal from 'components/modal/loadingModal';
import { useDispatch } from 'react-redux';
import { updateAutoCloseOrder } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
export default function AutoCloseOrder() {
    const { isAutoConfirmItem } = useSelector((state: RootState) => state.auth);
    const [onGetRestaurantConfig, { loading }] = useLazyQuery(
        GET_MERCHANT_RESTAURANT_CONFIG,
    );
    const [onSetRestaurantConfig, { loading: setRestaurantConfigLoading }] =
        useMutation(SET_MERCHANT_RESTAURANT_CONFIG_AUTO_CLOSE_ORDER);
    const dispatch = useDispatch();
    useEffect(() => {
        onGetRestaurantConfig({ fetchPolicy: 'network-only' }).then((res) => {
            dispatch(updateAutoCloseOrder(true));
            if (
                res?.data?.merchantGetRestaurantConfig?.close_order === 'PAID'
            ) {
                setIsPaid(true);
            } else {
                setIsPaid(false);
            }
        });
    }, []);
    const [isPaid, setIsPaid] = useState(false);
    const handleChangeSelect = (value: boolean) => {
        onSetRestaurantConfig({
            variables: {
                close_order: value ? 'PAID' : 'ALL_SERVED_PAID',
            },
        })
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Your changes have been saved',
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
            <Row justify={'space-between'} align={'middle'}>
                <LoadingModal
                    showLoading={loading || setRestaurantConfigLoading}
                />
                <Row>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>
                        Auto Close Orders
                    </Text>
                    <Tooltip
                        placement="bottomLeft"
                        title={`Define when we should automatically close the table's current order.`}
                        arrow={true}
                        color="#fff"
                        style={{
                            color: '#000',
                        }}
                        overlayInnerStyle={{ color: '#000' }}
                    >
                        <Button
                            ghost
                            style={{
                                height: 24,
                                width: 24,
                                borderRadius: 100,
                                padding: 0,
                                marginLeft: 20,
                            }}
                        >
                            <InfoIcon />
                        </Button>
                    </Tooltip>
                </Row>

                <Switch
                    value={isAutoConfirmItem}
                    onChange={(value) => {
                        // handleChangeSelect(value);
                        console.log(value);
                    }}
                    loading={setRestaurantConfigLoading}
                />
            </Row>

            {isAutoConfirmItem ? (
                <>
                    <Row style={{ marginTop: 16 }} align={'middle'}>
                        <IconContainer
                            onClick={() => {
                                handleChangeSelect(false);
                                setIsPaid(false);
                            }}
                        >
                            {!isPaid ? <IconRadioSelect /> : <IconRadio />}
                        </IconContainer>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>
                            After all items are served and bill is paid.
                        </Text>
                    </Row>
                    <Row style={{ marginTop: 16 }} align={'middle'}>
                        <IconContainer
                            onClick={() => {
                                handleChangeSelect(true);
                                setIsPaid(true);
                            }}
                        >
                            {isPaid ? <IconRadioSelect /> : <IconRadio />}
                        </IconContainer>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>
                            Only after bill is paid.
                        </Text>
                    </Row>
                </>
            ) : null}
        </div>
    );
}

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-right: 8px;
    cursor: pointer;
`;
const IconRadioSelect = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
        >
            <circle
                cx="11"
                cy="11"
                r="10.25"
                stroke="#389E0D"
                strokeWidth="1.5"
            />
            <circle
                cx="11"
                cy="11"
                r="5"
                fill="#389E0D"
                stroke="#389E0D"
                strokeWidth="2"
            />
        </svg>
    );
};

const IconRadio = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
        >
            <circle
                cx="11"
                cy="11"
                r="10.25"
                stroke="#696F79"
                strokeWidth="1.5"
            />
        </svg>
    );
};
