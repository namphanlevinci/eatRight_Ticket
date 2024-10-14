import { Button, Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React, { useEffect, useRef } from 'react';
export default function ModalConfirm({
    isModalOpen,
    onCancel,
    onSubmit,
    title,
    content,
    okText = 'Ok',
    cancelText = 'Cancel',
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
    title: string;
    content: string;
    okText?: string;
    cancelText?: string;
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
                <Text style={{ fontWeight: '600', fontSize: 18 }}>{title}</Text>
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
                {content}
            </Text>
            <Row
                align={'middle'}
                style={{ gap: 10, marginTop: 20 }}
                justify={'space-between'}
            >
                <Button
                    title="Cancel"
                    onClick={onCancel}
                    style={{
                        width: '45%',
                        height: 56,
                        border: 0,
                    }}
                >
                    <Text
                        style={{
                            color: 'var(--primary-6)',
                            fontWeight: '600',
                        }}
                    >
                        {cancelText}
                    </Text>
                </Button>
                <ButtonPrimary
                    title={okText}
                    onClick={onSubmit}
                    width="45%"
                    marginTop="0px"
                    backgroundColor="var(--primary-6)"
                />
            </Row>
        </Modal>
    );
}
