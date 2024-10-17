import { Button, Col, Divider, Row } from 'antd';
import NoteIcon from 'assets/icons/noteIcon';
import { Text } from 'components/atom/Text';
import { ItemType, OrderItemType } from 'context/cartType';
import { useTheme } from 'context/themeContext';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { formatNumberWithCommas } from 'utils/format';
import RenderNote from './RenderNote';
import { NoteTableIcon } from 'assets/icons/noteTableIcon';
import UpDownNumberV2 from 'components/UpdownNumber/index2';
import EditPriceIcon from 'assets/icons/editPriceIcon';

export default function RenderItemNew({
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
    onRemoveItem,
    onEditOpenPrice,
}: {
    item: ItemType;
    index: number;
    orderItems: OrderItemType | undefined;
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
    onRemoveItem: any;
    onEditOpenPrice?: any;
}) {
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { theme } = useTheme();

    return (
        <div key={index}>
            {/* <Row align={'middle'} justify={'space-between'}> */}

            <Row align={'middle'}>
                <div
                    style={{ flex: 1 }}
                    onClick={() => {
                        if (item.isUnsend) {
                            if (item.product.__typename == 'BundleProduct') {
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
                            fontSize: 16,
                            fontWeight: '500',
                        }}
                    >
                        {' '}
                        {item.product.name}
                    </Text>
                </div>
            </Row>
            {(item.note || item.isUnsend) && (
                <Row
                    align={'middle'}
                    style={{ marginBlock: 8 }}
                    onClick={() => {
                        if (item.isUnsend) {
                            setShowNoteModalState({
                                index: index,
                                show: true,
                            });
                            setNoteSelectValue(item.note);
                        }
                    }}
                >
                    <NoteTableIcon />
                    <Text
                        style={{
                            fontSize: 12,
                            color: theme.tEXTSecondary,
                            marginLeft: 8,
                        }}
                    >
                        {item.note ? item.note : 'Note'}
                    </Text>
                </Row>
            )}

            <Row align={'middle'} justify={'space-between'}>
                <Row
                    style={{ width: ismobile ? 240 : 400 }}
                    justify={'space-between'}
                >
                    {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text
                            style={{
                                marginLeft: 24,
                                fontSize: 18,
                            }}
                        >
                            {CURRENTCY}
                            {formatNumberWithCommas(item.prices.price.value)}
                        </Text>
                    </div> */}
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                            onClick={onEditOpenPrice}
                        >
                            <EditPriceIcon />
                            <p
                                style={{
                                    color: '#737B89',
                                    fontWeight: '500',
                                    fontSize: 16,
                                    fontFamily: 'Montserrat',
                                    marginLeft: 16,
                                }}
                            >
                                Enter price
                            </p>
                        </div>
                        <div
                            style={{
                                fontFamily: 'Montserrat',
                                color: 'red',
                                marginTop: 8,
                            }}
                        >
                            * Please enter price
                        </div>
                    </div>
                    <div>
                        {item.isUnsend ? (
                            <UpDownNumberV2
                                quantity={item.quantity}
                                setQuantity={(
                                    e: number,
                                    type: 'decrea' | 'increa',
                                ) => {
                                    updateQuantityItemFromCart({
                                        index,
                                        type,
                                        value: e,
                                    });
                                }}
                                isSend={!item.isUnsend}
                                disableUp={!showMenu}
                            />
                        ) : (
                            <Text
                                style={{ fontWeight: '600' }}
                                onClick={() => {
                                    console.log('open quantity modal');
                                }}
                            >
                                x{item.quantity}
                            </Text>
                        )}
                    </div>
                </Row>
                <RenderButtonStatus
                    data={data}
                    item={item}
                    loadingCardTable={loadingCardTable}
                    setIsOpenModalCancel={setIsOpenModalCancel}
                    setItemSelected={setItemSelected}
                    orderItems={orderItems}
                    index={index}
                    onRemoveItem={onRemoveItem}
                    updateStatusItemServer={updateStatusItemServer}
                />
            </Row>
            {/* </Row> */}
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
            <Divider />
        </div>
    );
}

const RenderButtonStatus = ({
    item,
    data,
    loadingCardTable,
    setIsOpenModalCancel,
    setItemSelected,
    orderItems,
    onRemoveItem,
    index,
    updateStatusItemServer,
}: {
    item: ItemType;
    data: any;
    loadingCardTable: boolean;
    setIsOpenModalCancel: any;
    setItemSelected: any;
    orderItems: OrderItemType | undefined;
    onRemoveItem: any;
    index: number;
    updateStatusItemServer: any;
}) => {
    if (item.isUnsend) {
        return (
            <Button
                disabled={loadingCardTable}
                style={{
                    fontSize: 16,
                    backgroundColor: 'transparent',
                    border: '0.5px solid #F67E89',
                    outline: 'none',
                    color: '#F67E89',
                    fontWeight: 500,
                    borderRadius: 4,
                    height: 32,
                    width: 80,
                }}
                onClick={() => {
                    onRemoveItem(index);
                }}
            >
                Cancel
            </Button>
        );
    }

    if (
        orderItems
            ? orderItems.serving_status === 'ready'
            : item.status === 'ready'
    ) {
        return (
            <Button
                disabled={loadingCardTable}
                style={{
                    fontSize: 16,
                    backgroundColor: '#3498DB',
                    border: '0px solid #F67E89',
                    outline: 'none',
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: 4,
                    height: 32,
                    width: 80,
                }}
                onClick={() => {
                    updateStatusItemServer({
                        cartId: orderItems ? orderItems.id : item.id,
                        itemType: orderItems ? 'ORDER' : 'QUOTE',
                    });
                }}
            >
                Serve
            </Button>
        );
    }
    if (
        orderItems
            ? orderItems.serving_status === 'cooking'
            : item.status === 'cooking'
    ) {
        return (
            <Button
                disabled={loadingCardTable}
                style={{
                    fontSize: 16,
                    backgroundColor: 'transparent',
                    border: '0px solid #F67E89',
                    outline: 'none',
                    color: '#FF9D00',
                    fontWeight: 500,
                    borderRadius: 4,
                    height: 32,
                    width: 80,
                }}
            >
                Cooking
            </Button>
        );
    }
    if (
        orderItems
            ? orderItems.serving_status === 'cancel'
            : item.status === 'cancel'
    ) {
        return (
            <Button
                disabled={loadingCardTable}
                style={{
                    fontSize: 16,
                    backgroundColor: 'transparent',
                    border: '0px solid #F67E89',
                    outline: 'none',
                    color: '#F67E89',
                    fontWeight: 500,
                    borderRadius: 4,
                    height: 32,
                    width: 80,
                }}
            >
                Canceled
            </Button>
        );
    }
    if (
        orderItems
            ? orderItems.serving_status === 'done'
            : item.status === 'done'
    ) {
        return (
            <Button
                disabled={loadingCardTable}
                style={{
                    fontSize: 16,
                    backgroundColor: 'transparent',
                    border: '0px solid #F67E89',
                    outline: 'none',
                    color: '#3498DB',
                    fontWeight: 500,
                    borderRadius: 4,
                    height: 32,
                    width: 80,
                }}
            >
                Served
            </Button>
        );
    }
    if (!orderItems?.id && (item.status === 'sent' || item.status === null)) {
        return (
            <Button
                disabled={loadingCardTable}
                style={{
                    fontSize: 16,
                    backgroundColor: 'transparent',
                    border: '0.5px solid #F67E89',
                    outline: 'none',
                    color: '#F67E89',
                    fontWeight: 500,
                    borderRadius: 4,
                    height: 32,
                    width: 80,
                }}
                onClick={() => {
                    setIsOpenModalCancel(true);
                    setItemSelected({
                        cartId: data?.id,
                        cartItemId: item?.id,
                    });
                }}
                loading={loadingCardTable}
            >
                Cancel
            </Button>
        );
    }
    return <></>;
};
