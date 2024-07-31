import { Input, Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React, { useEffect, useRef } from 'react';
export default function ModalInput({
    isModalOpen,
    onCancel,
    onSubmit,
    title,
    type,
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
    title: string;
    type?: 'tel' | 'email';
}) {
    const inputRef = useRef<any>(null);
    const [value, setValue] = React.useState('');
    useEffect(() => {
        // Kiểm tra xem modal có mở không
        if (isModalOpen && inputRef.current) {
            // Nếu có, thì focus vào input
            inputRef.current.focus();
        } else {
            setValue('');
        }
    }, [isModalOpen]);
    const onFinish = () => {
        if (validateInput(value)) {
            onSubmit(value);
        }
    };
    const { theme } = useTheme();
    const [error, setError] = React.useState<string | null>(null);
    const validateInput = (value: string): boolean => {
        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setError('Invalid email address');
                return false;
            }
        } else if (type === 'tel') {
            const phoneRegex = /^\d+$/; // Chỉ kiểm tra số điện thoại cơ bản, bạn có thể tùy chỉnh theo yêu cầu
            if (!phoneRegex.test(value)) {
                setError('Invalid phone number');
                return false;
            }
        }
        setError(null);
        return true;
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
                    backgroundColor: theme.nEUTRALPrimary,
                },
            }}
            closeIcon={<></>}
            closable={false}
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
                        backgroundColor: theme.nEUTRALBase,
                        color: theme.tEXTPrimary,
                        border: `1px solid ${theme.nEUTRALLine}`,
                    }}
                    inputMode={type}
                />
                <ButtonPrimary
                    title="Send"
                    onClick={onFinish}
                    width="110px"
                    marginTop="0px"
                />
            </Row>
            {error && (
                <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
            )}
        </Modal>
    );
}
