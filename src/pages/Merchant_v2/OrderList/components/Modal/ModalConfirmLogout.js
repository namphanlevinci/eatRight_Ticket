import React from 'react';
import { Modal, Button, Typography } from 'antd';
import './index.scss';
import { CloseCircleOutlined, CloseCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export const ConfirmLogoutModal = (props) => {
    const { isShowConfirmLogout, closeModalConfirmLogout } = props;
    const history = useNavigate();
    const handleLogout = async () => {
        try {
            history('/login');
        } catch (error) {
            localStorage.clear();
            history('/login');
        }
    };

    const footer = (
        <div className="modal-button-container" style={{ textAlign: 'center' }}>
            <div className="modal-button-container" />
            <Button className="modal-button-confirm" onClick={handleLogout}>
                <div className="modal-text-confirm">Do you want to logout?</div>
            </Button>
            <div className="modal-button-container" />
            <Button
                className="modal-button-back"
                onClick={() => {
                    closeModalConfirmLogout();
                }}
            >
                <div className="modal-text-back">
                    <CloseCircleOutlined
                        color="#e31837"
                        style={{
                            fontSize: '20px',
                            marginRight: '10px',
                            fontWeight: 'bold',
                        }}
                    />
                    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                        Cancel
                    </div>
                </div>
            </Button>
            <Text italic type="secondary">
                Version: 1.3.3.{' '}
            </Text>
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
            footer={footer}
            className="modal-container modal-logout"
            title={<></>}
            visible={isShowConfirmLogout}
            onCancel={closeModalConfirmLogout}
            closeIcon={closeIcon}
        >
            <div style={{ fontWeight: 'bold', fontSize: 25 }}>Logout</div>
        </Modal>
    );
};
