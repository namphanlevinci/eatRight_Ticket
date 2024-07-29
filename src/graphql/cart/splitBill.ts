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
                total {
                    grand_total {
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
