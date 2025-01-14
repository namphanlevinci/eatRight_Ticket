import { gql } from '@apollo/client';

export const GET_CART_BY_ID = gql`
    query merchantCart($cartId: String!) {
        merchantCart(cart_id: $cartId) {
            is_active
            order_number
            order_id
            id
            email
            firstname
            phonenumber
            lastname
            numberOfCustomer
            is_paid
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
                    open_price
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
            order {
                items {
                    id
                    name
                    qty
                    price
                    serving_status
                    options {
                        name
                        qty
                        price
                    }
                }
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
    }
`;
