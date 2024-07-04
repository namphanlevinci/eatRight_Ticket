import { gql } from '@apollo/client';

export const PLACE_ORDER = gql`
    mutation ($cartId: String!, $paymentMethod: String!) {
        createMerchantOrder(
            input: { cart_id: $cartId, payment_method: $paymentMethod }
        ) {
            order {
                order_number
                order_id
            }
        }
    }
`;
