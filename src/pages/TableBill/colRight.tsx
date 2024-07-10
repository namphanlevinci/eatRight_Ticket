import { Divider, Row } from 'antd';
import { Text, Text20 } from 'components/atom/Text';
import React, { useEffect } from 'react';
import InputInfoCart from './components/inputInfo';
import RenderBillInfomationRow from './components/billInfo';
import { Colors } from 'themes/colors';
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
    } = useTableBill();

    useEffect(() => {
        setCustomerName(cart?.firstname);
    }, [cart]);
    return (
        <ColStyled style={{ width: 257 }}>
            {contextHolder}
            <LoadingModal showLoading={loading} />
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
                    title="Total"
                    value={`${formatNumberWithCommas(total)} $`}
                />
                {cart?.prices?.discounts && (
                    <RenderBillInfomationRow
                        title="Discounted"
                        value={`-${formatNumberWithCommas(
                            parseInt(
                                `${cart?.prices.discounts[0]?.amount?.value}`,
                            ),
                        )} $`}
                    />
                )}
                {cart?.prices?.total_canceled?.value && (
                    <RenderBillInfomationRow
                        title="Canceled Item"
                        value={`-${formatNumberWithCommas(
                            parseInt(`${cart?.prices?.total_canceled?.value}`),
                        )} $`}
                    />
                )}
                {/* <RenderBillInfomationRow title="Taxes" value="$10.99" />
                <RenderBillInfomationRow title="Service fee" value="$5.99" /> */}
                <Divider style={{ borderColor: Colors.grey3 }} />

                <RenderBillInfomationRow
                    title="To be paid"
                    value={`${formatNumberWithCommas(
                        (cart?.prices.grand_total.value || 0) -
                            (cart?.prices?.total_canceled?.value || 0),
                    )} $`}
                    textRightStyle={{
                        fontSize: 24,
                        fontWeight: '600',
                        color: Colors.primary,
                    }}
                />
            </div>
            {isSplitBill ? (
                <div>
                    Checks
                    {listItems?.length === 0 && numbersSplit && numbersSplit > 1
                        ? Array.from({ length: numbersSplit }, (_, index) => (
                              <RenderSplitBillGuest
                                  key={index}
                                  title={`Guest ${index + 1}`}
                                  total={total / numbersSplit}
                                  onPress={openModalSplitBill}
                              />
                          ))
                        : listItems?.map(({ guestId, items }) => {
                              const total = items.reduce((acc, item) => {
                                  return (
                                      acc +
                                      item.prices.price.value * item.quantity
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
                </div>
            )}
            <div style={{ marginTop: 40 }}>
                <ButtonSubmit
                    title="Proceed Payment"
                    onClick={() => handleCheckOut()}
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
            style={{ marginBottom: 16, cursor: 'pointer' }}
            onClick={onPress}
        >
            <Text20 style={{ fontWeight: '400' }}>{title}</Text20>
            <Row align={'middle'}>
                <Text20 style={{ fontWeight: '400' }}>
                    ${formatNumberWithCommas(total)}
                </Text20>
                <ArrowRightIcon />
            </Row>
        </Row>
    );
};
