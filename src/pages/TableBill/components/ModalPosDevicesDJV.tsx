import { useEffect, useState } from 'react';
import { Col, Modal, Row } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Button } from 'antd';
import { Text } from 'components/atom/Text';
import ButtonSubmit from '../components/buttonSubmit';
import { useLazyQuery } from '@apollo/client';
import { POS_DEVICE_LIST_DJV } from 'graphql/orders/paymentMethod';
import { useTheme } from 'context/themeContext';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import RadioBtnNoneSelected from 'assets/icons/radioBtnNoneSelected';

const ModalPosDevicesDJV = ({
    onPressOK,
    isVisibleModalPos,
    setVisibleMoalPos,
    onCancel,
    autoSelectPos = true,
    termianlSelect,
    setTermianlSelect,
    setListPosDevice,
    setAutoSelectPos,
}: {
    onPressOK: (item: any) => void;
    isVisibleModalPos: boolean;
    setVisibleMoalPos: (visible: boolean) => void;
    onCancel: () => void;
    autoSelectPos?: boolean;
    termianlSelect?: any;
    setTermianlSelect?: any;
    setListPosDevice?: any;
    setAutoSelectPos?: any;
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [onGetPosDeviceList] = useLazyQuery(POS_DEVICE_LIST_DJV);
    const [posDeviceList, setPosDeviceList] = useState<any>([]);
    const { primary_terminal_setting } = useSelector(
        (state: RootState) => state.auth,
    );
    useEffect(() => {
        onGetPosDeviceList({ fetchPolicy: 'no-cache' }).then((res: any) => {
            setPosDeviceList(res?.data?.getPosDevices?.items ?? []);
        });
    }, []);
    useEffect(() => {
        if (isVisibleModalPos && posDeviceList) {
            setListPosDevice(posDeviceList);
            if (posDeviceList && posDeviceList?.length === 1) {
                if (autoSelectPos) {
                    onPressOK(posDeviceList[0].entity_id);
                    setVisibleMoalPos(false);
                }
            }

            if (
                posDeviceList &&
                posDeviceList?.length === 2 &&
                primary_terminal_setting &&
                autoSelectPos
            ) {
                const terminalLeft = posDeviceList.find(
                    (item: any) =>
                        `${item.entity_id}` !== `${primary_terminal_setting}`,
                );
                if (terminalLeft) {
                    onPressOK(terminalLeft.entity_id);
                    setVisibleMoalPos(false);

                    setTermianlSelect(terminalLeft.entity_id);
                    setAutoSelectPos(false);
                }
            }
        }
    }, [isVisibleModalPos, posDeviceList]);
    const handleOk = (): void => {
        if (selectedOption) {
            setTermianlSelect(selectedOption?.entity_id);
            onPressOK(selectedOption?.entity_id);
        }
        setVisibleMoalPos(false);
    };

    const handleCancel = (): void => {
        setVisibleMoalPos(false);
        onCancel();
    };

    const handleChange = (item: any): void => {
        setSelectedOption(item);
    };

    const { theme } = useTheme();
    return (
        <>
            <Modal
                open={isVisibleModalPos}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ background: theme.nEUTRALPrimary, borderRadius: 16 }}
                styles={{
                    content: {
                        backgroundColor: theme.nEUTRALPrimary,
                        boxShadow: 'none',
                    }, // turns the Modal #191919,
                    header: {
                        background: theme.nEUTRALPrimary,
                        color: 'white',
                    },
                }}
                closeIcon={null}
                footer={null}
                width={620}
            >
                <div style={{ paddingTop: 8 }}>
                    <p
                        style={{
                            color: theme.tEXTPrimary,
                            fontSize: 24,
                            fontWeight: '600',
                            marginBottom: 24,
                        }}
                    >
                        {termianlSelect
                            ? 'Payment Failed'
                            : 'Select another terminal'}
                    </p>
                    {termianlSelect && (
                        <Row
                            style={{
                                background: '#FFF3F1',
                                borderRadius: 6,
                                padding: 14,
                                paddingInline: 24,
                                marginBottom: 12,
                            }}
                            align={'middle'}
                        >
                            <Col span={2}>
                                <ErrorIcon />
                            </Col>
                            <Col span={20}>
                                <Text
                                    style={{
                                        color: '#FF4B33',
                                        fontWeight: '500',
                                        fontSize: 18,
                                    }}
                                >
                                    Payment via{' '}
                                    {
                                        posDeviceList?.find?.(
                                            (item: any) =>
                                                item?.entity_id ===
                                                termianlSelect,
                                        )?.name
                                    }{' '}
                                    failed. Please select an alternative
                                    terminal.
                                </Text>
                            </Col>
                        </Row>
                    )}
                    {posDeviceList?.map?.((pos: any) => (
                        <Button
                            key={`pos ${pos?.entity_id}`}
                            style={{
                                height: 68,
                                width: '100%',
                                background: theme.nEUTRALBase,

                                borderRadius: 6,
                                border: `0px solid ${theme.nEUTRALLine}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                marginBottom: 12,
                            }}
                            onClick={() => handleChange(pos)}
                        >
                            <div
                                style={{
                                    width: 30,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {pos?.entity_id == selectedOption?.entity_id ? (
                                    <RadioBtnSelected />
                                ) : (
                                    <RadioBtnNoneSelected />
                                )}
                            </div>
                            <Text>{pos?.name}</Text>
                        </Button>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <ButtonSubmit
                            title="Proceed Payment"
                            onClick={handleOk}
                            disabled={!selectedOption}
                            width={300}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalPosDevicesDJV;

const ErrorIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
        >
            <rect y="0.75" width="20" height="20" rx="10" fill="#FF4B33" />
            <path
                d="M6 7L14 15M6 15L14 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
