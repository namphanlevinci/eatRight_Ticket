import { gql } from '@apollo/client';

export const ADD_COUPON = gql`
    mutation applyCouponToCart($cartId: String!, $code: String!) {
        merchantApplyCouponToCart(
            input: { cart_id: $cartId, coupon_code: $code }
        ) {
            cart {
                firstname
                id
                email
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
                }
            }
        }
    }
`;

export const REMOVE_COUPON = gql`
    mutation removeCouponFromCart($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId }) {
            cart {
                firstname
                id
                email
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
                            }
                        }
                    }
                    ... on ConfigurableCartItem {
                        configurable_options {
                            id
                            option_label
                            value_label
                            value_id
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
    }
`;
