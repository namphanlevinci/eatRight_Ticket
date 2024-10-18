import { gql } from '@apollo/client';
import { PageInfo, TotalAmount } from 'graphql/common';

export type BatchSettleItem = {
    batch_id: number;
    total_amount: TotalAmount;
    date: string;
    time: string;
};

export type MerchantGetBatchSettlesResponse = {
    total_count: number;
    items: BatchSettleItem[];
    page_info: PageInfo;
};

export type var_BatchHistory = {
    currentPage?: number;
    pageSize?: number;
    search?: string;
    createdAtFrom?: string;
    createdAtTo?: string;
};

export type data_BatchHistory = {
    merchantGetBatchSettles: MerchantGetBatchSettlesResponse;
};

export const gql_BatchHistory = gql`
    query (
        $currentPage: Int
        $pageSize: Int
        $search: Int
        $createdAtFrom: String
        $createdAtTo: String
    ) {
        merchantGetBatchSettles(
            currentPage: $currentPage
            pageSize: $pageSize
            search: $search
            filter: { createdAtFrom: $createdAtFrom, createdAtTo: $createdAtTo }
        ) {
            total_count
            items {
                batch_id
                total_amount {
                    currency
                    value
                }
                date
                time
            }
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export type data_BatchHistoryReport = {
    merchantPrintBatch: {
        image_url: string;
    };
};

export const gql_BatchHistoryReport = gql`
    mutation ($batch_id: Int!) {
        merchantPrintBatch(batch_id: $batch_id) {
            image_url
        }
    }
`;
