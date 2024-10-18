import { gql } from '@apollo/client';

export const GET_MERCHANT_RESTAURANT_CONFIG = gql`
    {
        merchantGetRestaurantConfig {
            auto_confirm_item
            minimum_ticket_length
            primary_terminal_setting
        }
    }
`;

export const SET_MERCHANT_RESTAURANT_CONFIG = gql`
    mutation ($auto_confirm_item: Boolean!) {
        setupConfigRestaurant(input: { auto_confirm_item: $auto_confirm_item })
    }
`;

export const GET_PRIMARY_TERMINAL_WAITER = gql`
    {
        waiterPrimaryPosDevice {
            entity_id
            name
            tpn
            auth_key
            machine_type
            status
            serial_number
        }
    }
`;
