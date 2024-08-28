import { Input, Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React, { useEffect, useRef } from 'react';
const { TextArea } = Input;
export default function ModalInputNote({
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
                    padding: 16,
                },
            }}
            closeIcon={<></>}
            closable={false}
            centered
            width={380}
        >
            <Row
                justify={'end'}
                align={'middle'}
                style={{ position: 'relative' }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                    }}
                >
                    <Text style={{ fontWeight: '600', fontSize: 20 }}>
                        {title}
                    </Text>
                </div>
                <div
                    style={{ cursor: 'pointer', zIndex: 1000 }}
                    onClick={onCancel}
                >
                    <CloseXIcon />
                </div>
            </Row>

            <Row align={'middle'} style={{ gap: 10, marginTop: 20 }}>
                <TextArea
                    ref={inputRef}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: theme.nEUTRALBase,
                        color: theme.tEXTPrimary,
                        border: `1px solid ${theme.nEUTRALLine}`,
                        height: 92,
                        fontSize: 17,
                    }}
                    inputMode={type}
                />
            </Row>
            <Row
                style={{ marginTop: 20 }}
                align={'middle'}
                justify={'space-between'}
            >
                <ButtonPrimary
                    title="Cancel"
                    onClick={onCancel}
                    width="162px"
                    marginTop="0px"
                    isCancel
                    borderColor={theme.tEXTPrimary}
                    color={theme.tEXTPrimary}
                    height="52px"
                />
                <ButtonPrimary
                    title="Send"
                    onClick={onFinish}
                    width="166px"
                    marginTop="0px"
                    height="56px"
                />
            </Row>
            {error && (
                <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
            )}
        </Modal>
    );
}
