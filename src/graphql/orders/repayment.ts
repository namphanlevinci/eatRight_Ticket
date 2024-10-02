import { gql } from '@apollo/client';

export const RETRY_PAY_CASH = gql`
    mutation ($orderNumber: String!) {
        retryPayCashOrder(order_number: $orderNumber) {
            order {
                order_number
                order_id
            }
        }
    }
`;
