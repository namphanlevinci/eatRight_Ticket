import { Button, Form, Input, Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React, { useEffect, useRef } from 'react';
type FieldType = {
    username?: string;
    numberOfCustomer?: string;
    phoneNumber?: string;
};
export default function InfoCartModal({
    isModalOpen,
    onCancel,
    onSubmit,
    value,
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
    table: any;
    value?: {
        name: string;
        number: number;
        phoneNumber?: string;
    };
}) {
    const inputRef = useRef<any>(null);

    useEffect(() => {
        // Kiểm tra xem modal có mở không
        if (isModalOpen && inputRef.current) {
            // Nếu có, thì focus vào input
            inputRef.current.focus();
        }
    }, [isModalOpen]);
    const onFinish = (values: any) => {
        onSubmit(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const validateUsername = (rule: any, value: any, callback: any) => {
        if (value && value.toLowerCase().includes('guest')) {
            callback('Username cannot be include "guest"');
        } else {
            callback();
        }
    };
    const { theme } = useTheme();
    const names = [
        'Liam',
        'Emma',
        'Noah',
        'Olly',
        'Zara',
        'Finn',
        'Lila',
        'Eli',
        'Mila',
        'Jade',
    ];

    function generateRandomName() {
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    }

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
                    padding: 16,
                },
            }}
            closeIcon={<></>}
            centered
            width={380}
            closable={false}
        >
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{
                    username: value?.name || generateRandomName(), // Giá trị mặc định cho trường username
                    numberOfCustomer: value?.number || 1,
                    remember: true,
                    phoneNumber: value?.phoneNumber || '',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
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
                            Guest info
                        </Text>
                    </div>
                    <div
                        style={{ cursor: 'pointer', zIndex: 1000 }}
                        onClick={onCancel}
                    >
                        <CloseXIcon />
                    </div>
                </Row>
                <Form.Item<FieldType>
                    label="Lead guest"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Lead guest!',
                        },
                        {
                            validator: validateUsername,
                        },
                    ]}
                >
                    <Input
                        size="large"
                        autoFocus={true}
                        ref={inputRef}
                        placeholder="Lead guest"
                        allowClear
                        style={{
                            flex: 1,
                            height: 56,
                            backgroundColor: theme.nEUTRALBase,
                            color: theme.tEXTPrimary,
                            border: `1px solid ${theme.nEUTRALLine}`,
                        }}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Phone number"
                    name="phoneNumber"
                    rules={[
                        {
                            required: false,
                        },
                        {
                            pattern: /^\d{10,15}$/, // Định dạng số điện thoại có độ dài từ 10-15 chữ số
                            message: 'Please enter a valid phone number!',
                        },
                    ]}
                >
                    <Input
                        size="large"
                        autoFocus={true}
                        ref={inputRef}
                        placeholder="Phone Number"
                        allowClear
                        style={{
                            flex: 1,
                            height: 56,
                            backgroundColor: theme.nEUTRALBase,
                            color: theme.tEXTPrimary,
                            border: `1px solid ${theme.nEUTRALLine}`,
                        }}
                        inputMode="tel"
                        maxLength={15}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Number of guests"
                    name="numberOfCustomer"
                    rules={[
                        {
                            required: true,
                            message: 'Please input number of guests!',
                        },
                    ]}
                >
                    <Input
                        type="number"
                        size="large"
                        placeholder="1"
                        style={{
                            flex: 1,
                            height: 56,
                            backgroundColor: theme.nEUTRALBase,
                            color: theme.tEXTPrimary,
                            border: `1px solid ${theme.nEUTRALLine}`,
                        }}
                    />
                </Form.Item>

                <Row style={{ justifyContent: 'center', gap: 20 }}>
                    <Button
                        type="default"
                        size="large"
                        style={{
                            width: 162,
                            height: 56,
                            border: `2px solid ${theme.tEXTPrimary}`,
                            color: theme.tEXTPrimary,
                        }}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{
                            width: 166,
                            background: theme.pRIMARY6Primary,
                            height: 56,
                        }}
                    >
                        Submit
                    </Button>
                </Row>
            </Form>
        </Modal>
    );
}
