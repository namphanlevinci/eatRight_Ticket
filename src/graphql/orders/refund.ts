import { gql } from '@apollo/client';

export const API_REFUND_INVOICE = gql`
    mutation ($reason: String!, $invoice_number: String!) {
        posRefundInvoiceForMarchant(
            input: { invoice_number: $invoice_number, reason: $reason }
        )
    }
`;

export const API_REFUND_ORDER = gql`
    mutation ($reason: String!, $order_number: String!) {
        posRefundForMarchant(
            input: { order_number: $order_number, reason: $reason }
        )
    }
`;
