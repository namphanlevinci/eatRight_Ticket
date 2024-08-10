import { gql } from '@apollo/client';

export const GET_CUSTOMER_LIST = gql`
    query (
        $pageSize: Int!
        $currentPage: Int!
        $phone_number: String
        $name: String
    ) {
        merchantGetCustomers(
            pageSize: $pageSize
            currentPage: $currentPage
            filter: { phone_number: $phone_number, name: $name }
        ) {
            items {
                id
                firstname
                lastname
                email
                phone_number
                created_at
                date_of_birth
                gender
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;
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
export const UPDATE_CUSTOMER_INFOMATION = gql`
    mutation (
        $email: String!
        $gender: Int!
        $date_of_birth: String!
        $id: String!
    ) {
        merchantUpdateCustomer(
            input: {
                id: $id
                gender: $gender
                date_of_birth: $date_of_birth
                email: $email
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
export const GET_CUSTOMER_DETAIL = gql`
    query ($id: Int!) {
        merchantGetCustomer(id: $id) {
            ordersCustomerRestaurant {
                items {
                    order_number
                    id
                    created_at
                    grand_total
                    status
                    order_date

                    shipping_method
                    payment_methods {
                        name
                        type
                    }
                    total {
                        discounts {
                            amount {
                                currency
                                value
                            }
                        }
                        grand_total {
                            currency
                            value
                        }
                    }
                }
            }
            firstname
            lastname
            email
            gender
            date_of_birth
            email
            phone_number
            created_at
            addresses {
                firstname
                lastname
                street
                city
                region {
                    region_code
                    region
                }
                postcode
                country_code
                telephone
            }
        }
    }
`;
