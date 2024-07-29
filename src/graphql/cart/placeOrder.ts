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

export const SET_TIPS = gql`
    query setTipToCart($cartId: String!, $tipAmount: Float!) {
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
