import React from 'react';
import { Button, Form, Row } from 'antd';
import { useLogin } from './useLogin';
import { FormItem } from 'components/atom/Form/Item';
import { Text } from 'components/atom/Text';
import { DarkInput } from 'components/atom/Input';
import { Link } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import { useMediaQuery } from 'react-responsive';
import InputPassword from 'components/atom/Form/inputPassword';

export const LoginPage: React.FC = () => {
    const { handleLogin, loading } = useLogin();
    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };
    const { theme } = useTheme();
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    return (
        <div
            style={{
                height: ismobile ? 620 : 650,
                width: 380,
                background: theme.nEUTRALBase,
                borderRadius: 16,
                padding: 16,
                paddingBlock: 32,
                alignSelf: 'center',
                border: `1px solid ${theme.nEUTRALLine}`,
            }}
        >
            <span
                style={{
                    color: theme.pRIMARY6Primary,
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
                    theme={theme}
                >
                    <DarkInput
                        placeholder="Email / Phone number"
                        style={{ background: theme.fieldBackground }}
                    />
                </FormItem>
                <div style={{ position: 'relative' }}>
                    <InputPassword
                        label="Password"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <Row justify={'end'}>
                    <Link to={BASE_ROUTER.FORGOT_PASSWORD}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: theme.pRIMARY6Primary,
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
                            background: theme.pRIMARY6Primary,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 56,
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
                            color: theme.pRIMARY6Primary,
                        }}
                    >
                        Request here
                    </Text>
                </Link>
            </Row>
        </div>
    );
};
