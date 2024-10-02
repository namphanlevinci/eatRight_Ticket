import { useState } from 'react';
import { Modal } from 'antd';
import ButtonSubmit from '../components/buttonSubmit';
import { useTheme } from 'context/themeContext';
import { Input } from "antd";

const ModalOtherMethod = ({
    onPressOK,
    isVisible,
    setVisible,
}: {
    onPressOK: (item: any) => void;
    isVisible: boolean;
    setVisible: (visible: boolean) => void;
}) => {
    const [selectedOption] = useState<any>(null);

    const handleOk = (): void => {
        onPressOK(value);
        setVisible(false);
    };

    const handleCancel = (): void => {
        setVisible(false);
    };

    const { theme } = useTheme();
    const [value, setValue] = useState('');

    const handleChange = (e: any) => {
        setValue(e?.target.value);
    };

    return (
        <>
            <Modal
                open={isVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ background: theme.nEUTRALPrimary, borderRadius: 16 }}
                styles={{
                    content: {
                        backgroundColor: theme.nEUTRALPrimary,
                        boxShadow: 'none',
                    },
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
                        Note
                    </p>
                    <Input
                        placeholder="Note(Ex: PO NUmber)"
                        value={value}
                        onChange={handleChange}
                        style={{ height: 50 }}
                    />

                    <ButtonSubmit
                        title="OK"
                        onClick={handleOk}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ModalOtherMethod;
