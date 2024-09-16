import { Col, Modal, Row } from 'antd';
import IconButtonDeleteItem from 'assets/icons/ButtonDelete';
import CustomTag from 'components/atom/Tag/CustomTag';
import { Text, Text18 } from 'components/atom/Text';
import { CartItemType } from 'context/cartType';
import { ColStyled } from 'pages/TableBill/styleds';
import React from 'react';
import { formatNumberWithCommas } from 'utils/format';
import { getTagStyled } from 'utils/tag';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
import ModalConfirm from 'components/modal/ModalConfirm';
const { confirm } = Modal;
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
    const onDone = async (
        id?: string,
        itemName?: string,
        itemType?: string,
    ) => {
        await confirm({
            title: `Confirmation of serving ${itemName} ?`,
            onOk: () => {
                if (id) {
                    Modal.destroyAll();
                    updateStatusItemServer({
                        cartId: id,
                        itemType: itemType || 'QUOTE',
                    });
                }
            },
            onCancel: () => {
                Modal.destroyAll();
            },
            centered: true,
        });
    };
    const onRemoveItem = async (id?: string) => {
        setIsModalConfirm(true);
        setId(id);
    };
    const { theme } = useTheme();
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const [isModalConfirm, setIsModalConfirm] = React.useState<boolean>(false);
    const [id, setId] = React.useState<string | undefined>('');
    const onCancel = () => {
        setIsModalConfirm(false);
        setId('');
    };
    const onSubmit = () => {
        setIsModalConfirm(false);
        if (id) {
            removeItemOnCartServer({
                cartId: cart?.id,
                cartItemId: id,
            });
        }
    };
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
            <ModalConfirm
                isModalOpen={isModalConfirm}
                onCancel={onCancel}
                onSubmit={onSubmit}
                title="Remove this item?"
                content="Do you want to this item remove?"
            />
            <Text>Total {count} Items</Text>
            {cart?.items?.map((item, index) => {
                const tag = item.bundle_options?.find((e) => {
                    return e.values?.find((value) => value?.status !== 'sent');
                });
                const orderItems = cart.order?.items?.find(
                    (e) => e.name === item.product.name,
                );

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
                                                        : orderItems
                                                          ? orderItems.serving_status
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
                                {!tag &&
                                    item.status === 'sent' &&
                                    cart?.is_active && (
                                        <div
                                            onClick={() =>
                                                onRemoveItem(item.id)
                                            }
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <IconButtonDeleteItem />
                                        </div>
                                    )}
                                {!tag &&
                                    (orderItems
                                        ? orderItems.serving_status === 'ready'
                                        : item.status === 'ready') && (
                                        <ButtonPrimary
                                            title="Served"
                                            onClick={() => {
                                                onDone(
                                                    orderItems
                                                        ? orderItems.id
                                                        : item.id,
                                                    item.product.name,
                                                    orderItems
                                                        ? 'ORDER'
                                                        : 'QUOTE',
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
                                                                        orderItems
                                                                            ? orderItems.id
                                                                            : product.item_id,
                                                                        product.label,
                                                                        orderItems
                                                                            ? 'ORDER'
                                                                            : 'QUOTE',
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
