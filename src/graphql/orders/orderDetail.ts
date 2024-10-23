import { gql } from '@apollo/client';

export const GET_ORDER_DETAIL = gql`
    query ($id: Int!) {
        orderDetail(id: $id) {
            id
            order_number
            created_at
            updated_at
            grand_total
            status
            flag_refund
            payment_method
            payment_method_code
            firstname
            lastname
            phone
            address
            table_id
            restaurant_address
            restaurant_name
            restaurant_phone
            customer_comment
            can_refund
            is_refunded
            items {
                name
                qty
                price
                serving_status
                options {
                    name
                    qty
                    price
                }
            }
            discount {
                amount {
                    currency
                    value
                }
                label
            }
            shipping_method
            use_plastic
            note
            customer_phone
            assign_from
            assign_reason
            shipping_amount
            table
            order_source
            serve_name
            total {
                subtotal {
                    value
                    currency
                }
                discounts {
                    amount {
                        value
                        currency
                    }
                    label
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
                total_shipping {
                    value
                    currency
                }
                grand_total {
                    value
                    currency
                }
            }
            feedback_url
            payment_methods {
                name
                type
                additional_data {
                    name
                    value
                }
                po_number
            }
            tip_amount {
                value
                currency
            }
            __typename
        }
    }
`;
