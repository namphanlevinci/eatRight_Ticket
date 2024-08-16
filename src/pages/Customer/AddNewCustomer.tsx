import { useMutation } from '@apollo/client';
import { Button, Col, Form, Layout, Row } from 'antd';
import DatePickerForm from 'components/atom/Form/date';
import InputForm from 'components/atom/Form/input';
import InputPhoneNumberForm from 'components/atom/Form/inputPhoneNumber';
import SelectForm from 'components/atom/Form/select';
import Header from 'components/atom/Header/header';
import { Text } from 'components/atom/Text';
import LoadingModal from 'components/modal/loadingModal';
import ModalCancelConfirm from 'components/modal/ModalCancelConfirm';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import dayjs from 'dayjs';
import { CREATE_CUSTOMER } from 'graphql/customer';
import React from 'react';
import { useNavigate } from 'react-router';
const calling_code = '+84';
export default function AddNewCustomer() {
    const { theme } = useTheme();
    const [onCreateCustomer, { loading }] = useMutation(CREATE_CUSTOMER);
    const navigation = useNavigate();
    const handleSubmit = (values: any) => {
        onCreateCustomer({
            variables: {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                calling_code: calling_code,
                gender: values.gender,
                date_of_birth: dayjs(values.dob).format('YYYY-MM-DD'),
                phone_number: `${calling_code}${values.phoneNumber.phoneNumber.replace(/\s/g, '')}`,
                status: values.status,
                group_id: values.group_id,
            },
        })
            .then((res) => {
                console.log(res);
                navigation(
                    `${BASE_ROUTER.CUSTOMER_Detail}?customerId=${res.data.merchantCreateCustomer.customer.id}`,
                );
            })
            .catch((err) => {
                console.log(err);
            });
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

    const [isCancel, setIsCancel] = React.useState(false);
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
            <LoadingModal showLoading={loading} />
            <ModalCancelConfirm
                title="Cancel creating new customer?"
                onCancel={() => setIsCancel(false)}
                description="Once it is cancelled, it won’t be recovered"
                isModalOpen={isCancel}
                noBtnText="Keep editing"
                onSubmit={() => navigation(-1)}
                yesBtnText="Yes, cancel"
            />
            <Header
                rootTitle="Customer Information"
                title="Add New Customer"
                rootUrl={BASE_ROUTER.CUSTOMER_LIST}
            />
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                size="large"
            >
                <Text
                    style={{ fontSize: 20, fontWeight: '600', paddingLeft: 16 }}
                >
                    Basic Information
                </Text>
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
                            name="group_id"
                            placeholder="Customer group"
                            options={[
                                {
                                    label: 'General',
                                    value: 2,
                                },
                            ]}
                        />
                    </ColContainer>
                    <ColContainer>
                        <SelectForm
                            label="Status"
                            name="status"
                            placeholder="Status"
                            options={[
                                {
                                    label: 'Active',
                                    value: 1,
                                },
                                {
                                    label: 'Inactive',
                                    value: 0,
                                },
                                {
                                    label: 'Black listed',
                                    value: 2,
                                },
                            ]}
                        />
                    </ColContainer>
                </Row>
                <Text
                    style={{ fontSize: 20, fontWeight: '600', paddingLeft: 16 }}
                >
                    General
                </Text>
                <Row>
                    <ColContainer>
                        <InputPhoneNumberForm
                            label="Phone number"
                            name="phoneNumber"
                            placeholder="000 000 000"
                        />
                    </ColContainer>
                    <ColContainer>
                        <InputForm
                            label="Email"
                            name="email"
                            placeholder="example@gmail.com"
                            required={false}
                            inputMode="email"
                            rule={[{ type: 'email' }]}
                        />
                    </ColContainer>
                </Row>
                <Row>
                    <ColContainer>
                        <DatePickerForm
                            label="Date of birth"
                            name="dob"
                            placeholder="Date of birth"
                            required={false}
                        />
                    </ColContainer>
                    <ColContainer>
                        <SelectForm
                            label="Gender"
                            name="gender"
                            placeholder="Gender"
                            options={[
                                {
                                    label: 'Male',
                                    value: 1,
                                },
                                {
                                    label: 'Female',
                                    value: 2,
                                },
                            ]}
                        />
                    </ColContainer>
                </Row>
                <Row style={{ justifyContent: 'center', gap: 24 }}>
                    <Button
                        style={{
                            width: 312,
                            marginTop: 60,
                            background: theme.nEUTRALPrimary,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 60,
                            border: `1px solid ${theme.eRROR2Default}`,
                        }}
                        size="large"
                        onClick={() => setIsCancel(true)}
                    >
                        <Text
                            style={{
                                color: theme.eRROR2Default,
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Cancel
                        </Text>
                    </Button>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: 312,
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
                                Save
                            </Text>
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Layout>
    );
}
