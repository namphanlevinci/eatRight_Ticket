export type GrandTotal = {
    value: number;
    currency: string;
};

export type Prices = {
    grand_total: GrandTotal;
};

export type QuoteType = {
    table: string;
    table_id: string;
    cart_id: string;
    created_at: string;
    total_quantity: number;
    serving_status: string;
    first_name: string;
    phone_number: string;
    prices: Prices;
};

export type OrderTotal = {
    grand_total: GrandTotal;
};

export type OrderType = {
    status: string;
    table: string;
    id: string;
    order_number: string;
    table_id: string;
    created_at: string;
    total_quantity: number;
    serving_status: string;
    order_source: string;
    pickup_time: string;
    pickup_date: string;
    first_name: string;
    phone_number: string;
    total: OrderTotal;
};

export type MerchantOrderDashboardType = {
    quotes: QuoteType[];
    orders: OrderType[];
};

export type RenderListType = {
    type: string;
    uniqueId: number;
    status: string;
    id: string;
} & QuoteType &
    OrderType;
