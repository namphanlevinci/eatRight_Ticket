import { gql } from '@apollo/client';

export const ADD_MORE_ITEM_TO_CART = gql`
    mutation addMoreProductsToTable(
        $cartId: String!
        $cartItems: [CartItemInput!]!
    ) {
        addMoreProductsToTable(cartId: $cartId, cartItems: $cartItems) {
            cart {
                id
                email
                is_active
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
                tip_amount
                prices {
                    subtotal_including_tax {
                        value
                        currency
                    }
                    subtotal_excluding_tax {
                        value
                        currency
                    }
                    subtotal_with_discount_excluding_tax {
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
            user_errors {
                code
                message
            }
        }
    }
`;
