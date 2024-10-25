import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Button } from 'antd';
import { Text } from 'components/atom/Text';
import ButtonSubmit from '../components/buttonSubmit';
import { useLazyQuery } from '@apollo/client';
import { POS_DEVICE_LIST_DJV } from 'graphql/orders/paymentMethod';
import { useTheme } from 'context/themeContext';

const ModalPosDevicesDJV = ({
    onPressOK,
    isVisibleModalPos,
    setVisibleMoalPos,
    onCancel,
    autoSelectPos = true,
}: {
    onPressOK: (item: any) => void;
    isVisibleModalPos: boolean;
    setVisibleMoalPos: (visible: boolean) => void;
    onCancel: () => void;
    autoSelectPos?: boolean;
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [onGetPosDeviceList] = useLazyQuery(POS_DEVICE_LIST_DJV);
    const [posDeviceList, setPosDeviceList] = useState<any>([]);
    useEffect(() => {
        onGetPosDeviceList({ fetchPolicy: 'no-cache' }).then((res: any) => {
            setPosDeviceList(res?.data?.getPosDevices?.items ?? []);
        });
    }, []);
    useEffect(() => {
        if (isVisibleModalPos && posDeviceList) {
            if (posDeviceList && posDeviceList?.length === 1) {
                if (autoSelectPos) {
                    onPressOK(posDeviceList[0].entity_id);
                    setVisibleMoalPos(false);
                }
            }
        }
    }, [isVisibleModalPos, posDeviceList]);
    const handleOk = (): void => {
        if (selectedOption) {
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
                        Select another terminal
                    </p>
                    {posDeviceList?.map?.((pos: any) => (
                        <Button
                            key={`pos ${pos?.entity_id}`}
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
                                {pos?.entity_id ==
                                    selectedOption?.entity_id && (
                                    <RadioBtnSelected />
                                )}
                            </div>
                            <Text>{pos?.name}</Text>
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

export default ModalPosDevicesDJV;
