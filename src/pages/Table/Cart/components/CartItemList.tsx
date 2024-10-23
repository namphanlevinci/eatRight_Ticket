import { CusTomRow, StyledCartBorder } from '../styled';
import { App, Col, Divider, Row } from 'antd';
import { Text } from 'components/atom/Text';
import { formatNumberWithCommas } from 'utils/format';
import { useCart } from 'context/cartContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useMediaQuery } from 'react-responsive';
import { CartItemType, ItemType } from 'context/cartType';
import { useAddCart } from '../useAddCart';
import LoadingModal from 'components/modal/loadingModal';
import { isCartIdFromLocal } from 'utils/isNumericId';
import React, { useEffect, useMemo, useState } from 'react';
import { useMenuContext } from 'pages/Table/context/MenuContext';
import { useTheme } from 'context/themeContext';
import { DividedDashed } from 'pages/BillDetail/styled';
import { roundTo } from 'utils/number';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CLEAN_UP_CART_TABLE } from 'graphql/table/cleanTable';
import ModalInputNote from 'components/modal/ModalInputNote';
import ModalConfirm from 'components/modal/ModalConfirm';
import { GET_INVOICES } from 'graphql/cart/splitBill';
import { FoodCoverIcon } from 'assets/icons/foodCoverIcon';
import RenderAction from './RenderAction';
import RenderItemNew from './RenderItem_New';
import ModalEditPrice from 'components/modal/ModalEditPrice';
export default function CartItemList({
    data,
    cartInfo,
    onClickChangeTable,
    table,
    loadingCardTable,
    removeItemOnCartServer,
    updateStatusItemServer,
    customOpenPriceForItem,
    handleUpdatePriceItem,
}: {
    data: CartItemType | undefined;
    cartInfo: string;
    onClickChangeTable: any;
    table: any;
    loadingCardTable: boolean;
    removeItemOnCartServer: any;
    updateStatusItemServer: any;
    customOpenPriceForItem: ({
        custom_price,
        index,
    }: {
        index: number;
        custom_price: number;
    }) => void;
    handleUpdatePriceItem: (item: {
        id: string;
        cartId: string;
        price: number;
    }) => void;
}) {
    const {
        updateQuantityItemFromCart,
        cartItems,
        indexTable,
        setCustomerName,
        InputNoteItemFromCart,
        InputNoteItemBundleFromCart,
        removeCartIndex,
        onRemoveItem,
    } = useCart();

    const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
    const [itemSelected, setItemSelected] = useState<{
        cartId: string;
        cartItemId: string | any;
    }>();

    const { addCart, loading, addMoreCart } = useAddCart();
    const navigation = useNavigate();
    const [isAllDone, setIsAllDone] = useState(false);
    const [searchParams] = useSearchParams();
    const selectedCart = parseInt(searchParams.get('cartIndex') || '0');
    // const [isNeedRequire, setIsNeedRequire] = useState(false);
    const isNewItem = data?.items?.find((item: ItemType) => item.isUnsend)
        ? true
        : false;
    useEffect(() => {
        if (data && data?.items?.length > 0) {
            if (data?.order_number) {
                const itemNeedDone = data?.order?.items?.find(
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
        const items: ItemType[] =
            data?.items?.filter((item: ItemType) => item.isUnsend) || [];
        if (items.length > 0) {
            alert('Please send all cart to bill');
            return;
        }
        navigation(`${BASE_ROUTER.TABLE_BILL}?${cartInfo}`);
    };
    const goTableBill = () => {
        navigation(`${BASE_ROUTER.TABLE_BILL}${window.location.search}`);
    };
    const SendCart = (isSendThenGo?: boolean) => {
        let CustomerName =
            cartItems[indexTable]?.carts[selectedCart]?.firstname;
        if (CustomerName?.includes('Guest')) {
            createCart({
                username: 'Diner ' + (selectedCart + 1),
                numberOfCustomer: 1,
                finishAction: isSendThenGo ? goTableBill : undefined,
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
                finishAction: isSendThenGo ? goTableBill : undefined,
            });
        }
    };
    const createCart = ({
        username,
        numberOfCustomer = 1,
        phoneNumber,
        finishAction,
    }: {
        username?: string;
        numberOfCustomer?: number;
        phoneNumber?: string;
        finishAction?: () => void;
    }) => {
        const items: ItemType[] =
            data?.items.filter((item: ItemType) => item.isUnsend) || [];
        // let isNeedInput = false;
        const carts = items.map((item: ItemType) => {
            if (item.is_configurable) {
                let result: any = {
                    sku: item.id,
                    quantity: item.quantity,
                    parent_sku: item.product.sku,
                    note: item.note,
                };
                if (item?.open_price) {
                    // const custom_price =
                    //     item?.custom_price || item.prices.price.value||0;
                    // if (custom_price > 0) {
                    result = {
                        ...result,
                        custom_price:
                            item?.custom_price || item.prices.price.value,
                    };
                    // } else {
                    // isNeedInput = true;
                    // }
                }
                return result;
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
            let result: any = {
                sku: item.product.sku,
                quantity: item.quantity,
                note: item.note,
            };
            if (item?.open_price) {
                // const custom_price =
                //     item?.custom_price || item.prices.price.value;
                // if (custom_price > 0) {
                result = {
                    ...result,
                    custom_price: item?.custom_price || item.prices.price.value,
                };
                // } else {
                // isNeedInput = true;
                // }
            }
            return result;
        });
        // if (isNeedInput) {
        //     setIsNeedRequire(true);
        //     return;
        // }
        if (isCartIdFromLocal(data?.id || '')) {
            addCart(
                carts,
                username || '',
                numberOfCustomer,
                table?.is_counter == 1 ? true : false,
                phoneNumber,
            )
                .then(() => {
                    if (finishAction) {
                        finishAction();
                    }
                })
                .catch((e) => console.log(e));
        } else {
            addMoreCart(data?.id || '', carts)
                .then(() => {
                    if (finishAction) {
                        finishAction();
                    }
                })
                .catch((e) => console.log(e));
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

    const [showEditPrice, setShowEditPrice] = useState({
        show: false,
        price: 0,
        index: -1,
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
                                goViewBill(data?.order_id || '');
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
    const [noteSelectValue, setNoteSelectValue] = useState<any>('');

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
                if (res.data?.merchantGetOrderInvoices?.invoice?.length > 0) {
                    localStorage.setItem(
                        'split_bill_data',
                        JSON.stringify(res.data?.merchantGetOrderInvoices),
                    );
                    navigation(BASE_ROUTER.TABLE_BILL_CHECKOUT);
                } else {
                    navigation(
                        `${BASE_ROUTER.BILL_DETAIL}?orderId=${res.data?.merchantGetOrderInvoices?.order?.order_id}`,
                    );
                }
            })
            .catch(() => {
                console.log('error');
            });
    };

    const onSubmitEditPrice = (custom_price: number) => {
        const items = data?.items[showEditPrice.index];
        if (items?.uid) {
            handleUpdatePriceItem({
                cartId: data?.id || '',
                id: items?.id || '',
                price: custom_price,
            });
        } else {
            customOpenPriceForItem({
                index: showEditPrice.index,
                custom_price,
            });
        }

        setShowEditPrice({
            ...showEditPrice,
            show: false,
            price: custom_price,
        });
    };

    const onEditOpenPrice = (index: number, item: ItemType) => {
        setShowEditPrice({
            show: true,
            price: item?.custom_price ?? 0,
            index: index ?? 0,
        });
    };

    return data ? (
        <StyledCartBorder
            style={{
                minHeight: 280,
                padding: ismobile ? 0 : 16,
                backgroundColor: ismobile ? 'transparent' : theme.nEUTRALBase,
                border: ismobile ? '0px' : `1px solid ${theme.nEUTRALLine}`,
            }}
        >
            <ModalEditPrice
                isModalOpen={showEditPrice.show}
                onCancel={() => {
                    setShowEditPrice({ show: false, price: 0, index: -1 });
                }}
                onSubmit={onSubmitEditPrice}
                custom_price={showEditPrice.price}
            />
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
            <div style={{ minHeight: ismobile ? 84 : 200 }}>
                {data?.items?.length > 0 &&
                    data?.items?.map((item: ItemType, index: any) => {
                        const orderItems =
                            data?.order?.items &&
                            data?.order?.items?.length > index
                                ? data?.order?.items[index]
                                : undefined;

                        return (
                            <RenderItemNew
                                InputNoteItemBundleFromCart={
                                    InputNoteItemBundleFromCart
                                }
                                data={data}
                                index={index}
                                item={item}
                                loadingCardTable={loadingCardTable}
                                orderItems={orderItems}
                                setIsOpenModalCancel={setIsOpenModalCancel}
                                setItemSelected={setItemSelected}
                                setNoteSelectValue={setNoteSelectValue}
                                setShowNoteModalState={setShowNoteModalState}
                                setUpdate={setUpdate}
                                showMenu={showMenu}
                                targetRef={targetRef}
                                updateQuantityItemFromCart={
                                    updateQuantityItemFromCart
                                }
                                updateStatusItemServer={updateStatusItemServer}
                                key={index}
                                onRemoveItem={onRemoveItem}
                                onEditOpenPrice={() => {
                                    onEditOpenPrice(index, item);
                                }}
                            />
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
                            height: ismobile ? 84 : 160,
                            backgroundColor: theme.nEUTRALBase,
                            padding: 12,
                            borderRadius: 8,
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
                        paddingRight: ismobile ? 0 : 16,
                    }}
                >
                    {data?.prices?.subtotal_excluding_tax?.value ? (
                        <Row justify={'space-between'}>
                            <Text style={{ fontSize: 16 }}>Subtotal</Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                }}
                            >
                                {' $'} {formatNumberWithCommas(total)}{' '}
                            </Text>
                        </Row>
                    ) : (
                        <></>
                    )}
                    {data?.prices?.applied_taxes &&
                    data?.prices?.applied_taxes?.length > 0 &&
                    data?.prices?.applied_taxes[0]?.amount ? (
                        <Row justify={'space-between'}>
                            <Text style={{ fontSize: 16 }}>Tax</Text>
                            <Text
                                style={{
                                    fontSize: 14,

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
                    {data?.tip_amount &&
                    data?.tip_amount > 0 &&
                    data?.tip_amount ? (
                        <Row justify={'space-between'}>
                            <Text style={{ fontSize: 16 }}>Tip</Text>
                            <Text
                                style={{
                                    fontSize: 14,

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
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}
                            >
                                <Text style={{ fontSize: 14 }}>
                                    - ${formatNumberWithCommas(-totalDiscount)}
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
                                        color: theme.sECONDARY2Default,
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
                                <Text style={{ fontSize: 16 }}>New Items</Text>
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
