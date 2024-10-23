import React, { useEffect } from 'react';
import { Button, notification, Row, Switch, Tooltip } from 'antd';
import { Text } from 'components/atom/Text';
import { InfoIcon } from '../TerminalSetting/icons/infoIcon';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_MERCHANT_RESTAURANT_CONFIG,
    SET_MERCHANT_RESTAURANT_CONFIG,
} from 'graphql/setups';
import LoadingModal from 'components/modal/loadingModal';
import { useDispatch } from 'react-redux';
import { updateAutoConfirmItem } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
export default function TableOrdering() {
    const { isAutoConfirmItem } = useSelector((state: RootState) => state.auth);
    const [onGetRestaurantConfig, { loading }] = useLazyQuery(
        GET_MERCHANT_RESTAURANT_CONFIG,
    );
    const [onSetRestaurantConfig, { loading: setRestaurantConfigLoading }] =
        useMutation(SET_MERCHANT_RESTAURANT_CONFIG);
    const dispatch = useDispatch();
    useEffect(() => {
        onGetRestaurantConfig({ fetchPolicy: 'network-only' }).then((res) => {
            dispatch(
                updateAutoConfirmItem(
                    res?.data?.merchantGetRestaurantConfig?.auto_confirm_item,
                ),
            );
        });
    }, []);
    const handleChangeSelect = (value: boolean) => {
        onSetRestaurantConfig({
            variables: {
                auto_confirm_item: value,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Your changes have been saved',
                });
                dispatch(updateAutoConfirmItem(value));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <Row justify={'space-between'} align={'middle'}>
            <LoadingModal showLoading={loading} />
            <Row>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>
                    Auto confirm items at checkout
                </Text>
                <Tooltip
                    placement="bottomLeft"
                    title={
                        'All items in cart will be automatically confirmed at checkout.'
                    }
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
                    handleChangeSelect(value);
                }}
                loading={setRestaurantConfigLoading}
            />
        </Row>
    );
}
