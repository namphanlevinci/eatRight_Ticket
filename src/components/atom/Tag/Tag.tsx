import React from 'react';
import { Text } from '../Text';

export default function Tag({ isUnsend }: { isUnsend: boolean }) {
    return (
        <div
            style={{
                height: 24,
                width: 72,
                borderRadius: 12,
                background: !isUnsend ? '#97C93D33' : '#FFCC0033',
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
                    color: isUnsend ? '#FBBC05' : '#34A853',
                }}
            >
                {' '}
                {isUnsend ? 'New' : 'Confirmed'}
            </Text>
        </div>
    );
}
