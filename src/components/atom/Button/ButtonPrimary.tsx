import React from 'react';
import { Text } from '../Text';
import { useTheme } from 'context/themeContext';
import { Spin } from 'antd';

export default function ButtonPrimary({
    title,
    onClick,
    size = 'large',
    isCancel = false,
    width = '100%',
    height,
    marginTop = '20px',
    isDisable = false,
    backgroundColor,
    isLoading,
    color,
    borderColor,
    maxWidth = '100%',
}: {
    title: string;
    onClick: any;
    size?: 'small' | 'medium' | 'large';
    isCancel?: boolean;
    width?: string;
    height?: string;
    marginTop?: string;
    isDisable?: boolean;
    backgroundColor?: string;
    isLoading?: boolean;
    color?: string;
    borderColor?: string;
    maxWidth?: string;
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
                background: backgroundColor
                    ? backgroundColor
                    : isDisable
                      ? theme.nEUTRALBase
                      : isCancel
                        ? theme.nEUTRALPrimary
                        : theme.pRIMARY6Primary,
                marginTop: marginTop,
                borderRadius: 8,
                cursor: 'pointer',
                width,
                border: `${borderColor ? '2px' : '0px'} solid ${borderColor ? borderColor : theme.pRIMARY6Primary}`,
                maxWidth: maxWidth,
            }}
            onClick={onClick}
        >
            {isLoading ? (
                <Spin />
            ) : (
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: color
                            ? color
                            : isDisable
                              ? theme.nEUTRALLine
                              : isCancel
                                ? theme.pRIMARY6Primary
                                : theme.pRIMARY1,
                    }}
                >
                    {title}
                </Text>
            )}
        </div>
    );
}
