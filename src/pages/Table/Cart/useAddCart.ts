import { useMutation } from '@apollo/client';
import { useCart } from 'context/cartContext';
import { ADD_MORE_ITEM_TO_CART } from 'graphql/cart/addMoreItemToCart';
import { CREATE_CART } from 'graphql/cart/createCart';
import { useSearchParams } from 'react-router-dom';

export const useAddCart = () => {
    const [onAddCart, { loading: loading1 }] = useMutation(CREATE_CART);
    const [onAddMoreCart, { loading: loading2 }] = useMutation(
        ADD_MORE_ITEM_TO_CART,
    );
    const [searchParams] = useSearchParams();
    const tableId = parseInt(searchParams.get('tableId') || '0');
    const { updateCartIndex } = useCart();
    const addCart = async (
        cartItems: any,
        firstname: string,
        numberOfCustomer: number,
        is_counter: boolean,
        phoneNumber?: string,
    ) => {
        await onAddCart({
            variables: {
                firstname: firstname,
                tableId,
                cartItems,
                numberOfCustomer,
                is_counter: is_counter,
                phonenumber: phoneNumber || '',
            },
        })
            .then((res) => {
                if (res.data.addProductsToCartTable.cart) {
                    updateCartIndex(res.data.addProductsToCartTable.cart);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const addMoreCart = async (cartId: string, cartItems: any) => {
        await onAddMoreCart({
            variables: {
                cartId,
                cartItems,
            },
        })
            .then((res) => {
                if (res.data.addMoreProductsToTable.cart) {
                    updateCartIndex(res.data.addMoreProductsToTable.cart);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return { addCart, loading: loading1 || loading2, addMoreCart };
};
