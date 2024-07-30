import { gql } from '@apollo/client';

export const CREATE_CART = gql`
    mutation addProductsToCartTable(
        $firstname: String!
        $tableId: Int!
        $cartItems: [CartItemInput!]!
        $numberOfCustomer: Int!
        $is_counter: Boolean!
    ) {
        addProductsToCartTable(
            firstname: $firstname
            lastname: " "
            numberOfCustomer: $numberOfCustomer
            tableId: $tableId
            cartItems: $cartItems
            is_counter: $is_counter
        ) {
            cart {
                id
                email
                firstname
                numberOfCustomer
                items {
                    uid
                    id
                    prices {
                        total_item_discount {
                            value
                        }
                        price {
                            value
                        }
                        discounts {
                            label
                            amount {
                                value
                            }
                        }
                    }
                    note
                    product {
                        name
                        sku
                        small_image {
                            url
                            label
                        }
                    }
                    quantity
                    ... on BundleCartItem {
                        bundle_options {
                            id
                            label
                            type
                            values {
                                id
                                label
                                price
                                quantity
                                note
                            }
                        }
                    }
                    ... on ConfigurableCartItem {
                        configurable_options {
                            id
                            option_label
                            value_label
                            value_id
                            note
                        }
                    }
                }
                applied_coupons {
                    code
                }
                prices {
                    discounts {
                        amount {
                            value
                        }
                        label
                    }
                    grand_total {
                        value
                    }
                    subtotal_excluding_tax {
                        value
                    }
                    subtotal_including_tax {
                        value
                    }
                    subtotal_with_discount_excluding_tax {
                        value
                    }
                    applied_taxes {
                        amount {
                            value
                        }
                        label
                    }
                }
            }
            user_errors {
                code
                message
            }
        }
    }
`;
