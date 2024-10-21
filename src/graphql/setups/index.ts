import { gql } from '@apollo/client';

export const GET_MERCHANT_RESTAURANT_CONFIG = gql`
    {
        merchantGetRestaurantConfig {
            auto_confirm_item
            minimum_ticket_length
            close_order
            open_pricing
        }
    }
`;

export const SET_MERCHANT_RESTAURANT_CONFIG = gql`
    mutation ($auto_confirm_item: Boolean!) {
        setupConfigRestaurant(input: { auto_confirm_item: $auto_confirm_item })
    }
`;

export const SET_MERCHANT_RESTAURANT_CONFIG_OPEN_PRICING = gql`
    mutation ($open_pricing: Boolean!) {
        setupConfigRestaurant(input: { open_pricing: $open_pricing })
    }
`;
