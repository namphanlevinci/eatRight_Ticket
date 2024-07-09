import { Input, Row } from 'antd';
import CloseIcon from 'assets/icons/close';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
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
    return (
        <div
            style={{
                position: 'absolute',
                width: 418,
                height: 203,
                background: '#1f242f',
                boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)',
                right: 75,
                top: 100,
                padding: 16,
                borderRadius: 8,
                border: '1px solid #383232',
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
