import CartItemList from './components/CartItemList';
import CartInfo from './components/CartInfo';
import { Row } from 'antd';
import RenderTab from './components/RenderTab';
import { getInitialCartState } from 'context/cartContext';

import LoadingModal from 'components/modal/loadingModal';
import { useCartTable } from './useGetCart';
import { useEffect, useState } from 'react';
import ChangeTableModal from 'components/modal/changeTableModal';
import { useMenuContext } from '../context/MenuContext';

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
    return (
        <div style={{ marginBottom: 20 }}>
            <LoadingModal showLoading={loading} />
            <ChangeTableModal
                modalChangeTable={modalChangeTable}
                setModalChangeTableOpen={setModalChangeTableOpen}
            />
            <Row>
                {listCart.map((item, index) => {
                    return (
                        <RenderTab
                            key={index}
                            id={item}
                            selected={selectedCart === index}
                            onClick={() => setSelectedCart(index)}
                        />
                    );
                })}
                <RenderTab
                    onClick={() => {
                        setSelectedCart(listCart.length);
                        setListCart([...listCart, `${listCart.length + 1}`]);
                        addCart(getInitialCartState(`${listCart.length + 1}`));
                    }}
                />
            </Row>
            <CartInfo table={table} />
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
                />
            )}
        </div>
    );
}
