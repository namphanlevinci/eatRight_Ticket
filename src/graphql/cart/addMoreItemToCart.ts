import { gql } from '@apollo/client';

export const ADD_MORE_ITEM_TO_CART = gql`
    mutation addMoreProductsToTable(
        $cartId: String!
        $cartItems: [CartItemInput!]!
    ) {
        addMoreProductsToTable(cartId: $cartId, cartItems: $cartItems) {
            cart {
                firstname
                id
                email
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
                    product {
                        name
                        sku
                        small_image {
                            url
                            label
                        }
                    }
                    note
                    quantity
                    status
                    created_at
                    cooking_at
                    ready_at
                    done_at
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
                                created_at
                                cooking_at
                                ready_at
                                done_at
                                item_id
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
                            created_at
                            cooking_at
                            ready_at
                            done_at
                            item_id
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
