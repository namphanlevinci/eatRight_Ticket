import { gql } from '@apollo/client';

export const FORGOT_PASSWORD = gql`
    mutation ($email: String!, $newPassword: String!) {
        requestPasswordResetForMerchant(
            email: $email
            newPassword: $newPassword
        )
    }
`;
