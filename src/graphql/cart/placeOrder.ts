import { gql } from '@apollo/client';

export const PLACE_ORDER = gql`
    mutation (
        $cartId: String!
        $paymentMethod: String!
        $po_number: String
        $received_amount: Float
    ) {
        createMerchantOrder(
            input: {
                cart_id: $cartId
                payment_method: $paymentMethod
                po_number: $po_number
                received_amount: $received_amount
            }
        ) {
            order {
                order_number
                order_id
            }
        }
    }
`;

export const SET_TIPS = gql`
    mutation setTipToCart($cartId: String!, $tipAmount: Float!) {
        setTipToCart(cart_id: $cartId, tip_amount: $tipAmount) {
            success
            message
        }
    }
`;

export const GET_TIPS = gql`
    {
        storeConfig {
            tip_amount
        }
    }
`;
