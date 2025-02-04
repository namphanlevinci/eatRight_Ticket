import { gql } from '@apollo/client';

export const GET_CATEGORY_LIST = gql`
    query (
        $search: String
        $currentPage: Int
        $field: String!
        $position: SortEnum!
        $pageSize: Int
    ) {
        merchantCategories(
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
                id
                name
                is_active
                description
                product_count
                kitchen_station
                open_price
                menus {
                    entity_id
                    name
                    is_active
                }
            }
        }
    }
`;
