import { App, Divider, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { memo } from 'react';
import { ProductType } from '../useCategory';
import { BundleItem } from 'pages/Table/Menu/RenderProduct/type';
import { useCart } from 'context/cartContext';
import { ItemType } from 'context/cartType';
import { configurable_productDetail } from 'utils/productDetail';
import { BundleProductEnum } from './RenderLeft';
import ButtonAddToCart from './components/ButtonAddtoCart';
import { useMenuContext } from 'pages/Table/context/MenuContext';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { formatNumberWithCommas } from 'utils/format';

function RenderRight({
    product,
    productPrice,
    listItems,
    total,
    isVariant,
    quantityVariant,
    isDynamic,
}: {
    product: ProductType;
    listItems?: BundleItem[];
    listVariants?: BundleItem[];
    quantityVariant?: any;
    total?: number;
    productPrice?: number;
    isVariant?: boolean;
    isDynamic?: boolean;
}) {
    const { notification } = App.useApp();
    const { addToCart, removeItemFromCart } = useCart();
    const AddConfigurableProduct = () => {
        const cart_items: any = configurable_productDetail({
            values: quantityVariant?.current,
            product: product,
        });

        if (cart_items.length === 0) {
            return;
        }
        cart_items.map((item: any) => {
            const Item: ItemType = {
                id: item?.data?.sku,
                prices: {
                    price: {
                        value: item?.data?.price || 0,
                    },
                },
                product: {
                    ...product,
                    name: item?.data?.name,
                },
                quantity: item?.data?.quantity,
                is_configurable: true,
                isUnsend: true,
            };
            addToCart(Item);
        });
    };
    const AddProduct = () => {
        const bundleOptions = listItems?.map((item) => {
            return {
                id: item.option_id,
                label: item.title,
                values: item?.options
                    ?.filter((option) => {
                        const QuantityType =
                            item.type === BundleProductEnum.CHANGE_OPT ||
                            item.type === BundleProductEnum.ADD_MORE;
                        if (QuantityType) {
                            return option.quantity > 0;
                        }
                        return option.is_default;
                    })
                    .map((option) => {
                        const productPrice =
                            option?.product?.price_range?.minimum_price
                                ?.regular_price?.value || 0;
                        return {
                            id: option.id,
                            label: `${option.label}`,
                            quantity: option.quantity,
                            price: isDynamic ? productPrice : option.price,
                        };
                    }),
            };
        });
        const Item: ItemType = {
            id: product?.sku,
            prices: {
                price: {
                    value: total || 0,
                },
            },
            product: product,
            quantity: 1,
            bundle_options: bundleOptions,
            isUnsend: true,
        };
        addToCart(Item);
    };
    const { update, setUpdate } = useMenuContext();
    return (
        <div>
            {!isVariant && (
                <>
                    <Row
                        style={{
                            marginBlock: 10,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text>{product?.name}</Text>
                        <Text>
                            {' '}
                            {formatNumberWithCommas(productPrice || 0)} {' $'}
                        </Text>
                    </Row>
                    <Divider dashed style={{ borderColor: '#666666' }} />
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>
                        Selected Option
                    </Text>
                    {listItems?.map((item, index) => {
                        const CheckBoxType =
                            item.type === BundleProductEnum.CHANGE_OPT;
                        const AddMoreType =
                            item.type === BundleProductEnum.ADD_MORE;
                        return (
                            <div key={`${item.sku}-${index}`}>
                                <Text>
                                    {item.options.map((option, idx) => {
                                        const productPrice =
                                            option?.product?.price_range
                                                ?.minimum_price?.regular_price
                                                ?.value || 0;
                                        return CheckBoxType || AddMoreType
                                            ? option.quantity > 0 && (
                                                  <Row
                                                      key={`${option.id}-${idx}`}
                                                      style={{
                                                          marginTop: 10,
                                                          justifyContent:
                                                              'space-between',
                                                      }}
                                                  >
                                                      <Text>
                                                          {option.label} x
                                                          {option.quantity}
                                                      </Text>
                                                      <Text>
                                                          +{' '}
                                                          {formatNumberWithCommas(
                                                              (isDynamic
                                                                  ? productPrice
                                                                  : option.price) *
                                                                  option.quantity,
                                                          )}
                                                      </Text>
                                                  </Row>
                                              )
                                            : option.is_default && (
                                                  <Row
                                                      key={`${option.id}-${idx}`}
                                                      style={{
                                                          marginTop: 10,
                                                          justifyContent:
                                                              'space-between',
                                                      }}
                                                  >
                                                      <Text>
                                                          {option.label}
                                                      </Text>
                                                      <Text>
                                                          +{' '}
                                                          {formatNumberWithCommas(
                                                              (isDynamic
                                                                  ? productPrice
                                                                  : option.price) *
                                                                  option.quantity,
                                                          )}
                                                      </Text>
                                                  </Row>
                                              );
                                    })}
                                </Text>
                            </div>
                        );
                    })}
                    <Divider dashed style={{ borderColor: '#666666' }} />
                </>
            )}
            <Row
                style={{
                    marginTop: 10,
                    justifyContent: 'space-between',
                }}
            >
                <Text>Total</Text>
                <Text>
                    {' '}
                    {formatNumberWithCommas(total || 0)} {' $'}
                </Text>
            </Row>
            {update?.product ? (
                <ButtonPrimary
                    title="Update"
                    onClick={() => {
                        try {
                            removeItemFromCart(product?.sku);
                            AddProduct();
                            notification.success({
                                message: 'Update product success',
                                placement: 'topRight',
                            });
                            setUpdate(undefined);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                />
            ) : (
                <ButtonAddToCart
                    onClick={() => {
                        if (product.__typename === 'ConfigurableProduct') {
                            AddConfigurableProduct();
                        } else {
                            AddProduct();
                            notification.success({
                                message: 'Add to cart successfully',
                                placement: 'topRight',
                            });
                        }
                    }}
                />
            )}
        </div>
    );
}

export default memo(RenderRight);
