import { gql } from '@apollo/client';

export const GET_MENU_LIST = gql`
    query (
        $search: String
        $currentPage: Int
        $pageSize: Int
        $field: String!
        $position: SortEnum!
    ) {
        merchantMenus(
            search: { name: $search }
            currentPage: $currentPage
            pageSize: $pageSize
            sort: { field: $field, position: $position }
        ) {
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
            items {
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
    }
`;

export const GET_DETAIL_MENU = gql`
    query ($id: Int!) {
        merchantMenu(id: $id) {
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
