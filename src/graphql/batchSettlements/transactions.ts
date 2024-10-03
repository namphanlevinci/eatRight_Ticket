import { gql } from '@apollo/client';
import { PageInfo } from 'graphql/common';

export type TransactionItem = {
    batch_id: number;
    date_time: string;
    invoice_number: string;
    state: string;
    payment_methods: {
        name: string;
        type: string;
        additional_data: {
            name: string;
            value: string;
        }[];
    }[];
    type: string;
    total: {
        value: number;
        currency: string;
    };
};

export type MerchantGetTransactionsResponse = {
    total_items: number;
    items: TransactionItem[];
    page_info: PageInfo;
};

export type var_Transactions = {
    currentPage?: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
    status?: string;
    search?: string;
};

export type data_Transactions = {
    merchantGetTransactions: MerchantGetTransactionsResponse;
};

export const gql_Transactions = gql`
    query (
        $currentPage: Int
        $pageSize: Int
        $startDate: String
        $endDate: String
        $status: String
        $search: String
    ) {
        merchantGetTransactions(
            search: $search
            filter: {
                date_from: $startDate
                date_to: $endDate
                status: $status #UNPAID, PAID, REFUNDED
            }
            currentPage: $currentPage
            pageSize: $pageSize
        ) {
            total_items
            items {
                batch_id
                date_time
                invoice_number
                state
                payment_methods {
                    name
                    type
                    additional_data {
                        name
                        value
                    }
                }
                type
                total {
                    value
                    currency
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
