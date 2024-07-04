import { useEffect, useState } from 'react';
import { ProductType, useCategory } from './useCategory';
import { BundleCartItem } from './RenderProduct/type';
export type BreadCrumType = {
    name: string;
    onSelect?: () => void;
    product?: ProductType;
};
export const useMenu = () => {
    const { data } = useCategory();
    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [product, setProduct] = useState<ProductType>();
    const [update, setUpdate] = useState<
        | {
              product: ProductType | undefined;
              options: BundleCartItem[];
          }
        | undefined
    >();
    const initalbreadCrumbs = {
        name: 'All',
        onSelect: () => clearbreadCrumbs(),
    };
    const clearbreadCrumbs = () => {
        setCategoryIndex(-1);
        setbreadCrumbs([initalbreadCrumbs]);
        setProduct(undefined);
    };
    const [breadCrumbs, setbreadCrumbs] = useState<BreadCrumType[]>([
        initalbreadCrumbs,
    ]);
    useEffect(() => {
        if (product) {
            if (product === update?.product) {
                setbreadCrumbs([
                    initalbreadCrumbs,
                    {
                        name: product?.name || '',
                        product: product,
                    },
                ]);
            } else {
                setbreadCrumbs([
                    ...breadCrumbs,
                    {
                        name: product?.name || '',
                        product: product,
                    },
                ]);
            }
        }
        if (update?.product !== product) {
            setUpdate(undefined);
        }
    }, [product]);
    useEffect(() => {
        if (update?.product) {
            setProduct(update.product);
        }
    }, [update]);
    const onSetCategoryIndex = ({
        index,
        item,
    }: {
        index: number;
        item: any;
    }) => {
        setCategoryIndex(index),
            setbreadCrumbs([
                initalbreadCrumbs,
                {
                    name: item.name,
                    onSelect: () => {
                        onSetCategoryIndex({ index, item });
                        setProduct(undefined);
                    },
                },
            ]);
    };
    return {
        data,
        categoryIndex,
        breadCrumbs,
        setbreadCrumbs,
        setCategoryIndex,
        initalbreadCrumbs,
        onSetCategoryIndex,
        product,
        setProduct,
        setUpdate,
        update,
    };
};
