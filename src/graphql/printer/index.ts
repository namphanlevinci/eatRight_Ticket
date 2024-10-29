import { gql } from '@apollo/client';

export const GET_LIST_PRINTER = gql`
    {
        merchantGetListDevice {
            restaurant_id
            prints {
                id
                printer_name
            }
        }
    }
`;

export const CREATE_KITCHEN_STATION = gql`
    mutation (
        $name: String!
        $id: String
        $printer_method: String
        $printer_name: String
    ) {
        createKitchenStation(
            name: $name
            printer_id: $id
            printer_name: $printer_name
            printer_method: $printer_method
        ) {
            id
            restaurant_id
            name
            printer_id
            printer_name
            printer_method
        }
    }
`;

export const UPDATE_KITCHEN_STATION = gql`
    mutation (
        $id: ID!
        $name: String!
        $printer_id: String
        $printer_method: String
        $printer_name: String
    ) {
        updateKitchenStation(
            id: $id
            name: $name
            printer_id: $printer_id
            printer_method: $printer_method
            printer_name: $printer_name
        ) {
            id
            restaurant_id
            name
            printer_id
            printer_name
            printer_method
        }
    }
`;

export const DELETE_KITCHEN_STATION = gql`
    mutation ($id: ID!) {
        deleteKitchenStation(id: $id)
    }
`;

export const SELECT_PRINTER_DEVICE = gql`
    mutation ($printer_id: Int!) {
        merchantConfigPrinter(printer_id: $printer_id)
    }
`;
export const SELECT_TERMINAL_PRINTER_DEVICE = gql`
    mutation ($pos_id: Int!) {
        waiterAssignPosDevice(pos_id: $pos_id)
    }
`;
export const SELECT_TERMINAL_PRINTER_DEVICE_MERCHANT = gql`
    mutation ($pos_id: Int!, $is_used_terminal: Boolean!) {
        merchantSetConfig(
            config: {
                primary_terminal_id: $pos_id
                is_used_terminal: $is_used_terminal
            }
        ) {
            primary_terminal_id
            is_used_terminal
        }
    }
`;
export const USE_TERMINAL_PRINTER = gql`
    mutation {
        merchantSetConfig(config: { is_used_terminal: true }) {
            primary_terminal_id
            is_used_terminal
        }
    }
`;
export const PRINT_BILL = gql`
    mutation ($invoice_number: String!) {
        merchantPrintReceiptCustomer(invoice_number: $invoice_number)
    }
`;

export const LIST_PRINTER_DEVICES = gql`
    {
        merchantGetListDevice {
            restaurant_id
            prints {
                id
                printer_name
            }
        }
    }
`;

export const OPEN_CASHIER = gql`
    mutation {
        merchantOpenCashier
    }
`;

export const GET_CONFIG_PRINTER = gql`
    query {
        merchantGetPrinterConfig {
            is_used_terminal
            printer_id
        }
    }
`;
