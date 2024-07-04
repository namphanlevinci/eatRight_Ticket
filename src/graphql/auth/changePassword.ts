import { gql } from '@apollo/client';

export const CHANGE_PASSWORD = gql`
    mutation ($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
            result
        }
    }
`;
