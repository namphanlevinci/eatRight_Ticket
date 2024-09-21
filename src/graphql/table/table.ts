import { gql } from '@apollo/client';

export const GET_ALL_TABLE_Floor = gql`
    query ($storeId: Int!, $floorId: Int!) {
        getTablesByStore(storeId: $storeId, floorId: $floorId) {
            id
            name
            status
            size
            hasReadyItem
            numberOfCustomer
            cartIds {
                cartId
            }
        }
    }
`;
export const GET_ALL_TABLE = gql`
    query ($storeId: Int!) {
        getTablesByStore(storeId: $storeId) {
            id
            name
            status
            size
            hasReadyItem
            numberOfCustomer
            cartIds {
                cartId
            }
        }
    }
`;
export const GET_CARTS_BY_TABLE = gql`
    query ($tableId: Int!) {
        getCartIdsByTable(tableId: $tableId) {
            cartId
        }
    }
`;
