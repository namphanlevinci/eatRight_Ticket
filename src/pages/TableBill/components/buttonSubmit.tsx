import { Spin } from 'antd';
import { Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';

export default function ButtonSubmit({
    onClick,
    title,
    disabled,
    loading = false,
}: {
    onClick: any;
    title: string;
    loading?: boolean;
    disabled?: boolean;
}) {
    const { theme } = useTheme();
    return (
        <button
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 56,
                background: disabled
                    ? theme.tEXTDisabled
                    : theme.pRIMARY6Primary,
                marginTop: 20,
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                outline: 'none',
                border: 'none',
            }}
            onClick={onClick}
            disabled={disabled}
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
        </button>
    );
}
