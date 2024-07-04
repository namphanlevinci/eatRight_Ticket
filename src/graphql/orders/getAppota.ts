import { gql } from '@apollo/client';

export const GET_APPOTA_URL = gql`
    mutation ($orderId: Int!) {
        getAppotaPayPaymentURL(id: $orderId) {
            pay_url
        }
    }
`;
