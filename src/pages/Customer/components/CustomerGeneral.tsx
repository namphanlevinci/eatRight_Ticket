import { useLazyQuery, useMutation } from '@apollo/client';
import { App, Button, Form, Row } from 'antd';
import DatePickerForm from 'components/atom/Form/date';
import InputForm from 'components/atom/Form/input';
import InputPhoneNumberForm from 'components/atom/Form/inputPhoneNumber';
import SelectForm from 'components/atom/Form/select';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import dayjs from 'dayjs';
import {
    GET_CUSTOMER_DETAIL,
    UPDATE_CUSTOMER_INFOMATION,
} from 'graphql/customer';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from 'store';
import { formatPhoneNumber } from 'utils/number';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import LoadingModal from 'components/modal/loadingModal';

dayjs.extend(weekday);
dayjs.extend(localeData);
export default function CustomerGeneral({
    setCustomerInfo,
}: {
    setCustomerInfo: any;
}) {
    const { theme } = useTheme();
    const [form] = Form.useForm();
    const [onUpdateCustomerInfomation, { loading }] = useMutation(
        UPDATE_CUSTOMER_INFOMATION,
    );
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get('customerId');
    const { notification } = App.useApp();
    const handleSubmit = (values: any) => {
        onUpdateCustomerInfomation({
            variables: {
                id: customerId,
                email: values.email,
                gender: values.gender,
                date_of_birth: values.dob,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Update success',
                    placement: 'topRight',
                });
                setIsEdit(false);
            })
            .catch(() => {
                notification.error({
                    message: 'Update failed',
                    placement: 'topRight',
                });
            });
    };
    // const [isCancel, setIsCancel] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const { isMerchant } = useSelector((state: RootState) => state.auth);
    const [onGetCustomerDetail, { data, loading: loadingGet }] =
        useLazyQuery(GET_CUSTOMER_DETAIL);

    // Get value from params

    useEffect(() => {
        if (customerId) {
            onGetCustomerDetail({ variables: { id: customerId } })
                .then((res) => {
                    form.setFieldsValue({
                        phoneNumber: {
                            phoneNumber: isMerchant
                                ? res.data?.merchantGetCustomer?.phone_number
                                : formatPhoneNumber(
                                      res.data?.merchantGetCustomer
                                          ?.phone_number,
                                  ),
                        },
                        email: res.data?.merchantGetCustomer?.email,
                        dob: dayjs(
                            res.data?.merchantGetCustomer?.date_of_birth,
                        ),
                        gender: res.data?.merchantGetCustomer?.gender,
                    });
                    setCustomerInfo({
                        name:
                            res.data?.merchantGetCustomer?.firstname +
                            ' ' +
                            res.data?.merchantGetCustomer?.lastname,
                        status: res.data?.merchantGetCustomer?.status,
                        group_id: res.data?.merchantGetCustomer?.group_id,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [customerId]);
    const openEditMode = () => {
        setIsEdit(true);
        console.log(data);
        if (!data?.merchantGetCustomer?.date_of_birth) {
            form.setFieldValue('dob', dayjs('2000-01-01'));
        }
    };
    return (
        <Form
            form={form}
            name="basic"
            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            size="large"
        >
            <LoadingModal showLoading={loading || loadingGet} />
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
                                onClick={openEditMode}
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
                disabled
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
                        value: 1,
                    },
                    {
                        label: 'Female',
                        value: 2,
                    },
                ]}
            />

            <Text>
                Customer since{' '}
                {/* {new Date(
                    data?.merchantGetCustomer?.created_at,
                ).toLocaleDateString()} */}
                {dayjs(data?.merchantGetCustomer?.created_at).format("YYYY-MM-DD")}
            </Text>
        </Form>
    );
}
