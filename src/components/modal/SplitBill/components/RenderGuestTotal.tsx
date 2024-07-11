import { Input, Row } from 'antd';
import { Text } from 'components/atom/Text';
import React from 'react';
import styled from 'styled-components';

export default function RenderGuestTotal({
    title,
    value,
}: {
    title: string;
    value: number | string;
}) {
    return (
        <Row align={'middle'} style={{ gap: 40, marginTop: 16 }}>
            <Text>{title}</Text>
            <InputNumberStyled value={value} disabled />
        </Row>
    );
}

const InputNumberStyled = styled(Input)({
    display: 'flex',
    flex: 1,
    height: 56,
    background: '#161B26 !important',
    border: '1px solid #161B26 !important',
    borderRadius: 8,
    color: 'white !important',
    fontSize: 17,
    fontFamily: 'Montserrat',
});
