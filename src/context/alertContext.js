import React, { createContext, useState } from 'react';
import { Modal } from 'antd';

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState(null);

    const closeModal = () => {
        setError(null);
        setIsModalVisible(false);
    };

    const handleOk = () => {
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    const openModal = (text) => {
        setIsModalVisible(true);
        setError(text);
    };

    return (
        <AlertContext.Provider
            value={{
                closeModal,
                openModal,
            }}
        >
            {children}
            <Modal
                title={
                    <div
                        style={{
                            fontWeight: '600',
                            color: '#389E0E',
                            fontSize: 20,
                        }}
                    >
                        Notification
                    </div>
                } // Custom title
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                {error && (
                    <div
                        style={{
                            color: 'red',
                            fontSize: 16,
                            fontWeight: '500',
                            background: '#FEF1F2',
                            padding: 16,
                            borderRadius: 5,
                        }}
                    >
                        {error}
                    </div>
                )}
            </Modal>
        </AlertContext.Provider>
    );
};

export { AlertProvider, AlertContext };
