import { gql } from '@apollo/client';

export const GET_MERCHANT_RESTAURANT_CONFIG = gql`
    {
        merchantGetRestaurantConfig {
            auto_confirm_item
            minimum_ticket_length
        }
    }
`;

export const SET_MERCHANT_RESTAURANT_CONFIG = gql`
    mutation ($auto_confirm_item: Boolean!) {
        setupConfigRestaurant(input: { auto_confirm_item: $auto_confirm_item })
    }
`;
