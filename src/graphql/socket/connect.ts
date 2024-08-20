import { gql } from '@apollo/client';

export const SOCKET = gql`
    mutation ($socketId: String!, $type: String!) {
        receiveSocketId(socketId: $socketId, account_type_tmp: $type) {
            result
        }
    }
`;
