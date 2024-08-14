import { gql } from '@apollo/client';

export const PAY_SPLIT_BILL_POS = gql`
    mutation ($invoice_number: String!, $terminal_id: String!) {
        arisePosSaleInvoiceForMarchant(
            input: {
                terminal_id: $terminal_id
                invoice_number: $invoice_number
            }
        )
    }
`;

export const PAY_SPLITBILL = gql`
    mutation ($invoice_number: String!, $payment_method: String!) {
        merchantPayInvoice(
            input: {
                invoice_number: $invoice_number
                payment_method: $payment_method
            }
        ) {
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
