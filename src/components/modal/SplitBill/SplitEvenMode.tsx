import { Input } from 'antd';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import React from 'react';
import styled from 'styled-components';

export default function SplitEvenMode({
    total,
    onSubmit,
    numbers = 1,
}: {
    total: number;
    onSubmit: (input: number) => void;
    numbers: number;
}) {
    const [input, setInput] = React.useState(numbers);
    return (
        <div style={{ height: '100%', width: 390 }}>
            <Text style={{ marginBlock: 16 }}>Number to split</Text>

            <InputNumberStyled
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
            />
            <Text
                style={{ marginBlock: 16, color: 'rgba(245, 245, 245, 0.3)' }}
            >
                Number to split:{' '}
                <span style={{ color: 'white' }}> {input}</span>
            </Text>
            <Text
                style={{ marginBlock: 16, color: 'rgba(245, 245, 245, 0.3)' }}
            >
                Each guest will pay:{' '}
                <span style={{ color: 'white' }}> {total / input} $</span>
            </Text>
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
