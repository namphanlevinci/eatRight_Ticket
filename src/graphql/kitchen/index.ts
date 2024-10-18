import { gql } from '@apollo/client';

export const GET_KITCHEN = gql`
    query {
        kitchenGetAllItems {
            quote_items {
                id
                status
            }
            order_items {
                id
                status
            }
        }
    }
`;
