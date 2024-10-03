import { CusTomRow, StyledCartBorder } from '../styled';
import { App, Col, Divider, Row, Button as ButtonAnt } from 'antd';
import { Text } from 'components/atom/Text';
import UpDownNumber from 'components/UpdownNumber';
import { formatNumberWithCommas } from 'utils/format';
import { useCart } from 'context/cartContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useMediaQuery } from 'react-responsive';
import { ItemType } from 'context/cartType';
import { useAddCart } from '../useAddCart';
import LoadingModal from 'components/modal/loadingModal';
import { isCartIdFromLocal } from 'utils/isNumericId';
import React, { useEffect, useMemo, useState } from 'react';
import { useMenuContext } from 'pages/Table/context/MenuContext';
import NoteIcon from 'assets/icons/noteIcon';
import CustomTag from 'components/atom/Tag/CustomTag';
import { getTagStyled } from 'utils/tag';
import RenderNote from './RenderNote';
import { useTheme } from 'context/themeContext';
import { DividedDashed } from 'pages/BillDetail/styled';
import { roundTo } from 'utils/number';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CLEAN_UP_CART_TABLE } from 'graphql/table/cleanTable';
import ModalInputNote from 'components/modal/ModalInputNote';
import { useCartTable } from '../useGetCart';
import ModalConfirm from 'components/modal/ModalConfirm';
import { GET_INVOICES } from 'graphql/cart/splitBill';
import { FoodCoverIcon } from 'assets/icons/foodCoverIcon';
import RenderAction from './RenderAction';
export default function CartItemList({
    data,
    cartInfo,
    onClickChangeTable,
    table,
}: {
    data: any;
    cartInfo: string;
    onClickChangeTable: any;
    table: any;
}) {
    const {
        updateQuantityItemFromCart,
        cartItems,
        indexTable,
        setCustomerName,
        InputNoteItemFromCart,
        InputNoteItemBundleFromCart,
        removeCartIndex,
    } = useCart();

    const {
        loading: loadingCardTable,
        removeItemOnCartServer,
        updateStatusItemServer,
    } = useCartTable(false, false);

    const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
    const [itemSelected, setItemSelected] = useState<{
        cartId: string;
        cartItemId: string;
    }>();

    const { addCart, loading, addMoreCart } = useAddCart();
    const navigation = useNavigate();
    const [isAllDone, setIsAllDone] = useState(false);
    const [searchParams] = useSearchParams();
    const selectedCart = parseInt(searchParams.get('cartIndex') || '0');
    const isNewItem = data?.items?.find((item: ItemType) => item.isUnsend);
    useEffect(() => {
        if (data?.items?.length > 0) {
            if (data?.order_number) {
                const itemNeedDone = data?.order?.items.find(
                    (item: any) => item.serving_status !== 'done',
                );
                if (itemNeedDone) {
                    setIsAllDone(false);
                } else {
                    setIsAllDone(true);
                }
            } else {
                const itemNeedDone = data?.items.find(
                    (item: ItemType) => item.status !== 'done',
                );

                if (itemNeedDone) {
                    setIsAllDone(false);
                } else {
                    setIsAllDone(true);
                }
            }
        }
    }, [data, data?.items, data?.items?.[data?.items?.length - 1]]);
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const goBill = () => {
        const items: ItemType[] = data?.items.filter(
            (item: ItemType) => item.isUnsend,
        );
        if (items.length > 0) {
            alert('Please send all cart to bill');
            return;
        }
        navigation(`${BASE_ROUTER.TABLE_BILL}?${cartInfo}`);
    };
    const goTableBill = () => {
        navigation(`${BASE_ROUTER.TABLE_BILL}${window.location.search}`);
    };
    const SendCart = () => {
        let CustomerName =
            cartItems[indexTable]?.carts[selectedCart]?.firstname;
        if (CustomerName?.includes('Guest')) {
            createCart({
                username: 'Diner ' + (selectedCart + 1),
                numberOfCustomer: 1,
            });
        } else {
            setCustomerName(CustomerName, selectedCart, indexTable);
            createCart({
                username: CustomerName,
                numberOfCustomer:
                    cartItems[indexTable]?.carts[selectedCart]
                        ?.numberOfCustomer,
                phoneNumber:
                    cartItems[indexTable]?.carts[selectedCart]?.phonenumber,
            });
        }
    };
    const createCart = ({
        username,
        numberOfCustomer = 1,
        phoneNumber,
    }: {
        username?: string;
        numberOfCustomer?: number;
        phoneNumber?: string;
    }) => {
        const items: ItemType[] = data?.items.filter(
            (item: ItemType) => item.isUnsend,
        );
        const carts = items.map((item: ItemType) => {
            if (item.is_configurable) {
                return {
                    sku: item.id,
                    quantity: item.quantity,
                    parent_sku: item.product.sku,
                    note: item.note,
                };
            }
            if (item.bundle_options && item.bundle_options.length > 0) {
                return {
                    sku: item.id,
                    quantity: item.quantity,
                    note: item.note,
                    selected_options: item.bundle_options.flatMap((bundle) => {
                        if (!bundle.values || bundle.note) {
                            return [];
                        }
                        return bundle.values.map((value) => {
                            return btoa(
                                `bundle/${bundle.id}/${value.id}/${value.quantity}`,
                            );
                        });
                    }),
                    entered_options: item.bundle_options.flatMap((bundle) => {
                        if (!bundle.values || !bundle.note) {
                            return [];
                        }
                        return bundle.values.map((value) => {
                            return {
                                uid: btoa(
                                    `bundle/${bundle.id}/${value.id}/${value.quantity}`,
                                ),
                                value: value.quantity,
                                note: bundle.note,
                            };
                        });
                    }),
                };
            }
            return {
                sku: item.product.sku,
                quantity: item.quantity,
                note: item.note,
            };
        });
        if (isCartIdFromLocal(data.id)) {
            addCart(
                carts,
                username || '',
                numberOfCustomer,
                table?.is_counter == 1 ? true : false,
                phoneNumber,
            );
        } else {
            addMoreCart(data.id, carts);
        }
    };
    const { setUpdate, targetRef, showMenu } = useMenuContext();
    const { theme } = useTheme();
    const total = useMemo(
        () =>
            (data?.prices?.subtotal_excluding_tax?.value || 0) -
            (data?.order_number
                ? 0
                : data?.prices?.total_canceled_without_tax?.value || 0),
        [data],
    );

    const Tax = useMemo(
        () => (data?.prices?.applied_taxes?.[0]?.tax_percent || 0) / 100,
        [data],
    );

    const totalDiscount = useMemo(
        () =>
            roundTo(
                (data?.prices?.discount?.amount?.value || 0) +
                    (data?.prices?.total_items_canceled_discount?.value || 0),
                2,
            ),
        [data],
    );

    const grandTotal = useMemo(
        () => (total + totalDiscount) * (Tax + 1) + (data?.tip_amount || 0),
        [total, totalDiscount, Tax, data],
    );
    const [showNoteModal, setShowNoteModalState] = useState({
        show: false,
        index: 0,
    });
    const goViewBill = (id: string) => {
        navigation(`${BASE_ROUTER.BILL_DETAIL}?order_id=${id}`);
    };
    const [onCleanUpCart, { loading: loadingClean }] =
        useMutation(CLEAN_UP_CART_TABLE);
    const { modal } = App.useApp();
    const onCompleteService = () => {
        modal.confirm({
            title: 'Do you want to complete service ?',
            onOk: () => {
                onCleanUpCart({
                    variables: {
                        cartId: data?.id,
                        tableId: table?.id,
                    },
                })
                    .then(() => {
                        modal.success({
                            centered: true,
                            title: 'Complete service successfully',
                            onOk: () => {
                                goViewBill(data?.order_id);
                            },
                            onCancel: () => {
                                goTable();
                            },
                            okCancel: true,

                            cancelText: 'Close',
                        });
                    })
                    .catch((err) => {
                        console.log('error', err);
                    });
            },
            centered: true,
        });
    };
    const goTable = () => {
        removeCartIndex(selectedCart);
    };
    const [noteSelectValue, setNoteSelectValue] = useState('');

    const [onGetInvoices] = useLazyQuery(GET_INVOICES, {
        fetchPolicy: 'cache-and-network',
    });
    const goFinishPayment = (order_number: string) => {
        onGetInvoices({
            variables: {
                OrderNumber: order_number,
            },
        })
            .then((res) => {
                localStorage.setItem(
                    'split_bill_data',
                    JSON.stringify(res.data?.merchantGetOrderInvoices),
                );
                navigation(BASE_ROUTER.TABLE_BILL_CHECKOUT);
            })
            .catch(() => {
                console.log('error');
            });
    };
    return data ? (
        <StyledCartBorder
            style={{
                minHeight: 280,
                padding: 16,
                backgroundColor: ismobile ? 'transparent' : theme.nEUTRALBase,
                border: ismobile ? '0px' : `1px solid ${theme.nEUTRALLine}`,
            }}
        >
            <LoadingModal showLoading={loading || loadingClean} />
            {showNoteModal.show && (
                <ModalInputNote
                    title="Add note"
                    isModalOpen={showNoteModal.show}
                    onCancel={() =>
                        setShowNoteModalState({ ...showNoteModal, show: false })
                    }
                    onSubmit={(e: any) => {
                        setShowNoteModalState({
                            ...showNoteModal,
                            show: false,
                        });
                        InputNoteItemFromCart(showNoteModal.index, e);
                    }}
                    inputValue={noteSelectValue}
                />
            )}
            <div style={{ minHeight: ismobile ? 60 : 200 }}>
                {data?.items?.length > 0 &&
                    data?.items?.map((item: any, index: any) => {
                        const orderItems =
                            data?.order?.items?.length > index
                                ? data?.order?.items[index]
                                : undefined;

                        return (
                            <div key={index}>
                                <Row align={'middle'} justify={'space-between'}>
                                    <Col md={{ span: 14 }} xs={{ span: 24 }}>
                                        <Row align={'middle'}>
                                            <div
                                                style={{
                                                    marginBlock: ismobile
                                                        ? 10
                                                        : 0,
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
                                                            item.product
                                                                .__typename ==
                                                            'BundleProduct'
                                                        ) {
                                                            setUpdate({
                                                                product:
                                                                    item.product,
                                                                options:
                                                                    item.bundle_options,
                                                            });
                                                            targetRef &&
                                                                targetRef.current?.scrollIntoView(
                                                                    {
                                                                        behavior:
                                                                            'smooth',
                                                                    },
                                                                );
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
                                                {formatNumberWithCommas(
                                                    item.prices.price.value,
                                                )}
                                            </Text>
                                            <Row
                                                style={{
                                                    minWidth: 222,
                                                    justifyContent:
                                                        !item?.bundle_options
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
                                                            setShowNoteModalState(
                                                                {
                                                                    index: index,
                                                                    show: true,
                                                                },
                                                            );
                                                            setNoteSelectValue(
                                                                item.note,
                                                            );
                                                        }}
                                                    >
                                                        {item.isUnsend && (
                                                            <NoteIcon />
                                                        )}
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
                                                            type:
                                                                | 'decrea'
                                                                | 'increa',
                                                        ) => {
                                                            updateQuantityItemFromCart(
                                                                index,
                                                                type,
                                                            );
                                                        }}
                                                        isSend={!item.isUnsend}
                                                        disableUp={!showMenu}
                                                    />
                                                </div>
                                                {((item.status === 'sent' &&
                                                    data?.is_active) ||
                                                    !item.status) &&
                                                    !item?.isUnsend && (
                                                        <ButtonAnt
                                                            disabled={
                                                                loadingCardTable
                                                            }
                                                            style={{
                                                                fontSize: 16,
                                                                backgroundColor:
                                                                    'transparent',
                                                                border: '0.5px solid #ccc',
                                                                outline: 'none',
                                                                color: '#ea4335',
                                                                fontWeight: 500,
                                                                borderRadius: 8,
                                                            }}
                                                            onClick={
                                                                () => {
                                                                    setIsOpenModalCancel(
                                                                        true,
                                                                    );
                                                                    setItemSelected(
                                                                        {
                                                                            cartId: data?.id,
                                                                            cartItemId:
                                                                                item?.id,
                                                                        },
                                                                    );
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
                                                        </ButtonAnt>
                                                    )}
                                                {(orderItems
                                                    ? orderItems.serving_status ===
                                                      'ready'
                                                    : item.status ===
                                                      'ready') && (
                                                    <ButtonAnt
                                                        disabled={
                                                            loadingCardTable
                                                        }
                                                        style={{
                                                            fontSize: 16,
                                                            backgroundColor:
                                                                '#3498db',
                                                            border: '0.5px solid #ccc',
                                                            outline: 'none',
                                                            color: theme.nEUTRALPrimary,
                                                            fontWeight: 500,
                                                            borderRadius: 8,
                                                            paddingTop: 0,
                                                            paddingBottom: 0,
                                                        }}
                                                        onClick={() => {
                                                            updateStatusItemServer(
                                                                {
                                                                    cartId: orderItems
                                                                        ? orderItems.id
                                                                        : item.id,
                                                                    itemType:
                                                                        orderItems
                                                                            ? 'ORDER'
                                                                            : 'QUOTE',
                                                                },
                                                            );
                                                        }}
                                                    >
                                                        Serve
                                                    </ButtonAnt>
                                                )}
                                            </Row>
                                        </Row>
                                    </Col>
                                </Row>
                                {item?.bundle_options?.map(
                                    (bundle: any, bundleIndex: number) => {
                                        return (
                                            <div key={bundle.id}>
                                                {bundle?.values?.map(
                                                    (
                                                        product: any,
                                                        idx: number,
                                                    ) => {
                                                        return (
                                                            <>
                                                                <Row
                                                                    style={{
                                                                        height: 40,
                                                                    }}
                                                                    key={`bundle ${idx}`}
                                                                    align={
                                                                        'middle'
                                                                    }
                                                                    justify={
                                                                        'space-between'
                                                                    }
                                                                >
                                                                    <Col
                                                                        md={{
                                                                            span: 14,
                                                                        }}
                                                                        style={{
                                                                            paddingLeft:
                                                                                ismobile
                                                                                    ? 0
                                                                                    : 100,
                                                                        }}
                                                                    >
                                                                        <Text>
                                                                            {' '}
                                                                            ●{' '}
                                                                            {
                                                                                product.label
                                                                            }
                                                                            {
                                                                                ' - '
                                                                            }
                                                                            {formatNumberWithCommas(
                                                                                product.price,
                                                                            )}{' '}
                                                                            {
                                                                                '  '
                                                                            }
                                                                            x
                                                                            {
                                                                                product.quantity
                                                                            }
                                                                        </Text>
                                                                    </Col>
                                                                    <Col
                                                                        md={{
                                                                            span: 10,
                                                                        }}
                                                                        style={{
                                                                            paddingRight:
                                                                                ismobile
                                                                                    ? 0
                                                                                    : 116,
                                                                        }}
                                                                    >
                                                                        <Row
                                                                            justify={
                                                                                'end'
                                                                            }
                                                                        >
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
                                                                                        ) ||
                                                                                        item?.note;
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
                                                    },
                                                )}
                                            </div>
                                        );
                                    },
                                )}
                                {item?.note && <RenderNote note={item?.note} />}
                            </div>
                        );
                    })}
                {data?.items?.length === 0 && (
                    <div
                        style={{
                            flexDirection: 'column',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 12,
                            height: ismobile ? 60 : 160,
                        }}
                    >
                        <FoodCoverIcon />
                        <Text style={{ fontWeight: '400' }}>No items yet</Text>
                    </div>
                )}
            </div>
            {!ismobile ? (
                <div style={{ paddingRight: 1 }}>
                    <Divider dashed style={{ borderColor: '#666666' }} />
                </div>
            ) : (
                <div style={{ height: 20 }} />
            )}

            <CusTomRow>
                <Col
                    flex={1}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    {data?.prices?.subtotal_excluding_tax?.value && (
                        <Row justify={'space-between'}>
                            <Text style={{ fontSize: 16 }}>Total</Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    color: theme.pRIMARY6Primary,
                                }}
                            >
                                {' $'} {formatNumberWithCommas(total)}{' '}
                            </Text>
                        </Row>
                    )}
                    {data?.prices?.applied_taxes?.length > 0 &&
                    data?.prices?.applied_taxes[0]?.amount ? (
                        <Row justify={'space-between'}>
                            <Text style={{ fontSize: 16 }}>Tax</Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    color: theme.pRIMARY6Primary,
                                }}
                            >
                                {' $'}{' '}
                                {formatNumberWithCommas(
                                    (total + totalDiscount) * Tax,
                                )}
                            </Text>
                        </Row>
                    ) : (
                        <></>
                    )}
                    {data?.tip_amount > 0 && data?.tip_amount ? (
                        <Row justify={'space-between'}>
                            <Text style={{ fontSize: 16 }}>Tip</Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    color: theme.pRIMARY6Primary,
                                }}
                            >
                                {' $'}{' '}
                                {formatNumberWithCommas(
                                    data?.tip_amount > 0
                                        ? data?.tip_amount || 0
                                        : 0,
                                )}
                            </Text>
                        </Row>
                    ) : (
                        <></>
                    )}
                    {totalDiscount ? (
                        <Row justify={'space-between'}>
                            <Col style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        marginBottom: 10,
                                    }}
                                >
                                    Discount :
                                </Text>
                            </Col>
                            <Col
                                style={{
                                    width: 100,
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <Text>
                                    {formatNumberWithCommas(totalDiscount)}
                                </Text>
                            </Col>
                        </Row>
                    ) : (
                        <></>
                    )}
                    {data?.prices?.grand_total?.value ? (
                        <>
                            <Row justify={'space-between'}>
                                <Text style={{ fontSize: 16 }}>
                                    Grand Total
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: '600',
                                        color: theme.pRIMARY6Primary,
                                    }}
                                >
                                    {' $'} {formatNumberWithCommas(grandTotal)}{' '}
                                </Text>
                            </Row>
                        </>
                    ) : (
                        <></>
                    )}

                    {data?.prices?.new_items_total?.value ? (
                        <DividedDashed />
                    ) : (
                        <></>
                    )}
                    {data?.prices?.new_items_total?.value ? (
                        <>
                            <Row justify={'space-between'}>
                                <Text style={{ fontSize: 16 }}>
                                    New Items Total
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: '600',
                                        color: theme.pRIMARY6Primary,
                                    }}
                                >
                                    {' $'}{' '}
                                    {formatNumberWithCommas(
                                        data?.prices?.new_items_total?.value ||
                                            0,
                                    )}{' '}
                                </Text>
                            </Row>
                        </>
                    ) : (
                        <></>
                    )}
                </Col>
                <RenderAction
                    SendCart={SendCart}
                    cartItems={cartItems}
                    indexTable={indexTable}
                    selectedCart={selectedCart}
                    data={data}
                    goBill={goBill}
                    goViewBill={goViewBill}
                    onCompleteService={onCompleteService}
                    goTableBill={goTableBill}
                    isAllDone={isAllDone}
                    goFinishPayment={goFinishPayment}
                    onClickChangeTable={onClickChangeTable}
                    isNewItem={isNewItem}
                    showMenu={showMenu}
                />
            </CusTomRow>
            {isOpenModalCancel && (
                <ModalConfirmCancel
                    isModalConfirm={isOpenModalCancel}
                    onCancel={() => setIsOpenModalCancel(false)}
                    onSubmit={() => {
                        itemSelected && removeItemOnCartServer(itemSelected);
                        setIsOpenModalCancel(false);
                    }}
                />
            )}
        </StyledCartBorder>
    ) : (
        <></>
    );
}

interface IModal {
    isModalConfirm: boolean;
    onCancel: () => void;
    onSubmit: () => void;
}

const ModalConfirmCancel = ({ isModalConfirm, onCancel, onSubmit }: IModal) => {
    return (
        <ModalConfirm
            isModalOpen={isModalConfirm}
            onCancel={onCancel}
            onSubmit={onSubmit}
            title="Cancel this item?"
            content="Do you want to this item cancel?"
        />
    );
};
