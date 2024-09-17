import { Spin } from 'antd';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';

export default function ButtonSubmit({
    onClick,
    title,
    loading = false,
}: {
    onClick: any;
    title: string;
    loading?: boolean;
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
            {loading ? (
                <Spin />
            ) : (
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: theme.pRIMARY1,
                    }}
                >
                    {title}
                </Text>
            )}
        </div>
    );
}
