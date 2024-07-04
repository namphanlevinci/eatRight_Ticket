import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
    query (
        $sort_field: CustomerOrderSortableField!
        $sort_direction: SortEnum!
        $pageSize: Int!
        $currentPage: Int!
        $filter: MerchantOrdersFilterInput!
    ) {
        merchantOrders(
            sort: {
                sort_field: $sort_field # or CREATED_AT
                sort_direction: $sort_direction # or ASC
            }
            filter: $filter
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            page_info {
                page_size
                current_page
            }
            total_count
            items {
                order_number
                id
                created_at
                grand_total
                total {
                    grand_total {
                        value
                        currency
                    }
                }
                status
                table
            }
        }
    }
`;
