import React from 'react';
import { Button, Form, Row } from 'antd';
import { Colors } from 'themes/colors';
import { FormItem } from 'components/atom/Form/Item';
import { Text } from 'components/atom/Text';
import { DarkInput } from 'components/atom/Input';
import { Link } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD } from 'graphql/auth/forgotpassword';
import LoadingModal from 'components/modal/loadingModal';
import InputPassword from 'pages/Settings/components/inputPassword';
export const ForgotPasswordPage: React.FC = () => {
    const [onForgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);
    const [sendSuccess, setSendSuccess] = React.useState(false);

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };
    const SendRequest = (values: any) => {
        onForgotPassword({
            variables: {
                email: values.email,
                newPassword: values.password,
            },
        })
            .then(() => {
                setSendSuccess(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div
            style={{
                height: sendSuccess ? 500 : 760,
                width: 380,
                background: Colors.grey3,
                borderRadius: 16,
                padding: 16,
                paddingBlock: 32,
                alignSelf: 'center',
            }}
        >
            <LoadingModal showLoading={loading} />
            {!sendSuccess ? (
                <>
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
                        Forgot Password
                    </span>

                    <Form
                        name="basic"
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={SendRequest}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        size="large"
                    >
                        <div style={{ position: 'relative' }}>
                            <FormItem
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                                required={false}
                            >
                                <DarkInput
                                    placeholder="Email"
                                    style={{ background: 'dark' }}
                                />
                            </FormItem>
                        </div>
                        <InputPassword
                            label="New Password"
                            name="password"
                            placeholder="New Password"
                        />
                        <InputPassword
                            label="Confirm New Password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            rule={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'The new password that you entered do not match!',
                                            ),
                                        );
                                    },
                                }),
                            ]}
                        />
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: '100%',
                                    marginTop: 60,
                                    background: Colors.primary,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 56,
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
                                    Request
                                </Text>
                            </Button>
                        </Form.Item>
                    </Form>
                    <Row justify={'center'} style={{ marginTop: 60 }}>
                        <Text>Already have an account?</Text>
                    </Row>
                    <Row justify={'center'} style={{ marginTop: 20 }}>
                        <Link to={BASE_ROUTER.LOGIN}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: Colors.primary,
                                }}
                            >
                                Log in
                            </Text>
                        </Link>
                    </Row>
                </>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 30,
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="128"
                        height="128"
                        viewBox="0 0 128 128"
                        fill="none"
                    >
                        <path
                            d="M128 64.003C128 99.3522 99.3475 128 64 128C28.6525 128 0 99.3462 0 64.003C0 28.6599 28.6525 0 64 0C99.3475 0 128 28.6538 128 64.003Z"
                            fill="#FF9D00"
                        />
                        <path
                            d="M67.8668 88.0435C69.86 91.3549 67.8474 96.3252 63.3742 99.1323C58.901 101.939 53.6553 101.528 51.6687 98.2099L28.7705 60.0927C26.7773 56.7747 28.7834 51.811 33.2631 49.0039C37.7363 46.1969 42.982 46.6083 44.9687 49.9197L67.8668 88.0369V88.0435Z"
                            fill="#995E00"
                        />
                        <path
                            d="M67.0357 96.365C64.2894 100.937 58.4334 102.371 53.9667 99.5636C49.4871 96.7566 48.0912 90.7709 50.8375 86.1987L82.3899 33.6349C85.1361 29.0627 90.9921 27.6294 95.4653 30.4364C99.9384 33.2434 101.341 39.2225 98.5945 43.8013L67.0357 96.3717V96.365Z"
                            fill="#995E00"
                        />
                    </svg>

                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: Colors.primary,
                        }}
                    >
                        Request Reset Password Successfully
                    </Text>
                    <Text style={{ textAlign: 'center' }}>
                        Please check your email and wait for the admin
                    </Text>
                    <Link to={BASE_ROUTER.LOGIN} style={{ width: '100%' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '100%',
                                marginTop: 60,
                                background: Colors.primary,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 56,
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
                                Login
                            </Text>
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
