import { Row } from 'antd';
import RadioIcon from 'assets/icons/radio';
import RadioBtnSelectedLarge from 'assets/icons/radioBtnSelectedLarge';
import React from 'react';
import { Text } from '../Text';

export default function RadioButton({
    title,
    selected,
    onPress,
}: {
    title: string;
    selected: boolean;
    onPress: () => void;
}) {
    return (
        <Row
            style={{ alignItems: 'center', gap: 10, cursor: 'pointer' }}
            onClick={onPress}
        >
            <div style={{ width: 36, display: 'flex', alignItems: 'center' }}>
                {selected ? <RadioBtnSelectedLarge /> : <RadioIcon />}
            </div>
            <Text
                style={{ color: selected ? 'white' : 'rgba(102, 102, 102, 1)' }}
            >
                {title}
            </Text>
        </Row>
    );
}
