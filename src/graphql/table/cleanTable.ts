import { gql } from '@apollo/client';

export const CLEAN_UP_CART_TABLE = gql`
    mutation ($cartId: String!, $tableId: Int!) {
        merchantClearCartTable(table_id: $tableId, cart_id: $cartId)
    }
`;
