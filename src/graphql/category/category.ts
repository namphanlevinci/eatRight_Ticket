import { gql } from '@apollo/client';

export const GET_CAGORYLIST = gql`
    query getCategories(
        $filters: CategoryFilterInput
        $pageSize: Int
        $currentPage: Int
    ) {
        categories(
            filters: $filters
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            total_count
            items {
                uid
                level
                name
                path
                children_count
                children {
                    uid
                    level
                    name
                    path
                    children_count
                    products {
                        items {
                            id
                            name
                            sku
                            url_key
                            display_platforms
                            small_image {
                                url
                                label
                            }
                            price {
                                regularPrice {
                                    amount {
                                        value
                                        currency
                                    }
                                }
                            }
                        }
                    }
                }
            }
            page_info {
                current_page
                page_size
                total_pages
            }
        }
    }
`;
