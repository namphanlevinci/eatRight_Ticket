import React, { useEffect } from 'react';
import { Button, notification, Row, Switch, Tooltip } from 'antd';
import { Text } from 'components/atom/Text';
import { InfoIcon } from '../TerminalSetting/icons/infoIcon';
import { SwitchContainer } from 'layouts/styled';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_MERCHANT_RESTAURANT_CONFIG,
    SET_MERCHANT_RESTAURANT_CONFIG,
} from 'graphql/setups';
export default function TableOrdering() {
    const [open, setOpen] = React.useState(false);
    const [onGetRestaurantConfig] = useLazyQuery(
        GET_MERCHANT_RESTAURANT_CONFIG,
    );
    const [onSetRestaurantConfig] = useMutation(SET_MERCHANT_RESTAURANT_CONFIG);

    useEffect(() => {
        onGetRestaurantConfig({ fetchPolicy: 'network-only' }).then((res) => {
            setOpen(res?.data?.merchantGetRestaurantConfig?.auto_confirm_item);
        });
    }, []);
    const handleChangeSelect = (value: boolean) => {
        setOpen(value);
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
            })
            .catch((e) => {
                console.log(e);
                setOpen(!value);
            });
    };

    return (
        <Row justify={'space-between'} align={'middle'}>
            <Row>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>
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
            <SwitchContainer>
                <Switch
                    style={{ height: 32, width: 60 }}
                    value={open}
                    onChange={(value) => {
                        handleChangeSelect(value);
                    }}
                />
            </SwitchContainer>
        </Row>
    );
}
