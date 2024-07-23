import { Input } from 'antd';
import ButtonPrimary from 'components/atom/Button/ButtonPrimary';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
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
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { theme } = useTheme();
    return (
        <div style={{ height: '100%', width: ismobile ? '100%' : 390 }}>
            <Text style={{ marginBlock: 16 }}>Number to split</Text>

            <InputNumberStyled
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
                style={{
                    background: theme.nEUTRALBase,
                    border: '1px solid ' + theme.nEUTRALLine,
                    color: theme.tEXTPrimary,
                }}
            />
            <Text style={{ marginBlock: 16, color: theme.tEXTSecondary }}>
                Number to split:{' '}
                <span style={{ color: theme.tEXTPrimary }}> {input}</span>
            </Text>
            <Text style={{ marginBlock: 16, color: theme.tEXTSecondary }}>
                Each guest will pay:{' '}
                <span style={{ color: theme.tEXTPrimary }}>
                    {' '}
                    {total / input} $
                </span>
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
