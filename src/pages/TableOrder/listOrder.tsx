import { Col, Row } from 'antd';
import IconButtonDeleteItem from 'assets/icons/ButtonDelete';
import CustomTag from 'components/atom/Tag/CustomTag';
import { Text, Text18 } from 'components/atom/Text';
import { CartItemType } from 'context/cartType';
import { ColStyled } from 'pages/TableBill/styleds';
import React from 'react';
import { formatNumberWithCommas } from 'utils/format';
import { getTagStyled } from 'utils/tag';
import { App } from 'antd';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
export default function ListOrder({
    cart,
    count,
    removeItemOnCartServer,
    updateStatusItemServer,
}: {
    cart?: CartItemType;
    count: number;
    removeItemOnCartServer?: any;
    updateStatusItemServer?: any;
}) {
    const { modal } = App.useApp();
    const onDone = async (id?: string, itemName?: string) => {
        await modal.confirm({
            title: `Confirmation of serving ${itemName} ?`,
            onOk: () => {
                if (id) {
                    updateStatusItemServer({
                        cartId: id,
                    });
                }
            },
            centered: true,
        });
    };
    const onRemoveItem = async (id?: string) => {
        await modal.confirm({
            title: 'Do you want to this item remove?',
            onOk: () => {
                if (id) {
                    removeItemOnCartServer({
                        cartId: cart?.id,
                        cartItemId: id,
                    });
                }
            },
            centered: true,
        });
    };
    const { theme } = useTheme();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    return (
        <ColStyled
            style={{
                flex: 1,
                background: theme.nEUTRALBase,
                border: `1px solid ${theme.nEUTRALLine}`,
                marginRight: isMobile ? 0 : 16,
                borderRadius: 8,
                padding: 16,
            }}
        >
            <Text>Total {count} Items</Text>
            {cart?.items?.map((item, index) => {
                const tag = item.bundle_options?.find((e) => {
                    return e.values?.find((value) => value?.status !== 'sent');
                });
                return (
                    <div key={index}>
                        <Row
                            justify={'space-between'}
                            style={{ marginTop: 32 }}
                        >
                            <Row
                                style={{
                                    flexDirection: isMobile ? 'column' : 'row',
                                    flex: 1,
                                }}
                            >
                                <Col style={{ flex: 1 }}>
                                    <Row>
                                        <Col>
                                            <CustomTag
                                                {...getTagStyled(
                                                    item.isUnsend
                                                        ? 'New'
                                                        : item?.status,
                                                    theme,
                                                )}
                                            />
                                        </Col>
                                        <Col>
                                            <Text18 style={{ marginRight: 8 }}>
                                                {item.quantity}X
                                            </Text18>
                                        </Col>
                                        <Col style={{ flex: 1 }}>
                                            <Text18>{item.product.name}</Text18>
                                        </Col>
                                    </Row>
                                </Col>

                                <Text18 style={{ textAlign: 'right' }}>
                                    {formatNumberWithCommas(
                                        item.prices.price.value,
                                    )}{' '}
                                </Text18>
                            </Row>
                            <Col
                                style={{
                                    width: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    marginLeft: isMobile ? 0 : 20,
                                }}
                            >
                                {!tag && item.status === 'sent' && (
                                    <div
                                        onClick={() => onRemoveItem(item.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <IconButtonDeleteItem />
                                    </div>
                                )}
                                {!tag && item.status === 'ready' && (
                                    <ButtonPrimary
                                        title="Served"
                                        onClick={() => {
                                            onDone(item.id, item.product.name);
                                        }}
                                        size="medium"
                                        width="80px"
                                        height="40px"
                                        marginTop="0px"
                                    />
                                )}
                            </Col>
                        </Row>

                        {item.bundle_options?.map((bundle) => {
                            return (
                                <div key={bundle.id}>
                                    {bundle?.values?.map(
                                        (product: any, idx: number) => {
                                            return (
                                                <Row
                                                    style={{
                                                        marginTop: 20,
                                                        marginLeft: 70,
                                                    }}
                                                    key={`bundle ${idx}`}
                                                    align={'middle'}
                                                    justify={'space-between'}
                                                >
                                                    <Col>
                                                        <Row>
                                                            {!item.isUnsend && (
                                                                <CustomTag
                                                                    {...getTagStyled(
                                                                        product?.status,
                                                                        theme,
                                                                    )}
                                                                />
                                                            )}
                                                            <Text>
                                                                {' '}
                                                                ●{' '}
                                                                {
                                                                    product.label
                                                                }{' '}
                                                                x
                                                                {
                                                                    product.quantity
                                                                }
                                                            </Text>
                                                        </Row>
                                                    </Col>
                                                    <Col
                                                        style={{
                                                            width: 100,
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                            display: 'flex',
                                                            marginLeft: 20,
                                                        }}
                                                    >
                                                        {product.status ===
                                                            'ready' && (
                                                            <ButtonPrimary
                                                                title="Served"
                                                                onClick={() => {
                                                                    onDone(
                                                                        product.item_id,
                                                                        product.label,
                                                                    );
                                                                }}
                                                                size="medium"
                                                                width="80px"
                                                                height="40px"
                                                                marginTop="0px"
                                                            />
                                                        )}
                                                    </Col>
                                                </Row>
                                            );
                                        },
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </ColStyled>
    );
}
