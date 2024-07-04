import { gql } from '@apollo/client';

export const GET_CART_BY_ID = gql`
    query getCart($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            email
            firstname
            numberOfCustomer
            selected_payment_method {
                code
                title
            }
            shipping_addresses {
                available_shipping_methods {
                    available
                    carrier_code
                    carrier_title
                    method_code
                    method_title
                }
                selected_shipping_method {
                    carrier_code
                    carrier_title
                    method_code
                    method_title
                    amount {
                        value
                        currency
                    }
                }
            }
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
                            item_id
                            status
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
                        item_id
                        status
                        created_at
                        cooking_at
                        ready_at
                        done_at
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
            }
        }
    }
`;
