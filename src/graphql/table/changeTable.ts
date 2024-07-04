import { gql } from '@apollo/client';

export const CHANGE_TABLE = gql`
    mutation ($cartId: String!, $targetTableId: Int!) {
        changeTable(cartId: $cartId, targetTableId: $targetTableId)
    }
`;
