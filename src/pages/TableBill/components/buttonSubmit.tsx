import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';

export default function ButtonSubmit({
    onClick,
    title,
}: {
    onClick: any;
    title: string;
}) {
    const { theme } = useTheme();
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 56,
                background: theme.pRIMARY6Primary,
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
                    color: theme.pRIMARY1,
                }}
            >
                {title}
            </Text>
        </div>
    );
}
