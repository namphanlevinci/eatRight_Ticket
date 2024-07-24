import { Col, Divider, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect } from 'react';
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

export default function OrderFooter({
    cart,
    total,
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
    const { theme } = useTheme();
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
                                parseInt(
                                    `${cart?.prices?.total_canceled?.value}`,
                                ),
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
                            color: theme.pRIMARY6Primary,
                        }}
                    />
                </div>
                <div>
                    <ButtonSubmit
                        title="Go Bill"
                        onClick={() => goTableBill()}
                    />
                </div>
            </Col>
        </Row>
    );
}
