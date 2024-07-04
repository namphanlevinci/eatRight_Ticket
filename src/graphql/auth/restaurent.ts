import { gql } from '@apollo/client';

export const GET_RESTAURANT = gql`
    {
        restaurantInfo {
            id
            floor {
                id
                name
                status
            }
        }
    }
`;
