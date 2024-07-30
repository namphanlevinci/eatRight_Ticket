import { Button } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';

export default function ButtonOptions({
    isSelected,
    onClick,
    title,
}: {
    isSelected: boolean;
    onClick: any;
    title: string;
}) {
    const { theme } = useTheme();
    return (
        <Button
            style={{
                height: 56,
                width: '100%',
                background: theme.nEUTRALBase,
                borderRadius: 8,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
            onClick={onClick}
        >
            <div style={{ width: 30, display: 'flex', alignItems: 'center' }}>
                {isSelected && <RadioBtnSelected />}
            </div>
            <Text>{title}</Text>
        </Button>
    );
}
