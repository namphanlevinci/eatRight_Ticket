import { Input, Row } from 'antd';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import styled from 'styled-components';

export default function RenderGuestTotal({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    const { theme } = useTheme();
    return (
        <Row align={'middle'} style={{ gap: 40, marginTop: 16 }}>
            <Text style={{ fontWeight: 600 }}>{title}</Text>
            <InputNumberStyled
                value={value.toFixed(2)}
                disabled
                style={{
                    background: theme.nEUTRALBase,
                    border: '1px solid ' + theme.nEUTRALLine,
                    color: theme.tEXTPrimary,
                }}
            />
        </Row>
    );
}

const InputNumberStyled = styled(Input)({
    display: 'flex',
    flex: 1,
    height: 56,
    borderRadius: 8,
    fontSize: 17,
    fontFamily: 'Montserrat',
});
