import { Col } from 'antd';
import React, { useState } from 'react';
import { Button } from 'components/atom/Button';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'context/themeContext';
import { Text } from 'components/atom/Text';
import { isCartIdFromLocal } from 'utils/isNumericId';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_MERCHANT_RESTAURANT_CONFIG } from 'graphql/setups';
export default function RenderAction({
    isNewItem,
    SendCart,
    data,
    onClickChangeTable,
    goBill,
    goFinishPayment,
    goViewBill,
    isAllDone,
    onCompleteService,
    showMenu,
    cartItems,
    goTableBill,
    indexTable,
    selectedCart,
}: {
    isNewItem: boolean;
    SendCart: (isSendThenGo?: boolean) => void;
    data: any;
    onClickChangeTable: any;
    isAllDone: boolean;
    goBill: any;
    showMenu: any;
    onCompleteService: any;
    goViewBill: any;
    goFinishPayment: any;
    goTableBill: any;
    cartItems: any;
    indexTable: any;
    selectedCart: any;
}) {
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { theme } = useTheme();
    const { data: config } = useQuery(GET_MERCHANT_RESTAURANT_CONFIG);
    const [loading, setLoading] = useState(false);
    return (
        <Col
            style={
                ismobile
                    ? {
                          width: '100%',
                          marginInline: 0,
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 20,
                      }
                    : {}
            }
        >
            <ContainerStyled style={{ justifyContent: 'space-between' }}>
                <Col>
                    <Button
                        style={{
                            width: 154,
                            height: 44,

                            border: `0px solid ${theme.pRIMARY6Primary}`,
                            marginInline: 0,
                        }}
                        onClick={() => isNewItem && SendCart()}
                        isDisable={!isNewItem}
                        disabled={!isNewItem}
                        background={theme.pRIMARY6Primary}
                        color={theme.nEUTRALBase}
                    >
                        Confirm
                    </Button>

                    {/* <Button
                style={{
                    width: 154,
                    height: 44,
                    border: `0px solid ${theme.pRIMARY6Primary}`,
                }}
                onClick={() => goViewBill(data?.order_id)}
                background={theme.pRIMARY6Primary}
                color={theme.nEUTRALBase}
            >
                View Receipt
            </Button> */}
                </Col>
                {!ismobile && (
                    <Col>
                        {!isNewItem && data?.items?.length > 0 ? (
                            <Button
                                style={{
                                    width: 154,
                                    height: 44,
                                    marginInline: 10,
                                    background: theme.nEUTRALBase,
                                    justifyContent: 'space-around',
                                    padding: 0,
                                    border: `2px solid ${theme.pRIMARY6Primary}`,
                                }}
                                onClick={onClickChangeTable}
                                background={theme.nEUTRALBase}
                            >
                                <Text
                                    style={{
                                        color: theme.pRIMARY6Primary,
                                        fontWeight: '600',
                                    }}
                                >
                                    Change table
                                </Text>
                            </Button>
                        ) : (
                            <Button
                                style={{
                                    width: 154,
                                    height: 44,
                                    marginInline: 10,
                                    justifyContent: 'space-around',
                                    padding: 0,
                                }}
                                disabled
                                isDisable
                                background={theme.nEUTRALBase}
                            >
                                Change table
                            </Button>
                        )}
                    </Col>
                )}
            </ContainerStyled>
            <ContainerStyled style={{ flex: 1 }}>
                {/* Show menu có nghĩa là chưa thanh toán  */}
                {isAllDone ? (
                    showMenu ? (
                        <Button
                            style={{
                                width: '100%',
                                marginInline: 0,
                                height: 44,
                                background: theme.sUCCESS2Default,
                                border: 0,
                            }}
                            onClick={() => {
                                if (
                                    config?.merchantGetRestaurantConfig
                                        ?.auto_confirm_item
                                ) {
                                    isNewItem ? SendCart(true) : goBill();
                                } else {
                                    goBill();
                                }
                            }}
                            isDisable={
                                config?.merchantGetRestaurantConfig
                                    ?.auto_confirm_item
                                    ? false
                                    : isNewItem || data?.items?.length === 0
                            }
                        >
                            Checkout
                        </Button>
                    ) : (
                        <Button
                            style={{
                                width: '100%',
                                marginInline: 0,
                                height: 44,
                                border: 0,
                            }}
                            onClick={onCompleteService}
                            isDisable={isNewItem || data?.items?.length === 0}
                            background={theme.pRIMARY6Primary}
                            color={theme.nEUTRALBase}
                        >
                            Complete Service
                        </Button>
                    )
                ) : !showMenu ? (
                    data?.is_paid ? (
                        <Button
                            style={{
                                width: '100%',
                                marginInline: 0,
                                height: 44,
                                border: `2px solid ${theme.pRIMARY6Primary}`,
                            }}
                            onClick={() => goViewBill(data?.order_id)}
                            background={theme.nEUTRALBase}
                            color={theme.pRIMARY6Primary}
                        >
                            View Receipt
                        </Button>
                    ) : (
                        <Button
                            style={{
                                width: '100%',
                                marginInline: 0,
                                height: 44,
                                border: `0px solid ${theme.pRIMARY6Primary}`,
                            }}
                            onClick={() => {
                                setLoading(true);
                                goFinishPayment(data?.order_number);
                            }}
                            background={theme.pRIMARY6Primary}
                            color={theme.nEUTRALBase}
                            loading={loading}
                        >
                            Finish Payment
                        </Button>
                    )
                ) : (
                    <Button
                        style={{
                            width: '100%',
                            marginInline: 0,
                            height: 44,
                            background: theme.sUCCESS2Default,
                            border: 0,
                        }}
                        onClick={() => {
                            if (
                                config?.merchantGetRestaurantConfig
                                    ?.auto_confirm_item
                            ) {
                                isNewItem
                                    ? SendCart(true)
                                    : !cartItems[indexTable]?.carts[
                                          selectedCart
                                      ]?.firstname?.includes('Guest') &&
                                      goTableBill();
                            } else {
                                !cartItems[indexTable]?.carts[
                                    selectedCart
                                ]?.firstname?.includes('Guest') &&
                                    goTableBill();
                            }
                        }}
                        isDisable={
                            config?.merchantGetRestaurantConfig
                                ?.auto_confirm_item
                                ? cartItems[indexTable]?.carts[selectedCart]
                                      ?.items?.length === 0
                                    ? true
                                    : false
                                : isCartIdFromLocal(
                                      cartItems[indexTable]?.carts[selectedCart]
                                          ?.id,
                                  ) ||
                                  cartItems[indexTable]?.carts[selectedCart]
                                      ?.items?.length === 0 ||
                                  isNewItem
                        }
                    >
                        Checkout
                    </Button>
                )}
            </ContainerStyled>
        </Col>
    );
}

const ContainerStyled = styled.div`
    display: flex;
`;
