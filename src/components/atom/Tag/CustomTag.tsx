import React from 'react';
import { Text } from '../Text';

export default function CustomTag({
    background,
    text,
    textColor,
}: {
    background: string;
    text: string;
    textColor: string;
}) {
    return (
        <div
            style={{
                height: 24,
                width: 72,
                borderRadius: 12,
                background: background,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                marginRight: 16,
            }}
        >
            <Text
                style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: textColor,
                }}
            >
                {text}
            </Text>
        </div>
    );
}
