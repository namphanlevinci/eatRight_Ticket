import { gql } from '@apollo/client';
import { PageInfo, TotalAmount } from 'graphql/common';

// ReportByPaymentMethods

export type ReportPaymentMethodItem = {
    credit_card: TotalAmount;
    cash: TotalAmount;
    discount: TotalAmount;
    others: TotalAmount;
};

export type ReportByPaymentMethodsResponse = {
    items: ReportPaymentMethodItem;
    total_amount: TotalAmount;
};

// export type var_ReportByPaymentMethods = {};

export type data_ReportByPaymentMethods = {
    merchantReportByPaymentMethods: ReportByPaymentMethodsResponse;
};

export const gql_ReportByPaymentMethods = gql`
    query {
        merchantReportByPaymentMethods {
            items {
                credit_card {
                    value
                    currency
                }
                cash {
                    value
                    currency
                }
                discount {
                    value
                    currency
                }
                others {
                    value
                    currency
                }
            }
            total_amount {
                value
                currency
            }
        }
    }
`;

// GetBatchInvoices

export type InvoiceItem = {
    invoice_number: string;
    state: string;
    total: {
        tip_amount: TotalAmount;
        subtotal: TotalAmount;
        discounts: {
            label: string;
            amount: TotalAmount;
        }[];
        total_tax: TotalAmount;
        taxes: {
            amount: TotalAmount;
            title: string;
            rate: number;
        }[];
        grand_total: TotalAmount;
        non_cash_amount: TotalAmount;
        base_grand_total: TotalAmount;
        total_shipping: TotalAmount;
    };
};

export type GetBatchInvoicesResponse = {
    last_settle_date: string;
    total_count: number;
    total_amount: TotalAmount;
    total_subtotal_amount: TotalAmount;
    total_tax_amount: TotalAmount;
    total_tip_amount: TotalAmount;
    items: InvoiceItem[];
    page_info: PageInfo;
};

export type var_getBatchInvoices = {
    currentPage?: number;
    pageSize?: number;
};

export type data_GetBatchInvoices = {
    merchantGetBatchInvoices: GetBatchInvoicesResponse;
};

export const gql_GetBatchInvoices = gql`
    query ($currentPage: Int, $pageSize: Int) {
        merchantGetBatchInvoices(
            currentPage: $currentPage
            pageSize: $pageSize
        ) {
            last_settle_date
            total_count
            total_amount {
                value
                currency
            }
            total_subtotal_amount {
                value
                currency
            }
            total_tax_amount {
                value
                currency
            }
            total_tip_amount {
                value
                currency
            }
            items {
                invoice_number
                state
                total {
                    tip_amount {
                        value
                        currency
                    }
                    subtotal {
                        value
                        currency
                    }
                    discounts {
                        label
                        amount {
                            value
                            currency
                        }
                    }
                    total_tax {
                        value
                        currency
                    }
                    taxes {
                        amount {
                            value
                            currency
                        }
                        title
                        rate
                    }
                    grand_total {
                        value
                        currency
                    }
                    non_cash_amount {
                        value
                        currency
                    }
                    base_grand_total {
                        value
                        currency
                    }
                    total_shipping {
                        value
                        currency
                    }
                }
            }
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const gql_MerchantSettle = gql`
    mutation ($markdone_item: Boolean!) {
        posSettleMerchant(markdone_item: $markdone_item)
    }
`;
