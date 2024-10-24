import { gql } from '@apollo/client';

export const UPDATE_PRICE_ITEM_ON_CART = gql`
    mutation ($cartId: String!, $itemId: Int!, $customPrice: Float!) {
        updateCustomPriceItem(
            cartId: $cartId
            itemId: $itemId
            customPrice: $customPrice
        )
    }
`;
