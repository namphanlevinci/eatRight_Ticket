import { gql } from '@apollo/client';

export const CANCEL_CHECKOUT = gql`
    mutation ($cart_id: String!) {
        merchantDeleteOrder(cart_id: $cart_id)
    }
`;
