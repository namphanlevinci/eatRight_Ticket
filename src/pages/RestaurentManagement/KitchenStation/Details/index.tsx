import { useLazyQuery, useMutation } from '@apollo/client';
import { Form, notification, Row } from 'antd';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import InputForm from 'components/atom/Form/input';
import SelectForm from 'components/atom/Form/select';
import { Text } from 'components/atom/Text';
import LoadingModal from 'components/modal/loadingModal';
import ModalConfirm from 'components/modal/ModalConfirm';
import { BASE_ROUTER } from 'constants/router';
import { useTheme } from 'context/themeContext';
import {
    CREATE_KITCHEN_STATION,
    DELETE_KITCHEN_STATION,
    GET_LIST_PRINTER,
    UPDATE_KITCHEN_STATION,
} from 'graphql/printer';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
export default function KitchenStationDetailPage() {
    const navigation = useNavigate();
    const { theme } = useTheme();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const printer_id = searchParams.get('printer_id');
    useEffect(() => {
        form.setFieldsValue({
            name: name,
            printer: parseInt(printer_id || '0'),
        });
    }, [id, name, printer_id]);
    const handleCreateSubmit = (values: any) => {
        setLoading(true);
        onSubmitNewStation({
            variables: {
                name: values.name,
                id: values.printer,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Created successfully',
                });
                navigation(BASE_ROUTER.RESTAURENT_KITCHEN_STATION);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const handleUpdateSubmit = (values: any) => {
        setLoading(true);
        onSubmitUpdateStation({
            variables: {
                id: id,
                name: values.name,
                printer_id: values.printer,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Update successfully',
                });
                navigation(BASE_ROUTER.RESTAURENT_KITCHEN_STATION);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const [form] = Form.useForm();
    const [onGetPrinterList] = useLazyQuery(GET_LIST_PRINTER);
    const [onSubmitNewStation] = useMutation(CREATE_KITCHEN_STATION);
    const [onSubmitUpdateStation] = useMutation(UPDATE_KITCHEN_STATION);
    const [onDeleteKitchenStation] = useMutation(DELETE_KITCHEN_STATION);
    const [loading, setLoading] = useState(false);
    const [listPrinter, setListPrinter] = React.useState([]);
    useEffect(() => {
        onGetPrinterList({
            fetchPolicy: 'cache-and-network',
        }).then((res) => {
            const list = res.data?.merchantGetListDevice?.prints.map(
                (item: any) => {
                    return {
                        label: item.printer_name,
                        value: item.id,
                    };
                },
            );
            setListPrinter(list);
        });
    }, []);
    useEffect(() => {
        if (printer_id && listPrinter.length > 0) {
            form.setFieldsValue({
                printer: parseInt(printer_id),
            });
        }
    }, [listPrinter, printer_id]);
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
                title="Delete this station?"
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
                            navigation(BASE_ROUTER.RESTAURENT_KITCHEN_STATION);
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
                            ? 'Update Kitchen Station'
                            : 'Create Kitchen Station'}
                    </Text>
                    <Row style={{ gap: 16 }}>
                        {id ? (
                            <ButtonPrimary
                                isCancel
                                title="Delete"
                                onClick={() => setShowModalDelete(true)}
                                width="100px"
                                backgroundColor={theme.eRROR1BG}
                                color={theme.eRROR2Default}
                                height="48px"
                            />
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
                    label="Station name"
                    name="name"
                    placeholder="Station name"
                    rule={[{ required: true }]}
                    style={{ width: '60%', minWidth: 600 }}
                />
                <SelectForm
                    label="Linked printer"
                    name="printer"
                    placeholder="Linked printer"
                    options={listPrinter}
                    style={{ width: '60%', minWidth: 600 }}
                />
            </div>
        </Form>
    );
}
