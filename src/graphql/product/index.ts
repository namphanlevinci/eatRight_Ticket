import { gql } from '@apollo/client';

export const GET_PRODUCT_LIST = gql`
    query (
        $search: String
        $currentPage: Int
        $pageSize: Int
        $sort: ProductSortInput
    ) {
        merchantProducts(
            search: $search
            currentPage: $currentPage
            pageSize: $pageSize
            sort: $sort
            filter: {}
        ) {
            items {
                id
                sku
                open_price
                display_platforms
                name
                status
                qty
                description_plain_text
                categories {
                    id
                    name
                }
                image {
                    url
                    label
                    position
                    disabled
                }
                small_image {
                    url
                    label
                    position
                    disabled
                }
                thumbnail {
                    url
                    label
                    position
                    disabled
                }
                media_gallery_entries {
                    id
                    uid
                    media_type
                    label
                    position
                    disabled
                    types
                    file
                }
                media_gallery {
                    url
                    label
                    position
                    disabled
                }
                special_price
                price {
                    minimalPrice {
                        amount {
                            value
                            currency
                        }
                    }
                    maximalPrice {
                        amount {
                            value
                            currency
                        }
                    }
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
                stock_status
                only_x_left_in_stock
            }
            total_count
            page_info {
                total_pages
                current_page
                page_size
            }
        }
    }
`;
