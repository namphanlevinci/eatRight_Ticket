import { gql } from '@apollo/client';

export const ChangeTableStatusToReserved = gql`
    mutation ($targetTableId: Int!) {
        waiterChangeTableStatusToReserved(targetTableId: $targetTableId) {
            id
            name
            status
            size
            numberOfCustomer
            #qrCode
            cartIds {
                cartId
            }
        }
    }
`;

export const ChangeTableStatusToAvailable = gql`
    mutation ($targetTableId: Int!) {
        waiterChangeTableStatusToAvailable(targetTableId: $targetTableId) {
            id
            name
            status
            size
            numberOfCustomer
            #qrCode
            cartIds {
                cartId
            }
        }
    }
`;

export const ADD_NOTE_TABLE = gql`
    mutation ($targetTableId: Int!, $note: String!) {
        addNoteToTable(tableId: $targetTableId, note: $note)
    }
`;

export const CLEAR_TABLE = gql`
    mutation ($targetTableId: Int!) {
        clearCartTable(tableId: $targetTableId)
    }
`;
