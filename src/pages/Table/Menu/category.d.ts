type Money = {
    __typename: string;
    value: number;
    currency: string;
};

type Price = {
    __typename: string;
    amount: Money;
};

type ProductImage = {
    __typename: string;
    url: string;
    label: string;
};

type BundleProduct = {
    __typename: string;
    id: number;
    name: string;
    sku: string;
    url_key: string;
    small_image: ProductImage;
    price: {
        __typename: string;
        regularPrice: Price;
    };
    display_platforms?: string[];
};

type SimpleProduct = {
    __typename: string;
    id: number;
    name: string;
    sku: string;
    url_key: string;
    small_image: ProductImage;
    price: {
        __typename: string;
        regularPrice: Price;
    };
    display_platforms?: string[];
};

type ConfigurableProduct = {
    __typename: string;
    id: number;
    name: string;
    sku: string;
    url_key: string;
    small_image: ProductImage;
    price: {
        __typename: string;
        regularPrice: Price;
    };
    display_platforms?: string[];
};

type CategoryProducts = {
    __typename: string;
    items: (BundleProduct | SimpleProduct | ConfigurableProduct)[];
};

type CategoryTree = {
    __typename: string;
    uid: string;
    level: number;
    name: string;
    path: string;
    children_count: string;
    products: CategoryProducts;
};

export type Category = CategoryTree;
