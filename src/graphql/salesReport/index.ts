import { gql } from '@apollo/client';

export type SalesValue = {
    value: number;
    currency: string | null;
};

export type SalesReport = {
    gross_sales: SalesValue;
    discounts: SalesValue;
    refunds: SalesValue;
    net_sales: SalesValue;
};

export type MerchantSalesReport = {
    total: SalesReport;
    cash: SalesReport;
    credit_card: SalesReport;
};

export type VAR_SALES_REPORTS = {
    date_from?: string;
    date_to?: string;
};

export type DATA_SALES_REPORT = {
    merchantSalesReport: MerchantSalesReport;
};

export const GET_SALES_REPORTS = gql`
    query merchantSalesReport($date_from: String, $date_to: String) {
        merchantSalesReport(
            filter: { date_from: $date_from, date_to: $date_to }
        ) {
            total {
                gross_sales {
                    value
                    currency
                }
                discounts {
                    value
                    currency
                }
                refunds {
                    value
                    currency
                }
                net_sales {
                    value
                    currency
                }
            }
            cash {
                gross_sales {
                    value
                    currency
                }
                discounts {
                    value
                    currency
                }
                refunds {
                    value
                    currency
                }
                net_sales {
                    value
                    currency
                }
            }
            credit_card {
                gross_sales {
                    value
                    currency
                }
                discounts {
                    value
                    currency
                }
                refunds {
                    value
                    currency
                }
                net_sales {
                    value
                    currency
                }
            }
        }
    }
`;

export type VAR_REPORTS_BY_PAYMENT = {
    date_from?: string;
    date_to?: string;
    method: string;
    currentPage: number;
    pageSize: number;
};

export type MerchantSalesReportByPayment = {
    invoice_number: number;
} & MerchantSalesReport;

export type DATA_REPORTS_BY_PAYMENT = {
    merchantSalesReportByPaymentMethods: {
        total_items: number;
        items: MerchantSalesReportByPayment[];
        totals: MerchantSalesReportByPayment;
        page_info: {
            page_size: number;
            current_page: number;
            total_pages: number;
        };
    };
};

export const GET_REPORTS_BY_PAYMENT = gql`
    query merchantSalesReportByPaymentMethods(
        $date_from: String
        $date_to: String
        $method: PaymentTypeEnum!
        $currentPage: Int
        $pageSize: Int
    ) {
        merchantSalesReportByPaymentMethods(
            filter: {
                date_from: $date_from
                date_to: $date_to
                method: $method
            }
            currentPage: $currentPage
            pageSize: $pageSize
        ) {
            total_items
            items {
                invoice_number
                gross_sales {
                    value
                    currency
                }
                discounts {
                    value
                    currency
                }
                refunds {
                    value
                    currency
                }
                net_sales {
                    value
                    currency
                }
            }
            totals {
                gross_sales {
                    value
                    currency
                }
                discounts {
                    value
                    currency
                }
                refunds {
                    value
                    currency
                }
                net_sales {
                    value
                    currency
                }
            }
            page_info {
                current_page
                page_size
                total_pages
            }
        }
    }
`;
