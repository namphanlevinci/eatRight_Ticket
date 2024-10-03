import { Divider, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect, useMemo, useState } from 'react';
import InputInfoCart from './components/inputInfo';
import RenderBillInfomationRow from './components/billInfo';
import ButtonOptions from './components/buttonOptions';
import ButtonSubmit from './components/buttonSubmit';
import { CartItemType, ItemType } from 'context/cartType';
import { formatNumberWithCommas } from 'utils/format';
import { useTableBill } from './useTableBill';
import LoadingModal from 'components/modal/loadingModal';
import { ColStyled } from './styleds';
import AccountIcon from 'assets/icons/accountIcon';
import { ArrowRightIcon } from 'assets/icons/arrowRight';
import { roundTo } from 'utils/number';
import ModalPosDevices from './components/ModalPosDevices';
import LoadingModalPayment from 'components/modal/loadingModalPayment';
import ModalInput from 'components/modal/ModalInput';
import { useCouponCart } from 'pages/Table/Cart/useCouponCart';
import ModalTip from 'components/modal/ModalTip';
import { useTheme } from 'context/themeContext';
import RenderDiscountRow from './components/renderDiscountRow';
import { useMediaQuery } from 'react-responsive';
import ModalPosDevicesDJV from './components/ModalPosDevicesDJV';
import ModalOtherMethod from './components/ModalOtherMethod';
import ChangeModal from 'components/modal/ChangeModal';

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
    const [customerName, setCustomerName] = React.useState<any>(
        cart?.firstname,
    );

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
    } = useTableBill();

    useEffect(() => {
        setCustomerName(cart?.firstname);
    }, [cart]);
    const [tip, setTip] = useState<any>(undefined);
    const [tipPercent, setTipPercent] = useState(0);
    const [modalDiscount, setModalDiscount] = useState(false);
    const [modalTip, setModalTip] = useState(false);
    const [modalChange, setModalChange] = useState(false);
    const { handleAddCoupon } = useCouponCart();
    const { theme } = useTheme();
    const [value, setValue] = React.useState('');
    const handleChange = (e: any) => {
        const value = e?.target?.value;
        if (value?.length <= 50) {
            setValue(e?.target.value);
        }
    };

    const handleProceed = () => {
        if (tip === undefined) {
            setModalTip(true);
            return;
        }
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
        if (cart?.tip_amount) {
            setTip(cart?.tip_amount);
        }
    }, [cart?.tip_amount]);

    useEffect(() => {
        if (hasGivenTip) {
            setModalChange(true);
        }
    }, [hasGivenTip]);

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
        <ColStyled style={{ width: 257 }}>
            {modalChange && paymentMethod === 'cashondelivery' && (
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
                onSubmit={(values: any) => {
                    handleAddCoupon(cart?.id || '', values);
                    setModalDiscount(false);
                }}
            />
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
                                (cart?.prices?.total_canceled?.value || 0)),
                    );

                    await handleSetTip(values);
                    handleProceed();
                    setModalTip(false);
                }}
                total={(totalMoney + totalDiscount) * (Tax + 1)}
                totalWithoutTax={
                    total -
                    (cart?.prices?.total_canceled_without_tax?.value || 0)
                }
            />
            <ModalPosDevices
                isVisibleModalPos={isVisibleModalPos}
                setVisibleMoalPos={setVisibleMoalPos}
                onPressOK={(pos_id: string) => {
                    handlePOSPayment(pos_id);
                }}
            />
            <ModalOtherMethod
                isVisible={isVisibleModalOtherMethod}
                setVisible={setVisibleModalOtherMethod}
                onPressOK={(value: string) => {
                    handleOtherPayment(value);
                }}
            />
            <ModalPosDevicesDJV
                isVisibleModalPos={isVisibleModalPosDJV}
                setVisibleMoalPos={setVisibleMoalPosDJV}
                onPressOK={(pos_id: number) => {
                    handlePOSPaymentWithDJV(pos_id);
                }}
                onCancel={() => {
                    showModalErrorPayment();
                }}
            />
            {contextHolder}
            <LoadingModal showLoading={loading} />
            <LoadingModalPayment
                showLoading={pos_Loading}
                title="Processing ..."
                onClose={onCloseProcessingPayment}
            />
            {isMobile && (
                <Row justify={'end'} style={{ marginTop: 20 }}>
                    <SplitBillButton />
                </Row>
            )}

            <InputInfoCart
                icon={<AccountIcon />}
                value={customerName}
                setValue={setCustomerName}
                placeholder="Customer Name"
            />
            {/* <InputInfoCart
                icon={<PhoneIcon />}
                value={cusomterNumber}
                setValue={setCustomerNumber}
                placeholder="Customer Number"
            /> */}

            <div style={{ marginTop: isMobile ? 20 : 56 }}>
                <RenderBillInfomationRow
                    title="Subtotal"
                    value={`$ ${formatNumberWithCommas(totalMoney)}`}
                />

                {cart?.prices?.discounts && (
                    <RenderDiscountRow
                        title="Discount"
                        value={
                            cart?.prices?.discounts.length > 0
                                ? cart?.prices?.discounts[0].label
                                : 'Add Code'
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

                {cart?.prices?.discounts && (
                    <RenderBillInfomationRow
                        title="Tip"
                        value={
                            tip !== undefined ? (
                                <Row
                                    align={'middle'}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Text>$ {tip?.toFixed(2)}</Text>{' '}
                                    <ArrowRightIcon />
                                </Row>
                            ) : (
                                ''
                            )
                        }
                        textRightStyle={{
                            color: tip > 0 ? 'white' : theme.pRIMARY6Primary,
                        }}
                        onRightClick={() => setModalTip(true)}
                    />
                )}

                {cart?.prices?.applied_taxes &&
                cart?.prices?.applied_taxes[0]?.amount ? (
                    <RenderBillInfomationRow
                        title="Tax"
                        value={`$ ${formatNumberWithCommas(
                            (totalMoney + totalDiscount) * Tax,
                        )}`}
                    />
                ) : (
                    <></>
                )}
                {/* <RenderBillInfomationRow title="Taxes" value="$10.99" />
                <RenderBillInfomationRow title="Service fee" value="$5.99" /> */}
                <Divider style={{ borderColor: theme.nEUTRALLine }} />

                <RenderBillInfomationRow
                    title="To be paid"
                    value={`$ ${formatNumberWithCommas(grandTotal)} `}
                    textRightStyle={{
                        fontSize: 24,
                        fontWeight: '600',
                        color: theme.pRIMARY6Primary,
                    }}
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
                                fontSize: 18,
                                fontWeight: '600',
                                color: theme.pRIMARY6Primary,
                            }}
                        >
                            Split Bills
                        </Text>
                        <div style={{ marginLeft: 'auto', marginTop: 4 }}>
                            <ArrowRightIcon />
                        </div>
                    </div>
                    {listItems?.length === 0 && numbersSplit && numbersSplit > 1
                        ? Array.from({ length: numbersSplit }, (_, index) => (
                              <RenderSplitBillGuest
                                  key={index}
                                  title={`Guest ${index + 1}`}
                                  total={grandTotal / numbersSplit}
                                  onPress={openModalSplitBill}
                              />
                          ))
                        : listItems?.map(({ guestId, items }) => {
                              const total = items.reduce((acc, item) => {
                                  const price =
                                      (item.prices.price.value * item.quantity -
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
                                              total * isNewPriceForListItems,
                                              2,
                                          )}
                                          onPress={openModalSplitBill}
                                      />
                                  )
                              );
                          })}
                </div>
            ) : (
                <div style={{ marginTop: 56 }}>
                    <Text style={{ fontSize: 20, marginBottom: 16 }}>
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
            <div style={{ marginTop: 40 }}>
                <ButtonSubmit title="Proceed Payment" onClick={handleProceed} />
            </div>
        </ColStyled>
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
    return (
        <Row
            justify={'space-between'}
            align={'middle'}
            style={{ marginTop: 12, cursor: 'pointer' }}
            onClick={onPress}
        >
            <Text style={{ fontWeight: '400' }}>{title}</Text>
            <Row align={'middle'}>
                <Text style={{ fontWeight: '400' }}>
                    ${formatNumberWithCommas(total)}
                </Text>
            </Row>
        </Row>
    );
};
