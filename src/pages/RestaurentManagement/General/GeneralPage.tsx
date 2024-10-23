import { notification, Switch, Tooltip } from 'antd';
import { Text } from 'components/atom/Text';
import { RowStyled } from 'pages/BillDetail/styled';
import React, { useEffect } from 'react';
import QuestionIcon from 'assets/icons/questionIcon';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_MERCHANT_RESTAURANT_CONFIG,
    SET_MERCHANT_RESTAURANT_CONFIG_OPEN_PRICING,
} from 'graphql/setups';
import { useDispatch } from 'react-redux';
import { updateIsOpenPrice } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import LoadingModal from 'components/modal/loadingModal';

export default function RestaurentGeneralPage() {
    const [isTableView, setIsTableView] = React.useState(false);
    const { isOpenPrice } = useSelector((state: RootState) => state.auth);
    const [onGetConfig, { loading: loadingConfig }] = useLazyQuery(
        GET_MERCHANT_RESTAURANT_CONFIG,
    );
    useEffect(() => {
        onGetConfig({ fetchPolicy: 'no-cache' }).then((res: any) => {
            dispatch(
                updateIsOpenPrice(
                    res?.data?.merchantGetRestaurantConfig?.open_pricing,
                ),
            );
        });
    }, []);
    const [onSetOpenPrice, { loading }] = useMutation(
        SET_MERCHANT_RESTAURANT_CONFIG_OPEN_PRICING,
    );
    const dispatch = useDispatch();
    useEffect(() => {
        setIsTableView(
            JSON.parse(localStorage.getItem('isTableView') || 'false'),
        );
    }, []);

    const handleSetDefaultTableView = (value: boolean) => {
        setIsTableView(value);
        notification.success({
            message: 'Success',
            description: 'Set default table view successfully',
        });

        localStorage.setItem('isTableView', JSON.stringify(value));
    };

    const handleSetOpenPrice = (value: boolean) => {
        onSetOpenPrice({
            variables: {
                open_pricing: value,
            },
        }).then(() => {
            notification.success({
                message: 'Success',
                description: 'Set open pricing successfully',
            });
            dispatch(updateIsOpenPrice(value));
        });
    };

    return (
        <div style={{ padding: 16 }}>
            <LoadingModal showLoading={loadingConfig} />
            <div
                style={{
                    borderBottom: '1px solid #dddddd',
                    paddingBottom: 16,
                    marginBottom: 16,
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: 600 }}>
                    Restaurant General
                </Text>
            </div>

            <RowStyled
                style={{
                    borderBottom: '1px solid #dddddd',
                    paddingBottom: 16,
                    marginBottom: 16,
                }}
            >
                <Text>Default Table View</Text>
                <Switch
                    value={isTableView}
                    onChange={(value) => handleSetDefaultTableView(value)}
                />
            </RowStyled>
            <RowStyled
                style={{
                    borderBottom: '1px solid #dddddd',
                    paddingBottom: 16,
                    marginBottom: 16,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text>Open Pricing for All Items</Text>
                    <div style={{ marginLeft: 16, marginTop: -16 }}>
                        <Tooltip
                            title={
                                <div
                                    style={{
                                        color: '#000',
                                    }}
                                >
                                    Allow custom pricing at checkout. Set price
                                    used as editable default
                                </div>
                            }
                            placement="top"
                            color="white"
                        >
                            <div>&nbsp;</div>
                            <QuestionIcon />
                        </Tooltip>
                    </div>
                </div>
                <Switch
                    value={isOpenPrice}
                    onChange={(value) => handleSetOpenPrice(value)}
                    loading={loading}
                />
            </RowStyled>
        </div>
    );
}
