export interface BundleItemOption {
    id: number;
    label: string | null;
    quantity: number;
    can_change_quantity: boolean;
    price: number;
    price_type: string;
    is_default?: boolean;
    product: ProductType;
}

export interface BundleItem {
    __typename: string;
    option_id: number;
    title: string;
    sku: string;
    type: string;
    required: boolean;
    position: number;
    dynamic_price: boolean;
    options: BundleItemOption[];
}

export interface SelectedBundleOptionValue {
    id: number;
    label: string;
    price: number;
    quantity: number;
}

export interface SelectedBundleOption {
    __typename: string;
    id: number;
    label: string;
    type: string;
    values: SelectedBundleOptionValue[];
}

export interface BundleCartItem {
    id: string;
    lable: string;
    values: {
        id: string;
        label: string;
        price: number;
        quantity: number;
    }[];
}
