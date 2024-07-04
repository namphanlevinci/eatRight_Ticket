import { gql } from '@apollo/client';

export const GET_NOTIFICATION = gql`
    query ($pageSize: Int!, $currentPage: Int!) {
        getMerchantNotificationList(
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            items {
                notification_id
                type
                order_id
                title
                content
                created_date
            }
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;
