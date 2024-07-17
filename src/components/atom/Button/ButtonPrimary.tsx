import React from 'react';
import { Colors } from 'themes/colors';
import { Text } from '../Text';

export default function ButtonPrimary({
    title,
    onClick,
    size = 'large',
    isCancel = false,
    width = '100%',
    height,
    marginTop = '20px',
    backgroundColor,
    textColor,
}: {
    title: string;
    onClick: any;
    size?: 'small' | 'medium' | 'large';
    isCancel?: boolean;
    width?: string;
    height?: string;
    marginTop?: string;
    backgroundColor?: string;
    textColor?: string;
}) {
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
                    : isCancel
                      ? Colors.black
                      : Colors.primary,
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
                    color: textColor
                        ? textColor
                        : isCancel
                          ? Colors.primary
                          : Colors.black,
                }}
            >
                {title}
            </Text>
        </div>
    );
}
