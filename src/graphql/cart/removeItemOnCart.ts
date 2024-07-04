import { gql } from '@apollo/client';

export const REMOVE_ITEM_ON_CART = gql`
    mutation merchantRemoveItemFromCart($cartId: String!, $cartItemId: Int) {
        merchantRemoveItemFromCart(
            input: { cart_id: $cartId, cart_item_id: $cartItemId }
        ) {
            cart {
                items {
                    id
                }
            }
        }
    }
`;
