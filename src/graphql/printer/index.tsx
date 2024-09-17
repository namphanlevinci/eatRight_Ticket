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
