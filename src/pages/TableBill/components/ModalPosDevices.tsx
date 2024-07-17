import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Button } from 'antd';
import { Text } from 'components/atom/Text';
import { Colors } from 'themes/colors';
import ButtonSubmit from '../components/buttonSubmit';
import { useLazyQuery } from '@apollo/client';
import { POS_DEVICE_LIST } from 'graphql/orders/paymentMethod';

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
            setPosDeviceList(res?.data?.getPosDevices?.items ?? []);
        });
    }, []);
    const handleOk = (): void => {
        if (selectedOption) {
            onPressOK(selectedOption?.entity_id);
        }
        setVisibleMoalPos(false);
    };

    const handleCancel = (): void => {
        setVisibleMoalPos(false);
    };

    const handleChange = (item: any): void => {
        setSelectedOption(item);
    };

    return (
        <>
            <Modal
                open={isVisibleModalPos}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ background: '#191919' }}
                styles={{
                    content: { backgroundColor: '#191919', boxShadow: 'none' }, // turns the Modal #191919,
                    header: { background: '#191919', color: 'white' },
                }}
                closeIcon={null}
                footer={null}
            >
                <div style={{ paddingTop: 8 }}>
                    <p
                        style={{
                            color: '#fff',
                            fontSize: 24,
                            fontWeight: '600',
                            marginBottom: 24,
                        }}
                    >
                        POS Device List
                    </p>
                    {posDeviceList?.map?.((pos: any) => (
                        <Button
                            key={`pos ${pos?.entity_id}`}
                            style={{
                                height: 56,
                                width: '100%',
                                background: Colors.grey3,
                                borderRadius: 8,
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
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

                    <ButtonSubmit title="Pay" onClick={handleOk} />
                </div>
            </Modal>
        </>
    );
};

export default ModalPosDevices;
