import CartItemList from './components/CartItemList';
import CartInfo from './components/CartInfo';
import { Modal, Row } from 'antd';
import RenderTab from './components/RenderTab';
import { getInitialCartState } from 'context/cartContext';

import LoadingModal from 'components/modal/loadingModal';
import { useCartTable } from './useGetCart';
import { useEffect, useState } from 'react';
import ChangeTableModal from 'components/modal/changeTableModal';
import { useMenuContext } from '../context/MenuContext';
import { random } from 'lodash';

export default function OrderCart({ table }: { table: any }) {
    const {
        addCart,
        cartItems,
        indexTable,
        listCart,
        loading,
        selectedCart,
        setListCart,
        setSelectedCart,
        tableId,
        removeCartIndex,
        removeItemOnCartServer,
        updateStatusItemServer,
        customOpenPriceForItem,
        handleUpdatePriceItem,
    } = useCartTable();
    const { setShowMenu } = useMenuContext();
    const [modalChangeTable, setModalChangeTableOpen] = useState(false);
    useEffect(() => {
        if (!loading && listCart.length === 0) {
            const timeoutId = setTimeout(() => {
                if (!loading && listCart.length === 0) {
                    // Thực hiện các thao tác cần thiết
                    setSelectedCart(listCart.length);
                    setListCart([...listCart, `${listCart.length + 1}`]);
                    addCart(getInitialCartState(`${listCart.length + 1}`));
                }
            }, 300); // 1000ms = 1s

            // Dọn dẹp timeout nếu component bị unmount hoặc effect được gọi lại
            return () => clearTimeout(timeoutId);
        }
    }, [listCart, loading]);
    useEffect(() => {
        if (cartItems.length > 0 && indexTable !== -1 && selectedCart !== -1) {
            if (cartItems[indexTable]?.carts[selectedCart]?.is_active) {
                setShowMenu(true);
            } else {
                setShowMenu(false);
            }
        }
    }, [cartItems, indexTable, selectedCart]);
    const generateValidId = () => {
        let newId: string;
        let isDuplicate;

        do {
            newId = `${random(0, 100)}${listCart.length + 1}`; // Tạo id mới với số ngẫu nhiên
            isDuplicate = cartItems[indexTable]?.carts.some(
                (item) => item.id === newId,
            );
        } while (isDuplicate); // Lặp lại nếu id đã tồn tại

        return newId; // Trả về id hợp lệ không trùng
    };
    return (
        <div style={{ marginBottom: 20 }}>
            <LoadingModal showLoading={loading} />
            {modalChangeTable && (
                <ChangeTableModal
                    modalChangeTable={modalChangeTable}
                    setModalChangeTableOpen={setModalChangeTableOpen}
                />
            )}
            <Row style={{ overflow: 'auto', flexFlow: 'row' }}>
                {listCart.map((item, index) => {
                    const isCartNeedServed = cartItems[indexTable]?.carts[
                        index
                    ]?.items?.find((item) => item.status === 'ready');
                    const isCartFormServerNeedServed = cartItems[
                        indexTable
                    ]?.carts[index]?.order?.items?.find(
                        (item) => item.serving_status === 'ready',
                    );
                    const isPayment =
                        cartItems[indexTable]?.carts[index]?.is_paid;
                    const isBell =
                        isCartFormServerNeedServed || isCartNeedServed;
                    return (
                        <RenderTab
                            isPaid={isPayment ? true : false}
                            isBell={isBell ? true : false}
                            key={index}
                            id={item}
                            selected={selectedCart === index}
                            onClick={() => setSelectedCart(index)}
                            isAllowDelete={item.includes('Guest')}
                            onRemoveItem={() => {
                                Modal.confirm({
                                    title: 'Are you sure you want to delete this cart?',
                                    onOk: () => {
                                        if (index > 0) {
                                            setSelectedCart(index - 1);
                                        }
                                        setListCart(
                                            listCart.filter(
                                                (cart) => cart !== item,
                                            ),
                                        );
                                        removeCartIndex(index);
                                    },
                                    centered: true,
                                });
                            }}
                        />
                    );
                })}
                <RenderTab
                    onClick={() => {
                        setSelectedCart(listCart.length);
                        setListCart([...listCart, `${listCart.length + 1}`]);

                        addCart(getInitialCartState(generateValidId()));
                    }}
                />
            </Row>
            <CartInfo table={{ ...table }} />
            {indexTable !== -1 && (
                <CartItemList
                    data={
                        cartItems.length > 0
                            ? cartItems[indexTable]?.carts
                                ? cartItems[indexTable].carts[selectedCart]
                                : undefined
                            : undefined
                    }
                    cartInfo={`tableId=${tableId}&cartIndex=${selectedCart}`}
                    onClickChangeTable={() => {
                        console.log('change table');
                        setModalChangeTableOpen(true);
                    }}
                    table={table}
                    loadingCardTable={loading}
                    removeItemOnCartServer={removeItemOnCartServer}
                    updateStatusItemServer={updateStatusItemServer}
                    customOpenPriceForItem={customOpenPriceForItem}
                    handleUpdatePriceItem={handleUpdatePriceItem}
                />
            )}
        </div>
    );
}
