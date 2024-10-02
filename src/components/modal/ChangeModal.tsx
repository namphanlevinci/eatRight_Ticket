import { Modal, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import { useTheme } from 'context/themeContext';
import { formatMoney } from 'utils/format';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';

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
const elementsAdd = ['10', '20', '50'];

interface IProps {
    isModalOpen: boolean;
    grandTotal: number;
    onSubmit: () => void;
}

const ChangeModal = ({ isModalOpen, grandTotal, onSubmit }: IProps) => {
    const { theme } = useTheme();

    const [received, setReceived] = useState(0);

    const change = useMemo(() => {
        return received - grandTotal;
    }, [received, grandTotal]);

    console.log(grandTotal);

    const handleReceived = (value: string) => {
        setReceived((prev) => {
            if (value === '0') {
                return prev * 10;
            }
            if (value === '00') {
                return prev * 100;
            }
            return +value + prev;
        });
    };

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
                        width: 412,
                    },
                }}
                closeIcon={<></>}
                centered
                closable={false}
            >
                <Row>
                    {/* <Row
                        style={{
                            width: '100%',
                            fontSize: 18,
                            fontWeight: 400,
                            marginBottom: 8,
                        }}
                        justify="space-between"
                        align={'middle'}
                    >
                        <p style={{ width: 96, color: '#333741' }}>
                            Grand total
                        </p>
                        <div
                            style={{
                                flexGrow: 1,
                                padding: '8px 12px',
                                marginLeft: 16,
                            }}
                        >
                            $99,99.00
                        </div>
                    </Row> */}
                    <Row
                        style={{
                            width: '100%',
                            fontSize: 18,
                            fontWeight: 500,
                            marginBottom: 8,
                        }}
                        justify="space-between"
                        align={'middle'}
                    >
                        <p style={{ width: 96, color: '#333741' }}>Received</p>
                        <div
                            style={{
                                border: '0.5px solid #C0C2C8',
                                borderRadius: 8,
                                flexGrow: 1,
                                padding: '8px 12px',
                                marginLeft: 16,
                            }}
                        >
                            {formatMoney(received.toString())}
                        </div>
                    </Row>
                    <Row
                        style={{
                            width: '100%',
                            fontSize: 18,
                            fontWeight: 500,
                            marginBottom: 8,
                        }}
                        justify="space-between"
                        align={'middle'}
                    >
                        <p style={{ width: 96, color: '#333741' }}>Change</p>
                        <div
                            style={{
                                flexGrow: 1,
                                padding: '8px 12px',
                                marginLeft: 16,
                            }}
                        >
                            {change > 0 ? formatMoney(change.toString()) : `$0`}
                        </div>
                    </Row>
                    <div
                        style={{
                            width: '73%',
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 16,
                            marginTop: 16,
                        }}
                    >
                        {elementsNumber.map((number, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '16px 20px',
                                    border: '0.5px solid #C0C2C8',
                                    backgroundColor: theme.nEUTRALSecBG,
                                    borderRadius: 8,
                                    width: 28,
                                    height: 28,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    fontWeight: 700,
                                }}
                                onClick={() => handleReceived(number)}
                            >
                                {number}
                            </div>
                        ))}
                    </div>
                    <div style={{ width: '27%' }}>
                        <div
                            style={{
                                padding: '16px 20px',
                                border: `0.5px solid ${theme.pRIMARY6Primary}`,
                                borderRadius: 8,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 20,
                                fontWeight: 700,
                                marginTop: 16,
                                height: 28,
                                color: theme.pRIMARY6Primary,
                            }}
                            onClick={() =>
                                handleReceived(grandTotal.toString())
                            }
                        >
                            Exact
                        </div>
                        {elementsAdd.map((number, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '16px 20px',
                                    border: `0.5px solid ${theme.pRIMARY6Primary}`,
                                    borderRadius: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    fontWeight: 700,
                                    marginTop: 16,
                                    height: 28,
                                    color: theme.pRIMARY6Primary,
                                }}
                                onClick={() => handleReceived(number)}
                            >
                                {formatMoney(number.toString())}
                            </div>
                        ))}
                    </div>
                </Row>
                <ButtonPrimary
                    title="Pay"
                    onClick={onSubmit}
                    marginTop="20px"
                    isDisable={grandTotal > received}
                    borderColor={`${theme.nEUTRALBase}`}
                />
            </Modal>
        </>
    );
};

export default ChangeModal;
