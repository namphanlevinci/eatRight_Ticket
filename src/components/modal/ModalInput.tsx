import { Input, Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import React, { useEffect, useRef } from 'react';
export default function ModalInput({
    isModalOpen,
    onCancel,
    onSubmit,
    title,
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
    title: string;
}) {
    const inputRef = useRef<any>(null);
    const [value, setValue] = React.useState('');
    useEffect(() => {
        // Kiểm tra xem modal có mở không
        if (isModalOpen && inputRef.current) {
            // Nếu có, thì focus vào input
            inputRef.current.focus();
        }
    }, [isModalOpen]);
    const onFinish = () => {
        onSubmit(value);
    };

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
                    backgroundColor: '#1F242F',
                },
            }}
            closeIcon={<></>}
            centered
        >
            <Row justify={'space-between'} align={'middle'}>
                <Text>{title}</Text>
                <div style={{ cursor: 'pointer' }} onClick={onCancel}>
                    <CloseXIcon />
                </div>
            </Row>

            <Row align={'middle'} style={{ gap: 10, marginTop: 20 }}>
                <Input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    style={{
                        flex: 1,
                        height: 56,
                        backgroundColor: '#161B26',
                        color: '#fff',
                        border: '1px solid rgba(245, 245, 245, 0.30)',
                    }}
                />
                <ButtonPrimary
                    title="Send"
                    onClick={onFinish}
                    width="110px"
                    marginTop="0px"
                />
            </Row>
        </Modal>
    );
}
