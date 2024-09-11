import { gql } from '@apollo/client';
export const GET_LIST_ORDER_DINING = gql`
    {
        merchantOrderDashboard(sort: { created_at: ASC }) {
            quotes {
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
