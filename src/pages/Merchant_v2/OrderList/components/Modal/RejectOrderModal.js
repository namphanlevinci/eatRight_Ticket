/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { Modal, Button, Radio, Input, message } from 'antd';
import './index.scss';
import { CloseCircleFilled } from '@ant-design/icons';
import backIcon from '../../assets/back-button.png';
import { useMutation } from '@apollo/client';
import { MERCHANT_CANCEL_ORDER } from 'graphql/merchant/status';
const { TextArea } = Input;
const { info } = Modal;
const customNotification = (type, messageText, customClass = '') => {
    try {
        message.destroy();
    } catch (e) {
        console.log(e);
    }
    let config = {
        content: messageText,
    };
    if (customClass.length > 0) {
        config = { ...config, className: customClass, icon: <></> };
    }

    message[type](config);
};
export const RejectOrderModal = (props) => {
    const {
        isShowModalRejectOrder,
        closeModalRejectOrder,
        dataOrder,
        submitRejectOrder,
    } = props;
    const [selectedRadio, setSelectedRadio] = useState();
    const [loadingButton, setLoadingButton] = useState(false);
    const [apiCancelOrder] = useMutation(MERCHANT_CANCEL_ORDER);
    const [note, setNote] = useState('');
    const handleCancelOrder = () => {
        if (!selectedRadio) {
            return info({
                icon: <></>,
                content: (
                    <span>
                        {'Please select the reason for canceling the order'}
                    </span>
                ),
                onOk() {},
                onCancel() {},
            });
        }
        if (selectedRadio === 3 && note === '') {
            return info({
                icon: <></>,
                content: (
                    <span>
                        {'Please select the reason for canceling the order'}
                    </span>
                ),
                onOk() {},
                onCancel() {},
            });
        }

        setLoadingButton(true);

        apiCancelOrder({
            variables: {
                orderId: dataOrder?.id,
            },
        }).then((res) => {
            setLoadingButton(false);

            if (res.errors && res.errors?.length > 0) {
                alert(res.errors[0]?.message);
                return;
            }

            if (!res.errors && res.data) {
                if (dataOrder?.payment_method_code !== 'cashondelivery') {
                    info({
                        icon: <></>,
                        title: (
                            <span style={{ fontWeight: 'bold' }}>Success</span>
                        ),
                        content: `Refund successful`,
                        onOk() {
                            submitRejectOrder();
                            setSelectedRadio(null);
                            setNote('');
                        },
                        onCancel() {
                            submitRejectOrder();
                            setSelectedRadio(null);
                            setNote('');
                        },
                    });
                } else {
                    customNotification(
                        'success',
                        `Order ${dataOrder?.order_number} has been canceled`,
                    );
                }
                submitRejectOrder();
                setSelectedRadio(null);
                setNote('');
            }
        });
    };

    const title = (
        <div style={{ borderBottom: '0.5px solid #d3cbcb', paddingBottom: 20 }}>
            <h1>Refuse order #{dataOrder?.order_number}</h1>
            <h2> Please select the reason for canceling the order</h2>
        </div>
    );
    const footer = (
        <div className="modal-button-container">
            <div className="modal-button-container pending" />
            <Button
                loading={loadingButton}
                className="modal-button-confirm"
                onClick={handleCancelOrder}
            >
                {!loadingButton && (
                    <div className="modal-text-confirm">
                        CONFIRM REFUSE TO RECEIVE ORDER
                    </div>
                )}
            </Button>
            <div className="modal-button-container" />
            <Button
                className="modal-button-back"
                onClick={() => {
                    closeModalRejectOrder();
                    setSelectedRadio(null);
                    setNote('');
                    // returnModal();
                }}
            >
                <div className="modal-text-back">
                    <img
                        src={backIcon}
                        style={{
                            width: '16px',
                            height: '16px',
                            marginRight: 5,
                        }}
                    />
                    <div style={{ fontWeight: 'bold' }}>GO BACK</div>
                </div>
            </Button>
        </div>
    );
    const closeIcon = (
        <span>
            <CloseCircleFilled
                style={{
                    color: '#e31837',
                    marginLeft: '70px',
                    fontSize: 46,
                    backgroundColor: '#ffffff',
                    borderRadius: 50,
                }}
            />
        </span>
    );

    return (
        <Modal
            centered={true}
            destroyOnClose={true}
            zIndex={1000}
            footer={footer}
            className="modal-container modal-reject-order"
            title={title}
            open={isShowModalRejectOrder}
            onCancel={() => {
                closeModalRejectOrder();
                setSelectedRadio(null);
                setNote('');
            }}
            closeIcon={closeIcon}
        >
            <div
                className="modal-reject-flex"
                onClick={() => {
                    setSelectedRadio(1);
                }}
            >
                <div className="modal-reject-text">
                    <div style={{ fontWeight: 'bold', font: 16 }}>
                        {'Order is not feasible'}
                    </div>
                </div>
                <div className="modal-reject-radio">
                    <span>
                        <Radio checked={selectedRadio === 1} />
                    </span>
                </div>
            </div>
            <div
                className="modal-reject-flex"
                onClick={() => {
                    setSelectedRadio(2);
                }}
            >
                <div className="modal-reject-text">
                    <div style={{ fontWeight: 'bold', font: 16 }}>Bom</div>
                </div>
                <div className="modal-reject-radio">
                    <span>
                        <Radio checked={selectedRadio === 2} />
                    </span>
                </div>
            </div>
            <div
                className="modal-reject-reason"
                onClick={() => setSelectedRadio(3)}
            >
                <div className="modal-reject-text">
                    <div style={{ fontWeight: 'bold', font: 16 }}>
                        {'Other reasons'}
                    </div>
                </div>
                <div className="modal-reject-radio">
                    <span>
                        <Radio checked={selectedRadio === 3} />
                    </span>
                </div>
            </div>
            {selectedRadio === 3 && (
                <TextArea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder={'Please enter the reason'}
                    style={{ borderRadius: 10, padding: 10 }}
                />
            )}
        </Modal>
    );
};
