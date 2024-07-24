import { Row } from 'antd';
import RadioIcon from 'assets/icons/radio';
import RadioBtnSelectedLarge from 'assets/icons/radioBtnSelectedLarge';
import React from 'react';
import { Text } from '../Text';
import { useTheme } from 'context/themeContext';

export default function RadioButton({
    title,
    selected,
    onPress,
}: {
    title: string;
    selected: boolean;
    onPress: () => void;
}) {
    const { theme } = useTheme();
    return (
        <Row
            style={{ alignItems: 'center', gap: 10, cursor: 'pointer' }}
            onClick={onPress}
        >
            <div style={{ width: 36, display: 'flex', alignItems: 'center' }}>
                {selected ? <RadioBtnSelectedLarge /> : <RadioIcon />}
            </div>
            <Text
                style={{
                    color: selected ? theme.tEXTPrimary : theme.tEXTDisabled,
                }}
            >
                {title}
            </Text>
        </Row>
    );
}
