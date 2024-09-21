import { gql } from '@apollo/client';

export const API_REFUND_INVOICE_POS = gql`
    mutation ($reason: String!, $invoice_number: String!) {
        posRefundInvoiceForMarchant(
            input: { invoice_number: $invoice_number, reason: $reason }
        )
    }
`;

export const API_REFUND_ORDER_POS = gql`
    mutation ($reason: String!, $order_number: String!) {
        posRefundForMarchant(
            input: { order_number: $order_number, reason: $reason }
        )
    }
`;

export const API_REFUND_ORDER = gql`
    mutation ($order_number: String!) {
        mutation {
            merchantRefundOrder(order_number: $order_number)
        }
    }
`;
export const API_REFUND_INVOICE = gql`
    mutation ($invoice_number: String!) {
        mutation {
            merchantRefundInvoice(invoice_number: $order_number)
        }
    }
`;
