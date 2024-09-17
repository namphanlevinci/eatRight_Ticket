import { gql } from '@apollo/client';

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

export const SELECT_PRINTER_DEVICE = gql`
    mutation ($printer_id: Int!) {
        merchantConfigPrinter(printer_id: $printer_id)
    }
`;

export const PRINT_BILL = gql`
    mutation ($invoice_number: String!) {
        merchantPrintReceipt(invoice_number: $invoice_number)
    }
`;
