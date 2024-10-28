import { notification, Row, Switch, Tooltip } from 'antd';
import { Text } from 'components/atom/Text';
import { RowStyled } from 'pages/BillDetail/styled';
import React, { useEffect } from 'react';
import QuestionIcon from 'assets/icons/questionIcon';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_MERCHANT_RESTAURANT_CONFIG,
    SET_MERCHANT_RESTAURANT_CONFIG_OPEN_PRICING,
    SET_MERCHANT_CONFIG_PRINTER_KITCHEN_COPY,
} from 'graphql/setups';
import { useDispatch } from 'react-redux';
import {
    updateIsOpenPrice,
    updatePrintKitchenCopy,
} from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import LoadingModal from 'components/modal/loadingModal';
import ArrowDownIcon from 'assets/icons/arrowDown';

export default function RestaurentGeneralPage() {
    const [isTableView, setIsTableView] = React.useState(false);
    const { isOpenPrice, isPrintKitchenCopy } = useSelector(
        (state: RootState) => state.auth,
    );
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
    const [onSetPrintKitchenCopy, { loading: loading2 }] = useMutation(
        SET_MERCHANT_CONFIG_PRINTER_KITCHEN_COPY,
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
    const handleSetPrintKitchenCopy = (value: boolean) => {
        onSetPrintKitchenCopy({
            variables: {
                print_kitchen_copy: value,
            },
        }).then(() => {
            notification.success({
                message: 'Success',
                description: 'Set open pricing successfully',
            });
            dispatch(updatePrintKitchenCopy(value));
        });
    };
    const PrintKitchenCopy = () => {
        return (
            <>
                <RowStyled
                    style={{
                        paddingBottom: 16,
                        marginBottom: 16,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text>Print Kitchen Copy</Text>
                        <div style={{ marginLeft: 16, marginTop: -16 }}>
                            <Tooltip
                                title={
                                    <div
                                        style={{
                                            color: '#000',
                                        }}
                                    >
                                        Print kitchen tickets directly from the
                                        primary printer of the POS.
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
                        value={isPrintKitchenCopy}
                        onChange={(value) => handleSetPrintKitchenCopy(value)}
                        loading={loading2}
                    />
                </RowStyled>
                {isPrintKitchenCopy && (
                    <Row align={'middle'}>
                        <Text style={{ width: 150, marginLeft: 24 }}>
                            List Station:
                        </Text>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: 52,
                                width: 'auto',
                                flex: 1,
                                borderRadius: 8,
                                border: '1px solid #D3D3D3',
                                background: '#F8F9FC',
                                paddingInline: 20,
                                cursor: 'pointer',
                            }}
                        >
                            <Text>All Station</Text>
                            <ArrowDownIcon fill="#333741" />
                        </div>
                    </Row>
                )}
                <div
                    style={{ borderBottom: '1px solid #dddddd', marginTop: 16 }}
                />
            </>
        );
    };
    const DefaultViewTable = () => {
        return (
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
        );
    };
    const OpenPricing = () => {
        return (
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
                                    When enabled, allows manual price entry for
                                    all menu items
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
        );
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
            <DefaultViewTable />
            <OpenPricing />
            <PrintKitchenCopy />
        </div>
    );
}
