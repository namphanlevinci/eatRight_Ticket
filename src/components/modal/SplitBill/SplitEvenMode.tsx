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
    numbers = 2,
}: {
    total: number;
    onSubmit: (input: number) => void;
    numbers: number;
}) {
    const [input, setInput] = React.useState<any>(numbers);
    const ismobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { theme } = useTheme();
    return (
        <div style={{ height: '100%', width: ismobile ? '100%' : 390 }}>
            <Text style={{ marginBlock: 16 }}>Number to split</Text>

            <InputNumberStyled
                value={input}
                onChange={(e) => {
                    if (Number(e.target.value) > 0) {
                        if (Number(e.target.value) > 1000) {
                            setInput(1000);
                        } else {
                            setInput(Number(e.target.value));
                        }
                    } else {
                        setInput('');
                    }
                }}
                style={{
                    background: theme.nEUTRALBase,
                    border: '1px solid ' + theme.nEUTRALLine,
                    color: theme.tEXTPrimary,
                }}
                inputMode="numeric"
            />
            <Text style={{ marginBlock: 16, color: theme.tEXTSecondary }}>
                Number to split:{' '}
                <span style={{ color: theme.tEXTPrimary }}> {input}</span>
            </Text>
            <Text style={{ marginBlock: 16, color: theme.tEXTSecondary }}>
                Each guest will pay :{' '}
                <span style={{ color: theme.tEXTPrimary }}>
                    {' '}
                    $ {(total / input).toFixed(2)}
                </span>
            </Text>
            <ButtonPrimary
                title="Continue"
                onClick={() => input > 1 && onSubmit(input)}
                isDisable={input < 2 ? true : false}
            />
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
