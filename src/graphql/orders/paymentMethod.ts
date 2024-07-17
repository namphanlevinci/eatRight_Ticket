import { gql } from '@apollo/client';

export const GET_APPOTA_URL = gql`
    mutation ($orderId: Int!) {
        getAppotaPayPaymentURL(id: $orderId) {
            pay_url
        }
    }
`;

export const POS_PAYMENT = gql`
    mutation ($orderId: String!, $posId: Int!) {
        posSaleForMarchant(input: { order_number: $orderId, pos_id: $posId })
    }
`;

export const POS_DEVICE_LIST = gql`
    query {
        getPosDevices(currentPage: 1, pageSize: 20) {
            items {
                entity_id
                name
                status
            }
            page_info {
                current_page
                page_size
                total_pages
            }
        }
    }
`;
