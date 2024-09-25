import { TableColumnsType } from 'antd';
import { TransactionItem } from 'graphql/batchSettlements/transactions';
import { formatNumberWithCommas } from 'utils/format';

export const Columns = (): TableColumnsType<TransactionItem> => {
    return [
        {
            title: 'Batch ID',
            dataIndex: 'batch_id',
            key: 'batch_id',
            render: (entity_id) => {
                return (
                    <div style={{ color: 'var(--text-primary)', fontSize: 16 }}>
                        #{entity_id}
                    </div>
                );
            },
        },
        {
            title: 'Date Time',
            dataIndex: 'date_time',
            key: 'date_time',
            render: (created) => {
                return <div style={{ fontSize: 16 }}>{created}</div>;
            },
            sorter: true,
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_number',
            key: 'invoice_number',
            render: (invoice_number) => {
                return (
                    <div
                        style={{
                            fontWeight: '600',
                            fontSize: 17,
                        }}
                    >
                        {invoice_number}
                    </div>
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'state',
            key: 'state',
            render: (status) => {
                return <div>{status}</div>;
            },
        },
        {
            title: 'Payment',
            dataIndex: 'payment_methods',
            key: 'payment_methods',
            render: (payment) => {
                return (
                    <div>
                        {payment?.name} {payment?.additional_data.value}
                    </div>
                );
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => {
                return <div>{type?.toUpperCase()}</div>;
            },
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => {
                return (
                    <div
                        style={{
                            fontWeight: '600',
                            fontSize: 17,
                        }}
                    >
                        ${formatNumberWithCommas(total.value)}
                    </div>
                );
            },
        },
    ];
};
