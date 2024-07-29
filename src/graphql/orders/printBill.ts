import { gql } from '@apollo/client';

export const SEND_RECEIPT_TO_EMAIL = gql`
    mutation ($invoiceNumber: String!, $email: String!) {
        merchantSendReceiptToEmail(
            input: { invoice_number: $invoiceNumber, email: $email }
        )
    }
`;

export const SEND_RECEIPT_TO_PHONENUMBER = gql`
    mutation ($invoiceNumber: String!, $phoneNumber: String!) {
        merchantSendReceiptToSms(
            input: {
                invoice_number: $invoiceNumber
                phone_number: $phoneNumber
                region_code: "+1"
            }
        )
    }
`;
