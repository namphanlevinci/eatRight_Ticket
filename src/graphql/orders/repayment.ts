import { gql } from '@apollo/client';

export const GET_RE_PAYMENT_URL = gql`
    mutation ($orderId: Int!, $paymentMethod: String!) {
        retryPurchaseAppotaPayOrder(
            input: { id: $orderId, payment_method: $paymentMethod }
        ) {
            pay_url
        }
    }
`;
