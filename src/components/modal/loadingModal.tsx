import { Modal, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

export default function LoadingModal({
    showLoading,
}: {
    showLoading: boolean;
}) {
    return showLoading ? (
        <CustomModal
            open={showLoading}
            footer={() => <></>}
            centered
            closable={false}
            style={{ background: 'transparent' }}
        >
            <div
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    background: 'transparent',
                }}
            >
                <Spin />
            </div>
        </CustomModal>
    ) : (
        <></>
    );
}

const CustomModal = styled(Modal)`
    .ant-modal-content {
        background: transparent;
        box-shadow: none !important;
    }
`;
