import { CusTomRow, StyledCartBorder } from '../styled';
import { Col, Divider, Row } from 'antd';
import { Text } from 'components/atom/Text';
import UpDownNumber from 'components/UpdownNumber';
import { Button } from 'components/atom/Button';
import { formatNumberWithCommas } from 'utils/format';
import { useCart } from 'context/cartContext';
import CartIcon from 'assets/icons/cartIcon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useMediaQuery } from 'react-responsive';
import { ItemType } from 'context/cartType';
import { useAddCart } from '../useAddCart';
import LoadingModal from 'components/modal/loadingModal';
import { isCartIdFromLocal } from 'utils/isNumericId';
import React, { useEffect, useMemo, useState } from 'react';
import { useMenuContext } from 'pages/Table/context/MenuContext';
import InfoCartModal from 'components/modal/infoCartModal';
import NoteIcon from 'assets/icons/noteIcon';
import CustomTag from 'components/atom/Tag/CustomTag';
import { getTagStyled } from 'utils/tag';
import RenderNote from './RenderNote';
import { useTheme } from 'context/themeContext';
import { DividedDashed } from 'pages/BillDetail/styled';
import { roundTo } from 'utils/number';
import ModalInput from 'components/modal/ModalInput';
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
    } = useCart();
    const { addCart, loading, addMoreCart } = useAddCart();
    const navigation = useNavigate();
    const [isNewItem, setIsNewItem] = React.useState(false);
    const [isAllDone, setIsAllDone] = useState(false);
    const [searchParams] = useSearchParams();
    const selectedCart = parseInt(searchParams.get('cartIndex') || '0');
    useEffect(() => {
        if (data?.items?.length > 0) {
            const items: ItemType[] = data?.items.filter(
                (item: ItemType) => item.isUnsend,
            );
            if (items.length > 0) {
                setIsNewItem(true);
            } else {
                setIsNewItem(false);
            }
            const itemNeedDone = data?.items.find(
                (item: ItemType) => item.status !== 'done',
            );
            if (itemNeedDone) {
                setIsAllDone(false);
            } else {
                setIsAllDone(true);
            }
        } else {
            setIsNewItem(false);
        }
    }, [data?.items?.length]);
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
    const goOrderList = () => {
        navigation(`${BASE_ROUTER.TABLE_Order}?${cartInfo}`);
    };
    const SendCart = () => {
        let CustomerName =
            cartItems[indexTable]?.carts[selectedCart]?.firstname;
        if (CustomerName?.includes('Guest')) {
            setIsModalOpen(true);
        } else {
            setCustomerName(CustomerName, selectedCart, indexTable);
            createCart({
                username: CustomerName,
                numberOfCustomer:
                    cartItems[indexTable]?.carts[selectedCart]
                        ?.numberOfCustomer,
            });
        }
        setIsNewItem(false);
    };
    const createCart = ({
        username,
        numberOfCustomer = 1,
    }: {
        username?: string;
        numberOfCustomer?: number;
    }) => {
        if (username) {
            setIsModalOpen(false);
        }

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
                table?.name?.toLowerCase()?.includes('counter') ? true : false,
            );
        } else {
            addMoreCart(data.id, carts);
        }
    };
    const { setUpdate, targetRef, showMenu } = useMenuContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { theme } = useTheme();
    const total = useMemo(
        () =>
            (data?.prices?.subtotal_excluding_tax?.value || 0) -
            (data?.prices?.total_canceled_without_tax?.value || 0),
        [data],
    );

    const Tax = useMemo(
        () => (data?.prices?.applied_taxes?.[0]?.tax_percent || 10) / 100,
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
        navigation(`${BASE_ROUTER.BILL_DETAIL}?orderId=${id}`);
    };
    const onCompleteService = () => {
        console.log('');
    };
    return data ? (
        <StyledCartBorder
            style={{
                minHeight: 280,
                padding: 16,
                backgroundColor: theme.nEUTRALBase,
                border: `1px solid ${theme.nEUTRALLine}`,
            }}
        >
            <LoadingModal showLoading={loading} />
            <InfoCartModal
                isModalOpen={isModalOpen}
                onCancel={() => setIsModalOpen(!isModalOpen)}
                onSubmit={(e: { username: string; numberOfCustomer: number }) =>
                    createCart(e)
                }
                table={table}
            />
            <ModalInput
                title="Input your note"
                isModalOpen={showNoteModal.show}
                onCancel={() =>
                    setShowNoteModalState({ ...showNoteModal, show: false })
                }
                onSubmit={(e: any) => {
                    setShowNoteModalState({ ...showNoteModal, show: false });
                    InputNoteItemFromCart(showNoteModal.index, e);
                }}
            />
            <div style={{ minHeight: 200 }}>
                {data?.items?.map((item: any, index: any) => {
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
                                                width: 154,
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
                                                        setShowNoteModalState({
                                                            index: index,
                                                            show: true,
                                                        });
                                                    }}
                                                >
                                                    {item.isUnsend && (
                                                        <NoteIcon />
                                                    )}
                                                </div>
                                            )}
                                            <UpDownNumber
                                                quantity={item.quantity}
                                                setQuantity={(e: number) => {
                                                    updateQuantityItemFromCart(
                                                        index,
                                                        e,
                                                    );
                                                }}
                                                isSend={!item.isUnsend}
                                                disableUp={!showMenu}
                                            />
                                        </Row>
                                    </Row>
                                </Col>
                            </Row>
                            {item?.bundle_options?.map(
                                (bundle: any, bundleIndex: number) => {
                                    return (
                                        <div key={bundle.id}>
                                            {bundle?.values?.map(
                                                (product: any, idx: number) => {
                                                    return (
                                                        <>
                                                            <Row
                                                                style={{
                                                                    height: 40,
                                                                }}
                                                                key={`bundle ${idx}`}
                                                                align={'middle'}
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
                                                                        {' - '}
                                                                        {formatNumberWithCommas(
                                                                            product.price,
                                                                        )}{' '}
                                                                        {'  '}x
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
            </div>
            <div style={{ paddingRight: ismobile ? 0 : 180 }}>
                <Divider dashed style={{ borderColor: '#666666' }} />
            </div>
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
                            <Text>{formatNumberWithCommas(totalDiscount)}</Text>
                        </Col>
                    </Row>
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
                <Col style={ismobile ? { width: '100%' } : {}}>
                    <Row justify={'space-between'}>
                        <Col>
                            {showMenu ? (
                                <Button
                                    style={{
                                        width: 154,
                                        height: 44,
                                        gap: 10,
                                        border: `0px solid ${theme.pRIMARY6Primary}`,
                                    }}
                                    onClick={() => isNewItem && SendCart()}
                                    isDisable={!isNewItem}
                                    disabled={!isNewItem}
                                    background={theme.pRIMARY6Primary}
                                    color={theme.nEUTRALBase}
                                >
                                    <CartIcon isDisabled={!isNewItem} />
                                    Send
                                </Button>
                            ) : (
                                <Button
                                    style={{
                                        width: 154,
                                        height: 44,
                                        border: `0px solid ${theme.pRIMARY6Primary}`,
                                    }}
                                    onClick={() => goViewBill(data?.order_id)}
                                    background={theme.pRIMARY6Primary}
                                    color={theme.nEUTRALBase}
                                >
                                    View Bill
                                </Button>
                            )}
                        </Col>
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
                    </Row>
                    <Row>
                        {isAllDone ? (
                            showMenu ? (
                                <Button
                                    style={{
                                        width: '100%',
                                        height: 44,
                                        border: 0,
                                    }}
                                    onClick={goBill}
                                    isDisable={
                                        isNewItem || data?.items?.length === 0
                                    }
                                    background={theme.pRIMARY6Primary}
                                    color={theme.nEUTRALBase}
                                >
                                    Bill
                                </Button>
                            ) : (
                                <Button
                                    style={{
                                        width: '100%',
                                        height: 44,
                                        border: 0,
                                    }}
                                    onClick={onCompleteService}
                                    isDisable={
                                        isNewItem || data?.items?.length === 0
                                    }
                                    background={theme.pRIMARY6Primary}
                                    color={theme.nEUTRALBase}
                                >
                                    Complete Service
                                </Button>
                            )
                        ) : (
                            <Button
                                style={{
                                    width: '100%',
                                    height: 44,
                                    background: theme.sUCCESS2Default,
                                    border: 0,
                                }}
                                onClick={() =>
                                    !cartItems[indexTable]?.carts[
                                        selectedCart
                                    ].firstname?.includes('Guest') &&
                                    goOrderList()
                                }
                                isDisable={cartItems[indexTable]?.carts[
                                    selectedCart
                                ].firstname?.includes('Guest')}
                            >
                                Order List
                            </Button>
                        )}
                    </Row>
                </Col>
            </CusTomRow>
        </StyledCartBorder>
    ) : (
        <></>
    );
}
