import { Input, Row } from 'antd';
import CloseIcon from 'assets/icons/close';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import styled from 'styled-components';

export default function ModalSplitItem({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (input: number) => void;
}) {
    const [input, setInput] = React.useState(1);
    const { theme } = useTheme();
    return (
        <div
            style={{
                position: 'absolute',
                width: 418,
                height: 203,
                background: theme.nEUTRALPrimary,
                boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)',
                right: 75,
                top: 100,
                padding: 16,
                borderRadius: 8,
                border: `1px solid ${theme.nEUTRALLine}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Row justify={'space-between'}>
                <Text>Split the item(s) into: </Text>
                <div style={{ cursor: 'pointer' }} onClick={onClose}>
                    <CloseIcon />
                </div>
            </Row>
            <InputNumberStyled
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
                style={{
                    backgroundColor: theme.nEUTRALBase,
                    border: `1px solid ${theme.nEUTRALLine}`,
                    color: theme.tEXTPrimary,
                }}
            />
            <ButtonPrimary title="Continue" onClick={() => onSubmit(input)} />
        </div>
    );
}
const InputNumberStyled = styled(Input)({
    width: '100%',
    height: 56,
    background: '#161B26',
    border: '1px solid #282828',
    borderRadius: 8,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat',
});
