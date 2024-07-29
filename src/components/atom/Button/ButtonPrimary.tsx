import React from 'react';
import { Text } from '../Text';
import { useTheme } from 'context/themeContext';

export default function ButtonPrimary({
    title,
    onClick,
    size = 'large',
    isCancel = false,
    width = '100%',
    height,
    marginTop = '20px',
    isDisable = false,
}: {
    title: string;
    onClick: any;
    size?: 'small' | 'medium' | 'large';
    isCancel?: boolean;
    width?: string;
    height?: string;
    marginTop?: string;
    isDisable?: boolean;
}) {
    const { theme } = useTheme();
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: height
                    ? height
                    : size === 'large'
                      ? 56
                      : size === 'medium'
                        ? 44
                        : 32,
                background: isDisable
                    ? theme.nEUTRALBase
                    : isCancel
                      ? theme.textTitle
                      : theme.pRIMARY6Primary,
                marginTop: marginTop,
                borderRadius: 8,
                cursor: 'pointer',
                width,
            }}
            onClick={onClick}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: isDisable
                        ? theme.nEUTRALLine
                        : isCancel
                          ? theme.pRIMARY6Primary
                          : theme.pRIMARY1,
                }}
            >
                {title}
            </Text>
        </div>
    );
}
