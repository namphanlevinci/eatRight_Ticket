import { message, Modal, Row } from 'antd';
import React, { useMemo, useState } from 'react';
import { useTheme } from 'context/themeContext';
import { formatMoney } from 'utils/format';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import CloseIcon from 'assets/icons/close';
import styled from 'styled-components';

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
const fastOptions = ['10', '20', '50'];

interface IProps {
    isModalOpen: boolean;
    grandTotal: number;
    onSubmit: () => void;
}

const ChangeModal = ({ isModalOpen, grandTotal, onSubmit }: IProps) => {
    const { theme } = useTheme();

    const [received, setReceived] = useState(0);
    const [activeDecimal, setActiveDecimal] = useState(0);

    const change = useMemo(() => {
        return received - grandTotal;
    }, [received, grandTotal]);

    const handleReceived = (value: string, isOption?: boolean) => {
        setReceived((prev) => {
            if (
                (isOption || value === '0' || value === '00') &&
                activeDecimal > 1
            ) {
                setActiveDecimal(0);
            }
            if (isOption) {
                return +value + prev;
            }
            if (value === '0') {
                return prev * 10;
            }
            if (value === '00') {
                return prev * 100;
            }
            if (value === '.') {
                setActiveDecimal(1);
                return prev;
            }
            if (activeDecimal) {
                setActiveDecimal((prev) => ++prev);
                return prev + +value / Math.pow(10, activeDecimal);
            }

            return +value + prev;
        });
    };

    const handleSubmit = () => {
        if (received < grandTotal) {
            return message.error(`greater than or equal to $${grandTotal}`);
        }
        onSubmit();
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
                maskClosable
            >
                <Row>
                    <InfoRow justify="space-between" align="middle">
                        <InfoLabel>Received</InfoLabel>
                        <InfoValueContainer>
                            <InfoValue>
                                {formatMoney(received.toString())}
                                <ClearButton
                                    onClick={() => {
                                        if (received > 0) {
                                            setReceived(0);
                                        }
                                        if (activeDecimal > 1) {
                                            setActiveDecimal(0);
                                        }
                                    }}
                                >
                                    <CloseIcon />
                                </ClearButton>
                            </InfoValue>
                        </InfoValueContainer>
                    </InfoRow>

                    <InfoRow justify="space-between" align="middle">
                        <InfoLabel>Change</InfoLabel>
                        <InfoValueContainer style={{ border: 'none' }}>
                            {change > grandTotal
                                ? formatMoney(change.toString())
                                : `$0`}
                        </InfoValueContainer>
                    </InfoRow>
                    <NumberContainer>
                        {elementsNumber.map((number, idx) => (
                            <NumberButton
                                key={idx}
                                onClick={() => handleReceived(number)}
                                theme={theme}
                            >
                                {number}
                            </NumberButton>
                        ))}
                    </NumberContainer>

                    <ButtonContainer>
                        <FastOptionButton
                            onClick={() =>
                                handleReceived(grandTotal.toString(), true)
                            }
                            theme={theme}
                            style={{
                                marginTop: 16,
                                width: 56,
                            }}
                        >
                            Exact
                        </FastOptionButton>
                        {fastOptions.map((number, idx) => (
                            <FastOptionButton
                                key={idx}
                                onClick={() => handleReceived(number, true)}
                                theme={theme}
                                style={{
                                    padding: '16px 20px',
                                    borderRadius: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    fontWeight: 700,
                                    marginTop: 16,
                                    height: 28,
                                    width: 56,
                                    cursor: 'pointer',
                                }}
                            >
                                {formatMoney(number.toString())}
                            </FastOptionButton>
                        ))}
                    </ButtonContainer>
                </Row>
                <ButtonPrimary
                    title={
                        grandTotal > received
                            ? `greater than or equal to $${grandTotal}`
                            : 'Pay'
                    }
                    onClick={handleSubmit}
                    marginTop="20px"
                    isDisable={grandTotal > received}
                    borderColor={`${theme.nEUTRALBase}`}
                    color={grandTotal > received ? '#333741' : '#fff'}
                />
            </Modal>
        </>
    );
};

export default ChangeModal;

const InfoRow = styled(Row)`
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
`;

const InfoLabel = styled.p`
    width: 96px;
    color: #333741;
`;

const InfoValueContainer = styled.div`
    border: 0.5px solid #c0c2c8;
    border-radius: 8px;
    flex-grow: 1;
    padding: 8px 12px;
    margin-left: 16px;
`;

const InfoValue = styled.div`
    display: flex;
    margin-top: 8px;
`;

const ClearButton = styled.div`
    margin-left: auto;
    cursor: pointer;
`;

const NumberButton = styled.div`
    padding: 16px 20px;
    border: 0.5px solid #c0c2c8;
    background-color: ${(props) => props.theme.nEUTRALSecBG};
    border-radius: 8px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
`;

const FastOptionButton = styled(NumberButton)`
    border: 0.5px solid ${(props) => props.theme.pRIMARY6Primary};
    color: ${(props) => props.theme.pRIMARY6Primary};,
`;

const NumberContainer = styled.div`
    width: 73%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 16px;
`;

const ButtonContainer = styled.div`
    width: 27%;
`;
