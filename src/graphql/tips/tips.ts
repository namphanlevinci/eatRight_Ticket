import { gql } from '@apollo/client';

export const GET_TIPS = gql`
    # type: fixed, percent
    query {
        tipRestaurant {
            include_tax_in_tip
            tip_option {
                type
                amount_option
            }
        }
    }
`;

export const SET_TIPS = gql`
    # type: fixed, percent
    mutation (
        $include_tax_in_tip: Boolean!
        $amount_option: [Float!]!
        $type: String!
    ) {
        setupTipRestaurant(
            type: $type
            amount_option: $amount_option
            include_tax_in_tip: $include_tax_in_tip
        )
    }
`;
