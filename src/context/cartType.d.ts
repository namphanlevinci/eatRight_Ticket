export type CartTableType = {
    tableId: string;
    carts: CartItemType[];
};

export type CartItemType = {
    id: string;
    items: ItemType[];
    firstname: string;
    numberOfCustomer: number;
    applied_coupons?:
        | {
              code: string;
          }[]
        | null;
    prices: {
        discounts?: {
            amount: {
                value: number | string;
            };
            label: string;
        }[];
        grand_total: {
            value: number;
        };
        total_canceled?: {
            value: number;
        };
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
    };
    quantity: number;
    quantityText?: string;
    guestId?: string;
    is_bundle?: boolean;
    is_configurable?: boolean;
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
