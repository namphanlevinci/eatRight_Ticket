import { Divider, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect, useMemo, useState } from 'react';
import RenderBillInfomationRow from './components/billInfo';
import ButtonOptions from './components/buttonOptions';
import ButtonSubmit from './components/buttonSubmit';
import { CartItemType, ItemType } from 'context/cartType';
import { formatNumberWithCommas } from 'utils/format';
import { useTableBill } from './useTableBill';
import LoadingModal from 'components/modal/loadingModal';
import { ColStyled } from './styleds';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import { roundTo } from 'utils/number';
import ModalPosDevices from './components/ModalPosDevices';
import LoadingModalPayment from 'components/modal/loadingModalPayment';
import ModalInput from 'components/modal/ModalInput';
import { useCouponCart } from 'pages/Table/Cart/useCouponCart';
import ModalTip from 'components/modal/ModalTip';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
import ModalPosDevicesDJV from './components/ModalPosDevicesDJV';
import ModalOtherMethod from './components/ModalOtherMethod';
import ChangeModal from 'components/modal/ChangeModal';
import ModalPaySuccess from 'components/modal/ModalPaySuccess';
import RenderDiscountRow from './components/renderDiscountRow';

export default function ColRight({
    cart,
    total,
    listItems,
    numbersSplit,
    isSplitBill,
    openModalSplitBill,
    SplitBillButton,
}: {
    cart?: CartItemType;
    setCart?: any;
    total: number;
    listItems?: {
        guestId: string;
        items: ItemType[];
    }[];
    numbersSplit?: number;
    isSplitBill?: boolean;
    openModalSplitBill?: () => void;
    SplitBillButton?: any;
}) {
    // const [customerName, setCustomerName] = React.useState<any>(
    //     cart?.firstname,
    // );

    const {
        handleCheckOut,
        loading,
        contextHolder,
        paymentMethod,
        setPaymentMethod,
        handleSplitEven,
        handleSplitByItem,
        isVisibleModalPos,
        setVisibleMoalPos,
        handlePOSPayment,
        pos_Loading,
        hasGivenTip,
        handleSetTip,
        isVisibleModalPosDJV,
        setVisibleMoalPosDJV,
        handlePOSPaymentWithDJV,
        onCloseProcessingPayment,
        showModalErrorPayment,
        isVisibleModalOtherMethod,
        setVisibleModalOtherMethod,
        handleOtherPayment,
        isModalPaySuccess,
        setModalPaySuccess,
        modalChange,
        setModalChange,
        orderInfo,
        onCancelCheckout,
        dataInvoices,
    } = useTableBill();

    // useEffect(() => {
    //     setCustomerName(cart?.firstname);
    // }, [cart]);
    const [tip, setTip] = useState<any>(undefined);
    const [tipPercent, setTipPercent] = useState(0);
    const [modalDiscount, setModalDiscount] = useState(false);
    const [modalTip, setModalTip] = useState(false);
    const {
        handleAddCoupon,
        // handleRemoveCoupon,
        loading: loadingCoupon,
    } = useCouponCart();
    const { theme } = useTheme();
    const [value, setValue] = React.useState('');
    const [isClickProceed, setIsClickProceed] = useState(false);
    const handleChange = (e: any) => {
        const value = e?.target?.value;
        if (value?.length <= 50) {
            setValue(e?.target.value);
        }
    };

    const handleProceed = () => {
        if (isSplitBill) {
            if (numbersSplit && numbersSplit > 1) {
                handleSplitEven(numbersSplit);
            } else {
                const newData = listItems?.map((item) => {
                    return {
                        guestId: item.guestId,
                        items: item.items.map((data) => {
                            return {
                                quantity: data.quantity,
                                sku: data.product.sku,
                            };
                        }),
                    };
                });

                handleSplitByItem(newData);
            }
        } else {
            if (paymentMethod === 'other') {
                handleOtherPayment(value);
                return;
            }
            handleCheckOut();
        }
    };

    useEffect(() => {
        if (
            hasGivenTip &&
            paymentMethod !== 'cashondelivery' &&
            isClickProceed
        ) {
            handleProceed();
        }
    }, [hasGivenTip]);
    useEffect(() => {
        if (cart?.tip_amount) {
            setTip(cart?.tip_amount);
        }
    }, [cart?.tip_amount]);

    const isMobile = useMediaQuery({
        query: '(max-width: 767px)',
    });
    const totalMoney = useMemo(
        () =>
            (cart?.prices?.subtotal_excluding_tax?.value || 0) -
            (cart?.prices?.total_canceled_without_tax?.value || 0),
        [cart],
    );

    const Tax = useMemo(
        () => (cart?.prices?.applied_taxes?.[0]?.tax_percent || 0) / 100,
        [cart],
    );

    const totalDiscount = useMemo(
        () =>
            roundTo(
                (cart?.prices?.discount?.amount?.value || 0) +
                    (cart?.prices?.total_items_canceled_discount?.value || 0),
                2,
            ),
        [cart],
    );

    const grandTotal = useMemo(
        () =>
            (totalMoney + totalDiscount) * (Tax + 1) + (cart?.tip_amount || 0),
        [totalMoney, totalDiscount, Tax, cart],
    );
    const isNewPriceForListItems = useMemo(() => {
        let total = 0;
        listItems?.forEach(({ items }) => {
            const totalTmp = items.reduce((acc, item) => {
                const price =
                    (item.prices.price.value * item.quantity -
                        (item.prices?.total_item_discount?.value || 0)) *
                    (1 + Tax);
                return (
                    acc +
                    (item.status === 'cancel' ? 0 : price + tipPercent * price)
                );
            }, 0);
            total += totalTmp;
        });
        return grandTotal / total || 1;
    }, [grandTotal, listItems]);

    return (
        <>
            <ColStyled
                style={{
                    width: 257,
                    marginRight: isMobile ? 0 : 24,
                    padding: isMobile ? 16 : 0,
                }}
            >
                {modalChange &&
                    !isSplitBill &&
                    paymentMethod === 'cashondelivery' && (
                        <ChangeModal
                            isModalOpen={modalChange}
                            grandTotal={grandTotal}
                            onClose={() => setModalChange(false)}
                            onSubmit={handleProceed}
                        />
                    )}
                <ModalInput
                    title="Input your coupon "
                    isModalOpen={modalDiscount}
                    onCancel={() => {
                        setModalDiscount(false);
                    }}
                    onSubmit={async (values: any) => {
                        // if (
                        //     cart?.applied_coupons &&
                        //     cart?.applied_coupons?.length > 0
                        // ) {
                        //     await handleRemoveCoupon(cart?.id || '').then(
                        //         () => {
                        //             handleAddCoupon(cart?.id || '', values)
                        //                 .catch(() => {
                        //                     handleAddCoupon(
                        //                         cart?.id || '',
                        //                         values,
                        //                     );
                        //                 })
                        //                 .finally(() => {
                        //                     setModalDiscount(false);
                        //                 });
                        //         },
                        //     );
                        //     return;
                        // }
                        handleAddCoupon(cart?.id || '', values);
                        setModalDiscount(false);
                    }}
                />
                {modalTip && (
                    <ModalTip
                        isModalOpen={modalTip}
                        onCancel={() => {
                            setModalTip(false);
                        }}
                        onSubmit={async (values: any) => {
                            setTip(values);
                            setTipPercent(
                                values /
                                    ((cart?.prices.grand_total.value || 0) -
                                        (cart?.prices?.total_canceled?.value ||
                                            0)),
                            );

                            await handleSetTip(values);
                            setModalTip(false);
                        }}
                        total={(totalMoney + totalDiscount) * (Tax + 1)}
                        totalWithoutTax={
                            total -
                            (cart?.prices?.total_canceled_without_tax?.value ||
                                0)
                        }
                    />
                )}
                {isVisibleModalPos && (
                    <ModalPosDevices
                        isVisibleModalPos={isVisibleModalPos}
                        setVisibleMoalPos={setVisibleMoalPos}
                        onPressOK={(pos_id: string) => {
                            handlePOSPayment(pos_id);
                        }}
                    />
                )}
                <ModalOtherMethod
                    isVisible={isVisibleModalOtherMethod}
                    setVisible={setVisibleModalOtherMethod}
                    onPressOK={(value: string) => {
                        handleOtherPayment(value);
                    }}
                />
                {isVisibleModalPosDJV && (
                    <ModalPosDevicesDJV
                        isVisibleModalPos={isVisibleModalPosDJV}
                        setVisibleMoalPos={setVisibleMoalPosDJV}
                        onPressOK={(pos_id: number) => {
                            handlePOSPaymentWithDJV(pos_id, {
                                cart_id: cart?.id,
                            });
                        }}
                        onCancel={() => {
                            showModalErrorPayment();
                            onCancelCheckout({
                                variables: {
                                    cart_id: cart?.id,
                                },
                            });
                        }}
                    />
                )}
                {contextHolder}
                <LoadingModal showLoading={loading || loadingCoupon} />
                <LoadingModalPayment
                    showLoading={pos_Loading}
                    title="Processing ..."
                    onClose={onCloseProcessingPayment}
                />
                <div style={{ marginTop: isMobile ? '-12px' : 0 }}>
                    <RenderBillInfomationRow
                        title="Subtotal"
                        value={`$${formatNumberWithCommas(totalMoney)}`}
                    />

                    {cart?.prices?.discounts && (
                        <RenderDiscountRow
                            title="Discount"
                            value={
                                cart?.prices?.discounts.length > 0
                                    ? cart?.prices?.discounts[0].label
                                    : 'ADD CODE'
                            }
                            textRightStyle={{
                                color:
                                    cart?.prices?.discounts.length > 0
                                        ? theme.sUCCESS2Default
                                        : theme.pRIMARY6Primary,
                            }}
                            valueDiscount={totalDiscount}
                            onRightClick={() => setModalDiscount(true)}
                        />
                    )}
                    {cart?.prices?.applied_taxes &&
                    cart?.prices?.applied_taxes[0]?.amount ? (
                        <RenderBillInfomationRow
                            title={`Tax (${Tax * 100}%)`}
                            value={
                                <Text
                                    style={{
                                        color: '#4A505C',
                                        fontWeight: 600,
                                    }}
                                >{`$${formatNumberWithCommas(
                                    (totalMoney + totalDiscount) * Tax,
                                )}`}</Text>
                            }
                        />
                    ) : (
                        <></>
                    )}

                    {cart?.prices?.discounts && (
                        <RenderBillInfomationRow
                            title={`Tip `}
                            value={
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: theme.pRIMARY6Primary,
                                            fontWeight: 600,
                                            marginLeft: 16,
                                        }}
                                    >
                                        {tip
                                            ? `$${formatNumberWithCommas(tip)}`
                                            : `ADD TIP`}
                                    </Text>
                                    <div
                                        style={{
                                            marginTop: 4,
                                            marginRight: '-4px',
                                        }}
                                    >
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            }
                            textRightStyle={{
                                color:
                                    tip > 0 ? 'white' : theme.pRIMARY6Primary,
                            }}
                            onRightClick={() => setModalTip(true)}
                        />
                    )}
                    {/* <RenderBillInfomationRow title="Taxes" value="$10.99" />
                <RenderBillInfomationRow title="Service fee" value="$5.99" /> */}
                    <Divider
                        style={{
                            borderColor: theme.nEUTRALLine,
                            marginBottom: 36,
                        }}
                    />

                    <RenderBillInfomationRow
                        title="Grand Total"
                        value={`$${formatNumberWithCommas(grandTotal)} `}
                        textRightStyle={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: theme.pRIMARY6Primary,
                        }}
                    />
                    <RenderBillInfomationRow
                        title="Split Bill"
                        value={
                            <Row justify={'end'} style={{ marginTop: 20 }}>
                                <SplitBillButton />
                            </Row>
                        }
                        textRightStyle={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: theme.pRIMARY6Primary,
                        }}
                        marginBlock={8}
                    />
                </div>
                {isSplitBill ? (
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                cursor: 'pointer',
                            }}
                            onClick={openModalSplitBill}
                        >
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: '400',
                                    color: theme.pRIMARY6Primary,
                                }}
                            >
                                {numbersSplit && numbersSplit > 1
                                    ? `Split evenly`
                                    : 'Split by items'}
                            </Text>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: 'auto',
                                    color: theme.tEXTPrimary,
                                }}
                            >
                                Change
                                <ArrowRightIcon color="#4A505C" />
                            </div>
                        </div>
                        {listItems?.length === 0 &&
                        numbersSplit &&
                        numbersSplit > 1
                            ? Array.from(
                                  { length: numbersSplit },
                                  (_, index) => (
                                      <RenderSplitBillGuest
                                          key={index}
                                          title={`Guest ${index + 1}`}
                                          total={grandTotal / numbersSplit}
                                          onPress={openModalSplitBill}
                                      />
                                  ),
                              )
                            : listItems?.map(({ guestId, items }) => {
                                  const total = items.reduce((acc, item) => {
                                      const price =
                                          (item.prices.price.value *
                                              item.quantity -
                                              (item.prices?.total_item_discount
                                                  ?.value || 0)) *
                                          (1 + Tax);
                                      return (
                                          acc +
                                          (item.status === 'cancel'
                                              ? 0
                                              : price + tipPercent * price)
                                      );
                                  }, 0);
                                  return (
                                      total > 0 && (
                                          <RenderSplitBillGuest
                                              key={guestId}
                                              title={guestId}
                                              total={roundTo(
                                                  total *
                                                      isNewPriceForListItems,
                                                  2,
                                              )}
                                              onPress={openModalSplitBill}
                                          />
                                      )
                                  );
                              })}
                    </div>
                ) : (
                    <div style={{ marginTop: 24 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                marginBottom: 16,
                            }}
                        >
                            Payment method
                        </Text>

                        <ButtonOptions
                            title="Cash"
                            isSelected={paymentMethod === 'cashondelivery'}
                            onClick={() => setPaymentMethod('cashondelivery')}
                            selectedPaymentMethod={paymentMethod}
                            note={value}
                            onChangeNote={handleChange}
                        />
                        <div style={{ marginTop: 15 }} />
                        <ButtonOptions
                            title="Credit Card"
                            isSelected={paymentMethod === 'pos_djv'}
                            onClick={() => setPaymentMethod('pos_djv')}
                            selectedPaymentMethod={paymentMethod}
                            note={value}
                            onChangeNote={handleChange}
                        />
                        <div style={{ marginTop: 15 }} />
                        <ButtonOptions
                            title="Other"
                            isSelected={paymentMethod === 'other'}
                            onClick={() => setPaymentMethod('other')}
                            selectedPaymentMethod={paymentMethod}
                            note={value}
                            onChangeNote={handleChange}
                        />
                        {/* <ButtonOptions
                        title="POS (ARISE)"
                        isSelected={paymentMethod === 'pos'}
                        onClick={() => setPaymentMethod('pos')}
                    /> */}
                    </div>
                )}
                <div style={{ margin: '40px 0 16px' }}>
                    <ButtonSubmit
                        title="Proceed Payment"
                        onClick={() => {
                            setIsClickProceed(true);
                            if (
                                paymentMethod === 'cashondelivery' &&
                                !isSplitBill
                            ) {
                                setModalChange(true);
                            } else {
                                handleProceed();
                            }
                        }}
                    />
                </div>
            </ColStyled>

            <ModalPaySuccess
                isVisible={isModalPaySuccess}
                onClose={() => {
                    setModalPaySuccess(false);
                }}
                order_id={orderInfo?.order_id}
                invoice_number={
                    dataInvoices?.merchantGetOrderInvoices?.invoice[0]?.number
                }
            />
        </>
    );
}

const RenderSplitBillGuest = ({
    title,
    total,
    onPress,
}: {
    title: string;
    total: number;
    onPress?: () => void;
}) => {
    const { theme } = useTheme();
    return (
        <Row
            justify={'space-between'}
            align={'middle'}
            style={{ marginTop: 12, marginLeft: 16, cursor: 'pointer' }}
            onClick={onPress}
        >
            <Text style={{ color: theme.tEXTPrimary, fontWeight: '600' }}>
                {title}
            </Text>
            <Row align={'middle'}>
                <Text style={{ color: theme.tEXTPrimary, fontWeight: '600' }}>
                    ${formatNumberWithCommas(total)}
                </Text>
            </Row>
        </Row>
    );
};
