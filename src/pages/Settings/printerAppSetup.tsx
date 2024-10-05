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
} from 'graphql/printer';
import ButtonSubmit from 'pages/TableBill/components/buttonSubmit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
export default function PrinterAppSetUpPage() {
    const { theme } = useTheme();
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
    const [list, setList] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const handleOk = (): void => {
        if (selectedOption) {
            if (switchPrinterMode) {
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
                    })
                    .catch(() => {
                        console.log('error');
                    });
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
    useEffect(() => {
        onGetListPrinterDevice({ fetchPolicy: 'no-cache' }).then((res: any) => {
            setList(res?.data?.merchantGetListDevice?.prints ?? []);
        });
    }, []);

    const handleChange = (item: any): void => {
        setSelectedOption(item);
    };
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
    const RenderEPSONPrinter = () => {
        return (
            <div style={{ paddingTop: 8 }}>
                {list?.map?.((Printer: any) => (
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
                ))}

                <ButtonSubmit
                    title="Select"
                    onClick={handleOk}
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
                {!isMerchant && (
                    <>
                        <Switch
                            onChange={() =>
                                setSwitchPrinterMode(!switchPrinterMode)
                            }
                            value={switchPrinterMode}
                        />
                        <Text>Terminal Printer</Text>{' '}
                    </>
                )}
            </Row>
            {switchPrinterMode ? (
                <RenderTerminalPrinter />
            ) : (
                <RenderEPSONPrinter />
            )}
        </Layout>
    );
}
