import { Col, Divider, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect, useMemo } from 'react';
import { Colors } from 'themes/colors';
import { CartItemType } from 'context/cartType';
import { formatNumberWithCommas } from 'utils/format';
import LoadingModal from 'components/modal/loadingModal';
import AccountIcon from 'assets/icons/accountIcon';
import InputInfoCart from 'pages/TableBill/components/inputInfo';
import RenderBillInfomationRow from 'pages/TableBill/components/billInfo';
import ButtonSubmit from 'pages/TableBill/components/buttonSubmit';
import { BASE_ROUTER } from 'constants/router';
import { useNavigate } from 'react-router';
import { useTheme } from 'context/themeContext';
import { roundTo } from 'utils/number';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';

export default function OrderFooter({
    cart,
    loading,
    contextHolder,
}: {
    cart?: CartItemType;
    total: number;
    loading: boolean;
    contextHolder: any;
}) {
    const [customerName, setCustomerName] = React.useState<any>(
        cart?.firstname,
    );
    useEffect(() => {
        setCustomerName(cart?.firstname);
    }, [cart]);
    const navigation = useNavigate();
    const goTableBill = () => {
        navigation(`${BASE_ROUTER.TABLE_BILL}${window.location.search}`);
    };
    const onCompleteService = () => {
        console.log('');
    };
    const goBillDetail = () => {
        navigation(`${BASE_ROUTER.BILL_DETAIL}?orderId=${cart?.order_id}`);
    };
    const { theme } = useTheme();
    const totalMoney = useMemo(
        () =>
            (cart?.prices?.subtotal_excluding_tax?.value || 0) -
            (cart?.prices?.total_canceled_without_tax?.value || 0),
        [cart],
    );

    const Tax = useMemo(
        () => (cart?.prices?.applied_taxes?.[0]?.tax_percent || 10) / 100,
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
    return (
        <Row style={{ marginTop: 20 }}>
            {contextHolder}
            <LoadingModal showLoading={loading} />
            <Col
                md={{ span: 12 }}
                xs={{ span: 24 }}
                style={{ paddingInline: 20 }}
            >
                <div>
                    <InputInfoCart
                        icon={<AccountIcon />}
                        value={customerName}
                        setValue={setCustomerName}
                        placeholder="Customer Name"
                    />
                </div>
            </Col>
            {/* <InputInfoCart
                icon={<PhoneIcon />}
                value={cusomterNumber}
                setValue={setCustomerNumber}
                placeholder="Customer Number"
            /> */}
            <Col
                md={{ span: 12 }}
                xs={{ span: 24 }}
                style={{ paddingInline: 20 }}
            >
                <div>
                    <Text style={{ fontSize: 20 }}>Billing Information</Text>
                    <RenderBillInfomationRow
                        title="Total"
                        value={`$ ${formatNumberWithCommas(totalMoney)}`}
                    />
                    {cart?.prices?.discounts &&
                        cart?.prices?.discounts[0]?.amount.value && (
                            <RenderBillInfomationRow
                                title="Discounted"
                                value={`$ ${formatNumberWithCommas(
                                    totalDiscount,
                                )} `}
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
                    {cart?.tip_amount && cart?.tip_amount ? (
                        <RenderBillInfomationRow
                            title="Tip"
                            value={`$ ${cart?.tip_amount.toFixed(2)}`}
                        />
                    ) : (
                        <></>
                    )}

                    {/* <RenderBillInfomationRow title="Taxes" value="$10.99" />
                <RenderBillInfomationRow title="Service fee" value="$5.99" /> */}
                    <Divider style={{ borderColor: Colors.grey3 }} />

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
                <div>
                    {cart?.order_id && (
                        <ButtonPrimary
                            title="View Bill"
                            onClick={() => goBillDetail()}
                        />
                    )}
                    {cart?.is_active ? (
                        <ButtonSubmit
                            title="Go Bill"
                            onClick={() => goTableBill()}
                        />
                    ) : (
                        <ButtonSubmit
                            title="Complete Service"
                            onClick={() => onCompleteService()}
                        />
                    )}
                </div>
            </Col>
        </Row>
    );
}
