import React from 'react';
import { Button, Form, Row } from 'antd';
import { useLogin } from './useLogin';
import { Colors } from 'themes/colors';
import { FormItem } from 'components/atom/Form/Item';
import { Text } from 'components/atom/Text';
import { DarkInput } from 'components/atom/Input';
import { Link } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import InputPassword from 'pages/Settings/components/inputPassword';

export const LoginPage: React.FC = () => {
    const { handleLogin, loading } = useLogin();
    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };
    return (
        <div
            style={{
                height: 650,
                width: 380,
                background: Colors.grey3,
                borderRadius: 16,
                padding: 16,
                paddingBlock: 32,
                alignSelf: 'center',
            }}
        >
            <span
                style={{
                    color: Colors.white,
                    alignItems: 'center',
                    display: 'flex',
                    fontSize: 34,
                    fontWeight: '600',
                    fontFamily: 'Montserrat',
                    marginBottom: 36,
                }}
            >
                Welcome back
            </span>

            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                size="large"
            >
                <FormItem
                    label="Email / Phone number"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    required={false}
                >
                    <DarkInput
                        placeholder="Email / Phone number"
                        style={{ background: 'dark' }}
                    />
                </FormItem>
                <div style={{ position: 'relative' }}>
                    <InputPassword
                        label="New Password"
                        name="password"
                        placeholder="New Password"
                    />
                </div>
                <Row justify={'end'}>
                    <Link to={BASE_ROUTER.FORGOT_PASSWORD}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: Colors.primary,
                                fontWeight: '600',
                            }}
                        >
                            Forgot Password
                        </Text>
                    </Link>
                </Row>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{
                            width: '100%',
                            marginTop: 60,
                            background: Colors.primary,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        size="large"
                    >
                        <Text
                            style={{
                                color: Colors.black,
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Log in
                        </Text>
                    </Button>
                </Form.Item>
            </Form>

            <Row justify={'center'} style={{ marginTop: 60 }}>
                <Text>Don’t have an account?</Text>
            </Row>
            <Row justify={'center'} style={{ marginTop: 20 }}>
                <Link to={BASE_ROUTER.REQUEST_ACCOUNT}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: Colors.primary,
                        }}
                    >
                        Request here
                    </Text>
                </Link>
            </Row>
        </div>
    );
};
