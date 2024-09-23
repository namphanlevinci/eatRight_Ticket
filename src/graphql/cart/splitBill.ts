import { gql } from '@apollo/client';

export const GET_INVOICES = gql`
    query ($OrderNumber: String!) {
        merchantGetOrderInvoices(order_number: $OrderNumber) {
            order {
                order_number
                order_id
                table
                created_at
                lead_guest
                guests
                payment_method
                payment_method_code
                total {
                    grand_total {
                        value
                        currency
                    }
                    tip_amount {
                        value
                        currency
                    }
                }
            }
            invoice {
                id
                number
                state
                can_refund
                is_refunded
                total {
                    tip_amount {
                        value
                        currency
                    }
                    subtotal {
                        value
                        currency
                    }
                    discounts {
                        label
                        amount {
                            value
                            currency
                        }
                    }
                    total_tax {
                        value
                        currency
                    }
                    taxes {
                        amount {
                            value
                            currency
                        }
                        title
                        rate
                    }
                    grand_total {
                        value
                        currency
                    }
                    base_grand_total {
                        value
                        currency
                    }
                    total_shipping {
                        value
                        currency
                    }
                }
                items {
                    id
                    order_item {
                        id
                        product_name
                        product_sku
                    }
                    product_name
                    product_sku
                    product_sale_price {
                        value
                        currency
                    }
                    quantity_invoiced
                }
                payment_methods {
                    name
                    type
                    additional_data {
                        name
                        value
                    }
                }
            }
        }
    }
`;

export const SPLIT_BILL_BY_ITEM = gql`
    mutation ($cartId: String!, $SplitItems: [SplitDataInput]!) {
        merchantCreateOrderWithSplitItems(
            input: { cart_id: $cartId, split_items: $SplitItems }
        ) {
            order {
                order_number
                order_id
                table
                created_at
                lead_guest
                guests
                total {
                    grand_total {
                        value
                        currency
                    }
                    tip_amount {
                        value
                        currency
                    }
                }
            }
            invoice {
                id
                number
                state
                total {
                    subtotal {
                        value
                        currency
                    }
                    tip_amount {
                        value
                        currency
                    }
                    discounts {
                        label
                        amount {
                            value
                            currency
                        }
                    }
                    total_tax {
                        value
                        currency
                    }
                    taxes {
                        amount {
                            value
                            currency
                        }
                        title
                        rate
                    }
                    grand_total {
                        value
                        currency
                    }
                    base_grand_total {
                        value
                        currency
                    }
                    total_shipping {
                        value
                        currency
                    }
                }
                items {
                    id
                    order_item {
                        id
                        product_name
                        product_sku
                    }
                    product_name
                    product_sku
                    product_sale_price {
                        value
                        currency
                    }
                    quantity_invoiced
                }
            }
        }
    }
`;

export const SPLIT_BILL_EVENLY = gql`
    mutation ($cartId: String!, $numbersOfCustomer: Int!) {
        merchantCreateOrderWithSplitEvenly(
            input: { cart_id: $cartId, numbersOfCustomer: $numbersOfCustomer }
        ) {
            order {
                order_number
                order_id
                table
                created_at
                lead_guest
                guests
                total {
                    grand_total {
                        value
                        currency
                    }
                    tip_amount {
                        value
                        currency
                    }
                }
            }
            invoice {
                id
                number
                state
                total {
                    subtotal {
                        value
                        currency
                    }
                    tip_amount {
                        value
                        currency
                    }
                    discounts {
                        label
                        amount {
                            value
                            currency
                        }
                    }
                    total_tax {
                        value
                        currency
                    }
                    taxes {
                        amount {
                            value
                            currency
                        }
                        title
                        rate
                    }
                    grand_total {
                        value
                        currency
                    }
                    base_grand_total {
                        value
                        currency
                    }
                    total_shipping {
                        value
                        currency
                    }
                }
                items {
                    id
                    order_item {
                        id
                        product_name
                        product_sku
                    }
                    product_name
                    product_sku
                    product_sale_price {
                        value
                        currency
                    }
                    quantity_invoiced
                }
            }
        }
    }
`;
