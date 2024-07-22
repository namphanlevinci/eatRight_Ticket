type Money = {
    value: number;
    currency: string;
    __typename: 'Money';
};

type Discount = {
    label: string;
    amount: Money;
    __typename: 'Discount';
};

type InvoiceTotal = {
    subtotal: Money;
    discounts: Discount[];
    total_tax: Money;
    taxes: any[]; // Thay đổi "any" nếu có cấu trúc cụ thể
    grand_total: Money;
    base_grand_total: Money;
    total_shipping: Money | null;
    __typename: 'InvoiceTotal';
};

type OrderItem = {
    id: string;
    product_name: string;
    product_sku: string;
    __typename: 'OrderItem';
};

type InvoiceItem = {
    id: string;
    order_item: OrderItem;
    product_name: string;
    product_sku: string;
    product_sale_price: Money;
    quantity_invoiced: number;
    __typename: 'InvoiceItem';
};

export type InvoiceWithSplit = {
    id: string;
    number: string;
    state: string;
    total: InvoiceTotal;
    items: InvoiceItem[];
    __typename: 'InvoiceWithSplit';
};

type Order = {
    order_number: string;
    order_id: string;
    __typename: 'Order';
};

export type MerchantSplitOrderOutput = {
    order: Order;
    invoice: InvoiceWithSplit[];
    __typename: 'MerchantSplitOrderOutput';
};