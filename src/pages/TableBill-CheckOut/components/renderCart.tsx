import { Text } from 'components/atom/Text';
import { InvoiceWithSplit } from '../IType';
import { Col, Row } from 'antd';
import { DividedSolid } from 'pages/BillDetail/styled';

export const RenderCart = ({ cart }: { cart: InvoiceWithSplit }) => {
    return (
        <div
            style={{
                width: '100%',
                border: `1px solid  #5F6368 `,
                background: '#161B26',
                padding: 8,
                borderRadius: 8,
                marginBottom: 16,
                cursor: 'pointer',
                paddingBottom: 16,
                flex: 1,
            }}
        >
            {cart?.items?.map((item, index) => {
                return <RenderItem key={index} item={item} />;
            })}
            <div style={{ flex: 1 }}>
                <DividedSolid color="#5F6368" />
                <RenderText
                    title="Subtotal"
                    value={`$${cart.total.subtotal.value}`}
                />
                {/* <RenderText title='Service fee' value={`$${cart.total}`}/> */}
                {cart.total.discounts.length > 0 && (
                    <RenderText
                        title="Discount"
                        value={`- $${cart.total.discounts[0].amount.value}`}
                    />
                )}
                <RenderText title="Tax" value={`$${cart.total.taxes}`} />
                <RenderText
                    title="Total"
                    value={`$${cart.total.base_grand_total.value}`}
                />
                <DividedSolid color="#5F6368" />
                <RenderText title="Tip" value={``} />
                <RenderText
                    title="Grand Total"
                    value={`$${cart.total.grand_total.value}`}
                />
            </div>
        </div>
    );
};

const RenderItem = ({ item }: { item: any }) => {
    return (
        <Row justify={'space-between'} style={{ marginTop: 16 }}>
            <Col style={{ flex: 1 }}>
                <Row>
                    <Col>
                        <Text style={{ marginRight: 8 }}>
                            {item.quantity_invoiced}X
                        </Text>
                    </Col>
                    <Col style={{ flex: 1 }}>
                        <Text>{item.product_name}</Text>
                    </Col>
                </Row>
            </Col>
            <Text>$ {item.product_sale_price.value}</Text>
        </Row>
    );
};

const RenderText = ({ title, value }: { title: string; value: any }) => {
    return (
        <Row justify={'space-between'} style={{ marginTop: 16 }}>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </Row>
    );
};