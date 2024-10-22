import { gql } from '@apollo/client';

export const SET_ALL_ITEM_COOKING = gql`
    mutation ($id: Int!) {
        receivedOrder(id: $id) {
            result
        }
    }
`;

// export const SET_ALL_ITEM_COOKING = gql`
//     mutation ($entity_id: Int!, $items_id: Int!, $entity_type: String!) {
//         kitchenSetAllItemCooking(
//             entity_id: $entity_id
//             items_id: $items_id
//             entity_type: $entity_type
//         )
//     }
// `;

export const SET_ALL_ITEM_READY = gql`
    mutation ($entity_id: Int!, $items_id: Int[]!, $entity_type: String ) {
        kitchenSetAllItemReady(
            entity_id: $entity_id
            items_id: $items_id
            entity_type: $type
        ) 
    }
`;

export const SET_ITEM_DONE = gql`
    mutation ($item_id: Int!, $item_type: String!, $entity_type: String) {
        kitchenSetItemDone(
            entity_id: $entity_id
            items_id: $items_id
            entity_type: $type
        )
    }
`;
