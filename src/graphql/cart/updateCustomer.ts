import { gql } from '@apollo/client';

export const UPDATE_CUSTOMER = gql`
    mutation ($cart_id: String!, $firstname: String!, $numberOfCustomer: Int!) {
        updateCustomerNameAndNumberOnCart(
            input: {
                cart_id: $cart_id
                last_name: " "
                first_name: $firstname
                number_of_customer: $numberOfCustomer
            }
        ) {
            result
        }
    }
`;
