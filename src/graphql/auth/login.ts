import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        generateMerchantToken(username: $username, password: $password) {
            token
            firstname
            lastname
            restaurant_name
            restaurant_address
        }
    }
`;

export const USER_INFO = gql`
    {
        getMerchantInfo {
            lastname
            firstname
            restaurant_address
            restaurant_name
            restaurant_id
        }
    }
`;
