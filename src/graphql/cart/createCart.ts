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
                lastname
                numberOfCustomer
                items {
                    uid
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
                    product {
                        name
                        sku
                    }
                    discount_percent
                    id
                    quantity
                    status
                    created_at
                    cooking_at
                    ready_at
                    done_at
                    note
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
                                status
                                item_id
                                created_at
                                cooking_at
                                ready_at
                                done_at
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
                            status
                            item_id
                            created_at
                            cooking_at
                            ready_at
                            done_at
                        }
                    }
                }
                applied_coupons {
                    code
                }
                prices {
                    subtotal_including_tax {
                        value
                        currency
                    }
                    subtotal_excluding_tax {
                        value
                        currency
                    }
                    discount {
                        amount {
                            value
                        }
                        label
                    }
                    discounts {
                        amount {
                            value
                        }
                        label
                    }
                    grand_total {
                        value
                        currency
                    }
                    applied_taxes {
                        tax_percent
                        amount {
                            value
                            currency
                        }
                        label
                    }
                }
            }
        }
    }
`;
