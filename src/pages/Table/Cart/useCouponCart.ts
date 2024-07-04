import { useMutation } from '@apollo/client';
import { useCart } from 'context/cartContext';
import { ADD_COUPON, REMOVE_COUPON } from 'graphql/cart/coupon';

export const useCouponCart = () => {
    const [onAddCoupon, { loading: addLoading }] = useMutation(ADD_COUPON);
    const [removeCouponFromCart, { loading: removeLoading }] =
        useMutation(REMOVE_COUPON);
    const { updateCartIndex } = useCart();
    const handleAddCoupon = async (cartId: string, code: string) => {
        await onAddCoupon({
            variables: {
                cartId,
                code,
            },
        })
            .then((res) => {
                if (res.data.merchantApplyCouponToCart.cart) {
                    updateCartIndex(res.data.merchantApplyCouponToCart.cart);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleRemoveCoupon = async (cartId: string) => {
        await removeCouponFromCart({
            variables: {
                cartId,
            },
        })
            .then((res) => {
                if (res.data.removeCouponFromCart.cart) {
                    updateCartIndex(res.data.removeCouponFromCart.cart);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return {
        handleAddCoupon,
        handleRemoveCoupon,
        loading: addLoading || removeLoading,
    };
};
