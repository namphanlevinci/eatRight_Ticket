import { Button, notification, Row, Switch, Tooltip } from 'antd';
import { Text } from 'components/atom/Text';
import { SwitchContainer } from 'layouts/styled';
import React, { useEffect } from 'react';
import { InfoIcon } from './icons/infoIcon';
import styled from 'styled-components';
import { DarkInput } from 'components/atom/Input';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import ModalCancelConfirm from 'components/modal/ModalCancelConfirm';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_NON_CASH_ADJUSTMENT,
    UPDATE_NON_CASH_ADJUSTMENT,
} from 'graphql/Terminal/cash';
import LoadingModal from 'components/modal/loadingModal';

export default function NonCashAdjustment() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<any>('');
    const [isModalCancelVisible, setIsModalCancelVisible] =
        React.useState(false);
    const [err, setErr] = React.useState('');
    const [getNonCashAdjustment, { loading }] = useLazyQuery(
        GET_NON_CASH_ADJUSTMENT,
    );
    useEffect(() => {
        getNonCashAdjustment({ fetchPolicy: 'cache-and-network' }).then(
            (res) => {
                if (res?.data?.merchantGetNonCashConfig) {
                    setValue(res.data.merchantGetNonCashConfig.value);
                    setOpen(res.data.merchantGetNonCashConfig.status);
                }
            },
        );
    }, []);
    const [updateNonCashAdjustment, { loading: loadingUpdate }] = useMutation(
        UPDATE_NON_CASH_ADJUSTMENT,
    );
    const handleSubmit = () => {
        if (value) {
            updateNonCashAdjustment({
                variables: {
                    percent: value,
                    status: open,
                },
            })
                .then(() =>
                    notification.success({
                        message: 'Success',
                        description: 'Your changes have been saved',
                    }),
                )
                .catch((e) => {
                    console.log(e);
                });
        }
    };
    const handleOff = () => {
        updateNonCashAdjustment({
            variables: {
                percent: value,
                status: false,
            },
        })
            .then(() =>
                notification.success({
                    message: 'Success',
                    description: 'Your changes have been saved',
                }),
            )
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <Container style={{ width: '100%' }}>
            <LoadingModal showLoading={loading} />
            <ModalCancelConfirm
                title="Do you want to cancel?"
                description="Your changes won’t be saved"
                isModalOpen={isModalCancelVisible}
                onCancel={() => setIsModalCancelVisible(false)}
                onSubmit={() => {
                    setOpen(false), setIsModalCancelVisible(false);
                    handleOff();
                }}
                yesBtnText="Yes"
                noBtnText="No"
            />
            <Row justify={'space-between'} align={'middle'}>
                <Row>
                    <Text style={{ fontSize: 18, fontWeight: '500' }}>
                        Non-Cash Adjustment
                    </Text>
                    <Tooltip
                        placement="bottomLeft"
                        title={
                            'This adjustment will be applied as an additional charge to all credit card transactions'
                        }
                        arrow={true}
                        color="#fff"
                        style={{
                            color: '#000',
                        }}
                        overlayInnerStyle={{ color: '#000' }}
                    >
                        <Button
                            ghost
                            style={{
                                height: 24,
                                width: 24,
                                borderRadius: 100,
                                padding: 0,
                                marginLeft: 20,
                            }}
                        >
                            <InfoIcon />
                        </Button>
                    </Tooltip>
                </Row>
                <SwitchContainer>
                    <Switch
                        style={{ height: 32, width: 60 }}
                        value={open}
                        onChange={() => {
                            if (!open) {
                                setOpen(true);
                            } else {
                                setIsModalCancelVisible(true);
                            }
                        }}
                    />
                </SwitchContainer>
            </Row>

            {open && (
                <div
                    style={{
                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                        Adjustment Percentage
                    </Text>
                    <div style={{ position: 'relative' }}>
                        <DarkInput
                            placeholder="xxx.xx"
                            onChange={(e) => {
                                const value = e.target.value;
                                setValue(e.target.value);
                                // check string is number
                                if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
                                    setErr('Please enter a valid number');
                                    return;
                                }
                                setErr('');
                                return;
                            }}
                            value={value}
                            autoFocus
                        />
                        <div
                            style={{ position: 'absolute', top: 12, right: 10 }}
                        >
                            <Icon />
                        </div>
                        {err && (
                            <Text style={{ marginTop: 10, color: 'red' }}>
                                {err}
                            </Text>
                        )}
                    </div>

                    <Row style={{ gap: 20, marginTop: 50 }}>
                        <ButtonPrimary
                            isCancel
                            title="Cancel"
                            onClick={() => setIsModalCancelVisible(true)}
                            width="180px"
                            backgroundColor="transparent"
                            borderColor="black"
                            color="black"
                        />
                        <ButtonPrimary
                            onClick={() => handleSubmit()}
                            title="Save"
                            width="180px"
                            isDisable={
                                value === '' || (err !== '' ? true : false)
                            }
                            isLoading={loadingUpdate}
                        />
                    </Row>
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    .ant-btn-default:active {
        border: 0px;
    }
`;

const Icon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                d="M23.3373 5.99741L5.99867 23.3374C5.64575 23.6903 5.44749 24.169 5.44749 24.6681C5.44749 25.1672 5.64575 25.6458 5.99867 25.9987C6.35158 26.3517 6.83024 26.5499 7.32933 26.5499C7.82843 26.5499 8.30709 26.3517 8.66 25.9987L25.9987 8.66008C26.3406 8.30489 26.5296 7.82973 26.525 7.33671C26.5203 6.84369 26.3225 6.37215 25.974 6.02343C25.6254 5.67471 25.154 5.47664 24.661 5.47177C24.1679 5.46691 23.6927 5.65564 23.3373 5.99741ZM9.336 6.66674C8.98581 6.66639 8.63898 6.73502 8.31531 6.86871C7.99164 7.0024 7.69747 7.19853 7.4496 7.44591C7.20173 7.69328 7.00501 7.98706 6.87068 8.31046C6.73634 8.63386 6.66702 8.98055 6.66667 9.33074C6.66632 9.68094 6.73495 10.0278 6.86863 10.3514C7.00232 10.6751 7.19845 10.9693 7.44583 11.2171C7.69321 11.465 7.98698 11.6617 8.31038 11.7961C8.63378 11.9304 8.98048 11.9997 9.33067 12.0001C10.0379 12.0008 10.7165 11.7205 11.2171 11.2209C11.7177 10.7213 11.9993 10.0433 12 9.33608C12.0007 8.62883 11.7204 7.95028 11.2208 7.44968C10.7212 6.94908 10.0432 6.66745 9.336 6.66674ZM22.6693 20.0001C21.9621 19.9994 21.2835 20.2796 20.7829 20.7792C20.2823 21.2788 20.0007 21.9568 20 22.6641C19.9993 23.3713 20.2796 24.0499 20.7792 24.5505C21.2788 25.0511 21.9568 25.3327 22.664 25.3334C23.0142 25.3338 23.361 25.2651 23.6847 25.1314C24.0084 24.9978 24.3025 24.8016 24.5504 24.5542C24.7983 24.3069 24.995 24.0131 25.1293 23.6897C25.2637 23.3663 25.333 23.0196 25.3333 22.6694C25.3337 22.3192 25.2651 21.9724 25.1314 21.6487C24.9977 21.3251 24.8015 21.0309 24.5542 20.783C24.3068 20.5351 24.013 20.3384 23.6896 20.2041C23.3662 20.0698 23.0195 20.0004 22.6693 20.0001Z"
                fill="#4A505C"
            />
        </svg>
    );
};
