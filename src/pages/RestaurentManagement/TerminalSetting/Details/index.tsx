import { useLazyQuery, useMutation } from '@apollo/client';
import { Form, notification, Row } from 'antd';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import InputForm from 'components/atom/Form/input';
import { Text } from 'components/atom/Text';
import LoadingModal from 'components/modal/loadingModal';
import ModalConfirm from 'components/modal/ModalConfirm';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import {
    ADD_TERMINAL_PAYMENT,
    GET_TERMINALS_DETAIL,
    UPDATE_TERMINAL_PAYMENT,
    DELETE_TERMINAL,
} from 'graphql/Terminal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

type PosTerminal = {
    name: string;
    tpn: string;
    auth_key: string;
    serial_number: string;
    machine_type: string;
    status: number;
};
export default function KitchenStationDetailPage() {
    const navigation = useNavigate();
    const { theme } = useTheme();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const handleCreateSubmit = (values: PosTerminal) => {
        setLoading(true);
        onSubmitAddPayment({
            variables: {
                name: values.name,
                tpn: values.tpn,
                auth_key: values.auth_key,
                serial_number: values.serial_number,
                machine_type: values.machine_type.toUpperCase(),
                status: 1,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Created successfully',
                });
                navigation(BASE_ROUTER.RESTAURENT_TERMINAL);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const handleUpdateSubmit = (values: PosTerminal) => {
        setLoading(true);
        onSubmitUpdateStation({
            variables: {
                id: id,
                name: values.name,
                tpn: values.tpn,
                auth_key: values.auth_key,
                serial_number: values.serial_number,
                machine_type: values.machine_type.toUpperCase(),
                status: 1,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Update successfully',
                });
                navigation(BASE_ROUTER.RESTAURENT_TERMINAL);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const [form] = Form.useForm();
    const [onGetDetailPos] = useLazyQuery(GET_TERMINALS_DETAIL);
    const [onSubmitAddPayment] = useMutation(ADD_TERMINAL_PAYMENT);
    const [onSubmitUpdateStation] = useMutation(UPDATE_TERMINAL_PAYMENT);
    const [onDeleteKitchenStation] = useMutation(DELETE_TERMINAL);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            onGetDetailPos({
                fetchPolicy: 'cache-and-network',
                variables: {
                    id: id,
                },
            }).then((res) => {
                form.setFieldsValue({
                    name: res?.data?.merchantGetPostDeviceById?.name,
                    machine_type:
                        res?.data?.merchantGetPostDeviceById?.machine_type.toUpperCase(),
                    serial_number:
                        res?.data?.merchantGetPostDeviceById?.serial_number,
                    auth_key: res?.data?.merchantGetPostDeviceById?.auth_key,
                    tpn: res?.data?.merchantGetPostDeviceById?.tpn,
                });
            });
        }
    }, [id]);
    // useEffect(() => {
    //     if (printer_id && listPrinter.length > 0) {
    //         form.setFieldsValue({
    //             printer: parseInt(printer_id),
    //         });
    //     }
    // }, [listPrinter, printer_id]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={(values) => {
                if (id) {
                    handleUpdateSubmit(values);
                } else {
                    handleCreateSubmit(values);
                }
            }}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            size="large"
            form={form}
        >
            <ModalConfirm
                content="You can’t recover it once it is deleted!"
                title="Delete this terminal?"
                isModalOpen={showModalDelete}
                onCancel={() => setShowModalDelete(false)}
                onSubmit={() => {
                    setLoading(true);
                    onDeleteKitchenStation({
                        variables: {
                            id: id,
                        },
                    })
                        .then(() => {
                            notification.success({
                                message: 'Success',
                                description: 'Deleted successfully',
                            });
                            navigation(BASE_ROUTER.RESTAURENT_TERMINAL);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                    setShowModalDelete(false);
                }}
            />
            <LoadingModal showLoading={loading} />
            <div
                style={{
                    paddingInline: 16,
                }}
            >
                <Row
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>
                        {id
                            ? 'Update terminal payment'
                            : 'Add terminal payment'}
                    </Text>
                    <Row style={{ gap: 16 }}>
                        {id ? (
                            <>
                                <ButtonPrimary
                                    isCancel
                                    title="Delete"
                                    onClick={() => setShowModalDelete(true)}
                                    width="100px"
                                    backgroundColor={theme.eRROR1BG}
                                    color={theme.eRROR2Default}
                                    height="48px"
                                />
                                <ButtonPrimary
                                    isCancel
                                    title="Cancel"
                                    onClick={() => navigation(-1)}
                                    width="100px"
                                    height="48px"
                                />
                            </>
                        ) : (
                            <ButtonPrimary
                                isCancel
                                title="Cancel"
                                onClick={() => navigation(-1)}
                                width="100px"
                                backgroundColor={theme.eRROR1BG}
                                color={theme.eRROR2Default}
                                height="48px"
                            />
                        )}
                        <ButtonPrimary
                            title="Save"
                            onClick={() => form.submit()}
                            width="100px"
                            height="48px"
                        />
                    </Row>
                </Row>
                <InputForm
                    label="Terminal name"
                    name="name"
                    placeholder="Terminal name"
                    rule={[{ required: true }]}
                    style={{ width: '60%', minWidth: 600 }}
                />
                <InputForm
                    label="Machine type"
                    name="machine_type"
                    placeholder="Machine type"
                    rule={[{ required: true }]}
                    style={{ width: '60%', minWidth: 600 }}
                />

                <InputForm
                    label="TPN"
                    name="tpn"
                    placeholder="TPN"
                    rule={[{ required: true }]}
                    style={{ width: '60%', minWidth: 600 }}
                />
                <InputForm
                    label="Auth Key"
                    name="auth_key"
                    placeholder="Auth Key"
                    rule={[{ required: true }]}
                    style={{ width: '60%', minWidth: 600 }}
                />
                <InputForm
                    label="Serial Number"
                    name="serial_number"
                    placeholder="Serial Number"
                    rule={[{ required: true }]}
                    style={{ width: '60%', minWidth: 600 }}
                />
            </div>
        </Form>
    );
}
