import { Col } from 'antd';
import React from 'react';
import { Button } from 'components/atom/Button';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'context/themeContext';
import { Text } from 'components/atom/Text';
import { isCartIdFromLocal } from 'utils/isNumericId';
import styled from 'styled-components';
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
    SendCart: () => void;
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
    return (
        <Col
            style={
                ismobile
                    ? {
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                      }
                    : {}
            }
        >
            <ContainerStyled style={{ justifyContent: 'space-between' }}>
                <Col>
                    <Button
                        style={{
                            width: ismobile ? 130 : 154,
                            height: 44,

                            border: `0px solid ${theme.pRIMARY6Primary}`,
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
            <ContainerStyled>
                {/* Show menu có nghĩa là chưa thanh toán  */}
                {isAllDone ? (
                    showMenu ? (
                        <Button
                            style={{
                                width: ismobile ? 180 : '100%',
                                height: 44,
                                background: theme.sUCCESS2Default,
                                border: 0,
                            }}
                            onClick={goBill}
                            isDisable={isNewItem || data?.items?.length === 0}
                        >
                            Checkout
                        </Button>
                    ) : (
                        <Button
                            style={{
                                width: ismobile ? 180 : '100%',
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
                                width: ismobile ? 180 : '100%',
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
                                width: ismobile ? 180 : '100%',
                                height: 44,
                                border: `0px solid ${theme.pRIMARY6Primary}`,
                            }}
                            onClick={() => goFinishPayment(data?.order_number)}
                            background={theme.pRIMARY6Primary}
                            color={theme.nEUTRALBase}
                        >
                            Finish Payment
                        </Button>
                    )
                ) : (
                    <Button
                        style={{
                            width: ismobile ? 180 : '100%',
                            height: 44,
                            background: theme.sUCCESS2Default,
                            border: 0,
                        }}
                        onClick={() =>
                            !cartItems[indexTable]?.carts[
                                selectedCart
                            ]?.firstname?.includes('Guest') && goTableBill()
                        }
                        isDisable={isCartIdFromLocal(
                            cartItems[indexTable]?.carts[selectedCart].id,
                        )}
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
