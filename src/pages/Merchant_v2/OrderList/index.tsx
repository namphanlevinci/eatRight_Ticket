/* eslint-disable curly */
import { Spin } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHomeScreen } from './useHomeScreen';
import { STATUS_COLUMNS } from './constant';
import { renderHeaderColumnByStatus } from './components/RenderColumn';
import './index.scss';
import Order from './Oders';
import useOpenModal from './useOpenModal';
import { RejectOrderModal } from './components/Modal/RejectOrderModal';
import { useOrderCompleted } from './useOrderComplete';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function MerchantOrderList() {
    const { filterOrder, searchText } = useSelector(
        (state: RootState) => state.global,
    );

    const {
        isLoadingApp,
        renderList,
        handleSubmitRecievedOrder,
        setIsLoadingApp,
        setShowModalCancel,
        setDataOrderModal,
        setReload,
        isShowModalCancel,
        dataOrderModal,
        handleSubmitCompletePickUp,
    } = useHomeScreen();

    const {
        ModalDetail,
        orderDetails,
        handleOpen,
        open,
        loading,
        setOpen,
        headerData,
        invoiceData,
        setModalPrintBill,
        PrintBill,
        modalPrintBill,
    } = useOpenModal();

    const {
        currentPage,
        listCompletedOrder,
        loading2,
        setCurrentPage,
        totalComplete,
    } = useOrderCompleted();
    const scrollRef = useRef<any>(null);
    const handleScroll = useCallback(
        debounce(() => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    scrollRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 50) {
                    if (scrollTop > 10) {
                        if (loading2) return;
                        setCurrentPage((prev) => prev + 1);
                        scrollRef?.current?.scrollTo({
                            top: scrollTop - 200, // Scroll lên 50px
                            behavior: 'smooth', // Hiệu ứng cuộn mượt mà
                        });
                    }
                }
            }
        }, 300),
        [currentPage, loading2],
    );
    useEffect(() => {
        const node = scrollRef.current;
        if (node) {
            node.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (node) {
                node.removeEventListener('scroll', handleScroll);
            }
        };
    }, [currentPage, loading2]);
    const [isCompletedOrder, setIsCompletedOrder] = useState(false);

    const handleDragEnd = () => {
        console.log('handle drag end');
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div>
                {/* Thêm nội dung cho DragDropContext ở đây */}
                <div className="home-page" style={{ position: 'relative' }}>
                    {isLoadingApp && (
                        <div className="loading_container">
                            <Spin />
                        </div>
                    )}
                    {/* <Header
                    refundOrderList={refundOrderList}
                    setSearchValue={setSearchValue}
                    isSearch={true}
                    onFilterChange={(value: any) => setFilterValue(value)}
                /> */}
                    {renderList ? (
                        <div className="home-board">
                            <div className="container-box">
                                <div className="board-wrapper">
                                    {STATUS_COLUMNS?.map((item, index) => {
                                        const list_order = renderList
                                            .filter((order) => {
                                                if (
                                                    filterOrder.is_dine_in &&
                                                    filterOrder.is_eat_out
                                                ) {
                                                    return order;
                                                }
                                                if (
                                                    filterOrder.is_dine_in &&
                                                    !filterOrder.is_eat_out
                                                ) {
                                                    return (
                                                        order.order_source ===
                                                            'DINING' ||
                                                        order.type ===
                                                            'dining-quotes'
                                                    );
                                                }
                                                if (
                                                    !filterOrder.is_dine_in &&
                                                    filterOrder.is_eat_out
                                                ) {
                                                    return (
                                                        order.order_source !==
                                                            'DINING' &&
                                                        order.type !==
                                                            'dining-quotes'
                                                    );
                                                }
                                            })
                                            .filter((order) => {
                                                const lowerSearchText =
                                                    searchText?.order?.toLowerCase();

                                                if (!lowerSearchText)
                                                    return true;

                                                return (
                                                    order?.order_number?.includes(
                                                        lowerSearchText,
                                                    ) ||
                                                    order?.table
                                                        ?.toLowerCase()
                                                        ?.includes(
                                                            lowerSearchText,
                                                        ) ||
                                                    order?.first_name
                                                        ?.toLowerCase()
                                                        ?.includes(
                                                            lowerSearchText,
                                                        ) ||
                                                    order?.phone_number?.includes(
                                                        lowerSearchText,
                                                    )
                                                );
                                            })
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

                                        console.log('status : ', item?.status);

                                        return (
                                            <Droppable
                                                droppableId={item?.status}
                                                key={index}
                                            >
                                                {(provided, _snapshot) => (
                                                    <div
                                                        className="board-columns"
                                                        key={index}
                                                        ref={provided.innerRef}
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
                                                                        <Order
                                                                            key={
                                                                                order?.order_number
                                                                            }
                                                                            openModal={(
                                                                                status: any,
                                                                                order: any,
                                                                            ) => {
                                                                                handleOpen(
                                                                                    status,
                                                                                    order,
                                                                                );
                                                                                setIsCompletedOrder(
                                                                                    false,
                                                                                );
                                                                            }}
                                                                            order={
                                                                                order
                                                                            }
                                                                            id={
                                                                                i
                                                                            }
                                                                        />
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </Droppable>
                                        );
                                    })}
                                    <div
                                        ref={scrollRef}
                                        className="board-columns"
                                        key={'completed-6'}
                                        style={{ overflowY: 'auto' }}
                                    >
                                        {/******************** RENER TITLE HEADER STATUS *********************/}

                                        {renderHeaderColumnByStatus(
                                            {
                                                title: 'COMPLETED',
                                                status: 'complete',
                                            },
                                            totalComplete,
                                        )}

                                        {/******************** RENER LIST ORDER BY COLUMN STATUS *********************/}
                                        <Droppable droppableId={'complete'}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    className="colums-wrapper"
                                                    {...provided.droppableProps}
                                                >
                                                    {listCompletedOrder
                                                        ?.filter(
                                                            (order: any) =>
                                                                order?.order_number?.includes?.(
                                                                    searchText?.order?.toLowerCase(),
                                                                ) ||
                                                                order?.table
                                                                    ?.toLowerCase()
                                                                    ?.includes?.(
                                                                        searchText?.order
                                                                            ?.toLowerCase()
                                                                            ?.toLowerCase(),
                                                                    ) ||
                                                                order?.first_name
                                                                    ?.toLowerCase()
                                                                    ?.includes?.(
                                                                        searchText?.order
                                                                            ?.toLowerCase()
                                                                            ?.toLowerCase(),
                                                                    ) ||
                                                                order?.phone_number?.includes?.(
                                                                    searchText?.order?.toLowerCase(),
                                                                ),
                                                        )
                                                        .map(
                                                            (
                                                                order: any,
                                                                i: number,
                                                            ) => {
                                                                return (
                                                                    <Order
                                                                        key={
                                                                            order?.order_number
                                                                        }
                                                                        openModal={(
                                                                            status: any,
                                                                            order: any,
                                                                        ) => {
                                                                            handleOpen(
                                                                                status,
                                                                                order,
                                                                            );
                                                                            setIsCompletedOrder(
                                                                                true,
                                                                            );
                                                                        }}
                                                                        order={
                                                                            order
                                                                        }
                                                                        id={i}
                                                                        isCompletedOrder={
                                                                            true
                                                                        }
                                                                    />
                                                                );
                                                            },
                                                        )}
                                                </div>
                                            )}
                                        </Droppable>

                                        {loading2 && <Spin />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="loading_container">
                            <Spin />
                        </div>
                    )}
                    <ModalDetail
                        open={open}
                        loading={loading}
                        data={orderDetails}
                        onClose={() => setOpen(false)}
                        headerData={headerData}
                        handleSubmitRecievedOrder={async (orderId: any) => {
                            await handleSubmitRecievedOrder(orderId);
                            setIsLoadingApp(false);
                            setOpen(false);
                        }}
                        handleCancel={(data: any) => {
                            setDataOrderModal(data);
                            setShowModalCancel(true);
                        }}
                        handleSubmitCompletePickUp={(data: any) => {
                            handleSubmitCompletePickUp(data);
                            setOpen(false);
                        }}
                        invoiceData={invoiceData}
                        setModalPrintBill={setModalPrintBill}
                        PrintBill={PrintBill}
                        modalPrintBill={modalPrintBill}
                        isCompletedOrder={isCompletedOrder}
                    />
                    <RejectOrderModal
                        reload={() => setReload()}
                        dataOrder={dataOrderModal}
                        isShowModalRejectOrder={isShowModalCancel}
                        closeModalRejectOrder={() => setShowModalCancel(false)}
                        submitRejectOrder={() => {
                            setShowModalCancel(false);
                            setOpen(!open);
                            setReload();
                        }}
                    />
                </div>
            </div>
        </DragDropContext>
    );
}
