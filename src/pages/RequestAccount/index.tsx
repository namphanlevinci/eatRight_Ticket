import React from 'react';
import { App, Button, Form, Row } from 'antd';
import { Colors } from 'themes/colors';
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
                phone_number: values.phonenumber,
            },
        }).then(() => {
            modal.success({
                title: 'Request Account Success',
                content: 'Please wait for admin contact you',
                centered: true,
                onOk: () => {
                    navigation(BASE_ROUTER.LOGIN);
                },
            });
        });
    };
    return (
        <div
            style={{
                height: 760,
                width: 380,
                background: Colors.grey3,
                borderRadius: 16,
                padding: 16,
                paddingBlock: 32,
                alignSelf: 'center',
            }}
        >
            <LoadingModal showLoading={loading} />
            <span
                style={{
                    color: Colors.white,
                    alignItems: 'center',
                    display: 'flex',
                    fontSize: 34,
                    fontWeight: '600',
                    fontFamily: 'Montserrat',
                }}
            >
                Request account
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
                <FormItem
                    label="First name"
                    name="firstname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fullname!',
                        },
                    ]}
                    required={false}
                >
                    <DarkInput
                        placeholder="First Name"
                        style={{ background: 'dark' }}
                    />
                </FormItem>
                <FormItem
                    label="Last name"
                    name="lastname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fullname!',
                        },
                    ]}
                    required={false}
                >
                    <DarkInput
                        placeholder="Last Name"
                        style={{ background: 'dark' }}
                    />
                </FormItem>
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
                <FormItem
                    label="Phone number"
                    name="phonenumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                    required={false}
                >
                    <PhoneInputCustom country={'us'} value={''} enableSearch />
                </FormItem>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            marginTop: 20,
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

            <Row justify={'center'} style={{ marginTop: 20 }}>
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
        </div>
    );
};

const PhoneInputCustom = styled(PhoneInput)`
    display: flex;
    justify-content: space-between;
    .form-control {
        order: 1 !important;
        height: 50px !important;
        background: #191919 !important;
        color: #fff !important;
        padding-left: 8px !important;
        border: none !important;
    }
    .flag-dropdown {
        margin-right: 20px !important;
        position: relative !important;
        order: 0 !important;
        height: 50px !important;
        width: 60px !important;
        background-color: #191919 !important;
        border: none !important;
        border-radius: 8px !important;
        padding-left: 8px !important;
    }
    .selected-flag:hover {
        background-color: #191919 !important;
    }

    .selected-flag .open {
        background: #191919 !important;
    }
    .country-list {
        border-radius: 8px !important;
    }
`;
