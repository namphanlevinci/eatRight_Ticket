import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
    mutation (
        $name: String!
        $description: String
        $is_active: Boolean!
        $menu_ids: [Int]!
        $kitchen_station: Int
    ) {
        merchantCreateCategoryMenu(
            input: {
                name: $name
                description: $description
                is_active: $is_active
                menu_ids: $menu_ids
                kitchen_station: $kitchen_station
            }
        ) {
            id
            name
            description
            is_active
            menus {
                entity_id
                name
                is_active
                description
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
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation (
        $id: Int!
        $name: String!
        $description: String
        $is_active: Boolean!
        $menu_ids: [Int]!
        $kitchen_station: Int
    ) {
        merchantUpdateCategoryMenu(
            id: $id
            input: {
                name: $name
                description: $description
                is_active: $is_active
                menu_ids: $menu_ids
                kitchen_station: $kitchen_station
            }
        ) {
            id
            name
            description
            is_active
            menus {
                entity_id
                name
                is_active
                description
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
    }
`;

export const GET_CATEGORY_DETAIL = gql`
    query ($id: Int!) {
        merchantCategory(id: $id) {
            id
            name
            description
            is_active
            kitchen_station
            menus {
                entity_id
                name
                is_active
                description
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
    }
`;

export const DELETE_CATEGORY = gql`
    mutation ($id: Int!) {
        merchantDeleteCategory(id: $id)
    }
`;

export const GET_CATEGORIES = gql`
    query (
        $search: String
        $currentPage: Int
        $field: String!
        $position: SortEnum!
    ) {
        merchantCategories(
            search: { name: $search }
            currentPage: $currentPage
            pageSize: 10
            sort: { field: $field, position: $position }
        ) {
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
            items {
                id
                name
                is_active
                description
                product_count
                kitchen_station
                menus {
                    entity_id
                    name
                    is_active
                }
            }
        }
    }
`;
