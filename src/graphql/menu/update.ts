import { gql } from '@apollo/client';

export const UPDATE_MENU = gql`
    mutation (
        $id: Int!
        $name: String!
        $description: String
        $is_active: Boolean!
        $mon_active: Boolean!
        $tue_active: Boolean!
        $wed_active: Boolean!
        $thu_active: Boolean!
        $fri_active: Boolean!
        $sat_active: Boolean!
        $sun_active: Boolean!
        $start_time: String!
        $end_time: String!
    ) {
        merchantUpdateMenu(
            id: $id
            input: {
                name: $name
                description: $description
                is_active: $is_active
                mon_active: $mon_active
                tue_active: $tue_active
                wed_active: $wed_active
                thu_active: $thu_active
                fri_active: $fri_active
                sat_active: $sat_active
                sun_active: $sun_active
                start_time: $start_time
                end_time: $end_time
            }
        ) {
            entity_id
            name
            description
            is_active
            mon_active
            tue_active
            wed_active
            thu_active
            fri_active
            sat_active
            sun_active
            start_time
            end_time
        }
    }
`;
