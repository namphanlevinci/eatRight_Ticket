import { useMutation } from '@apollo/client';
import { Modal, notification } from 'antd';
import {
    SEND_RECEIPT_TO_EMAIL,
    SEND_RECEIPT_TO_PHONENUMBER,
} from 'graphql/orders/printBill';
import {
    API_REFUND_INVOICE,
    API_REFUND_INVOICE_POS,
    API_REFUND_ORDER,
    API_REFUND_ORDER_POS,
} from 'graphql/orders/refund';
import { PRINT_BILL } from 'graphql/printer';
import { ReceiptDetail } from 'graphql/receipts';

export default function useActionReceipt() {
    const [onPrintBill, { loading: loadingPrint }] = useMutation(PRINT_BILL);
    const [onSendBillToEmail, { loading: sendLoading1 }] = useMutation(
        SEND_RECEIPT_TO_EMAIL,
    );
    const [onSendBillToPhone, { loading: sendLoading2 }] = useMutation(
        SEND_RECEIPT_TO_PHONENUMBER,
    );
    const PrintBillApi = (data: ReceiptDetail | undefined) => {
        if (!data) {
            return;
        }
        if (window?.ReactNativeWebView) {
            const imageUrl = data.invoice_image;
            window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: 'Customer', imageUrl: imageUrl }),
            );
            return;
        }
        onPrintBill({
            variables: {
                invoice_number: data.increment_id,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Receipt sent to printer',
                    description: 'Please go to printer to take the bill!',
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleSendBill = (
        type: string,
        value: string,
        invoiceNumber: string,
    ) => {
        if (!invoiceNumber) {
            return;
        }
        if (type === 'email') {
            onSendBillToEmail({
                variables: {
                    invoiceNumber: invoiceNumber,
                    email: value,
                },
            })
                .then(() => {
                    showSuccess({
                        title: 'Success',
                        content: `Send to ${value} success.`,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            onSendBillToPhone({
                variables: {
                    invoiceNumber: `${invoiceNumber}`,
                    phoneNumber: value,
                    region_code: '+1',
                },
            })
                .then(() => {
                    showSuccess({
                        title: 'Success',
                        content: `Send to ${value} success.`,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const showSuccess = ({
        title,
        content,
    }: {
        title: string;
        content: string;
    }) => {
        notification.success({
            message: title,
            description: content,
        });
    };
    const [onRefundInvoicePos, { loading: refundLoading }] = useMutation(
        API_REFUND_INVOICE_POS,
    );
    const [onRefundOrderPos, { loading: refund2Loading }] =
        useMutation(API_REFUND_ORDER_POS);
    const [onRefundInvoice, { loading: refund3Loading }] =
        useMutation(API_REFUND_INVOICE);
    const [onRefundOrder, { loading: refund4Loading }] =
        useMutation(API_REFUND_ORDER);

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * This function is used to refund money to customer.
     * @param {{
     *  reason: string,
     *  data: ReceiptDetail,
     *  GetDataWithId: any,
     * }} param0
     * @return {*}
     */

    /******  0803ddd9-6159-445a-8dcd-9c7abc2442d4  *******/
    const onRefund = ({
        reason,
        data,
        GetDataWithId,
    }: {
        reason: string;
        data: ReceiptDetail;
        GetDataWithId: any;
    }) => {
        Modal.confirm({
            title: 'Are you sure refund money?',
            centered: true,
            content: 'This action cannot be undone',
            onOk: () => {
                if (data.is_bill_split) {
                    if (
                        data?.payment_method &&
                        data?.payment_method.title !== 'Cash'
                    ) {
                        onRefundInvoicePos({
                            variables: {
                                reason: reason,
                                invoice_number: data?.increment_id,
                            },
                        })
                            .then(() => {
                                notification.success({
                                    message: 'Refund Success',
                                    description: 'Your money has been refunded',
                                });
                                GetDataWithId(data?.increment_id);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        onRefundInvoice({
                            variables: {
                                invoice_number: data?.increment_id,
                            },
                        })
                            .then(() => {
                                notification.success({
                                    message: 'Refund Success',
                                    description: 'Your money has been refunded',
                                });
                                GetDataWithId(data?.increment_id);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                } else {
                    if (
                        data?.order_increment_id &&
                        data?.payment_method.title !== 'Cash'
                    ) {
                        onRefundOrderPos({
                            variables: {
                                reason: reason,
                                order_number: data?.order_increment_id,
                            },
                        })
                            .then(() => {
                                notification.success({
                                    message: 'Refund Success',
                                    description: 'Your money has been refunded',
                                });
                                GetDataWithId(data?.increment_id);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        onRefundOrder({
                            variables: {
                                order_number: data?.order_increment_id,
                            },
                        })
                            .then(() => {
                                notification.success({
                                    message: 'Refund Success',
                                    description: 'Your money has been refunded',
                                });
                                GetDataWithId(data?.increment_id);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                }
            },
        });
    };
    return {
        PrintBillApi,
        loadingPrint,
        loading:
            sendLoading1 ||
            sendLoading2 ||
            refundLoading ||
            refund2Loading ||
            refund3Loading ||
            refund4Loading,
        handleSendBill,
        onRefund,
    };
}
