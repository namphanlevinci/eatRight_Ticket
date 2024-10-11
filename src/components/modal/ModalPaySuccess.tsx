import { Modal, Row, notification } from 'antd';
import { useTheme } from 'context/themeContext';
import styled from 'styled-components';
import React from 'react';
import SmsIcon from 'assets/icons/smsIcon';
import PrintIcon from 'assets/icons/printIcon';
import EmailIcon from 'assets/icons/emailIcon';
import CloseXIcon from 'assets/icons/closeIcon';
import SuccessIcon from 'assets/icons/successIcon';
import ModalInput from 'components/modal/ModalInput';
import {
    SEND_RECEIPT_TO_EMAIL,
    SEND_RECEIPT_TO_PHONENUMBER,
} from 'graphql/orders/printBill';
import { PRINT_BILL } from 'graphql/printer';
import { GET_INVOICES } from 'graphql/cart/splitBill';
import { GET_ORDER_DETAIL } from 'graphql/orders/orderDetail';

import { useMutation, useLazyQuery } from '@apollo/client';

export default function ModalPaySuccess() {
    const { theme } = useTheme();
    const [modalInputEmail, setModalInputEmail] = React.useState(false);
    const [onSendBillToEmail, { loading: sendLoading1 }] = useMutation(
        SEND_RECEIPT_TO_EMAIL,
    );
    const [onSendBillToPhone, { loading: sendLoading2 }] = useMutation(
        SEND_RECEIPT_TO_PHONENUMBER,
    );
    const [onGetInvoices, { data: dataSplitBill }] = useLazyQuery(
        GET_INVOICES,
        {
            fetchPolicy: 'cache-and-network',
        },
    );
    const [onPrintBill, { loading: loadingPrint }] = useMutation(PRINT_BILL);
    const [getOrderDetail, { data, loading, refetch }] = useLazyQuery(
        GET_ORDER_DETAIL,
        {
            fetchPolicy: 'cache-and-network',
        },
    );

    const [selectDataShowbill, setSelectDataShowbill] = React.useState<any>();
    const [childBill, setChildBill] = React.useState<any>([]);

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

    const PrintBillApi = () => {
        if (window?.ReactNativeWebView) {
            const imageUrl = selectDataShowbill
                ? selectDataShowbill.invoice_image
                : dataSplitBill?.merchantGetOrderInvoices?.invoice[0]
                      .invoice_image;
            window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: 'Customer', imageUrl: imageUrl }),
            );
        }
        // else {

        if (childBill.length) {
            onPrintBill({
                variables: {
                    invoice_number: selectDataShowbill.number,
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
        } else {
            if (dataSplitBill?.merchantGetOrderInvoices?.invoice.length === 0) {
                onGetInvoices({
                    variables: {
                        OrderNumber: data?.orderDetail?.order_number,
                    },
                    fetchPolicy: 'no-cache',
                }).then((res) => {
                    const newData = res?.data?.merchantGetOrderInvoices;
                    onPrintBill({
                        variables: {
                            invoice_number: newData.invoice[0]?.number,
                        },
                    })
                        .then(() => {
                            notification.success({
                                message: 'Receipt sent to printer',
                                description:
                                    'Please go to printer to take the bill!',
                            });
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                });
                return;
            }
            onPrintBill({
                variables: {
                    invoice_number:
                        dataSplitBill?.merchantGetOrderInvoices?.invoice[0]
                            ?.number,
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
        }
        // }
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
                .catch((err: any) => {
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
                .catch((err: any) => {
                    console.log(err);
                });
        }
    };

    return (
        <Modal
            title="Basic Modal"
            open={true}
            styles={{
                footer: {
                    display: 'none',
                },
                header: {
                    display: 'none',
                },
                content: {
                    backgroundColor: theme.nEUTRALPrimary,
                },
            }}
            closeIcon={<></>}
            closable={false}
            centered
            width={622}
        >
            <Header>
                <p>Receipt Options</p>
                <CloseXIcon />
            </Header>
            <Body>
                <Item>
                    <div>
                        <PrintIcon />
                        <p>Print</p>
                    </div>
                </Item>
                <Item onClick={() => setModalInputEmail(true)}>
                    <div>
                        <EmailIcon />
                        <p>Email</p>
                    </div>
                </Item>
                <Item>
                    <div>
                        <SmsIcon />
                        <p>Refund</p>
                    </div>
                </Item>
            </Body>

            <Bottom>
                <SuccessIcon />
                <p>Payment Successful</p>
            </Bottom>
            <ModalInput
                isModalOpen={modalInputEmail}
                title="Input customer e-mail"
                onSubmit={(value: string) => {
                    handleSendBill(
                        'email',
                        value,
                        selectDataShowbill
                            ? selectDataShowbill?.number
                            : dataSplitBill?.merchantGetOrderInvoices
                                  ?.invoice[0]?.number,
                    );
                    setModalInputEmail(false);
                }}
                onCancel={() => {
                    setModalInputEmail(false);
                }}
                type="email"
            />
        </Modal>
    );
}

const Header = styled.div`
    dispplay: flex;
    align-items: center;
    justify-content: space-between;
    display: flex;
    & > p {
        color: #4a505c;
        font-weight: 600;
        font-family: Montserrat;
        font-size: 22px;
    }
`;

const Body = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 40px;
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    & > p {
        margin-top: 16px;
        color: #08875d;
        font-weight: 600;
        font-family: Montserrat;
        font-size: 26px;
    }
`;

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0455bf;
    border-radius: 8px;
    width: 169px;
    height: 143px;
    cursor: pointer;
    & > div {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        font-family: Montserrat;
        text-align: center;
    }
`;
