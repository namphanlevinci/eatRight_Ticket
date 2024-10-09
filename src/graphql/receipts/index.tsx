import { gql } from '@apollo/client';
import { PageInfo } from 'graphql/common';

export type ReceiptPaymentMethod = {
    title: string;
    card_type?: string;
    last_digits?: string;
};

export type ReceiptTotalDetails = {
    currency: string;
    value: number;
};

export type ReceiptDiscount = {
    label: string;
    amount: ReceiptTotalDetails;
};

export type ReceiptTotal = {
    subtotal: ReceiptTotalDetails;
    grand_total: ReceiptTotalDetails;
    discounts?: ReceiptDiscount[];
    total_tax: ReceiptTotalDetails;
    total_shipping: ReceiptTotalDetails;
    tip_amount?: ReceiptTotalDetails;
};

export type ReceiptItem = {
    id: string;
    increment_id: string;
    order_id: string;
    order_increment_id: string;
    created_at: string;
    status: string;
    payment_method: ReceiptPaymentMethod;
    terminal_name: string;
    total: ReceiptTotal;
};

export type MerchantGetListReceiptResponse = {
    total_count: number;
    items: ReceiptItem[];
    page_info: PageInfo;
};

export type var_ReceiptHistory = {
    currentPage?: number;
    pageSize?: number;
    search?: string;
    dateFrom: string;
    dateTo: string;
};

export type data_ReceiptHistory = {
    merchantGetListReceipt: MerchantGetListReceiptResponse;
};

export const gql_ReceiptHistory = gql`
    query (
        $currentPage: Int
        $pageSize: Int
        $search: String
        $dateFrom: String!
        $dateTo: String!
    ) {
        merchantGetListReceipt(
            currentPage: $currentPage
            pageSize: $pageSize
            search: $search
            filter: { date_from: $dateFrom, date_to: $dateTo }
        ) {
            items {
                id
                increment_id
                order_increment_id
                order_id
                created_at
                status
                payment_method {
                    title
                    card_type
                    last_digits
                }
                terminal_name
                total {
                    subtotal {
                        currency
                        value
                    }
                    grand_total {
                        currency
                        value
                    }
                    discounts {
                        label
                        amount {
                            value
                            currency
                        }
                    }
                    total_tax {
                        currency
                        value
                    }
                    total_shipping {
                        currency
                        value
                    }
                    tip_amount {
                        currency
                        value
                    }
                }
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;
// Kiểu cho phương thức thanh toán
export type PaymentMethod = {
    title: string;
    card_type?: string;
    last_digits?: string;
    method?: string;
};

// Kiểu cho chi tiết tổng tiền
export type TotalDetails = {
    currency: string;
    value: number;
};

// Kiểu cho giảm giá
export type Discount = {
    label: string;
    amount: TotalDetails;
};

// Kiểu cho tổng chi phí
export type Total = {
    subtotal: TotalDetails;
    grand_total: TotalDetails;
    discounts?: Discount[];
    total_tax: TotalDetails;
    total_shipping: TotalDetails;
    tip_amount?: TotalDetails;
};

// Kiểu cho chi tiết hóa đơn
export type ReceiptDetail = {
    increment_id: string;
    order_increment_id: string;
    order_id: string;
    customer_phone_number: string;
    restaurant_name: string;
    restaurant_address: string;
    restaurant_phone_number: string;
    status: string;
    table_name: string;
    order_date: string;
    order_time: string;
    order_type: string;
    serve_name: string;
    customer_name: string;
    website_url: string;
    terminal_name: string;
    can_refund: boolean;
    is_refunded: boolean;
    is_bill_split: boolean;
    payment_method: PaymentMethod;
    non_cash_amount: string;
    items: ReceiptItem[];
    total: Total;
    feedback_url?: string;
};

// Kiểu cho phản hồi của truy vấn
export type data_MerchantGetReceiptResponse = {
    merchantGetReceipt: ReceiptDetail;
};
export type var_ReceiptDetail = {
    invoice_number?: string;
};
// Định nghĩa truy vấn GraphQL cho chi tiết hóa đơn
export const gqlGetReceiptDetail = gql`
    query GetReceiptDetail($invoice_number: String!) {
        merchantGetReceipt(invoice_number: $invoice_number) {
            increment_id
            order_increment_id
            order_id
            customer_phone_number
            restaurant_name
            restaurant_address
            restaurant_phone_number
            status
            table_name
            order_date
            order_time
            order_type
            serve_name
            customer_name
            website_url
            terminal_name
            can_refund
            is_refunded
            is_bill_split
            non_cash_amount
            payment_method {
                title
                card_type
                last_digits
                method
            }
            items {
                name
                qty
                price
            }
            total {
                subtotal {
                    currency
                    value
                }
                grand_total {
                    currency
                    value
                }
                discounts {
                    label
                    amount {
                        value
                        currency
                    }
                }
                total_tax {
                    currency
                    value
                }
                total_shipping {
                    currency
                    value
                }
                tip_amount {
                    currency
                    value
                }
            }
        }
    }
`;
