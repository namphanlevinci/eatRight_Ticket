import { gql } from '@apollo/client';

export const UPDATE_STATUS_ITEM = gql`
    mutation ($id: Int!) {
        waiterSetItemDone(item_id: $id, item_type: QUOTE)
    }
`;
