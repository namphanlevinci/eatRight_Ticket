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
    mutation ($name: String!, $id: Int!) {
        createKitchenStation(name: $name, printer_id: $id) {
            id
            restaurant_id
            name
            printer_id
        }
    }
`;

export const UPDATE_KITCHEN_STATION = gql`
    mutation ($id: ID!, $name: String!, $printer_id: Int!) {
        updateKitchenStation(id: $id, name: $name, printer_id: $printer_id) {
            id
            restaurant_id
            name
            printer_id
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
