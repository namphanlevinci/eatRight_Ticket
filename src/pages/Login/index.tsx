import React from 'react';
import { Button, Form } from 'antd';
import { useLogin } from './useLogin';
import { FormItem } from 'components/atom/Form/Item';
import { Text } from 'components/atom/Text';
import { DarkInput } from 'components/atom/Input';
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
                height: ismobile ? 434 : 474,
                width: 380,
                background: ismobile ? theme.nEUTRALPrimary : theme.nEUTRALBase,
                borderRadius: 16,
                padding: 16,
                paddingBlock: 32,
                alignSelf: 'center',
                border: `${ismobile ? '0px' : '1px'} solid ${
                    theme.nEUTRALLine
                }`,
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
                    label="Username"
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
                        placeholder="Username"
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
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{
                            width: '100%',
                            marginTop: 28,
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
        </div>
    );
};
