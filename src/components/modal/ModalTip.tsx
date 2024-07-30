import { useLazyQuery, useQuery } from '@apollo/client';
import { Input, Modal, Row } from 'antd';
import CloseXIcon from 'assets/icons/closeIcon';
import { Button } from 'components/atom/Button';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import { GET_TIPS } from 'graphql/tips/tips';
import React, { useEffect, useRef } from 'react';
import { roundTo } from 'utils/number';
export default function ModalTip({
    isModalOpen,
    onCancel,
    onSubmit,
    total,
}: {
    isModalOpen: boolean;
    onCancel: any;
    onSubmit: any;
    total: number;
}) {
    const inputRef = useRef<any>(null);
    const [value, setValue] = React.useState(0);
    const [tips, setTips] = React.useState([10, 15, 20]);
    const [selectTip, setSelectTip] = React.useState(10);
    const [onGetTips, { data }] = useLazyQuery(GET_TIPS);
    useEffect(() => {
        onGetTips({
            fetchPolicy: 'no-cache',
        });
    }, []);
    useEffect(() => {
        if (data) {
            const tip_option = data?.tipRestaurant?.tip_option;
            const tip_percent = tip_option?.find(
                (item: any) => item?.type === 'percent',
            );
            if (tip_percent?.amount_option?.length > 2) {
                setTips(tip_percent?.amount_option);
            }
        }
    }, [data]);
    useEffect(() => {
        // Kiểm tra xem modal có mở không
        if (isModalOpen && inputRef.current) {
            // Nếu có, thì focus vào input
            inputRef.current.focus();
        }
    }, [isModalOpen]);
    useEffect(() => {
        if (selectTip !== 0 && total !== 0) {
            setValue(roundTo((total * selectTip) / 100, 3));
        }
    }, [selectTip, total]);
    const onFinish = () => {
        onSubmit(value);
    };
    const { theme } = useTheme();
    return (
        <Modal
            title="Basic Modal"
            open={isModalOpen}
            styles={{
                footer: {
                    display: 'none',
                },
                header: {
                    display: 'none',
                },
                content: {
                    backgroundColor: theme.nEUTRALPrimary,
                },
            }}
            closeIcon={<></>}
            centered
            closable={false}
        >
            <Row justify={'space-between'} align={'middle'}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Tip</Text>
                <div style={{ cursor: 'pointer' }} onClick={onCancel}>
                    <CloseXIcon />
                </div>
            </Row>
            <Text style={{ marginBlock: 16 }}>
                Total bill $ {total.toFixed(2)}
            </Text>
            <Input
                ref={inputRef}
                value={value}
                onChange={(e) => {
                    setValue(parseFloat(e.target.value || '0'));
                    setSelectTip(0);
                }}
                style={{
                    flex: 1,
                    height: 56,
                    backgroundColor: theme.nEUTRALBase,
                    color: theme.tEXTPrimary,
                    border: `1px solid ${theme.nEUTRALLine}`,
                }}
                itemType="number"
                prefix="$"
                allowClear={false}
                suffix={
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setValue(0), setSelectTip(0);
                        }}
                    >
                        <ClearIcon />
                    </div>
                }
            />
            <Text style={{ marginBlock: 16 }}>Or pick predefined amount</Text>

            <Row justify={'space-between'}>
                {tips.map((tip) => (
                    <Button
                        onClick={() => {
                            setSelectTip(tip);
                        }}
                        key={tip}
                        style={{
                            height: 56,
                            margin: 0,
                            width: '30%',
                            border: `2px solid ${theme.pRIMARY6Primary}`,
                        }}
                        background={
                            selectTip === tip
                                ? theme.pRIMARY6Primary
                                : theme.nEUTRALPrimary
                        }
                    >
                        <Text
                            style={{
                                color:
                                    selectTip === tip
                                        ? theme.nEUTRALPrimary
                                        : theme.pRIMARY6Primary,
                                fontWeight: '600',
                            }}
                        >
                            {tip}%
                        </Text>
                    </Button>
                ))}
            </Row>

            <Text style={{ marginBlock: 16 }}>
                Grand Total{' '}
                <span style={{ fontSize: 18, fontWeight: '600' }}>
                    {' '}
                    ${roundTo(total + value, 3)}{' '}
                </span>
            </Text>
            <ButtonPrimary
                title="Confirm"
                onClick={onFinish}
                marginTop="20px"
            />
        </Modal>
    );
}

const ClearIcon = () => {
    const { theme } = useTheme();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
        >
            <path
                d="M19.9987 3.33325C10.782 3.33325 3.33203 10.7833 3.33203 19.9999C3.33203 29.2166 10.782 36.6666 19.9987 36.6666C29.2154 36.6666 36.6654 29.2166 36.6654 19.9999C36.6654 10.7833 29.2154 3.33325 19.9987 3.33325ZM27.1654 27.1666C27.0112 27.3211 26.828 27.4437 26.6264 27.5273C26.4248 27.6109 26.2086 27.654 25.9904 27.654C25.7721 27.654 25.5559 27.6109 25.3543 27.5273C25.1527 27.4437 24.9696 27.3211 24.8154 27.1666L19.9987 22.3499L15.182 27.1666C14.8704 27.4782 14.4477 27.6533 14.007 27.6533C13.5663 27.6533 13.1437 27.4782 12.832 27.1666C12.5204 26.855 12.3453 26.4323 12.3453 25.9916C12.3453 25.7734 12.3883 25.5573 12.4718 25.3557C12.5553 25.1541 12.6777 24.9709 12.832 24.8166L17.6487 19.9999L12.832 15.1833C12.5204 14.8716 12.3453 14.449 12.3453 14.0083C12.3453 13.5675 12.5204 13.1449 12.832 12.8333C13.1437 12.5216 13.5663 12.3466 14.007 12.3466C14.4477 12.3466 14.8704 12.5216 15.182 12.8333L19.9987 17.6499L24.8154 12.8333C24.9697 12.6789 25.1529 12.5565 25.3545 12.473C25.5561 12.3895 25.7721 12.3466 25.9904 12.3466C26.2086 12.3466 26.4247 12.3895 26.6263 12.473C26.8279 12.5565 27.0111 12.6789 27.1654 12.8333C27.3197 12.9876 27.4421 13.1707 27.5256 13.3723C27.6091 13.574 27.6521 13.79 27.6521 14.0083C27.6521 14.2265 27.6091 14.4426 27.5256 14.6442C27.4421 14.8458 27.3197 15.0289 27.1654 15.1833L22.3487 19.9999L27.1654 24.8166C27.7987 25.4499 27.7987 26.5166 27.1654 27.1666Z"
                fill={theme.textTitle}
            />
        </svg>
    );
};
