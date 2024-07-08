import { Col, Row } from 'antd';
import { Text, Text18 } from 'components/atom/Text';
import { CartItemType } from 'context/cartType';
import React from 'react';
import { Colors } from 'themes/colors';
import { formatNumberWithCommas } from 'utils/format';
import { ColStyled } from './styleds';

export default function ColLeft({
    cart,
    count,
}: {
    cart?: CartItemType;
    count: number;
}) {
    return (
        <ColStyled
            style={{
                flex: 1,
                background: Colors.grey1,
                border: `1px solid ${Colors.brown5}`,
                marginRight: 16,
                borderRadius: 8,
                padding: 16,
            }}
        >
            <Text>Total {count} Items</Text>
            {cart?.items?.map((item, index) => {
                return (
                    <div key={index}>
                        <Row
                            justify={'space-between'}
                            style={{ marginTop: 32 }}
                        >
                            <Col style={{ flex: 1 }}>
                                <Row>
                                    <Col>
                                        <Text18 style={{ marginRight: 8 }}>
                                            {item.quantity}X
                                        </Text18>
                                    </Col>
                                    <Col style={{ flex: 1 }}>
                                        <Text18>{item.product.name}</Text18>
                                    </Col>
                                </Row>
                            </Col>
                            <Text18>
                                {formatNumberWithCommas(
                                    item.prices.price.value,
                                )}{' '}
                                $
                            </Text18>
                        </Row>
                        {item.bundle_options?.map((bundle) => {
                            return (
                                <div key={bundle.id}>
                                    {bundle?.values?.map(
                                        (product: any, idx: number) => {
                                            return (
                                                <Row
                                                    style={{
                                                        marginTop: 20,
                                                    }}
                                                    key={`bundle ${idx}`}
                                                    align={'middle'}
                                                    justify={'space-between'}
                                                >
                                                    <Col
                                                        style={{
                                                            paddingLeft: 20,
                                                        }}
                                                    >
                                                        <Text>
                                                            {' '}
                                                            ● {product.label} x
                                                            {product.quantity}
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            );
                                        },
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </ColStyled>
    );
}
