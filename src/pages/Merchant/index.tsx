import { Spin } from 'antd';
import React, { useState } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import Header from './Header';
import { useHomeScreen } from './useHomeScreen';
export default function MerchantPage() {
    const handleDragEnd = async ({
        source,
        destination,
    }: {
        source: any;
        destination: any;
    }) => {
        const orderId = source?.index;

        if (!destination || !orderId) {
            return;
        }

        // const nextStatus = destination?.droppableId;

        console.log(source, destination);
    };

    const {
        isLoadingApp,
        reload,
        refundOrderList,
        searchValue,
        setSearchValue,
        setReload,
        setRefundOrderList,
        diningQuoteList,
        diningOrderList,
        renderList,
    } = useHomeScreen();

    console.log(renderList);
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {/* Thêm nội dung cho DragDropContext ở đây */}
            <div className="home-page" style={{ position: 'relative' }}>
                {isLoadingApp && (
                    <div className="loading_container">
                        <Spin />
                    </div>
                )}
                <Header
                    reload={reload}
                    refundOrderList={refundOrderList}
                    setSearchValue={setSearchValue}
                />
            </div>
        </DragDropContext>
    );
}
