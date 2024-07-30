import { TextBold as Text } from 'components/atom/Text';
import { useTheme } from 'context/themeContext';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { MerchantSplitOrderOutput } from '../IType';
import dayjs from 'dayjs';
export default function CartInfo({ data }: { data: MerchantSplitOrderOutput }) {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)',
    });
    const { theme } = useTheme();
    return (
        <div
            style={{
                background: theme.nEUTRALBase,

                borderRadius: 8,
                border: `1px solid ${theme.nEUTRALLine}`,
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
                    {data.order.table}
                </Text>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Guests{' '}
                    </span>{' '}
                    {data.order.guests}
                </Text>
            </div>
            <div style={{ width: isMobile ? '70%' : '33%', overflow: 'auto' }}>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        In / out{' '}
                    </span>
                    {dayjs(data.order.created_at).format('hh:mm A')} /{' '}
                    {dayjs(new Date()).format('hh:mm A')}
                </Text>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Order ID
                    </span>{' '}
                    {data.order.order_number}
                </Text>
            </div>
            <div style={{ width: isMobile ? '100%' : '43%', overflow: 'auto' }}>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Lead guest{' '}
                    </span>
                    {data.order.lead_guest}
                </Text>
                <Text>
                    <span style={{ fontWeight: '400', fontSize: 14 }}>
                        Total{' '}
                    </span>
                    {data.order.total.grand_total.value}
                </Text>
            </div>
        </div>
    );
}
