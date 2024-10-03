import { Button, Col, Row } from 'antd';
import NoteIcon from 'assets/icons/noteIcon';
import CustomTag from 'components/atom/Tag/CustomTag';
import { Text } from 'components/atom/Text';
import UpDownNumber from 'components/UpdownNumber';
import { ItemType } from 'context/cartType';
import { useTheme } from 'context/themeContext';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { formatNumberWithCommas } from 'utils/format';
import { getTagStyled } from 'utils/tag';
import RenderNote from './RenderNote';

export default function RenderItem({
    item,
    index,
    orderItems,
    targetRef,
    setUpdate,
    setNoteSelectValue,
    setShowNoteModalState,
    data,
    loadingCardTable,
    showMenu,
    updateQuantityItemFromCart,
    InputNoteItemBundleFromCart,
    setIsOpenModalCancel,
    setItemSelected,
    updateStatusItemServer,
}: {
    item: ItemType;
    index: number;
    orderItems: any;
    targetRef: any;
    setUpdate: any;
    setShowNoteModalState: any;
    setNoteSelectValue: any;
    updateQuantityItemFromCart: any;
    loadingCardTable: any;
    data: any;
    showMenu: any;
    InputNoteItemBundleFromCart: any;
    setIsOpenModalCancel: any;
    setItemSelected: any;
    updateStatusItemServer: any;
}) {
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { theme } = useTheme();
    return (
        <div key={index}>
            <Row align={'middle'} justify={'space-between'}>
                <Col md={{ span: 14 }} xs={{ span: 24 }}>
                    <Row align={'middle'}>
                        <div
                            style={{
                                marginBlock: ismobile ? 10 : 0,
                            }}
                        >
                            <CustomTag
                                {...getTagStyled(
                                    item.isUnsend
                                        ? 'New'
                                        : orderItems
                                          ? orderItems?.serving_status
                                          : item?.status,
                                    theme,
                                )}
                            />
                        </div>
                        <div
                            style={{ flex: 1 }}
                            onClick={() => {
                                if (item.isUnsend) {
                                    if (
                                        item.product.__typename ==
                                        'BundleProduct'
                                    ) {
                                        setUpdate({
                                            product: item.product,
                                            options: item.bundle_options,
                                        });
                                        targetRef &&
                                            targetRef.current?.scrollIntoView({
                                                behavior: 'smooth',
                                            });
                                    }
                                }
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                }}
                            >
                                {' '}
                                {item.product.name}
                            </Text>
                        </div>
                    </Row>
                </Col>
                <Col md={{ span: 10 }} xs={{ span: 24 }}>
                    <Row align={'middle'} justify={'end'}>
                        <Text
                            style={{
                                marginRight: 16,
                                fontSize: 18,
                            }}
                        >
                            {' '}
                            {formatNumberWithCommas(item.prices.price.value)}
                        </Text>
                        <Row
                            style={{
                                minWidth: 222,
                                justifyContent: !item?.bundle_options
                                    ? 'space-between'
                                    : 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            {!item?.bundle_options && (
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        width: 24,
                                        height: 24,
                                    }}
                                    onClick={() => {
                                        setShowNoteModalState({
                                            index: index,
                                            show: true,
                                        });
                                        setNoteSelectValue(item.note);
                                    }}
                                >
                                    {item.isUnsend && <NoteIcon />}
                                </div>
                            )}
                            <div
                                style={{
                                    marginRight: 'auto',
                                }}
                            >
                                <UpDownNumber
                                    quantity={item.quantity}
                                    setQuantity={(
                                        e: number,
                                        type: 'decrea' | 'increa',
                                    ) => {
                                        updateQuantityItemFromCart(index, type);
                                    }}
                                    isSend={!item.isUnsend}
                                    disableUp={!showMenu}
                                />
                            </div>
                            {((item.status === 'sent' && data?.is_active) ||
                                !item.status) &&
                                !item?.isUnsend && (
                                    <Button
                                        disabled={loadingCardTable}
                                        style={{
                                            fontSize: 16,
                                            backgroundColor: 'transparent',
                                            border: '0.5px solid #ccc',
                                            outline: 'none',
                                            color: '#ea4335',
                                            fontWeight: 500,
                                            borderRadius: 8,
                                        }}
                                        onClick={
                                            () => {
                                                setIsOpenModalCancel(true);
                                                setItemSelected({
                                                    cartId: data?.id,
                                                    cartItemId: item?.id,
                                                });
                                            }
                                            // removeItemOnCartServer(
                                            //     {
                                            //         cartId: data?.id,
                                            //         cartItemId:
                                            //             item?.id,
                                            //     },
                                            // )
                                        }
                                    >
                                        Cancel
                                    </Button>
                                )}
                            {(orderItems
                                ? orderItems.serving_status === 'ready'
                                : item.status === 'ready') && (
                                <Button
                                    disabled={loadingCardTable}
                                    style={{
                                        fontSize: 16,
                                        backgroundColor: '#3498db',
                                        border: '0.5px solid #ccc',
                                        outline: 'none',
                                        color: theme.nEUTRALPrimary,
                                        fontWeight: 500,
                                        borderRadius: 8,
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                    }}
                                    onClick={() => {
                                        updateStatusItemServer({
                                            cartId: orderItems
                                                ? orderItems.id
                                                : item.id,
                                            itemType: orderItems
                                                ? 'ORDER'
                                                : 'QUOTE',
                                        });
                                    }}
                                >
                                    Serve
                                </Button>
                            )}
                        </Row>
                    </Row>
                </Col>
            </Row>
            {item?.bundle_options?.map((bundle: any, bundleIndex: number) => {
                return (
                    <div key={bundle.id}>
                        {bundle?.values?.map((product: any, idx: number) => {
                            return (
                                <>
                                    <Row
                                        style={{
                                            height: 40,
                                        }}
                                        key={`bundle ${idx}`}
                                        align={'middle'}
                                        justify={'space-between'}
                                    >
                                        <Col
                                            md={{
                                                span: 14,
                                            }}
                                            style={{
                                                paddingLeft: ismobile ? 0 : 100,
                                            }}
                                        >
                                            <Text>
                                                {' '}
                                                ● {product.label}
                                                {' - '}
                                                {formatNumberWithCommas(
                                                    product.price,
                                                )}{' '}
                                                {'  '}x{product.quantity}
                                            </Text>
                                        </Col>
                                        <Col
                                            md={{
                                                span: 10,
                                            }}
                                            style={{
                                                paddingRight: ismobile
                                                    ? 0
                                                    : 116,
                                            }}
                                        >
                                            <Row justify={'end'}>
                                                <Text
                                                    style={{
                                                        marginRight: 16,
                                                    }}
                                                >
                                                    {' '}
                                                    +{' '}
                                                    {formatNumberWithCommas(
                                                        product.price *
                                                            product.quantity,
                                                    )}{' '}
                                                </Text>
                                                <div
                                                    style={{
                                                        cursor: 'pointer',
                                                        width: 24,
                                                        height: 24,
                                                        marginRight: 14,
                                                    }}
                                                    onClick={() => {
                                                        const note =
                                                            prompt(
                                                                'Note',
                                                                item?.note,
                                                            ) || item?.note;
                                                        InputNoteItemBundleFromCart(
                                                            index,
                                                            note,
                                                            bundleIndex,
                                                        );
                                                    }}
                                                >
                                                    {item.isUnsend && (
                                                        <NoteIcon />
                                                    )}
                                                </div>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {bundle?.note ||
                                        (product?.note && (
                                            <div
                                                style={{
                                                    marginLeft: 20,
                                                }}
                                            >
                                                <RenderNote
                                                    note={
                                                        bundle?.note ||
                                                        product?.note
                                                    }
                                                />
                                            </div>
                                        ))}
                                </>
                            );
                        })}
                    </div>
                );
            })}
            {item?.note && <RenderNote note={item?.note} />}
        </div>
    );
}
