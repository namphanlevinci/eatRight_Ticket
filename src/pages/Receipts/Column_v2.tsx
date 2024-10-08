import { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { ReceiptItem } from 'graphql/receipts';

export const Columns = (): TableColumnsType<ReceiptItem> => {
    return [
        {
            title: 'Receipt ID',
            dataIndex: 'invoice_number',
            key: 'invoice_number',
            width: 200,
            render: (batch_id) => {
                return (
                    <div style={{ color: 'var(--text-primary)', fontSize: 16 }}>
                        #{batch_id}
                    </div>
                );
            },
        },
        {
            title: 'Total (USD)',
            dataIndex: 'total',
            key: 'total',
            width: 200,
            render: (total_amount) => {
                return (
                    <div
                        style={{
                            fontWeight: '600',
                            fontSize: 17,
                        }}
                    >
                        $
                        {parseFloat(
                            total_amount?.grand_total?.value || 0,
                        )?.toFixed(2)}
                    </div>
                );
            },
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 300,
            render: (date) => {
                return (
                    <div style={{ fontSize: 16 }}>
                        {dayjs(date).format('YYYY-MM-DD hh:mm A')}
                    </div>
                );
            },
        },
        {
            title: 'Method',
            dataIndex: 'payment_method',
            key: 'payment_method',
            width: 150,
            render: (payment_method) => {
                return (
                    <div style={{ fontSize: 16 }}>{payment_method?.title}</div>
                );
            },
        },
        {
            title: 'Terminal',
            dataIndex: 'terminal_name',
            key: 'terminal_name',
            width: 150,
            render: (terminal_name) => {
                return <div style={{ fontSize: 16 }}>{terminal_name}</div>;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (status) => {
                const lowerCaseStatus = status.toLowerCase();
                if (lowerCaseStatus === 'paid') {
                    return (
                        <div
                            style={{
                                fontSize: 16,
                                color: 'var(--success-2-default)',
                            }}
                        >
                            {status}
                        </div>
                    );
                }
                if (lowerCaseStatus === 'unpaid') {
                    return (
                        <div
                            style={{
                                fontSize: 16,
                                color: 'var(--warning-2-default)',
                            }}
                        >
                            {status}
                        </div>
                    );
                }
                if (lowerCaseStatus === 'voided') {
                    return (
                        <div
                            style={{
                                fontSize: 16,
                                color: 'var(--error-2-default)',
                            }}
                        >
                            {status}
                        </div>
                    );
                }
                return <div style={{ fontSize: 16 }}>{status}</div>;
            },
        },
    ];
};
