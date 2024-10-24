/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useRef } from 'react';
import { Form, Input, Button, Switch, Spin } from 'antd';
import TimePicker from './TimePicker';
import PopupTimePicker from './PopupTimePicker';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import PopupAction from '../Components/PopupAction';

import { useParams, useNavigate } from 'react-router-dom';
import { AlertContext } from 'context/alertContext';
import { useContext } from 'react';
import '../index.scss';
import MenuBar from '../Components/MenuBar';
import CustomButton from '../Components/CustomButton';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_MENU } from 'graphql/menu/create';
import { GET_DETAIL_MENU } from 'graphql/menu';
import { DELETE_MENU } from 'graphql/menu/delete';
import { UPDATE_MENU } from 'graphql/menu/update';
import { BASE_ROUTER } from 'constants/router';

const Index = () => {
    const [apiMerchantCreateMenu] = useMutation(CREATE_MENU);
    const [apiMerchantUpdateMenu] = useMutation(UPDATE_MENU);
    const [apiMerchantDeleteMenu] = useMutation(DELETE_MENU);
    const [apiGetMenuDetail] = useLazyQuery(GET_DETAIL_MENU);
    const [form] = Form.useForm();

    const [isToggled, setIsToggled] = useState(true);

    const [startTime, setStartTime] = useState(moment().format('hh:mm A'));
    const [endTime, setEndTime] = useState(moment().format('hh:mm A'));
    const [activeDays, setActiveDays] = useState<any[]>([]);
    const [isLoading, setLoading] = React.useState(false);
    const history = useNavigate();
    const { openModal } = useContext(AlertContext);

    const timePickerModalRef = useRef<any>(null);
    const refPopupDelete = useRef<any>();
    const refPopupEdit = useRef<any>();

    const location = useLocation();
    const pathname = location?.pathname;

    const { id: menuId } = useParams();

    React.useEffect(() => {
        if (menuId) {
            setLoading(true);
            apiGetMenuDetail({
                variables: { id: parseInt(menuId) },
                fetchPolicy: 'cache-and-network',
            }).then((res: { data: { merchantMenu: any } }) => {
                const detail = res?.data?.merchantMenu;
                const dayMap: any = {
                    mon_active: 'Mon',
                    tue_active: 'Tue',
                    wed_active: 'Wed',
                    thu_active: 'Thu',
                    fri_active: 'Fri',
                    sat_active: 'Sat',
                    sun_active: 'Sun',
                };

                const _activeDays = Object.keys(detail)
                    .filter((key) => key.endsWith('_active') && detail[key])
                    .map((key) => dayMap[key]);
                setActiveDays(_activeDays);

                form.setFieldsValue({
                    name: detail?.name,
                    description: detail?.description,
                    is_active: detail?.is_active,
                });
                setStartTime(detail?.start_time);
                setEndTime(detail?.end_time);
                setIsToggled(detail?.is_active);
                setLoading(false);
            });
        }
    }, [menuId]);

    const clickActiveDay = (day: any) => {
        const foundDay = activeDays.find((d) => d == day);
        if (!foundDay) {
            setActiveDays([...activeDays, day]);
        } else {
            setActiveDays([...activeDays].filter((d) => d !== foundDay));
        }
    };

    const clickStartTime = () => {
        timePickerModalRef.current?.openStartTime?.();
    };

    const clickEndTime = () => {
        timePickerModalRef.current?.openEndTime?.();
    };

    const handleToggle = (
        checked: boolean | ((prevState: boolean) => boolean),
    ) => {
        setIsToggled(checked);
    };

    const onDoneEndTime = (time: any) => {
        setEndTime(time);
    };
    const onDoneStartTime = (time: any) => {
        setStartTime(time);
    };

    function convertTimeFormat(time: string) {
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':');
        hours = ('0' + hours).slice(-2);
        return `${hours}:${minutes} ${modifier}`;
    }

    const onFinish = (values: any) => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const payload = days.reduce(
            (acc: any, day: any) => ({
                ...acc,
                [`${day.toLowerCase()}_active`]: activeDays.includes(day),
            }),
            {
                ...values,
                start_time: convertTimeFormat(startTime?.toUpperCase()),
                end_time: convertTimeFormat(endTime?.toUpperCase()),
                is_active: isToggled,
            },
        );
        setLoading(true);
        if (menuId) {
            apiMerchantUpdateMenu({
                variables: {
                    ...payload,
                    id: parseInt(menuId),
                },
            }).then((res) => {
                setLoading(false);
                if (res?.errors) {
                    openModal(res?.errors?.[0]?.message);
                    return;
                }
                history(BASE_ROUTER.MENU_PAGE);
            });
        } else {
            apiMerchantCreateMenu({ variables: payload }).then((res) => {
                setLoading(false);
                if (res?.errors) {
                    openModal(res?.errors?.[0]?.message);
                    return;
                }
                history(BASE_ROUTER.MENU_PAGE);
            });
        }
    };
    const deleteMenu = () => {
        setLoading(true);
        apiMerchantDeleteMenu({ variables: { id: menuId } }).then((res) => {
            setLoading(false);
            if (res?.errors) {
                openModal(res?.errors?.[0]?.message);
                return;
            }
            history(BASE_ROUTER.MENU_PAGE);
        });
    };

    return (
        <div>
            {isLoading && (
                <div className="loading_container">
                    <Spin />
                </div>
            )}
            <div className="container-box body_history">
                <MenuBar />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        name: '',
                        description: '',
                        status: isToggled,
                    }}
                >
                    {pathname?.includes?.('edit_menu') ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 24,
                                marginBottom: 24,
                            }}
                        >
                            <CustomButton
                                style={{
                                    background: 'var(--error-1-bg)',
                                    color: 'var(--error-2-default)',
                                }}
                                title="Delete"
                                onClick={() =>
                                    refPopupDelete.current?.showModal?.()
                                }
                            />
                            <CustomButton
                                style={{
                                    background: 'var(--neutral-base)',
                                    color: '#333',
                                    marginLeft: 16,
                                }}
                                title="Cancel"
                                onClick={() =>
                                    refPopupEdit.current?.showModal?.()
                                }
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    background: 'var(--primary-6)',
                                    color: '#fff',
                                    marginLeft: 16,
                                    height: 36,
                                    width: 70,
                                    fontWeight: '600',
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 24,
                                marginBottom: 24,
                            }}
                        >
                            <CustomButton
                                style={{
                                    background: 'var(--error-1-bg)',
                                    color: 'var(--error-2-default)',
                                }}
                                title="Cancel"
                                onClick={() => history(BASE_ROUTER.MENU_PAGE)}
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    background: 'var(--primary-6)',
                                    color: '#fff',
                                    marginLeft: 16,
                                    height: 35,
                                    width: 70,
                                    fontWeight: '600',
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    )}

                    <div className="menu_new">
                        <p className="menu_new_name">Name</p>
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the menu name',
                                },
                            ]}
                        >
                            <Input placeholder="New menu name" />
                        </Form.Item>

                        <p className="menu_new_name">Status</p>
                        <Form.Item
                            className="custom-form-item"
                            name="is_active"
                            valuePropName="checked"
                        >
                            <Switch
                                checked={isToggled}
                                onChange={handleToggle}
                                style={{
                                    backgroundColor: isToggled
                                        ? 'var(--primary-6)'
                                        : '#d9d9d9',
                                }}
                                size="default"
                            />
                        </Form.Item>

                        <p className="menu_new_name">Description (optional)</p>
                        <Form.Item name="description">
                            <Input placeholder="Description of menu" />
                        </Form.Item>

                        <TimePicker
                            clickEndTime={clickEndTime}
                            clickStartTime={clickStartTime}
                            startTime={startTime}
                            endTime={endTime}
                            clickActiveDay={clickActiveDay}
                            activeDays={activeDays}
                        />
                    </div>
                </Form>

                <PopupAction
                    title="Delete this menu?"
                    content={'Once deleted it, cannot be undone'}
                    onConfirm={deleteMenu}
                    onCancel={() => {}}
                    ref={refPopupDelete}
                />
                <PopupAction
                    title="Canel editing?"
                    content={"Your change won't be saved"}
                    onConfirm={() => {
                        history(BASE_ROUTER.MENU_PAGE);
                    }}
                    onCancel={() => {}}
                    ref={refPopupEdit}
                    titleActionLeft="Keep editing"
                    titleActionRight="Confirm cancel"
                />
                <PopupTimePicker
                    ref={timePickerModalRef}
                    onDoneStartTime={onDoneStartTime}
                    onDoneEndTime={onDoneEndTime}
                />
            </div>
        </div>
    );
};

export default Index;
