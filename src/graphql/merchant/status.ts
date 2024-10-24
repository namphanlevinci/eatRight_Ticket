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

export const MERCHANT_COOKING_ORDER = gql`
    mutation ($order_id: Int!) {
        merchantSetCookingOrder(order_id: $order_id) {
            result
        }
    }
`;

export const MERCHANT_SHIPPING_ORDER = gql`
    mutation ($id: Int!) {
        shippingOrder(id: $id) {
            result
        }
    }
`;

export const MERCHANT_READY_TO_SHIP_ORDER = gql`
    mutation ($order_id: Int!) {
        merchantSetReadyOrder(order_id: $order_id) {
            result
        }
    }
`;

export const MERCHANT_COOKING_QUOTE = gql`
    mutation ($quote_id: Int!) {
        merchantSetCookingQuote(quote_id: $quote_id) {
            result
        }
    }
`;

export const MERCHANT_READY_TO_SHIP_QUOTE = gql`
    mutation ($quote_id: Int!) {
        merchantSetReadyQuote(quote_id: $quote_id) {
            result
        }
    }
`;
