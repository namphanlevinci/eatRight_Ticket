import { useLazyQuery } from '@apollo/client';
import { Button, Layout } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Text } from 'components/atom/Text';

import { useTheme } from 'context/themeContext';
import { LIST_PRINTER_DEVICES } from 'graphql/printer';
import ButtonSubmit from 'pages/TableBill/components/buttonSubmit';
import { useEffect, useState } from 'react';
export default function PrinterAppSetUpPage() {
    const { theme } = useTheme();
    const [onGetListPrinterDevice] = useLazyQuery(LIST_PRINTER_DEVICES);
    const [list, setList] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const handleOk = (): void => {
        if (selectedOption) {
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

                <ButtonSubmit title="Select" onClick={handleOk} />
            </div>
        </Layout>
    );
}
