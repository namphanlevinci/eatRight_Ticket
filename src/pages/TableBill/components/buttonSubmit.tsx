import { Text } from 'components/atom/Text';
import React from 'react';
import { Colors } from 'themes/colors';

export default function ButtonSubmit({
    onClick,
    title,
}: {
    onClick: any;
    title: string;
}) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 56,
                background: Colors.primary,
                marginTop: 20,
                borderRadius: 8,
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: Colors.black,
                }}
            >
                {title}
            </Text>
        </div>
    );
}
