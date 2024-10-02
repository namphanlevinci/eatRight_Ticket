import { Modal, Row } from 'antd';
import React from 'react';
import { useTheme } from 'context/themeContext';

const elementsNumber = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    '0',
    '00',
];
const elementsAdd = ['5.00', '10.00', '20.00'];

interface IProps {
    isModalOpen: boolean;
    received: string;
    onSumit: () => void;
}

const ChangeModal = ({ isModalOpen }: IProps) => {
    const { theme } = useTheme();
    return (
        <>
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
                <Row>
                    <Row style={{ width: '100%' }}>
                        <p>Grand total</p>
                        <div>$99,99.00</div>
                    </Row>
                <Row style={{ width: '100%' }}>
                        <p>Received</p>
                        <div>$99,99.00</div>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <p>Change</p>
                        <div>$0.00</div>
                    </Row>
                    <div
                        style={{
                            width: '60%',
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 16
                        }}
                    >
                        {elementsNumber.map((el, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: "16px 20px",
                                    border: '1px solid #000',
                                    borderRadius: 8,
                                    width: 28,
                                    height: 28
                                }}
                            >
                                {el}
                            </div>
                        ))}
                    </div>
                    <Row style={{ width: '25%' }}>
                        <div>Exact</div>
                        {elementsAdd.map((el, idx) => (
                            <div key={idx}>{el}</div>
                        ))}
                    </Row>
                </Row>
            </Modal>
        </>
    );
};

export default ChangeModal;
