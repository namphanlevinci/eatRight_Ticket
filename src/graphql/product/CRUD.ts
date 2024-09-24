import { gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
    mutation (
        $name: String!
        $description: String
        $open_price: Boolean!
        $price: Float!
        $sku: String!
        $status: Int
        $is_in_stock: Boolean
        $category_id: Int
        $display_platforms: [String]
        $media_gallery_entries: [ProductMediaGalleryEntry]
        $quantity: Int!
        $kitchen_station: Int!
    ) {
        merchantCreateProduct(
            input: {
                open_price: $open_price
                name: $name
                description: $description
                price: $price
                sku: $sku
                status: $status
                weight: 1
                display_platforms: $display_platforms
                custom_attributes: [
                    { attribute_code: "category_ids", value: "[]" }
                ]
                media_gallery_entries: $media_gallery_entries
                extension_attributes: {
                    category_links: [{ position: 3, category_id: $category_id }]
                    stock_item: { is_in_stock: $is_in_stock, qty: $quantity }
                }
                kitchen_station: $kitchen_station
            }
        ) {
            id
            sku
            name
            status
            open_price
            display_platforms
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
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation (
        $id: Int!
        $name: String!
        $description: String
        $open_price: Boolean!
        $price: Float!
        $sku: String!
        $status: Int
        $is_in_stock: Boolean
        $category_id: Int
        $display_platforms: [String]
        $media_gallery_entries: [ProductMediaGalleryEntry]
        $quantity: Int!
        $kitchen_station: Int!
    ) {
        merchantUpdateProduct(
            input: {
                open_price: $open_price
                name: $name
                description: $description
                price: $price
                sku: $sku
                status: $status
                weight: 1
                display_platforms: $display_platforms
                custom_attributes: [
                    { attribute_code: "category_ids", value: "[]" }
                ]
                media_gallery_entries: $media_gallery_entries
                extension_attributes: {
                    category_links: [{ position: 3, category_id: $category_id }]
                    stock_item: { is_in_stock: $is_in_stock, qty: $quantity }
                }
                kitchen_station: $kitchen_station
                id: $id
            }
        ) {
            id
            sku
            name
            status
            open_price
            display_platforms
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
    }
`;

export const DELETE_PRODUCT = gql`
    mutation ($id: Int!) {
        merchantDeleteProduct(id: $id)
    }
`;

export const GET_PRODUCT_DETAIL = gql`
    query ($id: Int!) {
        merchantProduct(id: $id) {
            id
            sku
            name
            status
            qty
            open_price
            display_platforms
            kitchen_station
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
    }
`;

export const GET_KITCHEN_STATIONS = gql`
    query {
        getKitchenStations {
            id
            restaurant_id
            name
            printer_id
        }
    }
`;
