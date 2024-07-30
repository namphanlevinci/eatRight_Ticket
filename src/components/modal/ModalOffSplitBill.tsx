import { Button, Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React, { useEffect, useRef } from 'react';
export default function ModalOffSplitBill({
    isModalOpen,
    onCancel,
    onSubmit,
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
}) {
    const inputRef = useRef<any>(null);
    useEffect(() => {
        // Kiểm tra xem modal có mở không
        if (isModalOpen && inputRef.current) {
            // Nếu có, thì focus vào input
            inputRef.current.focus();
        }
    }, [isModalOpen]);

    const { theme } = useTheme();
    return (
        <Modal
            title="Basic Modal"
            open={isModalOpen}
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
            width={380}
        >
            <Row justify={'center'} align={'middle'}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>
                    Turn off split bill?
                </Text>
                <div
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 10,
                        right: 20,
                    }}
                    onClick={onCancel}
                >
                    <CloseXIcon />
                </div>
            </Row>
            <Text style={{ textAlign: 'center', marginBlock: 30 }}>
                All split options will be reseted!
            </Text>
            <Row
                align={'middle'}
                style={{ gap: 10, marginTop: 20 }}
                justify={'space-between'}
            >
                <Button
                    title="Turn Off"
                    onClick={onCancel}
                    style={{
                        width: '45%',
                        height: 56,
                        border: 0,
                    }}
                >
                    <Text
                        style={{
                            color: theme.pRIMARY6Primary,
                            fontWeight: '600',
                        }}
                    >
                        Turn Off
                    </Text>
                </Button>
                <ButtonPrimary
                    title="Keep"
                    onClick={onSubmit}
                    width="45%"
                    marginTop="0px"
                />
            </Row>
        </Modal>
    );
}
