import React, { useEffect, useState } from 'react';

import { ItemType } from 'context/cartType';

export const useSplitItem = ({
    items,
    listGuest,
}: {
    items?: ItemType[];
    listGuest: string[];
}) => {
    const [guests, setGuests] = React.useState<string[]>(listGuest);
    const [selected, setSelected] = React.useState<string[]>([]);
    const [listData, setListData] = React.useState<ItemType[]>(items || []);
    const [itemFromGuest, setItemFromGuest] = React.useState<string>('');
    const handleSelect = (id: string, guestId?: string) => {
        console.log(1);
        if (itemFromGuest !== '' && guestId !== itemFromGuest) {
            setSelected([id]);
            setItemFromGuest(guestId || '');
            console.log('not run here');
            return;
        }
        console.log(2);
        if (selected.includes(id)) {
            console.log(3);
            setSelected(selected.filter((item) => item !== id));
        } else {
            console.log(selected, id);
            console.log(4);
            setSelected([...selected, id]);
        }
        setItemFromGuest(guestId || '');
    };
    const [modalSplitItem, setModalSplitItem] = useState(false);
    const handleSplitSubmit = (result: number) => {
        const data = items?.find((item) => item.id === selected[0]);
        let list = [];
        if (data && result > 1) {
            const newQuantity = data.quantity / result;
            const newQuantityText = `${data.quantity} / ${result}`;
            for (let i = 0; i < result; i++) {
                list.push({
                    ...data,
                    quantity: newQuantity,
                    quantityText: newQuantityText,
                    id: `${data.id}-${i}`,
                    parentId: data.id,
                });
            }
        }
        const newList = listData?.filter((item) => item.id !== selected[0]);
        setListData([...newList, ...list]);
        setModalSplitItem(false);
        setSelected([]);
    };
    useEffect(() => {
        if (items) {
            setListData(items);
        }
    }, [items]);
    useEffect(() => {
        if (listGuest.length > 0) {
            setGuests(listGuest);
        }
    }, [listGuest]);
    const handleAddGuestIdToItem = (guestId: string) => {
        if (selected.length > 0) {
            const data = listData?.map((item) => {
                if (item.id && selected.includes(item.id)) {
                    return { ...item, guestId };
                }
                return item;
            });
            setListData(data);
            setSelected([]);
            setItemFromGuest('');
        }
    };
    return {
        handleSelect,
        guests,
        setGuests,
        selected,
        setSelected,
        listData,
        setListData,
        modalSplitItem,
        setModalSplitItem,
        handleSplitSubmit,
        handleAddGuestIdToItem,
        itemFromGuest,
    };
};
