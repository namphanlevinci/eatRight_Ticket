import { ProductType } from 'pages/Table/Menu/useCategory';

export const configurable_productDetail = ({
    values,
    product,
}: {
    values: any;
    product: ProductType;
}) => {
    return (
        Object.values(values).reduce((acc: any, item: any) => {
            if (item.quantity > 0) {
                acc.push({
                    parent_sku: product.sku,
                    data: {
                        quantity: item.quantity,
                        sku: item.sku,
                        price: item.price,
                        name: item.name,
                    },
                });
            }
            return acc;
        }, []) || []
    );
};
