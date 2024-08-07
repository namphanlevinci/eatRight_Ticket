import { Button, Col, Form, Layout, Row } from 'antd';
import InputForm from 'components/atom/Form/input';
import SelectForm from 'components/atom/Form/select';
import Header from 'components/atom/Header/header';
import { Text } from 'components/atom/Text';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import React from 'react';

export default function AddNewCustomer() {
    const { theme } = useTheme();
    const handleChangePassword = (values: any) => {
        console.log(values);
    };
    const ColContainer = ({ children }: any) => (
        <Col
            md={{
                span: 12,
            }}
            xs={{ span: 24 }}
            style={{ padding: 16 }}
        >
            {children}
        </Col>
    );
    return (
        <Layout
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                background: 'transparent',
                gap: 20,
                padding: 20,
            }}
        >
            <Header
                rootTitle="Customer Information"
                title="Add New Customer"
                rootUrl={BASE_ROUTER.CUSTOMER_LIST}
            />
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleChangePassword}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                size="large"
            >
                <Text>Basic Information</Text>
                <Row>
                    <ColContainer>
                        <InputForm
                            label="First Name"
                            name="firstname"
                            placeholder="First Name"
                        />
                    </ColContainer>
                    <ColContainer>
                        <InputForm
                            label="Last Name"
                            name="lastname"
                            placeholder="First Name"
                        />
                    </ColContainer>
                </Row>
                <Row>
                    <ColContainer>
                        <SelectForm
                            label="Customer group"
                            name="customergroup"
                            placeholder="First Name"
                        />
                    </ColContainer>
                    <ColContainer>
                        <SelectForm
                            label="Status"
                            name="status"
                            placeholder="Status"
                        />
                    </ColContainer>
                </Row>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            marginTop: 60,
                            background: theme.pRIMARY6Primary,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 60,
                        }}
                        size="large"
                    >
                        <Text
                            style={{
                                color: theme.nEUTRALPrimary,
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Change password
                        </Text>
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
}
