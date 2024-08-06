import { App, Button, Form, Layout } from 'antd';
import { Text } from 'components/atom/Text';
import InputPassword from './components/inputPassword';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'graphql/auth/changePassword';
import LoadingModal from 'components/modal/loadingModal';
import { useDispatch } from 'react-redux';
import { updateStatusLogout } from 'features/auth/authSlice';
import { useTheme } from 'context/themeContext';
export default function SettingPasswordPage() {
    const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);
    const { modal } = App.useApp();
    const dispatch = useDispatch();
    const handleChangePassword = (values: {
        oldPassword: string;
        password: string;
    }) => {
        console.log(values);
        changePassword({
            variables: {
                oldPassword: values.oldPassword,
                newPassword: values.password,
            },
        }).then(() => {
            modal.success({
                title: 'Change Password Success',
                content: 'Please login again',
                centered: true,
                onOk: () => {
                    dispatch(updateStatusLogout());
                },
            });
        });
    };
    const { theme } = useTheme();
    return (
        <Layout
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                background: 'transparent',
                gap: 20,
            }}
        >
            <LoadingModal showLoading={loading} />
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleChangePassword}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                size="large"
            >
                <InputPassword
                    label="Old Password"
                    name="oldPassword"
                    placeholder="Old Password"
                />
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
