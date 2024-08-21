import { gql } from '@apollo/client';

export const CLEAR_UP_CART_TABLE = gql`
    mutation {
        merchantClearCartTable(table_id: 1)
    }
`;
