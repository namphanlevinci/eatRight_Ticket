import { Button } from 'antd';
import RadioBtnSelected from 'assets/icons/radioBtnSelected';
import { Text } from 'components/atom/Text';
import React from 'react';
import { Colors } from 'themes/colors';

export default function ButtonOptions({
    isSelected,
    onClick,
    title,
}: {
    isSelected: boolean;
    onClick: any;
    title: string;
}) {
    return (
        <Button
            style={{
                height: 56,
                width: '100%',
                background: Colors.grey3,
                borderRadius: 8,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
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
