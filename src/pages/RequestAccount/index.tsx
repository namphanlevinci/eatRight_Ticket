import React from 'react';
import { App, Button, Form, Row } from 'antd';
import { FormItem } from 'components/atom/Form/Item';
import { Text } from 'components/atom/Text';
import { DarkInput } from 'components/atom/Input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_ROUTER } from 'constants/router';
import { useMutation } from '@apollo/client';
import { REQUEST_ACCOUNT } from 'graphql/auth/requestAccount';
import LoadingModal from 'components/modal/loadingModal';
import { useTheme } from 'context/themeContext';
export const RequestAccountPage: React.FC = () => {
    const [requestAccount, { loading }] = useMutation(REQUEST_ACCOUNT);
    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };
    const { modal } = App.useApp();
    const navigation = useNavigate();
    const SendRequest = (values: any) => {
        requestAccount({
            variables: {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                description: values.description,
                phone_number: values.phonenumber,
            },
        }).then(() => {
            modal.success({
                title: 'Request Support Success',
                content: 'Please wait for admin contact you',
                centered: true,
                onOk: () => {
                    navigation(BASE_ROUTER.LOGIN);
                },
            });
        });
    };
    const { theme } = useTheme();
    return (
        <div
            style={{
                minHeight: 680,
                width: 380,
                background: theme.nEUTRALBase,
                borderRadius: 16,
                padding: 16,
                paddingBlock: 20,
                alignSelf: 'center',
                border: `1px solid ${theme.nEUTRALLine}`,
            }}
        >
            <LoadingModal showLoading={loading} />
            <h1
                style={{
                    color: theme.pRIMARY6Primary,
                    fontSize: 30,
                    fontWeight: '600',
                    fontFamily: 'Montserrat',
                    textAlign: 'center',
                }}
            >
                Request Support
            </h1>

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
                <FormItem
                    label="First name"
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fullname!',
                        },
                    ]}
                    required={true}
                    theme={theme}
                >
                    <DarkInput
                        placeholder="First Name"
                        style={{ background: 'dark' }}
                    />
                </FormItem>
                <FormItem
                    theme={theme}
                    label="Last name"
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fullname!',
                        },
                    ]}
                    required={true}
                >
                    <DarkInput
                        placeholder="Last Name"
                        style={{ background: 'dark' }}
                    />
                </FormItem>
                <div style={{ position: 'relative' }}>
                    <FormItem
                        theme={theme}
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                        required={true}
                    >
                        <DarkInput
                            placeholder="Email"
                            style={{ background: 'dark' }}
                        />
                    </FormItem>
                </div>
                <FormItem
                    theme={theme}
                    label="Phone number"
                    name="phonenumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                    required={true}
                >
                    <PhoneInputCustom
                        country={'us'}
                        value={''}
                        enableSearch
                        theme={theme}
                    />
                </FormItem>
                <FormItem
                    theme={theme}
                    label="Description"
                    name="description"
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: 'Please input description!',
                        },
                    ]}
                >
                    <DarkInput
                        placeholder="Description"
                        style={{ background: 'dark' }}
                    />
                </FormItem>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            marginTop: 20,
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
                                color: 'white',
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Request
                        </Text>
                    </Button>
                </Form.Item>
            </Form>

            <Row justify={'center'} style={{ marginTop: 20 }}>
                <Link to={BASE_ROUTER.LOGIN}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: theme.pRIMARY6Primary,
                        }}
                    >
                        Already have an account?
                    </Text>
                </Link>
            </Row>
        </div>
    );
};

const getTextColor = (props: { theme: any }) => props.theme.fieldTextIcon;
const getBackgroundColor = (props: { theme: any }) =>
    props.theme.fieldBackground;
const PhoneInputCustom = styled(PhoneInput)`
    display: flex;
    justify-content: space-between;
    .form-control {
        order: 1 !important;
        height: 50px !important;
        background: ${getBackgroundColor} !important;
        color: ${getTextColor} !important;
        padding-left: 8px !important;
        border: none !important;
    }
    .flag-dropdown {
        margin-right: 20px !important;
        position: relative !important;
        order: 0 !important;
        height: 50px !important;
        width: 60px !important;
        background-color: ${getBackgroundColor}!important;
        border: none !important;
        border-radius: 8px !important;
        padding-left: 8px !important;
    }
    .selected-flag:hover {
        background-color: ${getBackgroundColor} !important;
    }

    .selected-flag .open {
        background: ${getBackgroundColor} !important;
    }
    .country-list {
        border-radius: 8px !important;
    }
`;
