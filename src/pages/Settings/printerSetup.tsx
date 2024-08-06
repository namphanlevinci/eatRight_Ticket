import { Button, Form, Layout } from 'antd';
import { Text } from 'components/atom/Text';

import { usePrinter } from 'context/printerContext';
import { PrinterContextType } from 'context/printerType';
import Input from './components/input';
import { useTheme } from 'context/themeContext';
export default function PrinterSetUpPage() {
    const {
        connectionStatus,
        printerIPAddress,
        printerPort,
        setPrinterIPAddress,
        setPrinterPort,
        connect,
    }: PrinterContextType = usePrinter();
    const handleSubmit = (values: {
        printerIPAddress: string;
        port: string;
    }) => {
        setPrinterIPAddress(values.printerIPAddress);
        setPrinterPort(values.port);
        connect(values.printerIPAddress, values.port);
    };
    const { theme } = useTheme();
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
            <Text>Connect: {connectionStatus}</Text>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{
                    printerIPAddress: printerIPAddress,
                    port: printerPort,
                }}
                onFinish={handleSubmit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                size="large"
            >
                <Input
                    label="Printer Ip Address"
                    name="printerIPAddress"
                    placeholder="Printer Ip Address"
                />
                <Input
                    label="Printer Port"
                    name="port"
                    placeholder="Printer Port"
                />

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
                            height: 60,
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
                            Connect
                        </Text>
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
}
