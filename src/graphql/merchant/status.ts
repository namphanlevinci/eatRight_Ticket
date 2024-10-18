import { gql } from '@apollo/client';

export const MERCHANT_RECEIVE_ORDER = gql`
    mutation ($id: Int!) {
        receivedOrder(id: $id) {
            result
        }
    }
`;
export const MERCHANT_CANCEL_ORDER = gql`
    mutation ($orderId: Int!) {
        cancelOrder(id: $orderId) {
            result
        }
    }
`;

export const MERCHANT_COMPLETE_ORDER = gql`
    mutation ($id: Int!) {
        completeOrder(id: $id) {
            result
        }
    }
`;
