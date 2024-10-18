import { Button, Modal, Spin } from 'antd';
import { Text } from 'components/atom/Text';
import React from 'react';
import styled from 'styled-components';

export default function LoadingModalPayment({
    showLoading,
    title = 'Payment processing...',
    onClose,
    isClose = true,
}: {
    showLoading: boolean;
    title?: string;
    onClose?: () => void;
    isClose?: boolean;
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
                    flexDirection: 'column',
                    gap: 20,
                }}
            >
                <Spin />
                <Text style={{ color: 'white' }}>{title}</Text>
                {isClose && <Button onClick={onClose}> Close </Button>}
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
