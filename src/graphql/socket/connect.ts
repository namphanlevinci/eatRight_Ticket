import { gql } from '@apollo/client';

export const SOCKET = gql`
    mutation ($socketId: String!) {
        receiveSocketId(socketId: $socketId) {
            result
        }
    }
`;
