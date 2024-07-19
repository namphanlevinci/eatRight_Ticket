import { TextBold as Text } from 'components/atom/Text';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function CartInfo() {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    return (
        <div
            style={{
                background: '#161B26',

                borderRadius: 8,
                border: '1px solid #3F3F3F',
                display: 'flex',
                padding: 8,
                flexWrap: isMobile ? 'wrap' : 'initial',
            }}
        >
            <div style={{ width: isMobile ? '30%' : '20%', overflow: 'auto' }}>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Table
                    </span>{' '}
                    A12
                </Text>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Guests{' '}
                    </span>{' '}
                    4
                </Text>
            </div>
            <div style={{ width: isMobile ? '70%' : '33%', overflow: 'auto' }}>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        In / out{' '}
                    </span>
                    6.30PM / 9.30PM
                </Text>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Order ID
                    </span>{' '}
                    4
                </Text>
            </div>
            <div style={{ width: isMobile ? '100%' : '43%', overflow: 'auto' }}>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Lead guest{' '}
                    </span>
                    Lead guest A12
                </Text>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Total{' '}
                    </span>
                    Guests 4
                </Text>
            </div>
        </div>
    );
}
