import { gql } from '@apollo/client';

export const GET_LIST_KITCHEN_STATION = gql`
    {
        getKitchenStations {
            id
            restaurant_id
            name
            printer_id
        }
    }
`;
