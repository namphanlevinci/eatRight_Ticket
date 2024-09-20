import { gql } from '@apollo/client';

export const GET_TERMINALS_DETAIL = gql`
    query ($id: Int!) {
        merchantGetPostDeviceById(id: $id) {
            entity_id
            name
            machine_type
            status
            serial_number
        }
    }
`;

export const GET_TERMINALS_LIST = gql`
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

export const ADD_TERMINAL_PAYMENT = gql`
    mutation (
        $machine_type: MachineTypeEnum!
        $name: String!
        $serial_number: String!
        $auth_key: String!
        $tpn: String!
        $status: Int!
    ) {
        merchantAddPostDevice(
            input: {
                name: $name
                tpn: $tpn
                auth_key: $auth_key
                serial_number: $serial_number
                machine_type: $machine_type
                status: $status
            }
        ) {
            entity_id
            name
            machine_type
            status
            serial_number
        }
    }
`;

export const UPDATE_TERMINAL_PAYMENT = gql`
    mutation (
        $id: Int!
        $machine_type: MachineTypeEnum!
        $name: String!
        $serial_number: String!
        $auth_key: String!
        $tpn: String!
        $status: Int!
    ) {
        merchantUpdatePostDevice(
            input: {
                id: $id
                name: $name
                tpn: $tpn
                auth_key: $auth_key
                serial_number: $serial_number
                machine_type: $machine_type
                status: $status
            }
        ) {
            entity_id
            name
            machine_type
            status
            serial_number
        }
    }
`;

export const DELETE_TERMINAL = gql`
    mutation ($id: Int!) {
        merchantDeletePostDevice(id: $id)
    }
`;
