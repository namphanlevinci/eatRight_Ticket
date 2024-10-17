import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Layout, notification, Row, Switch } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';

import { POS_DEVICE_LIST_DJV } from 'graphql/orders/paymentMethod';
import {
    GET_CONFIG_PRINTER,
    LIST_PRINTER_DEVICES,
    SELECT_PRINTER_DEVICE,
    SELECT_TERMINAL_PRINTER_DEVICE,
    SELECT_TERMINAL_PRINTER_DEVICE_MERCHANT,
} from 'graphql/printer';
import ButtonSubmit from 'pages/TableBill/components/buttonSubmit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
export default function PrinterAppSetUpPage() {
    const { isMerchant } = useSelector((state: RootState) => state.auth);
    const [onGetListPrinterDevice] = useLazyQuery(LIST_PRINTER_DEVICES);
    const [onGetPosDeviceList] = useLazyQuery(POS_DEVICE_LIST_DJV);
    const [onGetConfig, { data }] = useLazyQuery(GET_CONFIG_PRINTER);
    const [posDeviceList, setPosDeviceList] = useState<any>([]);

    useEffect(() => {
        onGetConfig({ fetchPolicy: 'no-cache' });
        onGetPosDeviceList({ fetchPolicy: 'no-cache' }).then((res: any) => {
            setPosDeviceList(res?.data?.getPosDevices?.items ?? []);
        });
    }, []);
    const [onSetPrinterDevice, { loading }] = useMutation(
        SELECT_PRINTER_DEVICE,
    );
    const [onSetTerminalPrinter] = useMutation(SELECT_TERMINAL_PRINTER_DEVICE);
    const [onSetTerminalPrinterMerchant] = useMutation(
        SELECT_TERMINAL_PRINTER_DEVICE_MERCHANT,
    );
    const [list, setList] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const { theme } = useTheme();
    const handleChange = (item: any): void => {
        setSelectedOption(item);
    };
    const OpenMenuPrinter = () => {
        if (window?.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'openMenuPrinter',
                }),
            );
        }
    };
    const pushMsgOffPrinter = () => {
        if (window?.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'MsgOffPrinter',
                }),
            );
        }
    };
    const handleOk = (): void => {
        if (selectedOption) {
            if (switchPrinterMode) {
                if (isMerchant) {
                    onSetTerminalPrinterMerchant({
                        variables: {
                            pos_id: selectedOption.entity_id,
                        },
                    })
                        .then(() => {
                            notification.success({
                                message: 'Success',
                                description: 'Set up printer successfully',
                            });
                            localStorage.setItem(
                                'printer_id',
                                selectedOption?.id.toString(),
                            );
                            pushMsgOffPrinter();
                        })
                        .catch(() => {
                            console.log('error');
                        });
                } else {
                    onSetTerminalPrinter({
                        variables: {
                            pos_id: selectedOption.entity_id,
                        },
                    })
                        .then(() => {
                            notification.success({
                                message: 'Success',
                                description: 'Set up printer successfully',
                            });
                            localStorage.setItem(
                                'printer_id',
                                selectedOption?.id.toString(),
                            );
                            localStorage.setItem(
                                'merchantGetPrinterConfig',
                                `true`,
                            );
                            pushMsgOffPrinter();
                        })
                        .catch(() => {
                            console.log('error');
                        });
                }
            } else {
                onSetPrinterDevice({
                    variables: {
                        printer_id: selectedOption.id,
                    },
                })
                    .then(() => {
                        notification.success({
                            message: 'Success',
                            description: 'Set up printer successfully',
                        });
                        localStorage.setItem(
                            'printer_id',
                            selectedOption?.id.toString(),
                        );
                    })
                    .catch(() => {
                        console.log('error');
                    });
            }

            // onPressOK(selectedOption?.id);
        }
        // setVisibleMoalPrinter(false);
    };
    const handleSelectPrinter = (id: string) => {
        onSetPrinterDevice({
            variables: {
                printer_id: id,
            },
        })
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Set up printer successfully',
                });
                localStorage.setItem(
                    'printer_id',
                    selectedOption?.id.toString(),
                );
            })
            .catch(() => {
                console.log('error');
            });
    };
    useEffect(() => {
        onGetListPrinterDevice({ fetchPolicy: 'no-cache' }).then((res: any) => {
            setList(res?.data?.merchantGetListDevice?.prints ?? []);
        });
    }, []);

    useEffect(() => {
        if (data?.merchantGetPrinterConfig) {
            const idDevice = data?.merchantGetPrinterConfig?.printer_id;

            if (data?.merchantGetPrinterConfig?.is_used_terminal) {
                setSelectedOption(
                    posDeviceList?.find(
                        (item: any) => item?.entity_id == idDevice,
                    ),
                );
                setSwitchPrinterMode(true);
            } else {
                setSelectedOption(
                    list?.find((item: any) => item?.id == idDevice),
                );
                setSwitchPrinterMode(false);
            }
        }
    }, [data, list]);
    const [switchPrinterMode, setSwitchPrinterMode] = useState(false);

    useEffect(() => {
        const handleMessage = (event: any) => {
            try {
                const data = JSON.parse(event.data);
                notification.success({
                    message: 'Connected Printer successfully',
                    description: data.data.deviceName,
                });
                localStorage.setItem('merchantGetPrinterConfig', `false`);
                localStorage.setItem('printer_name', data.data.deviceName);
                onGetListPrinterDevice({ fetchPolicy: 'no-cache' }).then(
                    (res: any) => {
                        const list = res?.data?.merchantGetListDevice?.prints;
                        const printer = list.find(
                            (item: any) =>
                                item?.printer_name == data.data.deviceName,
                        );
                        handleSelectPrinter(printer?.id);
                    },
                );
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Connect Printer fail',
                });
            }
        };

        document.addEventListener('message', handleMessage);

        return () => {
            document.removeEventListener('message', handleMessage);
        };
    }, []);
    const RenderEPSONPrinter = () => {
        return (
            <div style={{ paddingTop: 8 }}>
                {localStorage.getItem('printer_name') &&
                    list?.map?.(
                        (Printer: any) =>
                            Printer?.id === selectedOption?.id && (
                                <Button
                                    key={`Printer ${Printer?.id}`}
                                    style={{
                                        height: 56,
                                        width: '100%',
                                        background: theme.nEUTRALBase,

                                        borderRadius: 8,
                                        border: `1px solid ${theme.nEUTRALLine}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        marginBottom: 12,
                                    }}
                                    onClick={() => handleChange(Printer)}
                                >
                                    <div
                                        style={{
                                            width: 30,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {Printer?.id == selectedOption?.id && (
                                            <RadioBtnSelected />
                                        )}
                                    </div>
                                    <Text>{Printer?.printer_name}</Text>
                                </Button>
                            ),
                    )}

                <ButtonSubmit
                    title="Select Printer"
                    onClick={OpenMenuPrinter}
                    loading={loading}
                />
            </div>
        );
    };
    const RenderTerminalPrinter = () => {
        return (
            <div style={{ paddingTop: 8 }}>
                {posDeviceList?.map?.((Printer: any) => (
                    <Button
                        key={`Printer ${Printer?.entity_id}`}
                        style={{
                            height: 56,
                            width: '100%',
                            background: theme.nEUTRALBase,

                            borderRadius: 8,
                            border: `1px solid ${theme.nEUTRALLine}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginBottom: 12,
                        }}
                        onClick={() => handleChange(Printer)}
                    >
                        <div
                            style={{
                                width: 30,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {Printer?.entity_id ==
                                selectedOption?.entity_id && (
                                <RadioBtnSelected />
                            )}
                        </div>
                        <Text>{Printer?.name}</Text>
                    </Button>
                ))}

                <ButtonSubmit
                    title="Select"
                    onClick={handleOk}
                    loading={loading}
                />
            </div>
        );
    };
    return (
        <Layout
            style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                background: 'transparent',
                gap: 20,
            }}
        >
            <Text>Printer App Setup</Text>
            <Row style={{ gap: 20 }}>
                <Text>EPSON Printer</Text>
                <Switch
                    onChange={() => setSwitchPrinterMode(!switchPrinterMode)}
                    value={switchPrinterMode}
                />
                <Text>Terminal Printer</Text>{' '}
            </Row>
            {switchPrinterMode ? (
                <RenderTerminalPrinter />
            ) : (
                <RenderEPSONPrinter />
            )}
        </Layout>
    );
}
