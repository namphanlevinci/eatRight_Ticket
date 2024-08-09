import { gql } from '@apollo/client';

export const CREATE_CUSTOMER = gql`
    mutation (
        $firstname: String!
        $lastname: String!
        $email: String!
        $calling_code: String!
        $gender: Int!
        $date_of_birth: String!
        $status: Int!
        $phone_number: String!
        $group_id: Int!
    ) {
        merchantCreateCustomer(
            input: {
                firstname: $firstname
                lastname: $lastname
                email: $email
                calling_code: $calling_code
                gender: $gender
                date_of_birth: $date_of_birth
                phone_number: $phone_number
                status: $status
                group_id: $group_id
            }
        ) {
            customer {
                id
                firstname
                lastname
                email
                status
                date_of_birth
                group_id
                gender
            }
        }
    }
`;
