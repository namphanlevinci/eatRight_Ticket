import { gql } from '@apollo/client';

export const GET_APPOTA_URL = gql`
    mutation ($orderId: Int!) {
        getAppotaPayPaymentURL(id: $orderId) {
            pay_url
        }
    }
`;

export const POS_PAYMENT = gql`
    mutation ($orderId: String!, $posId: String!) {
        arisePosSaleOrderForMarchant(
            input: { terminal_id: $posId, order_number: $orderId }
        )
    }
`;
export const POS_PAYMENT_WITH_DJV = gql`
    mutation ($orderId: String!, $posId: Int!) {
        posSaleForMarchant(input: { order_number: $orderId, pos_id: $posId })
    }
`;
export const POS_DEVICE_LIST = gql`
    {
        merchantGetTerminalList {
            items {
                id
                serialNumber
                terminalManufacturer
                terminalModel
                deliveryStatusId
                deliveryStatusName
                merchantCompanyName
                terminalModeId
                terminalModeName
                createdOn
                modifiedOn
            }
        }
    }
`;
export const POS_DEVICE_LIST_DJV = gql`
    query {
        getPosDevices(currentPage: 1, pageSize: 100) {
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
