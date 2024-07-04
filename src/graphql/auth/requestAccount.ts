import { gql } from '@apollo/client';

export const REQUEST_ACCOUNT = gql`
    mutation (
        $firstname: String!
        $lastname: String!
        $email: String!
        $phone_number: String!
    ) {
        requestMerchantAccount(
            input: {
                firstname: $firstname
                lastname: $lastname
                email: $email
                phone_number: $phone_number
            }
        ) {
            merchant_account {
                email
            }
        }
    }
`;
