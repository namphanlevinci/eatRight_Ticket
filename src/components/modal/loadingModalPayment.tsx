import { Modal, Spin, Button } from 'antd';
import { Text } from 'components/atom/Text';
import React from 'react';
import styled from 'styled-components';

export default function LoadingModalPayment({
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
                    flexDirection: 'column',
                    gap: 20,
                }}
            >
                <Spin />
                <Text style={{ color: 'white' }}>Payment processing...</Text>

                <Button> Cancel </Button>
            </div>
        </CustomModal>
    ) : (
        <></>
    );
}

const CustomModal = styled(Modal)`
    .ant-modal-content {
        background: transparent;
    }
`;
