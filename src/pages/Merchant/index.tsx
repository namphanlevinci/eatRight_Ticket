import { Spin } from 'antd';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './Header';
import { useHomeScreen } from './useHomeScreen';
import { STATUS_COLUMNS } from './constant';
import { renderHeaderColumnByStatus } from './components/RenderColumn';
import './index.scss';
import Order from './Oders';
import useOpenModal from './useOpenModal';
import { RejectOrderModal } from './components/Modal/RejectOrderModal';
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
        refundOrderList,
        searchValue,
        setSearchValue,
        renderList,
        handleSubmitRecievedOrder,
        setIsLoadingApp,
        setShowModalCancel,
        setDataOrderModal,
        setReload,
        isShowModalCancel,
        dataOrderModal,
        handleSubmitCompletePickUp,
        pushNotificationLocal,
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
                    refundOrderList={refundOrderList}
                    setSearchValue={setSearchValue}
                />
                <button onClick={() => pushNotificationLocal({}, 'Hello 123')}>
                    123
                </button>
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
                                        <div
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
                                                {list_order?.map((order, i) => {
                                                    return (
                                                        <Order
                                                            key={
                                                                order?.order_number
                                                            }
                                                            openModal={(
                                                                status: any,
                                                                order: any,
                                                            ) =>
                                                                handleOpen(
                                                                    status,
                                                                    order,
                                                                )
                                                            }
                                                            order={order}
                                                            id={i}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="board-columns">
                                    {/******************** RENER TITLE HEADER STATUS *********************/}

                                    {renderHeaderColumnByStatus(
                                        {
                                            title: 'COMPLETED',
                                            status: 'complete',
                                        },
                                        0,
                                    )}

                                    {/******************** RENER LIST ORDER BY COLUMN STATUS *********************/}
                                    <div className="colums-wrapper">
                                        {/* {list_order?.map((order, i) => {
                                            return (
                                                <div key={i}>
                                                    {order?.order_number}
                                                </div>
                                            );
                                        })} */}
                                    </div>
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
        </DragDropContext>
    );
}
