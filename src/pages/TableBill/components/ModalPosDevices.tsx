import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Button } from 'antd';
import { Text } from 'components/atom/Text';
import ButtonSubmit from '../components/buttonSubmit';
import { useLazyQuery } from '@apollo/client';
import { POS_DEVICE_LIST } from 'graphql/orders/paymentMethod';
import { useTheme } from 'context/themeContext';

const ModalPosDevices = ({
    onPressOK,
    isVisibleModalPos,
    setVisibleMoalPos,
}: {
    onPressOK: (item: any) => void;
    isVisibleModalPos: boolean;
    setVisibleMoalPos: (visible: boolean) => void;
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [onGetPosDeviceList] = useLazyQuery(POS_DEVICE_LIST);
    const [posDeviceList, setPosDeviceList] = useState<any>([]);
    useEffect(() => {
        onGetPosDeviceList({ fetchPolicy: 'no-cache' }).then((res: any) => {
            setPosDeviceList(res?.data?.merchantGetTerminalList?.items ?? []);
        });
    }, []);
    const handleOk = (): void => {
        if (selectedOption) {
            onPressOK(selectedOption?.id);
        }
        setVisibleMoalPos(false);
    };

    const handleCancel = (): void => {
        setVisibleMoalPos(false);
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
                        Terminals
                    </p>
                    {posDeviceList?.map?.((pos: any) => (
                        <Button
                            key={`pos ${pos?.id}`}
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
                            onClick={() => handleChange(pos)}
                        >
                            <div
                                style={{
                                    width: 30,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {pos?.id == selectedOption?.id && (
                                    <RadioBtnSelected />
                                )}
                            </div>
                            <Text>{pos?.serialNumber}</Text>
                        </Button>
                    ))}

                    <ButtonSubmit
                        title="Pay"
                        onClick={handleOk}
                        disabled={!selectedOption}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ModalPosDevices;
