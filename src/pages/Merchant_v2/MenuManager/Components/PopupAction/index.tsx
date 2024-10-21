/* eslint-disable react/display-name */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal } from 'antd';
import icon_delete from 'pages/Merchant_v2/OrderList/assets/icon/icon_delete.svg';
import './index.scss';
import CustomButton from '../CustomButton';

interface CustomModalProps {
    title?: string;
    content?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    titleActionLeft?: string;
    titleActionRight?: string;
}

export interface CustomModalHandle {
    showModal: () => void;
    handleOk: () => void;
    handleCancel: () => void;
}

const CustomModal = forwardRef<CustomModalHandle, CustomModalProps>(
    (
        {
            title,
            content,
            onConfirm,
            onCancel,
            titleActionLeft = 'Cancel',
            titleActionRight = 'OK',
        },
        ref,
    ) => {
        const [visible, setVisible] = useState<boolean>(false);

        const showModal = () => {
            setVisible(true);
        };

        const handleOk = () => {
            setVisible(false);
            if (onConfirm) {
                onConfirm();
            }
        };

        const handleCancel = () => {
            setVisible(false);
            if (onCancel) {
                onCancel();
            }
        };

        useImperativeHandle(ref, () => ({
            showModal,
            handleOk,
            handleCancel,
        }));

        return (
            <Modal
                title={null}
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="custom-modal"
                width={380}
                closeIcon={<div />}
                centered
            >
                <div className="custom-modal-header">
                    <div className="custom-modal-title">{title}</div>
                    <img
                        src={icon_delete}
                        alt="ic_delete"
                        style={{ cursor: 'pointer' }}
                        onClick={handleCancel}
                    />
                </div>
                <p className="custom-modal-content">{content}</p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 30,
                    }}
                >
                    <CustomButton
                        style={{
                            background: '#FFFFFF',
                            color: '#389E0D',
                            width: '48%',
                            height: 56,
                        }}
                        title={titleActionLeft}
                        onClick={handleCancel}
                    />
                    <CustomButton
                        style={{
                            background: '#389E0D',
                            color: '#fff',
                            width: '48%',
                            height: 56,
                        }}
                        title={titleActionRight}
                        onClick={handleOk}
                    />
                </div>
            </Modal>
        );
    },
);

export default CustomModal;
