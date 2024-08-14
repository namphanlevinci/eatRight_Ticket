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
