import { TableColumnsType } from 'antd';
import { formatNumberWithCommas } from 'utils/format';

export type TFinalTotal = {
    subtotal: number | undefined;
    totalTax: number | undefined;
    totalTip: number | undefined;
    totalSales: number | undefined;
};

export type TInvoice = {
    invoice_number: string;
    subtotal: number;
    total_tax: number;
    tip_amount: number;
    grand_total: number;
};

export enum EPaymentMethod {
    CREDIT_CARD = 'credit_card',
    CASH = 'cash',
    DISCOUNT = 'discount',
}

export type TPaymentMethods = {
    payments: EPaymentMethod | string;
    amount: number;
};

export const ColumnsBatchInvoices = (): TableColumnsType<TInvoice> => [
    {
        title: 'Name',
        dataIndex: 'invoice_number',
        key: 'invoice_number',
        width: 150,
        align: 'center',
    },
    {
        title: 'Sales',
        dataIndex: 'subtotal',
        key: 'subtotal',
        align: 'center',
        render: (value, record) => {
            return (
                <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
                    {formatCurrency(value)}
                </div>
            );
        },
    },
    {
        title: 'Tax',
        dataIndex: 'total_tax',
        key: 'total_tax',
        align: 'center',
        render: (value, record) => {
            return (
                <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
                    {formatCurrency(value)}
                </div>
            );
        },
    },
    {
        title: 'Tip',
        dataIndex: 'tip_amount',
        key: 'tip_amount',
        align: 'center',
        width: 125,
        render: (value, record) => {
            return (
                <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
                    {formatCurrency(value)}
                </div>
            );
        },
    },
    {
        title: 'Total Sales',
        dataIndex: 'grand_total',
        key: 'grand_total',
        align: 'center',
        render: (value) => {
            if (!value) {
                return '';
            }
            return <span>{formatCurrency(formatNumberWithCommas(value))}</span>;
        },
    },
];

export const ColumnsTotal = (): TableColumnsType<TFinalTotal> => [
    {
        title: '',
        dataIndex: 'invoice_number',
        key: 'invoice_number',
        width: 150,
        fixed: 'left',
        render: () => (
            <div
                style={{
                    fontWeight: 700,
                    fontSize: 16,
                    minWidth: 126,
                }}
            >
                Total
            </div>
        ),
    },
    {
        title: '',
        dataIndex: 'subtotal',
        key: 'subtotal',
        align: 'center',
        render: (value, record: any) => {
            return (
                <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
                    {formatCurrency(formatNumberWithCommas(value))}
                </div>
            );
        },
    },
    {
        title: '',
        dataIndex: 'totalTax',
        key: 'totalTax',
        align: 'center',
        render: (value, record: any) => {
            return (
                <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
                    {formatCurrency(formatNumberWithCommas(value))}
                </div>
            );
        },
    },
    {
        title: '',
        dataIndex: 'totalTip',
        key: 'totalTip',
        align: 'center',
        width: 125,
        render: (value, record: any) => {
            return (
                <div style={{ fontWeight: record?.invoice_number ? 400 : 700 }}>
                    {formatCurrency(formatNumberWithCommas(value))}
                </div>
            );
        },
    },
    {
        title: '',
        dataIndex: 'totalSales',
        key: 'totalSales',
        align: 'center',
        render: (value) => {
            if (!value) {
                return '';
            }
            return (
                <span
                    style={{
                        fontWeight: 700,
                        color: '#389e0d',
                        fontSize: 16,
                    }}
                >
                    {formatCurrency(formatNumberWithCommas(value))}
                </span>
            );
        },
    },
];

export const ColumnsPaymentMethods = (): TableColumnsType<TPaymentMethods> => [
    {
        title: 'Payments',
        dataIndex: 'payments',
        key: 'payments',
        align: 'center',
        width: 300,
        render: (value) => (
            <span style={{ fontWeight: 500 }}>{renderTitlePayment(value)}</span>
        ),
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (value) => (
            <span style={{ fontWeight: 500 }}>
                {formatCurrency(formatNumberWithCommas(value))}
            </span>
        ),
    },
];

export const paymentClassNames = {
    credit_card: 'row-Credit-Card',
    cash: 'row-Cash',
    discount: 'row-Discount',
};

export const renderTitlePayment = (
    value: 'credit_card' | 'cash' | 'discount',
) => {
    const titles = {
        credit_card: 'Credit Card',
        cash: 'Cash',
        discount: 'Discount',
    };
    return titles[value];
};

export const formatCurrency = (value: string) => {
    if (!value) {
        return '';
    }
    return `$${value}`;
};
