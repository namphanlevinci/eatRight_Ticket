import { useEffect, useState } from 'react';
import { useCart } from 'context/cartContext';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_CART_BY_ID } from 'graphql/cart/getCart';
import { GET_CARTS_BY_TABLE } from 'graphql/table/table';
import { findIndicesNotInArray } from 'utils/findIndicesNotInArray';
import { REMOVE_ITEM_ON_CART } from 'graphql/cart/removeItemOnCart';
import { UPDATE_STATUS_ITEM } from 'graphql/cart/updateStatusItem';
import { emitter } from 'graphql/client';
export const useCartTable = (isRefreshParams = true, defaultLoading = true) => {
    const [listCart, setListCart] = useState<string[]>([]);
    const [searchParams] = useSearchParams();
    const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
    const [selectedCart, setSelectedCart] = useState(cartIndex || 0);
    const { cartItems, addCart, indexTable, removeCartIndex } = useCart();
    const location = useLocation();
    const isGetAllCart =
        location.pathname.includes('table') &&
        location.pathname.split('/').length === 2;
    const navigation = useNavigate();
    const [removeItem, { loading: removeLoading }] =
        useMutation(REMOVE_ITEM_ON_CART);
    const tableId = parseInt(searchParams.get('tableId') || '0');
    const [loading, setLoading] = useState(defaultLoading);
    const [onGetCart] = useLazyQuery(GET_CART_BY_ID);
    const [onGetCartByTable, { loading: getCartByTableLoading }] =
        useLazyQuery(GET_CARTS_BY_TABLE);
    const [updateStatusItem, { loading: updateLoading }] =
        useMutation(UPDATE_STATUS_ITEM);
    useEffect(() => {
        if (indexTable !== -1) {
            if (cartItems[indexTable].carts.length > 0) {
                setListCart(
                    cartItems[indexTable].carts.map(
                        (item) => item.firstname || item.id,
                    ),
                );
            } else {
                setListCart([]);
            }
        }
    }, [indexTable, cartItems]);
    useEffect(() => {
        if (isRefreshParams) {
            navigation(
                `${location.pathname}?tableId=${tableId}&cartIndex=${selectedCart}`,
            );
        }
    }, [selectedCart]);

    const getCartsTable = async () => {
        if (tableId) {
            setLoading(true);
            const listCartId = await onGetCartByTable({
                variables: {
                    tableId,
                },
                fetchPolicy: 'no-cache',
            });

            if (listCartId?.data?.getCartIdsByTable.length > 0) {
                const list = listCartId?.data?.getCartIdsByTable;
                const promises = list.map((item: any) => {
                    return onGetCart({
                        variables: {
                            cartId: item.cartId,
                        },
                        fetchPolicy: 'no-cache',
                    }).then((res) => res.data.merchantCart);
                });
                Promise.all(promises)
                    .then((carts) => {
                        // Lọc bỏ các cart trả về kết quả là null
                        handleDataGetCart(carts);
                        setLoading(false);
                    })
                    .catch((error) => {
                        // Xử lý lỗi nếu có
                        console.error(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                const indexTable = cartItems.findIndex(
                    (item) => item.tableId == `${tableId}`,
                );
                if (cartItems[indexTable]?.carts?.length > 0) {
                    cartItems[indexTable]?.carts.forEach((item, index) => {
                        if (!item?.firstname?.includes('Guest')) {
                            removeCartIndex(index);
                        }
                    });
                }
                setLoading(false);
            }
        }
    };
    const getCartByIdTable = async () => {
        const cart = cartItems[indexTable]?.carts[selectedCart];
        if (cart) {
            onGetCart({
                variables: {
                    cartId: cart.id,
                },
                fetchPolicy: 'no-cache',
            })
                .then((res) => {
                    handleDataGetCart([res.data.merchantCart], false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };
    const handleDataGetCart = (carts: any, isRemove = true) => {
        // Lọc bỏ các cart trả về kết quả là null
        const filterCarts = carts.filter((item: any) => item !== null);
        addCart(filterCarts);
        // Xoá các cart không có trong listCartId
        if (!isRemove) {
            return;
        }
        const indexTable = cartItems.findIndex(
            (item) => item.tableId == `${tableId}`,
        );
        if (cartItems[indexTable]?.carts && filterCarts) {
            findIndicesNotInArray(
                cartItems[indexTable]?.carts,
                filterCarts,
            ).forEach((item) => {
                if (
                    !cartItems[indexTable].carts[item].firstname.includes(
                        'Guest',
                    )
                ) {
                    removeCartIndex(item);
                }
            });
        }
    };
    useEffect(() => {
        if (isGetAllCart) {
            getCartsTable();
        } else {
            getCartByIdTable();
        }

        emitter.on('updateStatusCart', (id) => {
            if (tableId == id) {
                if (isGetAllCart) {
                    getCartsTable();
                } else {
                    getCartByIdTable();
                }
            }
        });
        return () => {
            emitter.off('updateStatusCart');
        };
    }, []);
    const removeItemOnCartServer = ({
        cartId,
        cartItemId,
    }: {
        cartId: string;
        cartItemId: string;
    }) => {
        removeItem({
            variables: {
                cartId: cartId,
                cartItemId: cartItemId,
            },
        })
            .catch((error) => console.error(error))
            .finally(() => {
                if (isGetAllCart) {
                    getCartsTable();
                } else {
                    getCartByIdTable();
                }
            });
    };
    const updateStatusItemServer = ({
        cartId,
        itemType = 'QUOTE',
    }: {
        cartId: string;
        itemType?: string;
    }) => {
        updateStatusItem({
            variables: {
                id: parseInt(cartId),
                itemType,
            },
        })
            .catch((error) => console.error(error))
            .finally(() => {
                if (isGetAllCart) {
                    getCartsTable();
                } else {
                    getCartByIdTable();
                }
            });
    };
    return {
        loading:
            loading || removeLoading || updateLoading || getCartByTableLoading,
        listCart,
        setSelectedCart,
        setListCart,
        addCart,
        selectedCart,
        indexTable,
        cartItems,
        tableId,
        removeItemOnCartServer,
        updateStatusItemServer,
    };
};
