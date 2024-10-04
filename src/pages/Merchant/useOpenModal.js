/* eslint-disable react/display-name */
import { Col, Modal, notification, Row, Spin } from 'antd';
import React, { useState, useCallback } from 'react';
import { colorsData } from './constant';
import { capitalizeFirstLetter } from 'utils/renderText';
import PickUpIcon from './assets/pickUpIcon';
import ShippingIcon from './assets/shippingIcon';
import AccountIcon from './assets/accountIcon';
import Tag from './components/Tag';
import RenderItem from './components/NewModalComponent/RenderItem';
import ButtonReceipt from './components/NewModalComponent/ButtonReceipt';
import { useNavigate } from 'react-router-dom';
import ButtonAction from './components/NewModalComponent/ButtonAction';
import DineInIcon from './assets/dineInIcon';
import RenderItemDining from './components/NewModalComponent/RenderItemDining';
import RenderTotal from './components/NewModalComponent/RenderTotal';
import RenderTotalDining from './components/NewModalComponent/RenderTotalDining';
import moment from 'moment';
import { ModalSelectBillToPrint } from './components/ModalSelectBillToPrint';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_INVOICES } from 'graphql/cart/splitBill';
import { PRINT_BILL } from 'graphql/printer';
import { GET_ORDER_DETAIL } from 'graphql/orders/orderDetail';
import { GET_CART_BY_ID } from 'graphql/cart/getCart';
import { BASE_ROUTER } from 'constants/router';
import { convertMethod } from 'utils/format';
import { isEmpty } from "lodash";
const { info } = Modal;
// Component để hiển thị Modal

/**
 * @typedef {Object} OrderDetail
 * @property {number} id
 * @property {string} order_number
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} grand_total
 * @property {string} status
 * @property {string|null} flag_refund
 * @property {string} payment_method
 * @property {string} payment_method_code
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} phone
 * @property {string} address
 * @property {string|null} customer_comment
 * @property {Array<{name: string, qty: number, price: number, status: string|null, note: string|null, options: Array<any>}>} items
 * @property {Array<any>} payment_methods
 * @property {Array<any>} discount
 * @property {string} shipping_method
 * @property {string|null} use_plastic
 * @property {string|null} note
 * @property {string} customer_phone
 * @property {string|null} assign_from
 * @property {string|null} assign_reason
 * @property {number} shipping_amount
 * @property {string} table_id
 * @property {Object} total
 * @property {Object} total.tip_amount
 * @property {number} total.tip_amount.value
 * @property {Object} total.subtotal
 * @property {number} total.subtotal.value
 * @property {Object} total.total_shipping
 * @property {number} total.total_shipping.value
 * @property {Object} total.total_tax
 * @property {number} total.total_tax.value
 * @property {Object} total.grand_total
 * @property {number} total.grand_total.value
 */

export default function useOpenModal() {
    const [open, setOpen] = useState(false);
    /** @type {[OrderDetail|null, React.Dispatch<React.SetStateAction<OrderDetail|null>>]} */
    const [orderDetails, setOrderDetails] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(false); // Khởi tạo loading với false
    const [headerData, setHeaderData] = useState(null);
    const [apiGetInvoice] = useLazyQuery(GET_INVOICES);
    const [apiPrintInvoice] = useMutation(PRINT_BILL);
    const [apiGetDetailOrder] = useLazyQuery(GET_ORDER_DETAIL);
    const [apiGetDetailQuote] = useLazyQuery(GET_CART_BY_ID);
    const handleOpen = useCallback(async (status, order) => {
        setHeaderData({ ...order, status });
        setOpen(true);
        setLoading(true);
        if (order?.order_number) {
            const res = await apiGetDetailOrder({
                variables: { id: order?.id },
            });
            setLoading(false);
            console.log(status);
            if (!res.errors && res.data) {
                setOrderDetails(res?.data?.orderDetail);
            } else {
                info({
                    icon: <></>,
                    title: <span style={{ fontWeight: 'bold' }}>Failed</span>,
                    content: res?.errors[0]?.message,
                });
            }
            const getInvoice = await apiGetInvoice({
                variables: {
                    OrderNumber: order?.order_number,
                },
            });
            if (!getInvoice.errors && getInvoice.data) {
                console.log(
                    getInvoice?.data?.merchantGetOrderInvoices?.invoice,
                );
                setInvoiceData(
                    getInvoice?.data?.merchantGetOrderInvoices?.invoice,
                );
            }
        } else {
            const res = await apiGetDetailQuote({
                variables: { cartId: order?.cart_id },
            });
            setLoading(false);
            if (!res.errors && res.data) {
                console.log(res?.data);
                setOrderDetails({ ...res?.data?.merchantCart, type: 'quote' });
            } else {
                info({
                    icon: <></>,
                    title: <span style={{ fontWeight: 'bold' }}>Failed</span>,
                    content: res?.errors[0]?.message,
                });
            }
        }
    }, []);
    const [modalPrintBill, setModalPrintBill] = useState(false);
    const PrintBill = () => {
        if (invoiceData.length > 1) {
            setModalPrintBill(true);
        } else {
            apiPrintInvoice({
                variables: { invoice_number: invoiceData[0]?.number },
            })
                .then(
                    notification.success({
                        message: 'Receipt sent to printer',
                        description: 'Please go to printer to take the bill!',
                    }),
                )
                .catch((err) => {
                    notification.error({
                        message: 'Error',
                        description: err?.errors?.[0]?.message,
                    });
                });
        }
    };
    return {
        ModalDetail,
        handleOpen,
        open,
        orderDetails,
        loading,
        setOpen,
        headerData,
        modalPrintBill,
        invoiceData,
        setModalPrintBill,
        PrintBill,
    };
}
/**
 * @type {React.FC<{open: boolean, onClose: any, loading: boolean, data: OrderDetail | null , headerData: OrderDetail | null, handleSubmitRecievedOrder: any, handleCancel: any, handleSubmitCompletePickUp: any, invoiceData: any, setModalPrintBill: any, PrintBill: any, modalPrintBill: boolean, isCompletedOrder: boolean}>}
 */
const ModalDetail = React.memo(
    ({
        open,
        onClose,
        loading,
        data,
        headerData,
        handleSubmitRecievedOrder,
        handleCancel,
        handleSubmitCompletePickUp,
        invoiceData,
        setModalPrintBill,
        PrintBill,
        modalPrintBill,
        isCompletedOrder,
    }) => {
        const history = useNavigate();
        console.log({ data })
        return (
            <>
                <Modal
                    key="received"
                    centered={true}
                    destroyOnClose={true}
                    className="modal-v2"
                    visible={open}
                    width={632}
                    onCancel={onClose}
                    closable={false}
                    footer={null}
                >
                    {!loading ? (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    height: 44,
                                    border: `1px solid var(${
                                        colorsData[headerData?.status]
                                            ?.borderColor ||
                                        '--tertiary-2-default'
                                    })`,
                                    background: `var(${
                                        colorsData[headerData?.status]
                                            ?.background || '--tertiary-1---bg'
                                    })`,
                                    borderRadius: 4,
                                    padding: '10px 16px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                    }}
                                >
                                    <span
                                        style={{
                                            color: `var(${
                                                colorsData[headerData?.status]
                                                    ?.borderColor ||
                                                '--tertiary-2-default'
                                            })`,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {capitalizeFirstLetter(
                                            headerData?.status === 'pending'
                                                ? 'New'
                                                : headerData?.status ===
                                                    'ready_to_ship'
                                                  ? 'Ready'
                                                  : headerData?.status || 'New',
                                        )}
                                    </span>
                                    {headerData?.order_source?.includes(
                                        'DELIVERY',
                                    ) ? (
                                        <>
                                            <ShippingIcon />{' '}
                                            <span style={{ fontWeight: 600 }}>
                                                Delivery{' '}
                                            </span>
                                        </>
                                    ) : headerData?.order_source ===
                                      'DINING' ? (
                                        <>
                                            <DineInIcon />{' '}
                                            <span style={{ fontWeight: 600 }}>
                                                Dine In{' '}
                                            </span>
                                        </>
                                    ) : headerData?.order_source ===
                                      'PICKUP' ? (
                                        <>
                                            <PickUpIcon />
                                            <span style={{ fontWeight: 600 }}>
                                                Pick Up{' '}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <DineInIcon />{' '}
                                            <span style={{ fontWeight: 600 }}>
                                                Dine In{' '}
                                            </span>
                                        </>
                                    )}
                                    {headerData?.order_number ||
                                        headerData?.table}{' '}
                                    {headerData?.table &&
                                        headerData?.order_number &&
                                        `- ${headerData?.table}`}
                                </div>
                                <div>
                                    <span>
                                        Ordered at{' '}
                                        {moment
                                            .utc(headerData?.created_at)
                                            .local()
                                            .format('YYYY-MM-DD  HH:mm')}
                                    </span>
                                </div>
                            </div>
                            {/* Customer Infomation  */}

                            <div style={{ padding: 16 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10,
                                    }}
                                >
                                    <AccountIcon />
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 16,
                                        }}
                                    >
                                        {data?.firstname} {data?.lastname}{' '}
                                        {data?.customer_phone}
                                    </span>
                                </div>
                                {headerData?.order_source !== 'DINING' && (
                                    <div
                                        style={{
                                            marginTop: 8,
                                            fontSize: 16,
                                            color: 'var(--text-secondary)',
                                        }}
                                    >
                                        {data?.address}
                                    </div>
                                )}
                                {data?.waiter_name && (
                                    <div
                                        style={{
                                            marginTop: 8,
                                            fontSize: 16,
                                            color: 'var(--text-secondary)',
                                        }}
                                    >
                                        Waiter: {data?.waiter_name}
                                    </div>
                                )}
                            </div>
                            {/* Order Items */}
                            <div
                                style={{
                                    height: 1,
                                    border: '1px solid var(--neutral-line)',
                                    marginBottom: 16,
                                }}
                            />
                            <div style={{ maxHeight: 200, overflow: 'auto' }}>
                                {data?.items?.map((item) => {
                                    return item?.id ? (
                                        <RenderItemDining
                                            item={item}
                                            key={item?.id}
                                        />
                                    ) : (
                                        <RenderItem
                                            item={item}
                                            key={item?.id}
                                        />
                                    );
                                })}
                            </div>
                            <div
                                style={{
                                    height: 1,
                                    border: '1px solid var(--neutral-line)',
                                    marginBottom: 16,
                                }}
                            />
                            {/* Render Payment  */}
                            <Row style={{ marginBottom: 24 }}>
                                <Col
                                    span={12}
                                    style={{
                                        borderRight:
                                            '1px solid var(--neutral-line)',
                                    }}
                                >
                                    {headerData?.type === 'dining-quotes' ? (
                                        <Row
                                            align={'middle'}
                                            style={{ gap: 16 }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Payment{' '}
                                            </div>
                                            <Tag
                                                type="canceled"
                                                title="Unpaid"
                                            />
                                        </Row>
                                    ) : (
                                        <div>
                                            <Row>
                                                <div
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: 600,
                                                        marginRight: 20,
                                                    }}
                                                >
                                                    Payment{' '}
                                                </div>
                                                {data?.payment_method_code?.toLowerCase() ===
                                                'arise' ? (
                                                    <Tag
                                                        type="paid"
                                                        title="Paid"
                                                    />
                                                ) : data?.order_number &&
                                                  data?.table_id ? (
                                                    <Tag
                                                        type="paid"
                                                        title="Paid"
                                                    />
                                                ) : (
                                                    <Tag
                                                        type="canceled"
                                                        title="Unpaid"
                                                    />
                                                )}
                                            </Row>
                                            <div style={{ marginTop: 12 }}>
                                                Method {convertMethod(data?.payment_method)}
                                            </div>
                                            {
                                            
                                            !isEmpty(data?.payment_methods?.[0]?.po_number) && data?.payment_methods?.[0]?.po_number !== "none" && 
                                            <div style={{ marginTop: 12 }}>
                                                {data?.payment_methods?.[0]?.po_number}
                                            </div>
                                            }
                                            {/* <div>Invoice Id</div> */}
                                            <div
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                    marginTop: 12,
                                                }}
                                            >
                                                Receipt
                                            </div>

                                            <Row
                                                style={{
                                                    gap: 10,
                                                    marginTop: 12,
                                                }}
                                            >
                                                <ButtonReceipt
                                                    title={'View'}
                                                    borderColor={'--primary-6'}
                                                    textColor={'--primary-6'}
                                                    onPress={() =>
                                                        history(
                                                            `${BASE_ROUTER.BILL_DETAIL}?order_id=${data.id}`,
                                                        )
                                                    }
                                                />
                                                <ButtonReceipt
                                                    title={'Print'}
                                                    background={'--primary-6'}
                                                    textColor={
                                                        '--neutral-primary'
                                                    }
                                                    onPress={() => {
                                                        PrintBill();
                                                    }}
                                                />
                                            </Row>
                                        </div>
                                    )}
                                </Col>
                                <Col span={12} style={{ paddingLeft: 16 }}>
                                    {headerData?.type === 'dining-quotes' ? (
                                        <RenderTotalDining data={data} />
                                    ) : (
                                        <RenderTotal data={data} />
                                    )}
                                </Col>
                            </Row>

                            {/* Render Button Action */}

                            {!isCompletedOrder &&
                                (headerData?.table ? (
                                    <ButtonAction
                                        title={'Go to table'}
                                        background={'--primary-6'}
                                        textColor={'--primary-1'}
                                        onPress={() => {
                                            history(
                                                `${BASE_ROUTER.TABLE}?tableId=${headerData?.table_id}`,
                                            );
                                        }}
                                    />
                                ) : headerData?.status === 'pending' ? (
                                    <Row style={{ gap: 32 }} justify={'center'}>
                                        <ButtonAction
                                            title={'Cancel'}
                                            background={'--error-1-bg'}
                                            textColor={'--error-2-default'}
                                            width="45%"
                                            onPress={() => {
                                                handleCancel(data);
                                            }}
                                        />
                                        <ButtonAction
                                            title={'Receive'}
                                            background={'--info-2-default'}
                                            textColor={'--primary-1'}
                                            width="45%"
                                            onPress={() => {
                                                handleSubmitRecievedOrder(
                                                    data?.id,
                                                );
                                            }}
                                        />
                                    </Row>
                                ) : headerData?.status === 'ready_to_ship' ? (
                                    <Row style={{ gap: 32 }} justify={'center'}>
                                        <ButtonAction
                                            title={'Cancel'}
                                            background={'--error-1-bg'}
                                            textColor={'--error-2-default'}
                                            width="45%"
                                            onPress={() => {
                                                handleCancel(data);
                                            }}
                                        />
                                        <ButtonAction
                                            title={'Complete'}
                                            background={'--primary-6'}
                                            textColor={'--primary-1'}
                                            width="45%"
                                            onPress={() => {
                                                handleSubmitCompletePickUp(
                                                    data,
                                                );
                                            }}
                                        />
                                    </Row>
                                ) : (
                                    <ButtonAction
                                        title={'Cancel'}
                                        background={'--error-1-bg'}
                                        textColor={'--error-2-default'}
                                        onPress={() => {
                                            handleCancel(data);
                                        }}
                                    />
                                ))}
                        </>
                    ) : (
                        <div
                            style={{
                                height: '460px',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}
                        >
                            <Spin />
                        </div>
                    )}
                </Modal>
                {modalPrintBill && (
                    <ModalSelectBillToPrint
                        data={invoiceData}
                        isVisibleModal={modalPrintBill}
                        setVisibleMoal={setModalPrintBill}
                        onPressOK={PrintBill}
                    />
                )}
            </>
        );
    },
);
