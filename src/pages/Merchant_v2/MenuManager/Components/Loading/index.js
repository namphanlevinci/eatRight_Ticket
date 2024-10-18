import React from 'react';
import { Spin, Modal } from 'antd';
import './index.scss';

const App = ({ loading = false }) => {
    return (
        <div>
            <Modal
                open={loading}
                footer={null}
                closable={false}
                centered
                maskClosable={false}
                className="modal-loading"
                style={{ background: 'transparent' }}
                bodyStyle={{
                    textAlign: 'center',
                    background: 'transparent',
                }}
            >
                <div
                    style={{
                        background: 'white',
                        width: 60,
                        height: 60,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 3000,
                    }}
                >
                    <Spin tip="Loading..." />
                </div>
            </Modal>
        </div>
    );
};

export default App;
