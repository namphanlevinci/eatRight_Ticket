import { Button, Form, Input, Modal, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React, { useEffect, useRef } from 'react';
type FieldType = {
    username?: string;
    numberOfCustomer?: string;
};
export default function InfoCartModal({
    isModalOpen,
    onCancel,
    onSubmit,
    table,
    value,
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
    table: any;
    value?: {
        name: string;
        number: number;
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
                content: {},
            }}
            closeIcon={<></>}
            centered
        >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{
                    username: value?.name, // Giá trị mặc định cho trường username
                    numberOfCustomer: value?.number,
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Text
                    style={{
                        color: 'black',
                        textAlign: 'center',
                        fontSize: 20,
                        marginBottom: 20,
                    }}
                >
                    Table {table?.name} - size {table?.size}
                </Text>
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
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
                        placeholder="Guest Name"
                        allowClear
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Number of customer"
                    name="numberOfCustomer"
                    rules={[
                        {
                            required: true,
                            message: 'Please input number of customer',
                        },
                    ]}
                >
                    <Input type="number" size="large" placeholder="1" />
                </Form.Item>

                <Row style={{ justifyContent: 'center', gap: 20 }}>
                    <Button
                        type="default"
                        size="large"
                        style={{ width: 150 }}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{ width: 150 }}
                    >
                        Submit
                    </Button>
                </Row>
            </Form>
        </Modal>
    );
}
