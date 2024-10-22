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

export const SET_ALL_ITEM_COOKING = gql`
    mutation ($entity_id: Int!, $items_id: Int!, $entity_type: String!) {
        kitchenSetAllItemCooking(
            entity_id: $entity_id
            items_id: $items_id
            entity_type: $entity_type
        )
    }
`;
