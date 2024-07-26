import { Divider, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect, useState } from 'react';
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
import { Tax } from 'context/cartContext';

export default function ColRight({
    cart,
    total,
    listItems,
    numbersSplit,
    isSplitBill,
    openModalSplitBill,
}: {
    cart?: CartItemType;
    total: number;
    listItems?: {
        guestId: string;
        items: ItemType[];
    }[];
    numbersSplit?: number;
    isSplitBill?: boolean;
    openModalSplitBill?: () => void;
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
    } = useTableBill();

    useEffect(() => {
        setCustomerName(cart?.firstname);
    }, [cart]);
    const [tip, setTip] = useState(0);
    const [modalDiscount, setModalDiscount] = useState(false);
    const [modalTip, setModalTip] = useState(false);
    const { handleAddCoupon } = useCouponCart();
    const { theme } = useTheme();
    const totalTmp =
        (cart?.prices?.subtotal_excluding_tax?.value || 0) -
        (cart?.prices?.total_canceled?.value || 0) / (1 + Tax);
    return (
        <ColStyled style={{ width: 257 }}>
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
                onSubmit={(values: any) => {
                    setTip(values);
                    setModalTip(false);
                }}
                total={cart?.prices?.grand_total?.value || 0}
            />
            <ModalPosDevices
                isVisibleModalPos={isVisibleModalPos}
                setVisibleMoalPos={setVisibleMoalPos}
                onPressOK={(pos_id: number) => {
                    handlePOSPayment(pos_id);
                }}
            />
            {contextHolder}
            <LoadingModal showLoading={loading} />
            <LoadingModalPayment
                showLoading={pos_Loading}
                title="POS Payment Processing ..."
            />
            <Text style={{ fontSize: 20 }}>Customer Information</Text>

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

            <div style={{ marginTop: 56 }}>
                <Text style={{ fontSize: 20 }}>Billing Information</Text>
                <RenderBillInfomationRow
                    title="Sub total"
                    value={`${formatNumberWithCommas(total)} $`}
                />
                {cart?.prices?.discounts && (
                    <RenderDiscountRow
                        title="Discounted"
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
                        valueDiscount={
                            cart?.prices?.discounts[0]?.amount?.value || 0
                        }
                        onRightClick={() => setModalDiscount(true)}
                    />
                )}

                {cart?.prices?.discounts && (
                    <RenderBillInfomationRow
                        title="Tip"
                        value={
                            tip > 0 ? (
                                <Row
                                    align={'middle'}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Text>$ {tip}</Text> <ArrowRightIcon />
                                </Row>
                            ) : (
                                'ADD TIP'
                            )
                        }
                        textRightStyle={{
                            color: tip > 0 ? 'white' : theme.pRIMARY6Primary,
                        }}
                        onRightClick={() => setModalTip(true)}
                    />
                )}
                {cart?.prices?.total_canceled?.value ? (
                    <RenderBillInfomationRow
                        title="Canceled Item"
                        value={`-${formatNumberWithCommas(
                            parseInt(`${cart?.prices?.total_canceled?.value}`),
                        )} $`}
                    />
                ) : (
                    <></>
                )}
                {cart?.prices?.applied_taxes &&
                cart?.prices?.applied_taxes[0]?.amount ? (
                    <RenderBillInfomationRow
                        title="Tax"
                        value={`${cart?.prices?.applied_taxes[0]?.amount?.value || 0} $`}
                    />
                ) : (
                    <></>
                )}
                {/* <RenderBillInfomationRow title="Taxes" value="$10.99" />
                <RenderBillInfomationRow title="Service fee" value="$5.99" /> */}
                <Divider style={{ borderColor: theme.nEUTRALLine }} />

                <RenderBillInfomationRow
                    title="To be paid"
                    value={`${formatNumberWithCommas(
                        (cart?.prices.grand_total.value || 0) -
                            (cart?.prices?.total_canceled?.value || 0) +
                            tip,
                    )} $`}
                    textRightStyle={{
                        fontSize: 24,
                        fontWeight: '600',
                        color: theme.pRIMARY6Primary,
                    }}
                />
            </div>
            {isSplitBill ? (
                <div>
                    <Text style={{ fontSize: 20 }}>
                        Checks {`(No included tax)`}
                    </Text>
                    {listItems?.length === 0 && numbersSplit && numbersSplit > 1
                        ? Array.from({ length: numbersSplit }, (_, index) => (
                              <RenderSplitBillGuest
                                  key={index}
                                  title={`Guest ${index + 1}`}
                                  total={totalTmp / numbersSplit}
                                  onPress={openModalSplitBill}
                              />
                          ))
                        : listItems?.map(({ guestId, items }) => {
                              const total = items.reduce((acc, item) => {
                                  return (
                                      acc +
                                      (item.status === 'cancel'
                                          ? 0
                                          : item.prices.price.value *
                                            item.quantity)
                                  );
                              }, 0);
                              return (
                                  <RenderSplitBillGuest
                                      key={guestId}
                                      title={guestId}
                                      total={roundTo(total, 2)}
                                      onPress={openModalSplitBill}
                                  />
                              );
                          })}
                </div>
            ) : (
                <div style={{ marginTop: 56 }}>
                    <Text style={{ fontSize: 20, marginBottom: 16 }}>
                        Payment options
                    </Text>

                    <ButtonOptions
                        title="Cash"
                        isSelected={paymentMethod === 'cashondelivery'}
                        onClick={() => setPaymentMethod('cashondelivery')}
                    />
                    <div style={{ marginTop: 15 }} />
                    <ButtonOptions
                        title="Online Banking"
                        isSelected={paymentMethod === 'lvc_appota'}
                        onClick={() => setPaymentMethod('lvc_appota')}
                    />
                    <div style={{ marginTop: 15 }} />
                    <ButtonOptions
                        title="POS"
                        isSelected={paymentMethod === 'pos'}
                        onClick={() => setPaymentMethod('pos')}
                    />
                </div>
            )}
            <div style={{ marginTop: 40 }}>
                <ButtonSubmit
                    title="Proceed Payment"
                    onClick={() => {
                        if (tip === 0) {
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
                            handleCheckOut();
                        }
                    }}
                />
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
                <ArrowRightIcon />
            </Row>
        </Row>
    );
};
