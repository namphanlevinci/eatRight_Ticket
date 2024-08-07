import { Button, Form, Row } from 'antd';
import DatePickerForm from 'components/atom/Form/date';
import InputForm from 'components/atom/Form/input';
import InputPhoneNumberForm from 'components/atom/Form/inputPhoneNumber';
import SelectForm from 'components/atom/Form/select';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function CustomerGeneral() {
    const { theme } = useTheme();
    const handleSubmit = (values: any) => {
        console.log(values);
    };
    // const [isCancel, setIsCancel] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const { isMerchant } = useSelector((state: RootState) => state.auth);
    return (
        <Form
            name="basic"
            initialValues={{
                phoneNumber: {
                    phoneNumber: '079 799 1707',
                },
                email: 'handez1008@gmail.com',
                dob: dayjs('2021-08-01'),
                gender: 'Male',
            }}
            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            size="large"
        >
            <div>
                <Row
                    style={{ height: 100, justifyContent: 'flex-end', gap: 20 }}
                >
                    {isMerchant ? (
                        isEdit ? (
                            <>
                                <Button
                                    style={{
                                        width: 100,
                                        background: theme.nEUTRALPrimary,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 48,
                                        border: `1px solid ${theme.eRROR2Default}`,
                                    }}
                                    size="large"
                                    onClick={() => setIsEdit(false)}
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
                                            width: 100,
                                            background: theme.pRIMARY6Primary,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 48,
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
                            </>
                        ) : (
                            <Button
                                style={{
                                    width: 100,
                                    background: theme.pRIMARY6Primary,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 48,
                                }}
                                onClick={() => setIsEdit(true)}
                            >
                                <Text
                                    style={{
                                        color: theme.nEUTRALPrimary,
                                        fontSize: 18,
                                        fontWeight: '600',
                                    }}
                                >
                                    Edit
                                </Text>
                            </Button>
                        )
                    ) : (
                        <></>
                    )}
                </Row>
            </div>
            <InputPhoneNumberForm
                label="Phone number"
                name="phoneNumber"
                placeholder="000 000 000"
                disabled={!isEdit}
            />

            <InputForm
                label="Email"
                name="email"
                placeholder="example@gmail.com"
                required={false}
                inputMode="email"
                rule={[{ type: 'email' }]}
                disabled={!isEdit}
            />

            <DatePickerForm
                label="Date of birth"
                name="dob"
                placeholder="Date of birth"
                required={false}
                disabled={!isEdit}
            />

            <SelectForm
                label="Gender"
                name="gender"
                placeholder="Gender"
                disabled={!isEdit}
                options={[
                    {
                        label: 'Male',
                        value: 'male',
                    },
                    {
                        label: 'Female',
                        value: 'female',
                    },
                    {
                        label: 'Other',
                        value: 'other',
                    },
                ]}
            />

            <Text>Customer since {new Date().toLocaleDateString()}</Text>
        </Form>
    );
}
