import { gql } from '@apollo/client';

export const GET_NON_CASH_ADJUSTMENT = gql`
    {
        merchantGetNonCashConfig {
            status
            value
        }
    }
`;

export const UPDATE_NON_CASH_ADJUSTMENT = gql`
    mutation ($status: Boolean!, $percent: String!) {
        merchantUpdateNonCashInfo(status: $status, percent: $percent)
    }
`;
