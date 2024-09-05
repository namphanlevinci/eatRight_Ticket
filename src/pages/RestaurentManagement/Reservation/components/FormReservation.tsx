/* eslint-disable react/jsx-no-duplicate-props */
import { Button, Form, Row, Select, TimePicker } from 'antd';
import RadioIcon from 'assets/icons/radio';
import RadioBtnSelectedLarge from 'assets/icons/radioBtnSelectedLarge';
import { FormItem } from 'components/atom/Form/Item';
import { DarkInput } from 'components/atom/Input';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ConvertTimeToDayjs } from 'utils/date';

const DurationTime = [
    { value: '1', label: '1 minute' },
    { value: '2', label: '2 minutes' },
    { value: '3', label: '3 minutes' },
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '180', label: '3 hours' },
    { value: '240', label: '4 hours' },
    { value: '300', label: '5 hours' },
    { value: '360', label: '6 hours' },
    { value: '420', label: '7 hours' },
    { value: '480', label: '8 hours' },
    { value: '540', label: '9 hours' },
    { value: '600', label: '10 hours' },
    { value: '660', label: '11 hours' },
    { value: '720', label: '12 hours' },
];
export default function FormReservation() {
    const { theme } = useTheme();
    const [isHours, setIsHours] = useState(true);
    const [form] = Form.useForm();
    useEffect(() => {
        // form.setFieldsValue({
        //     from_time: ConvertTimeToDayjs('10:00'),
        //     to_time: ConvertTimeToDayjs('22:00'),
        // });
    }, [form]);
    return (
        <div style={{ marginTop: 24 }}>
            <Form
                name="basic"
                style={{ maxWidth: 600, paddingRight: 20 }}
                onFinish={(values) => console.log(values)}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                size="large"
                form={form}
                initialValues={{
                    slot_duration: '1',
                    number_of_guest: 10,
                    lead_time_min: 60,
                    lead_time_max: 720,
                    from_time: ConvertTimeToDayjs('10:00'),
                    to_time: ConvertTimeToDayjs('22:00'),
                }}
            >
                <RenderTitle title="Time Slot Management" />

                <FormItem label="From time" name="from_time">
                    <TimePicker
                        format="HH:mm A"
                        style={{ width: '100%', height: 56 }}
                    />
                </FormItem>
                <FormItem label="To time" name="to_time">
                    <TimePicker
                        format="HH:mm A"
                        style={{ width: '100%', height: 56 }}
                    />
                </FormItem>
                <FormItem label="Slot duration" name="slot_duration">
                    <Select
                        style={{ width: '100%', height: 56 }}
                        defaultValue="1"
                    >
                        {DurationTime.map((option) => (
                            <Select.Option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </FormItem>
                <RenderTitle title="Lead Time" />
                <Row
                    style={{
                        gap: 10,
                        alignItems: 'center',
                        marginTop: 12,
                        cursor: 'pointer',
                    }}
                    onClick={() => setIsHours(true)}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        {isHours ? <RadioBtnSelectedLarge /> : <RadioIcon />}
                    </div>
                    <Text>Hours</Text>
                </Row>
                <Row
                    style={{
                        gap: 10,
                        alignItems: 'center',
                        marginTop: 12,
                        cursor: 'pointer',
                    }}
                    onClick={() => setIsHours(false)}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        {isHours ? <RadioIcon /> : <RadioBtnSelectedLarge />}
                    </div>
                    <Text>Days</Text>
                </Row>
                <RenderTitle title="Max Party Size" />
                <div style={{ position: 'relative' }}>
                    <FormItem
                        label="Maximum number of guests accepted"
                        name="number_of_guest"
                    >
                        <DarkInput
                            placeholder="Maximum number of guests accepted"
                            style={{ background: theme.nEUTRALBase }}
                            type="number"
                        />
                    </FormItem>
                </div>
                <FormItem label="Lead Time Min" name="lead_time_min">
                    <Select
                        style={{ width: '100%', height: 56 }}
                        defaultValue={60}
                    >
                        {DurationTime.filter(
                            (option) => Number(option.value) >= 60,
                        ).map((option) => (
                            <Select.Option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </FormItem>
                <FormItem label="Lead Time Max" name="lead_time_max">
                    <Select
                        style={{ width: '100%', height: 56 }}
                        defaultValue="720"
                    >
                        {DurationTime.map((option) => (
                            <Select.Option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </FormItem>
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
                            height: 56,
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
            </Form>
        </div>
    );
}

const IconInfo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1227 7.84581 17.266 5.78051 15.7427 4.25727C14.2195 2.73403 12.1542 1.87727 10 1.875ZM9.6875 5.625C9.87292 5.625 10.0542 5.67998 10.2084 5.783C10.3625 5.88601 10.4827 6.03243 10.5536 6.20373C10.6246 6.37504 10.6432 6.56354 10.607 6.7454C10.5708 6.92725 10.4815 7.0943 10.3504 7.22541C10.2193 7.35652 10.0523 7.44581 9.8704 7.48199C9.68854 7.51816 9.50004 7.49959 9.32874 7.42864C9.15743 7.35768 9.01101 7.23752 8.908 7.08335C8.80499 6.92918 8.75 6.74792 8.75 6.5625C8.75 6.31386 8.84878 6.0754 9.02459 5.89959C9.20041 5.72377 9.43886 5.625 9.6875 5.625ZM10.625 14.375C10.2935 14.375 9.97554 14.2433 9.74112 14.0089C9.5067 13.7745 9.375 13.4565 9.375 13.125V10C9.20924 10 9.05027 9.93415 8.93306 9.81694C8.81585 9.69973 8.75 9.54076 8.75 9.375C8.75 9.20924 8.81585 9.05027 8.93306 8.93306C9.05027 8.81585 9.20924 8.75 9.375 8.75C9.70652 8.75 10.0245 8.8817 10.2589 9.11612C10.4933 9.35054 10.625 9.66848 10.625 10V13.125C10.7908 13.125 10.9497 13.1908 11.0669 13.3081C11.1842 13.4253 11.25 13.5842 11.25 13.75C11.25 13.9158 11.1842 14.0747 11.0669 14.1919C10.9497 14.3092 10.7908 14.375 10.625 14.375Z"
                fill="#6C707A"
            />
        </svg>
    );
};

const RenderTitle = ({ title }: { title: string }) => {
    return (
        <Row style={{ gap: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>{title}</Text>
            <IconInfo />
        </Row>
    );
};
