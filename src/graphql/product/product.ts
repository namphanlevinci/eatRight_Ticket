import { gql } from '@apollo/client';

export const GET_PRODUCT_DETAIL = gql`
    query getProductDetail($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                id
                name
                sku
                url_key
                stock_status
                new_from_date
                new_to_date
                special_price
                special_from_date
                special_to_date
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
                __typename
                short_description {
                    html
                }
                description {
                    html
                }
                image {
                    url
                    label
                }
                small_image {
                    url
                    label
                }
                thumbnail {
                    url
                    label
                }
                swatch_image
                media_gallery {
                    url
                    label
                }
                ... on BundleProduct {
                    dynamic_sku
                    dynamic_price
                    dynamic_weight
                    price_view
                    ship_bundle_items
                    items {
                        option_id
                        title
                        sku
                        type
                        required
                        position
                        options {
                            id
                            label
                            quantity
                            can_change_quantity
                            price
                            price_type
                            is_default
                            position
                            product {
                                id
                                name
                                sku
                                stock_status
                                small_image {
                                    url
                                    label
                                }
                                price_range {
                                    minimum_price {
                                        regular_price {
                                            value
                                            currency
                                        }
                                    }
                                }
                                __typename
                            }
                        }
                    }
                }
                ... on ConfigurableProduct {
                    configurable_options {
                        id
                        attribute_id
                        label
                        position
                        use_default
                        attribute_code
                        values {
                            value_index
                            label
                            swatch_data {
                                value
                            }
                        }
                        product_id
                    }
                    variants {
                        product {
                            id
                            name
                            sku
                            small_image {
                                url
                                label
                            }
                            attribute_set_id
                            ... on PhysicalProductInterface {
                                weight
                            }
                            price_range {
                                minimum_price {
                                    regular_price {
                                        value
                                        currency
                                    }
                                }
                            }
                        }
                        attributes {
                            label
                            code
                            value_index
                        }
                    }
                }
            }
            total_count
            page_info {
                page_size
            }
        }
    }
`;
