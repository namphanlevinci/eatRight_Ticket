import { Col, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { memo } from 'react';
import ProductButton from './components/productButton';
import { productColors } from 'themes/productColors';
import { BundleItem } from 'pages/Table/Menu/RenderProduct/type';
import UpDownNumber from 'components/UpdownNumber';

export enum BundleProductEnum {
    CHANGE_OPT = 'change-opt-limit',
    ADD_MORE = 'add-more',
    CHECK_BOX = 'checkbox',
    DROP_DOWN = 'select',
    RADIO = 'radio',
}

function RenderLeft({
    listItems,
    onSelectOption,
    onSelectChangeOption,
    isDynamic,
    onSelectCheckBoxOption,
    onAddMoreOption,
}: {
    isDynamic: boolean;
    listItems: BundleItem[];
    onSelectOption: (index: number, idx: number) => void;
    onSelectChangeOption: (index: number, idx: number) => void;
    onSelectCheckBoxOption: (index: number, idx: number) => void;
    onAddMoreOption: (index: number, idx: number, quantity: number) => void;
}) {
    return (
        <div>
            {listItems.map((item, index) => {
                const Type_Change_OPT =
                    item.type === BundleProductEnum.CHANGE_OPT;
                const onClick = ({
                    index,
                    idx,
                }: {
                    index: number;
                    idx: number;
                }) => {
                    if (item.type === BundleProductEnum.ADD_MORE) {
                        return;
                    }
                    switch (item.type) {
                        case BundleProductEnum.CHANGE_OPT:
                            onSelectChangeOption(index, idx);
                            break;
                        case BundleProductEnum.CHECK_BOX:
                            onSelectCheckBoxOption(index, idx);
                            break;
                        default:
                            onSelectOption(index, idx);
                            break;
                    }
                };
                return (
                    <div key={`${item.sku}-${index}`}>
                        <Text style={{ fontWeight: '700' }}>{item.title}</Text>
                        <Row>
                            {item.options.map((option, idx) => {
                                return (
                                    <Col
                                        key={`${option.id}-${idx}`}
                                        span={
                                            item.type ===
                                            BundleProductEnum.ADD_MORE
                                                ? 12
                                                : 6
                                        }
                                        style={{ marginBlock: 16 }}
                                        onClick={() => onClick({ index, idx })}
                                    >
                                        <ProductButton
                                            backgroundColor={
                                                productColors[index].background
                                            }
                                            isSelected={option.is_default}
                                            type={item.type}
                                        >
                                            <Text
                                                style={{
                                                    color: productColors[index]
                                                        .text,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {option.label}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: productColors[index]
                                                        .text,
                                                    fontWeight: '700',
                                                    marginTop: 5,
                                                }}
                                            >
                                                +{' '}
                                                {!isDynamic
                                                    ? option.price
                                                    : option.product.price_range
                                                          .minimum_price
                                                          .regular_price.value}
                                            </Text>
                                            {Type_Change_OPT && (
                                                <Text>{option.quantity}</Text>
                                            )}
                                            {item.type ===
                                                BundleProductEnum.ADD_MORE && (
                                                <UpDownNumber
                                                    quantity={option.quantity}
                                                    setQuantity={(
                                                        e: number,
                                                    ) => {
                                                        onAddMoreOption(
                                                            index,
                                                            idx,
                                                            e,
                                                        );
                                                    }}
                                                />
                                            )}

                                            {item.type ===
                                                BundleProductEnum.ADD_MORE && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        height: '100%',
                                                        width: '100%',
                                                        top: 0,
                                                        left: 0,
                                                        background:
                                                            'transparent',
                                                    }}
                                                >
                                                    <Row>
                                                        <Col
                                                            span={12}
                                                            style={{
                                                                height: '100px',
                                                            }}
                                                            onClick={() => {
                                                                onAddMoreOption(
                                                                    index,
                                                                    idx,
                                                                    option.quantity >=
                                                                        1
                                                                        ? option.quantity -
                                                                              1
                                                                        : 0,
                                                                );
                                                            }}
                                                        >
                                                            {''}
                                                        </Col>
                                                        <Col
                                                            span={12}
                                                            style={{
                                                                height: '100px',
                                                            }}
                                                            onClick={() => {
                                                                onAddMoreOption(
                                                                    index,
                                                                    idx,
                                                                    option.quantity +
                                                                        1,
                                                                );
                                                            }}
                                                        >
                                                            {''}
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )}
                                        </ProductButton>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(RenderLeft);
