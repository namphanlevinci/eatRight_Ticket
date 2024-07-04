import { useEffect, useRef, useState } from 'react';
import type { ProductType } from '../useCategory';
import type { BundleItem } from './type';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAIL } from 'graphql/product/product';
import { BundleProductEnum } from './RenderLeft';
import { useMenuContext } from 'pages/Table/context/MenuContext';

export const useProductDetail = ({
    product,
    item,
}: {
    product?: ProductType;
    item?: any;
}) => {
    const [onGetProductDetail, { data, loading }] =
        useLazyQuery(GET_PRODUCT_DETAIL);
    const [isDynamic, setIsDynamic] = useState(false);
    const [listItems, setListItems] = useState<BundleItem[]>([]);
    const [listVariants, setListVariants] = useState<any>([]);
    const [total, setTotal] = useState(
        product?.price?.regularPrice?.amount?.value,
    );
    const [quantity, setQuantity] = useState(item?.quantity || 1);
    const quantityVariant = useRef({});
    const { update } = useMenuContext();
    useEffect(() => {
        if (product) {
            onGetProductDetail({
                variables: {
                    sku: product.sku,
                },
            });
        }
    }, [product]);
    useEffect(() => {
        let dataProduct = data?.products?.items[0];
        if (data?.products?.items.length > 0) {
            localStorage.setItem(
                `product-${product?.sku}`,
                JSON.stringify(dataProduct),
            );
        } else {
            const productString = localStorage.getItem(
                `product-${product?.sku}`,
            );
            if (productString) {
                dataProduct = JSON.parse(productString);
            }
        }
        if (dataProduct?.dynamic_price) {
            setIsDynamic(true);
        } else {
            setIsDynamic(false);
        }
        if (dataProduct?.price) {
            setTotal(dataProduct?.price?.regularPrice?.amount?.value);
        }
        if (dataProduct?.items) {
            if (update?.options) {
                const list = dataProduct?.items.map((item: any) => {
                    const option = update?.options?.find(
                        (e: any) => e.id === item.option_id,
                    );
                    return {
                        ...item,
                        options: item.options.map((opt: any) => {
                            const optUpdate = option?.values?.find(
                                (e: any) => e.id === opt.id,
                            );
                            return {
                                ...opt,
                                is_default: optUpdate ? true : false,
                                quantity: optUpdate?.quantity || 0,
                            };
                        }),
                    };
                });
                setListItems(list);
            } else {
                setListItems(dataProduct?.items);
            }
        }
        if (dataProduct?.variants) {
            setListVariants(dataProduct?.variants);
        }
    }, [data, update]);
    useEffect(() => {
        onSetTotal(listItems);
    }, [listItems]);
    const onSelectOption = (index: number, idx: number) => {
        let list = listItems[index].options.map((item: any, optIndex: any) => {
            if (optIndex === idx) {
                return { ...item, is_default: true };
            }
            return { ...item, is_default: false };
        });
        let newList = [...listItems];
        newList[index] = {
            ...newList[index],
            options: list,
        };
        setListItems(newList);
    };
    const onSelectCheckBoxOption = (index: number, idx: number) => {
        let list = listItems[index].options.map((item: any, optIndex: any) => {
            if (optIndex === idx) {
                return { ...item, is_default: !item.is_default };
            }
            return { ...item };
        });
        let newList = [...listItems];
        newList[index] = {
            ...newList[index],
            options: list,
        };
        setListItems(newList);
    };
    const onAddMoreOption = (index: number, idx: number, quantity: number) => {
        let list = listItems[index].options.map((item: any, optIndex: any) => {
            if (optIndex === idx) {
                return { ...item, quantity: quantity };
            }
            return { ...item };
        });
        let newList = [...listItems];
        newList[index] = {
            ...newList[index],
            options: list,
        };
        setListItems(newList);
    };
    const onSelectChangeOption = (index: number, idx: number) => {
        let initialTotalQuantity = listItems[index].options.reduce(
            (total, option) => total + option.quantity,
            0,
        );
        let countDown = 1;
        let list = listItems[index].options.map((item, optIndex: number) => {
            if (optIndex === idx) {
                return {
                    ...item,
                    quantity:
                        item.quantity === initialTotalQuantity
                            ? initialTotalQuantity
                            : item.quantity + 1,
                };
            }
            if (countDown > 0 && item.quantity > 0) {
                countDown--;
                return {
                    ...item,
                    quantity: item.quantity === 0 ? 0 : item.quantity - 1,
                };
            }
            return item;
        });
        let newList = [...listItems];
        newList[index] = {
            ...newList[index],
            options: list,
        };
        setListItems(newList);
    };
    const onSetTotal = (newList: any) => {
        let extra = 0;
        newList.forEach((e: any) => {
            const CheckBoxType =
                e.type === BundleProductEnum.CHANGE_OPT ||
                e.type === BundleProductEnum.ADD_MORE;
            e.options.map((item: any) => {
                const productPrice =
                    item?.product?.price_range?.minimum_price?.regular_price
                        ?.value || 0;
                if (CheckBoxType || item.is_default) {
                    extra +=
                        (isDynamic ? productPrice : item.price) * item.quantity;
                }
            });
        });
        setTotal(
            extra +
                (!isDynamic
                    ? data?.products?.items[0]?.price?.regularPrice?.amount
                          ?.value
                    : 0),
        );
    };
    const onChangeQuantity = (
        index: number,
        quantity: number,
        price: number,
        sku: string,
        name: string,
    ) => {
        quantityVariant.current = {
            ...quantityVariant.current,
            [index]: {
                price,
                quantity: quantity,
                sku,
                name,
            },
        };
        const total: any =
            Object.values(quantityVariant.current).reduce((a: any, b: any) => {
                return a + b.price * b.quantity;
            }, 0) || 0;
        setTotal(total);
    };
    return {
        productPrice:
            data?.products?.items[0]?.price?.regularPrice?.amount?.value,
        loading,
        total,
        quantity,
        setQuantity,
        onSelectOption,
        listItems,
        listVariants,
        quantityVariant,
        setTotal,
        onChangeQuantity,
        item,
        onSelectChangeOption,
        isDynamic,
        onSelectCheckBoxOption,
        onAddMoreOption,
    };
};
