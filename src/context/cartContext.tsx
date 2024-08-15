import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItemType, CartTableType, ItemType } from './cartType';
import { useSearchParams } from 'react-router-dom';

// Định nghĩa loại dữ liệu cho sản phẩm trong giỏ hàng

// Định nghĩa loại dữ liệu cho Context của giỏ hàng
interface CartContextType {
    indexTable: number;
    cartItems: CartTableType[];
    addCart: (item: any) => void;
    addToCart(item: ItemType): void;
    updateQuantityItemFromCart: (index: number, quantity: number) => void;
    // clearCart: () => void;
    setSelectedCart: any;
    selectedCart: number;
    setCustomerName: (
        name: string,
        cartIndex: number,
        indexTable: number,
    ) => void;
    updateCartIndex: (cart: CartItemType) => void;
    removeCartIndex: (index?: number) => void;
    removeItemFromCart: (sku: string) => void;
    InputNoteItemFromCart: (index: number, note: string) => void;
    InputNoteItemBundleFromCart: (
        index: number,
        note: string,
        bundleIndex: number,
    ) => void;
}

// Tạo Context cho giỏ hàng
const CartContext = createContext<CartContextType | undefined>(undefined);
// Custom hook để sử dụng CartContext
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Component cha chứa dữ liệu giỏ hàng và cung cấp thông tin qua Context Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartTableType[]>([]);
    const [indexTable, setIndexTable] = useState(-1);
    const [selectedCart, setSelectedCart] = useState(0);
    const [searchParams] = useSearchParams();
    const tableId = searchParams.get('tableId') || '0';
    useEffect(() => {
        const getIndexTable = cartItems.findIndex(
            (item) => item.tableId == tableId,
        );
        setIndexTable(getIndexTable);
    }, [tableId, cartItems]);
    const addCart = (item: CartItemType[]) => {
        setCartItems((prevCartItems) => {
            const newCartItems = [...prevCartItems];
            const tableId = searchParams.get('tableId') || '0';
            const indexTable = prevCartItems.findIndex(
                (item) => item.tableId == tableId,
            );

            if (indexTable == -1) {
                const newCart = item.map((currentCart) => {
                    const Tax =
                        (currentCart?.prices?.applied_taxes?.[0]?.tax_percent ||
                            10) / 100;
                    const itemsCanceled = currentCart.items.filter((item) => {
                        return item.status === 'cancel';
                    });
                    const total_canceled_without_tax = itemsCanceled.reduce(
                        (total, item) => {
                            return (
                                total + item.prices.price.value * item.quantity
                            );
                        },
                        0,
                    );
                    const total_canceled =
                        total_canceled_without_tax * (Tax + 1);
                    const total_items_canceled_discount = itemsCanceled.reduce(
                        (total, item) => {
                            return (
                                total +
                                (item.prices.total_item_discount?.value ||
                                    0 * item.quantity)
                            );
                        },
                        0,
                    );
                    return {
                        ...currentCart,
                        prices: {
                            ...currentCart.prices,
                            total_canceled: {
                                value: total_canceled,
                            },
                            total_canceled_without_tax: {
                                value: total_canceled_without_tax,
                            },
                            total_items_canceled_discount: {
                                value: total_items_canceled_discount,
                            },
                        },
                    };
                });

                newCartItems.push({
                    tableId: tableId,
                    carts: newCart,
                });
            } else {
                console.log('run update cart');
                updateCart(item, indexTable);
            }

            return newCartItems;
        });
    };

    const updateCartIndex = (cart: CartItemType) => {
        const getIndexTable = cartItems.findIndex(
            (item) => item.tableId == tableId,
        );
        const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
        const newCartItems = [...cartItems];
        newCartItems[getIndexTable].carts[cartIndex] = cart;
        updateCart(newCartItems[getIndexTable].carts, getIndexTable);
    };
    const removeCartIndex = (index?: number) => {
        const getIndexTable = cartItems.findIndex(
            (item) => item.tableId == tableId,
        );
        const cartIndex =
            index || parseInt(searchParams.get('cartIndex') || '0', 10);

        if (getIndexTable !== -1) {
            const newCartItems = [...cartItems];
            const updatedCart = { ...newCartItems[getIndexTable] };

            // Xóa phần tử có index là cartIndex từ mảng carts
            updatedCart.carts.splice(cartIndex, 1);

            // Cập nhật lại mảng cartItems với phần tử được cập nhật
            newCartItems[getIndexTable] = updatedCart;

            setCartItems(newCartItems);
        }
    };
    const updateCart = (cartItemNew: CartItemType[], indexTable: number) => {
        setCartItems((prevCartItems) => {
            const currentCartItems = [...prevCartItems];
            const result = currentCartItems[indexTable].carts.map(
                (currentCart) => {
                    const itemsIsUnSend = currentCart.items.filter((item) => {
                        return item.isUnsend;
                    });
                    const newCarts = cartItemNew.find((itemNew) => {
                        return itemNew.id === currentCart.id;
                    });
                    const itemsCanceled = currentCart.items.filter((item) => {
                        return item.status === 'cancel';
                    });
                    const Tax =
                        (currentCart?.prices?.applied_taxes?.[0]?.tax_percent ||
                            10) / 100;

                    const total_itemsCanceled_without_tax =
                        itemsCanceled.reduce((total, item) => {
                            return (
                                total + item.prices.price.value * item.quantity
                            );
                        }, 0);
                    const total_itemsCanceled =
                        total_itemsCanceled_without_tax * (Tax + 1);
                    const total_items_canceled_discount = itemsCanceled.reduce(
                        (total, item) => {
                            return (
                                total +
                                (item.prices.total_item_discount?.value ||
                                    0 * item.quantity)
                            );
                        },
                        0,
                    );

                    if (newCarts) {
                        if (newCarts?.items && newCarts?.items.length > 0) {
                            return {
                                ...newCarts,
                                items: [...newCarts.items, ...itemsIsUnSend],
                                prices: {
                                    ...newCarts.prices,
                                    grand_total: {
                                        value:
                                            newCarts.prices.grand_total.value +
                                            itemsIsUnSend.reduce(
                                                (total, item) => {
                                                    return (
                                                        total +
                                                        item.prices.price
                                                            .value *
                                                            item.quantity
                                                    );
                                                },
                                                0,
                                            ),
                                    },
                                    total_canceled: {
                                        value: total_itemsCanceled,
                                    },
                                    total_canceled_without_tax: {
                                        value: total_itemsCanceled_without_tax,
                                    },
                                    total_items_canceled_discount: {
                                        value: total_items_canceled_discount,
                                    },
                                },
                            };
                        }
                        return {
                            ...newCarts,
                            prices: {
                                ...newCarts.prices,
                                total_canceled: {
                                    value: total_itemsCanceled,
                                },
                                total_canceled_without_tax: {
                                    value: total_itemsCanceled_without_tax,
                                },
                                total_items_canceled_discount: {
                                    value: total_items_canceled_discount,
                                },
                            },
                        };
                    }

                    return {
                        ...currentCart,
                    };
                },
            );

            // Kiểm tra xem cart này đã có tồn tại hay chưa , nếu chưa thì thêm mới
            cartItemNew.forEach((newItem) => {
                if (!result.find((item) => item.id === newItem.id)) {
                    result.push(newItem);
                }
            });

            currentCartItems[indexTable].carts = result;
            return currentCartItems;
        });
    };

    const addToCart = (item: ItemType) => {
        const index = parseInt(searchParams.get('cartIndex') || '0');
        let newCartItems;
        if (!cartItems[indexTable]?.carts) {
            newCartItems = getInitialCartState('1');
        } else {
            if (cartItems[indexTable]?.carts.length === 0) {
                newCartItems = getInitialCartState('1');
            } else {
                newCartItems = [...cartItems[indexTable].carts];
            }
        }
        let total = newCartItems[index]?.prices?.new_items_total?.value || 0;
        const foundIndex = newCartItems[index]?.items?.findIndex(
            (i) =>
                i.id == item.id &&
                JSON.stringify(i.bundle_options) ===
                    JSON.stringify(item.bundle_options),
        );

        if (foundIndex !== -1 && foundIndex !== undefined) {
            newCartItems[index].items[foundIndex].quantity += item.quantity;
        } else {
            if (newCartItems[index]?.items) {
                newCartItems[index] = {
                    ...newCartItems[index],
                    items: [...newCartItems[index].items, item],
                };
            }
        }
        total += item.prices.price.value * item.quantity;
        newCartItems[index].prices = {
            ...newCartItems[index].prices,
            new_items_total: {
                value: total,
            },
        };

        const newCartTable = [...cartItems];
        if (!cartItems[indexTable]?.carts) {
            setCartItems([
                {
                    tableId: tableId,
                    carts: newCartItems,
                },
            ]);
        } else {
            newCartTable[indexTable].carts = newCartItems;
            setCartItems(newCartTable);
        }
    };
    const removeItemFromCart = (sku: string) => {
        const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
        const newCartItems = [...cartItems[indexTable].carts];
        const index = newCartItems[cartIndex].items.findIndex(
            (e) => e.id === sku,
        );
        let total = newCartItems[cartIndex].prices?.new_items_total?.value || 0;
        total -= newCartItems[cartIndex].items[index].prices.price.value;
        newCartItems[cartIndex].items.splice(index, 1);
        newCartItems[cartIndex].prices = {
            ...newCartItems[cartIndex].prices,
            new_items_total: {
                value: total,
            },
        };
        const newCartTable = [...cartItems];
        newCartTable[indexTable].carts = newCartItems;
        setCartItems(newCartTable);
    };
    const updateQuantityItemFromCart = (index: number, quantity: number) => {
        const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
        const newCartItems = [...cartItems[indexTable].carts];
        let total = newCartItems[cartIndex].prices?.new_items_total?.value || 0;

        if (quantity === 0) {
            if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                total -=
                    newCartItems[cartIndex].items[index].prices.price.value;
                newCartItems[cartIndex].items.splice(index, 1);
            }
        } else {
            if (newCartItems[cartIndex].items[index].quantity > quantity) {
                total -=
                    newCartItems[cartIndex].items[index].prices.price.value;
            } else {
                total +=
                    newCartItems[cartIndex].items[index].prices.price.value;
            }
            if (!newCartItems[cartIndex]?.items[index]?.isUnsend) {
                newCartItems[cartIndex].items.push({
                    ...newCartItems[cartIndex].items[index],
                    isUnsend: true,
                    quantity: 1,
                    status: 'new',
                });
            } else {
                newCartItems[cartIndex].items[index].quantity = quantity;
            }
        }
        newCartItems[cartIndex].prices = {
            ...newCartItems[cartIndex].prices,
            new_items_total: {
                value: total,
            },
        };
        const newCartTable = [...cartItems];
        newCartTable[indexTable].carts = newCartItems;
        setCartItems(newCartTable);
    };

    // const clearCart = async () => {
    //     setCartItems([]);
    // };
    const InputNoteItemFromCart = (index: number, note: string) => {
        const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
        const newCartItems = [...cartItems[indexTable].carts];
        newCartItems[cartIndex].items[index].note = note;
        const newCartTable = [...cartItems];
        newCartTable[indexTable].carts = newCartItems;
        setCartItems(newCartTable);
    };
    const InputNoteItemBundleFromCart = (
        index: number,
        note: string,
        bundleIdex: number,
    ) => {
        const cartIndex = parseInt(searchParams.get('cartIndex') || '0');
        const newCartItems = [...cartItems[indexTable].carts];
        const check = newCartItems[cartIndex].items[index].bundle_options;
        if (check && check.length > 0) {
            check[bundleIdex].note = note;
        }
        newCartItems[cartIndex].items[index].bundle_options = check;
        const newCartTable = [...cartItems];
        newCartTable[indexTable].carts = newCartItems;
        setCartItems(newCartTable);
    };
    const setCustomerName = (
        name: string,
        selectedCart: number,
        indexTable: number,
    ) => {
        const newCartItems = [...cartItems[indexTable].carts];
        newCartItems[selectedCart].firstname = name;
        const newCartTable = [...cartItems];
        newCartTable[indexTable].carts = newCartItems;
        setCartItems(newCartTable);
    };
    const cartContextValue: CartContextType = {
        indexTable,
        cartItems,
        addCart,
        addToCart,
        updateQuantityItemFromCart,
        // clearCart,
        selectedCart,
        setSelectedCart,
        setCustomerName,
        updateCartIndex,
        removeCartIndex,
        removeItemFromCart,
        InputNoteItemFromCart,
        InputNoteItemBundleFromCart,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const getInitialTableState = (id: string, tableId: string | number) => {
    return {
        tableId: tableId,
        carts: [
            {
                id: id,
                items: [],
                applied_coupons: null,
                customerName: 'Guest',
                prices: {
                    discounts: [
                        {
                            amount: {
                                value: 0,
                            },
                            label: '',
                        },
                    ],
                    grand_total: {
                        value: 0,
                    },
                },
            },
        ],
    };
};

export const getInitialCartState = (id: string) => {
    return [
        {
            id: id,
            items: [],
            applied_coupons: null,
            numberOfCustomer: 1,
            firstname: `Guest ${id}`,
            prices: {
                discounts: [
                    {
                        amount: {
                            value: 0,
                        },
                        label: '',
                    },
                ],
                grand_total: {
                    value: 0,
                },
                new_items_total: {
                    value: 0,
                },
            },
        },
    ];
};
