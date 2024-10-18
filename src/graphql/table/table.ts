import { gql } from '@apollo/client';

export type TTable = {
    cartIds: { cartId: string }[];
    hasReadyItem: boolean;
    id: number;
    is_counter: number;
    name: string;
    note: string | null;
    numberOfCustomer: number;
    size: number;
    status: string;
    customer_name: string;
    created_at: string;
};

export type DATA_ALL_TABLE = {
    getTablesByStore: TTable[];
};

export const GET_ALL_TABLE_Floor = gql`
    query ($storeId: Int!, $floorId: Int!) {
        getTablesByStore(storeId: $storeId, floorId: $floorId) {
            id
            name
            status
            size
            numberOfCustomer
            hasReadyItem
            cartIds {
                cartId
            }
            note
            is_counter
            created_at
            customer_name
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
            numberOfCustomer
            hasReadyItem
            cartIds {
                cartId
            }
            note
            is_counter
            created_at
            customer_name
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
