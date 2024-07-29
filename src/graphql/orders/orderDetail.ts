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
            customer_comment
            items {
                name
                qty
                price
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
            tip_amount {
                value
                currency
            }
        }
    }
`;
