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
export const PAY_SPLIT_BILL_POS_DJV = gql`
    mutation ($invoice_number: String!, $pos_id: Int!) {
        posSaleInvoiceForMarchant(
            input: { invoice_number: $invoice_number, pos_id: $pos_id }
        )
    }
`;
export const PAY_SPLITBILL = gql`
    mutation (
        $invoice_number: String!
        $payment_method: String!
        $po_number: String
        $received_amount: Float
    ) {
        merchantPayInvoice(
            input: {
                invoice_number: $invoice_number
                payment_method: $payment_method
                po_number: $po_number
                received_amount: $received_amount
            }
        ) {
            invoice {
                id
                number
                state
                invoice_image
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
