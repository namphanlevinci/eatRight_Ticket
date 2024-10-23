export type CartTableType = {
    tableId: string;
    carts: CartItemType[];
};

export type CartItemType = {
    is_active?: boolean;
    order_number?: string;
    order_id?: string;
    id: string;
    items: ItemType[];
    firstname: string;
    phonenumber?: string;
    numberOfCustomer: number;
    custom_price?: number;
    is_paid?: boolean;
    order?: {
        items?: OrderItemType[];
    };
    applied_coupons?:
        | {
              code: string;
          }[]
        | null;
    tip_amount?: number | null;
    prices: {
        applied_taxes?: {
            amount: {
                value: number;
            };
            label: string;
            tax_percent: number;
        }[];
        discounts?: {
            amount: {
                value: number | string;
            };
            label: string;
        }[];
        discount?: {
            amount: {
                value: number | string;
            };
            label: string;
        };
        grand_total: {
            value: number;
        };
        total_canceled?: {
            value: number;
        };
        total_canceled_without_tax?: {
            value: number;
        };
        total_items_canceled_discount?: {
            value: any;
        };
        subtotal_excluding_tax?: {
            value: number;
        };
        subtotal_including_tax?: {
            value: number;
        };
        subtotal_with_discount_excluding_tax?: {
            value: number;
        };
        new_items_total?: {
            value: number;
        };
    };
};
export type OrderItemType = {
    id?: string;
    name?: string;
    qty?: number;
    price?: number;
    serving_status?: string;
    options?: {
        name: string;
        qty: number;
        price: number;
    };
};
export type ItemType = {
    isUnsend?: boolean;
    uid?: string;
    id?: string;
    status?: string;
    note?: string;
    prices: {
        total_item_discount?: {
            value: any;
        };
        price: {
            value: number;
        };
        discounts?: any;
    };
    product: {
        name: string;
        sku: string;
        open_price?: boolean | number;
        __typename: string;
    };
    open_price?: boolean | number;
    quantity: number;
    quantityText?: string;
    guestId?: string;
    is_bundle?: boolean;
    is_configurable?: boolean;
    custom_price?: number;
    configurable_options?: {
        id: number | string;
        option_label: string;
        value_id: number | string;
        value_label: string;
    }[];
    bundle_options?: {
        id: number | string;
        label: string;
        values?: {
            id: number | string;
            label: string;
            price: number | string;
            quantity: number | string;
            status?: string;
        }[];
        note?: string;
    }[];
    totalPrice?: number | string;
};
