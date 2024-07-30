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
