import { gql } from '@apollo/client';
export const GET_LIST_ORDER_DINING = gql`
    {
        merchantOrderDashboard(sort: { created_at: ASC }) {
            quotes {
                quote_id
                table
                table_id
                cart_id
                created_at
                total_quantity
                serving_status
                first_name
                phone_number
                prices {
                    grand_total {
                        value
                        currency
                    }
                }
            }
            orders {
                quote_id
                status
                table
                id
                order_number
                table_id
                created_at
                total_quantity
                serving_status
                order_source
                pickup_time
                pickup_date
                first_name
                phone_number
                total {
                    grand_total {
                        value
                        currency
                    }
                }
            }
        }
    }
`;

export const GET_LIST_ORDER_COMPLETED = gql`
    query ($currentPage: Int, $filter: OrderDashboardFilterInput) {
        merchantOrderCompleteDashboard(
            filter: $filter
            currentPage: $currentPage
            pageSize: 20
            sort: { created_at: DESC }
        ) {
            orders {
                status
                table
                table_id
                id
                order_number
                created_at
                total_quantity
                serving_status
                order_source
                pickup_time
                pickup_date
                first_name
                phone_number
                total {
                    grand_total {
                        value
                        currency
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
