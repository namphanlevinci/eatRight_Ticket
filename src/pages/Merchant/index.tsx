import { Spin } from 'antd';
import React, { useState } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import Header from './Header';
import { useHomeScreen } from './useHomeScreen';
import { STATUS_COLUMNS } from './constant';
import { renderHeaderColumnByStatus } from './components/RenderColumn';
import './index.scss';
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
                {renderList ? (
                    <div className="home-board">
                        <div className="container-box">
                            <div className="board-wrapper">
                                {STATUS_COLUMNS?.map((item, index) => {
                                    const list_order = renderList
                                        .filter(
                                            (order) =>
                                                order?.order_number?.includes?.(
                                                    searchValue,
                                                ) ||
                                                order?.table
                                                    ?.toLowerCase()
                                                    ?.includes?.(searchValue) ||
                                                order?.first_name
                                                    ?.toLowerCase()
                                                    ?.includes?.(searchValue) ||
                                                order?.phone_number?.includes?.(
                                                    searchValue,
                                                ),
                                        )
                                        ?.map((order_item) => {
                                            if (
                                                order_item?.status?.toLowerCase?.() ===
                                                    item?.status?.toLowerCase?.() ||
                                                item?.status
                                                    ?.toLowerCase()
                                                    ?.includes?.(
                                                        order_item?.status?.toLowerCase(),
                                                    )
                                            ) {
                                                return order_item;
                                            }
                                            if (
                                                order_item?.status?.toLowerCase?.() ===
                                                    'bom_request' &&
                                                item?.status === 'shipping'
                                            ) {
                                                return order_item;
                                            }
                                            if (
                                                order_item?.status?.toLowerCase?.() ===
                                                    'arrived' &&
                                                item?.status?.toLowerCase?.() ===
                                                    'shipping'
                                            ) {
                                                return order_item;
                                            }
                                            return null;
                                        })
                                        .filter((item) => item);
                                    const countOrderByStatus =
                                        list_order?.length ?? 0;

                                    return (
                                        <Droppable
                                            droppableId={item?.status}
                                            key={index}
                                        >
                                            {(provided, _snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    className="board-columns"
                                                    key={index}
                                                >
                                                    {/******************** RENER TITLE HEADER STATUS *********************/}

                                                    {renderHeaderColumnByStatus(
                                                        item,
                                                        countOrderByStatus,
                                                    )}

                                                    {/******************** RENER LIST ORDER BY COLUMN STATUS *********************/}
                                                    <div className="colums-wrapper">
                                                        {list_order?.map(
                                                            (order, i) => {
                                                                return (
                                                                    // <Order
                                                                    //   key={order?.order_number}
                                                                    //   handleSubmitBom={handleSubmitBom}
                                                                    //   openModal={(status, order) =>
                                                                    //     handleOpen(status, order)
                                                                    //   }
                                                                    //   order={order}
                                                                    //   id={i}
                                                                    //   playSound={playSoundNotResponse}
                                                                    //   saveOrderListNotResponse={
                                                                    //     saveOrderListNotResponse
                                                                    //   }
                                                                    //   orderListNotResponse={orderListNotResponse}
                                                                    //   playOrderNOtResponseAgain={
                                                                    //     playOrderNOtResponseAgain
                                                                    //   }
                                                                    //   turnOffAppSound={turnOffAppSound}
                                                                    // />
                                                                    <div
                                                                        key={i}
                                                                    >
                                                                        {
                                                                            order?.order_number
                                                                        }
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </Droppable>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="loading_container">
                        <Spin />
                    </div>
                )}
            </div>
        </DragDropContext>
    );
}
