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
